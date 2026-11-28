import type { LyricLine } from "@/components/vinyl-player";

const cover =
	"https://thumb.wikimedia.org/wikipedia/en/thumb/e/ec/The_Neighbourhood_-_The_Neighbourhood.jpg/250px-The_Neighbourhood_-_The_Neighbourhood.jpg";

const href =
	"https://open.spotify.com/track/2xql0pid3EUwW38AsywxhV?si=bcedd84155b74cdb";

const loopDelay = 3;

const lines: LyricLine[] = [
	{
		text: "We were too close to the stars",
		start: 0.5,
		end: 3.96,
		words: [
			{ text: "We", start: 0.5 },
			{ text: "were", start: 0.78 },
			{ text: "too", start: 1.05 },
			{ text: "close", start: 1.38 },
			{ text: "to", start: 1.98 },
			{ text: "the", start: 2.38 },
			{ text: "stars", start: 2.88 },
		],
	},
	{
		text: "I never knew somebody like you, somebody",
		start: 3.96,
		end: 8.99,
		words: [
			{ text: "I", start: 3.96 },
			{ text: "never", start: 4.18 },
			{ text: "knew", start: 4.68 },
			{ text: "somebody", start: 5.28 },
			{ text: "like", start: 6.48 },
			{ text: "you", start: 6.98 },
			{ text: "somebody", start: 7.68 },
		],
	},
	{
		text: "Falling just as hard",
		start: 8.99,
		end: 12.49,
		words: [
			{ text: "Falling", start: 8.99 },
			{ text: "just", start: 10.18 },
			{ text: "as", start: 10.68 },
			{ text: "hard", start: 11.08 },
		],
	},
	{
		text: "I'd rather lose somebody than use somebody",
		start: 12.49,
		end: 17.74,
		words: [
			{ text: "I'd", start: 12.49 },
			{ text: "rather", start: 12.78 },
			{ text: "lose", start: 13.38 },
			{ text: "somebody", start: 13.98 },
			{ text: "than", start: 15.18 },
			{ text: "use", start: 15.58 },
			{ text: "somebody", start: 16.08 },
		],
	},
	{
		text: "Maybe it's a blessing in disguise",
		start: 17.74,
		end: 23.92,
		words: [
			{ text: "Maybe", start: 17.74 },
			{ text: "it's", start: 18.58 },
			{ text: "a", start: 18.98 },
			{ text: "blessing", start: 19.38 },
			{ text: "in", start: 20.98 },
			{ text: "disguise", start: 21.38 },
		],
	},
	{
		text: "(I see myself in you)",
		start: 23.92,
		end: 26.16,
		words: [
			{ text: "I", start: 23.92 },
			{ text: "see", start: 24.18 },
			{ text: "myself", start: 24.58 },
			{ text: "in", start: 25.28 },
			{ text: "you", start: 25.58 },
		],
	},
	{
		text: "I see my reflection in your eyes",
		start: 26.16,
		end: 29.83,
		words: [
			{ text: "I", start: 26.16 },
			{ text: "see", start: 26.38 },
			{ text: "my", start: 26.68 },
			{ text: "reflection", start: 26.98 },
			{ text: "in", start: 27.98 },
			{ text: "your", start: 28.38 },
			{ text: "eyes", start: 28.88 },
		],
	},
];

export const track = { cover, href, lines, loopDelay };
