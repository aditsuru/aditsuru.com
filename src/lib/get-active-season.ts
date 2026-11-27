import { cacheLife } from "next/cache";
import {
	type MonthDay,
	SEASONS,
	type SeasonId,
	type SeasonKind,
	type SeasonWindow,
	SITE_TIME_ZONE,
} from "@/data/season-calendar";

const MS_PER_DAY = 86_400_000;
const NO_PEAK_DISTANCE = Number.MAX_SAFE_INTEGER;

type ConfiguredSeason = (typeof SEASONS)[number];

/** "default" means no season or festival is active. */
export type ActiveSeasonId = SeasonId | "default";

export type ActiveSeason = {
	id: ActiveSeasonId;
	label: string;
	kind: SeasonKind | "default";
};

export type GetActiveSeasonOptions = {
	/** Moment to evaluate. Defaults to now. */
	now: Date;
	/** IANA time zone used to decide what "today" is. */
	timeZone?: string;
	/** Force a season, for previewing in development. */
	override?: ActiveSeasonId;
};

const DEFAULT_SEASON: ActiveSeason = {
	id: "default",
	label: "Default",
	kind: "default",
};

type CalendarDate = { year: number; month: number; day: number };

// Calendar date as seen in `timeZone`, so the theme flips at local midnight
// instead of server (usually UTC) midnight.
function getCalendarDate(now: Date, timeZone: string): CalendarDate {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone,
		year: "numeric",
		month: "numeric",
		day: "numeric",
	}).formatToParts(now);

	const read = (type: Intl.DateTimeFormatPartTypes) =>
		Number(parts.find((part) => part.type === type)?.value);

	return { year: read("year"), month: read("month"), day: read("day") };
}

// Dates are compared as UTC midnights so DST and local offsets never interfere.
function toUtcDay({ year, month, day }: CalendarDate) {
	return Date.UTC(year, month - 1, day);
}

function matchAroundPeak(
	todayUtc: number,
	peakUtc: number,
	daysBefore: number,
	daysAfter: number
) {
	const isActive =
		todayUtc >= peakUtc - daysBefore * MS_PER_DAY &&
		todayUtc <= peakUtc + daysAfter * MS_PER_DAY;

	return isActive
		? { distanceToPeak: Math.abs(todayUtc - peakUtc) / MS_PER_DAY }
		: null;
}

function matchWindow(window: SeasonWindow, today: CalendarDate) {
	const todayUtc = toUtcDay(today);

	switch (window.type) {
		case "recurring-range": {
			// month * 100 + day gives an orderable value, e.g. Dec 1 -> 1201
			const toOrdinal = ({ month, day }: MonthDay) => month * 100 + day;
			const current = toOrdinal(today);
			const from = toOrdinal(window.from);
			const to = toOrdinal(window.to);
			const isActive =
				from <= to
					? current >= from && current <= to
					: current >= from || current <= to; // wraps over New Year

			return isActive ? { distanceToPeak: NO_PEAK_DISTANCE } : null;
		}

		case "fixed-date": {
			const peakUtc = Date.UTC(
				today.year,
				window.peak.month - 1,
				window.peak.day
			);
			return matchAroundPeak(
				todayUtc,
				peakUtc,
				window.daysBefore,
				window.daysAfter
			);
		}

		case "yearly-dates": {
			const peakIso = window.peaks[today.year];

			if (!peakIso) {
				if (process.env.NODE_ENV !== "production") {
					console.warn(
						`[getActiveSeason] No festival date configured for ${today.year}.`
					);
				}
				return null;
			}

			const [year, month, day] = peakIso.split("-").map(Number);
			return matchAroundPeak(
				todayUtc,
				Date.UTC(year, month - 1, day),
				window.daysBefore,
				window.daysAfter
			);
		}
	}
}

function toActiveSeason({ id, label, kind }: ConfiguredSeason): ActiveSeason {
	return { id, label, kind };
}

/**
 * Returns the single season or festival that is active right now.
 * Conflicts: higher `priority` wins, then the closest peak date.
 */
export function getActiveSeason({
	now,
	timeZone = SITE_TIME_ZONE,
	override,
}: GetActiveSeasonOptions): ActiveSeason {
	if (override) {
		const forced = SEASONS.find((season) => season.id === override);
		return forced ? toActiveSeason(forced) : DEFAULT_SEASON;
	}

	const today = getCalendarDate(now, timeZone);

	const candidates = SEASONS.flatMap((season) => {
		const match = matchWindow(season.window, today);
		return match ? [{ season, distanceToPeak: match.distanceToPeak }] : [];
	}).sort(
		(a, b) =>
			b.season.priority - a.season.priority ||
			a.distanceToPeak - b.distanceToPeak
	);

	const winner = candidates[0]?.season;
	return winner ? toActiveSeason(winner) : DEFAULT_SEASON;
}

export async function getCurrentSeason(
	options: Omit<GetActiveSeasonOptions, "now"> = {}
): Promise<ActiveSeason> {
	"use cache";
	cacheLife("hours");

	return getActiveSeason({ ...options, now: new Date() });
}
