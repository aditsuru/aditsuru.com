export const SITE_TIME_ZONE = "Asia/Kolkata";

// Festival dates move every year, so extend these before they run out.
// A dev-only warning is logged when the current year is missing.
const HOLI_DATES = {
	2026: "2026-03-04",
	2027: "2027-03-22",
	2028: "2028-03-11",
	2029: "2029-03-01",
	2030: "2030-03-20",
	2031: "2031-03-09",
	2032: "2032-03-27",
	2033: "2033-03-16",
	2034: "2034-03-05",
	2035: "2035-03-24",
	2036: "2036-03-12",
};

const DIWALI_DATES = {
	2026: "2026-11-08",
	2027: "2027-10-29",
	2028: "2028-10-17",
	2029: "2029-11-05",
	2030: "2030-10-26",
	2031: "2031-11-14",
	2032: "2032-11-02",
	2033: "2033-10-22",
	2034: "2034-11-10",
	2035: "2035-10-30",
	2036: "2036-10-18",
};

export type MonthDay = { month: number; day: number };

export type SeasonWindow =
	// Same dates every year. May wrap over New Year (Dec -> Feb).
	| { type: "recurring-range"; from: MonthDay; to: MonthDay }
	// Same peak date every year, with a buffer around it.
	| {
			type: "fixed-date";
			peak: MonthDay;
			daysBefore: number;
			daysAfter: number;
	  }
	// Peak date differs per year (lunar festivals), with a buffer around it.
	| {
			type: "yearly-dates";
			peaks: Record<number, string>;
			daysBefore: number;
			daysAfter: number;
	  };

export type SeasonKind = "season" | "festival";

export type SeasonDefinition = {
	id: string;
	label: string;
	kind: SeasonKind;
	// Higher wins. If priorities tie, the one whose peak is closest to today wins.
	priority: number;
	window: SeasonWindow;
};

export const SEASONS = [
	{
		id: "winter",
		label: "Winter",
		kind: "season",
		priority: 0,
		window: {
			type: "recurring-range",
			from: { month: 12, day: 1 },
			to: { month: 2, day: 29 }, // 29 so leap years are covered
		},
	},
	{
		id: "summer",
		label: "Summer",
		kind: "season",
		priority: 0,
		window: {
			type: "recurring-range",
			from: { month: 4, day: 1 },
			to: { month: 8, day: 31 },
		},
	},
	{
		id: "holi",
		label: "Holi",
		kind: "festival",
		priority: 10,
		window: {
			type: "yearly-dates",
			peaks: HOLI_DATES,
			daysBefore: 3,
			daysAfter: 2,
		},
	},
	{
		id: "diwali",
		label: "Diwali",
		kind: "festival",
		priority: 10,
		window: {
			type: "yearly-dates",
			peaks: DIWALI_DATES,
			daysBefore: 5,
			daysAfter: 3,
		},
	},
	{
		id: "christmas",
		label: "Christmas",
		kind: "festival",
		priority: 10,
		window: {
			type: "fixed-date",
			peak: { month: 12, day: 25 },
			daysBefore: 10,
			daysAfter: 3,
		},
	},
	{
		id: "halloween",
		label: "Halloween",
		kind: "festival",
		priority: 10,
		window: {
			type: "fixed-date",
			peak: { month: 10, day: 31 },
			daysBefore: 7,
			daysAfter: 3,
		},
	},
] as const satisfies readonly SeasonDefinition[];

export type SeasonId = (typeof SEASONS)[number]["id"];
