import { cva } from "class-variance-authority";
import { Suspense } from "react";

import {
	GitHubContributions,
	GitHubContributionsFallback,
} from "@/components/github-contributions";
import { Panel, PanelContent } from "@/components/layout/panel";
import { USER } from "@/data/user";
import { type ActiveSeasonId, getCurrentSeason } from "@/lib/get-active-season";
import { getCachedContributions } from "@/lib/get-cached-contributions";

const GITHUB_USERNAME = USER.handle;
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

// Same empty-cell colors as the GitHub themes, shared by every palette.
const LEVEL_0 =
	'**:data-[level="0"]:fill-[#eff2f5] dark:**:data-[level="0"]:fill-[#151b23]';

// "default" is empty, so the component's own muted-foreground theme applies.
const SEASON_THEMES = {
	default: "",

	winter: [
		LEVEL_0,
		'**:data-[level="1"]:fill-[#b6e3ff] dark:**:data-[level="1"]:fill-[#0c2d6b]',
		'**:data-[level="2"]:fill-[#54aeff] dark:**:data-[level="2"]:fill-[#1158c7]',
		'**:data-[level="3"]:fill-[#0969da] dark:**:data-[level="3"]:fill-[#58a6ff]',
		'**:data-[level="4"]:fill-[#0a3069] dark:**:data-[level="4"]:fill-[#cae8ff]',
	],

	summer: [
		LEVEL_0,
		'**:data-[level="1"]:fill-[#b2f0e0] dark:**:data-[level="1"]:fill-[#05332e]',
		'**:data-[level="2"]:fill-[#5fd3bc] dark:**:data-[level="2"]:fill-[#0f6b60]',
		'**:data-[level="3"]:fill-[#1a9e8f] dark:**:data-[level="3"]:fill-[#1fa595]',
		'**:data-[level="4"]:fill-[#0b5d56] dark:**:data-[level="4"]:fill-[#5eead4]',
	],

	holi: [
		LEVEL_0,
		'**:data-[level="1"]:fill-[#fbcfe8] dark:**:data-[level="1"]:fill-[#500724]',
		'**:data-[level="2"]:fill-[#f472b6] dark:**:data-[level="2"]:fill-[#9d174d]',
		'**:data-[level="3"]:fill-[#db2777] dark:**:data-[level="3"]:fill-[#ec4899]',
		'**:data-[level="4"]:fill-[#831843] dark:**:data-[level="4"]:fill-[#fbcfe8]',
	],

	diwali: [
		LEVEL_0,
		'**:data-[level="1"]:fill-[#ffe2a8] dark:**:data-[level="1"]:fill-[#3f1d05]',
		'**:data-[level="2"]:fill-[#ffb347] dark:**:data-[level="2"]:fill-[#9a3412]',
		'**:data-[level="3"]:fill-[#e8590c] dark:**:data-[level="3"]:fill-[#f97316]',
		'**:data-[level="4"]:fill-[#9b1c1c] dark:**:data-[level="4"]:fill-[#fde68a]',
	],

	christmas: [
		LEVEL_0,
		'**:data-[level="1"]:fill-[#ffc9c9] dark:**:data-[level="1"]:fill-[#4a0f1a]',
		'**:data-[level="2"]:fill-[#ff6b6b] dark:**:data-[level="2"]:fill-[#9b1c31]',
		'**:data-[level="3"]:fill-[#d62839] dark:**:data-[level="3"]:fill-[#e5384f]',
		'**:data-[level="4"]:fill-[#7a0c1e] dark:**:data-[level="4"]:fill-[#ffb3b8]',
	],

	halloween: [
		LEVEL_0,
		'**:data-[level="1"]:fill-[#f0db3d] dark:**:data-[level="1"]:fill-[#fac68f]',
		'**:data-[level="2"]:fill-[#ffd642] dark:**:data-[level="2"]:fill-[#c46212]',
		'**:data-[level="3"]:fill-[#f68c41] dark:**:data-[level="3"]:fill-[#984b10]',
		'**:data-[level="4"]:fill-[#1f2328] dark:**:data-[level="4"]:fill-[#e3d04f]',
	],
} satisfies Record<ActiveSeasonId, string | string[]>; // fails to compile if a season is missing

const contributionsTheme = cva("", {
	variants: { season: SEASON_THEMES },
	defaultVariants: { season: "default" },
});

async function Contributions() {
	const contributions = getCachedContributions(GITHUB_USERNAME);
	const season = await getCurrentSeason();

	return (
		<Panel>
			<PanelContent>
				<Suspense fallback={<GitHubContributionsFallback />}>
					<GitHubContributions
						contributions={contributions}
						githubProfileUrl={GITHUB_PROFILE_URL}
						className={contributionsTheme({ season: season.id })}
					/>
				</Suspense>
			</PanelContent>
		</Panel>
	);
}

export { Contributions };
