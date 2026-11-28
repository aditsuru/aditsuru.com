import type { LyricLine } from "@/components/vinyl-player";

const defaultLines: LyricLine[] = [
	{
		text: "We were too close to the stars",
		start: 1,
		end: 4.46,
		words: [
			{ text: "We", start: 1 },
			{ text: "were", start: 1.28 },
			{ text: "too", start: 1.55 },
			{ text: "close", start: 1.88 },
			{ text: "to", start: 2.48 },
			{ text: "the", start: 2.88 },
			{ text: "stars", start: 3.38 },
		],
	},
	{
		text: "I never knew somebody like you, somebody",
		start: 4.46,
		end: 9.49,
		words: [
			{ text: "I", start: 4.46 },
			{ text: "never", start: 4.68 },
			{ text: "knew", start: 5.18 },
			{ text: "somebody", start: 5.78 },
			{ text: "like", start: 6.98 },
			{ text: "you", start: 7.48 },
			{ text: "somebody", start: 8.18 },
		],
	},
	{
		text: "Falling just as hard",
		start: 9.49,
		end: 12.99,
		words: [
			{ text: "Falling", start: 9.49 },
			{ text: "just", start: 10.68 },
			{ text: "as", start: 11.18 },
			{ text: "hard", start: 11.58 },
		],
	},
	{
		text: "I'd rather lose somebody than use somebody",
		start: 12.99,
		end: 18.24,
		words: [
			{ text: "I'd", start: 12.99 },
			{ text: "rather", start: 13.28 },
			{ text: "lose", start: 13.88 },
			{ text: "somebody", start: 14.48 },
			{ text: "than", start: 15.68 },
			{ text: "use", start: 16.08 },
			{ text: "somebody", start: 16.58 },
		],
	},
	{
		text: "Maybe it's a blessing in disguise",
		start: 18.24,
		end: 24.42,
		words: [
			{ text: "Maybe", start: 18.24 },
			{ text: "it's", start: 19.08 },
			{ text: "a", start: 19.48 },
			{ text: "blessing", start: 19.88 },
			{ text: "in", start: 21.48 },
			{ text: "disguise", start: 21.88 },
		],
	},
	{
		text: "(I see myself in you)",
		start: 24.42,
		end: 26.66,
		words: [
			{ text: "I", start: 24.42 },
			{ text: "see", start: 24.68 },
			{ text: "myself", start: 25.08 },
			{ text: "in", start: 25.78 },
			{ text: "you", start: 26.08 },
		],
	},
	{
		text: "I see my reflection in your eyes",
		start: 26.66,
		end: 30.33,
		words: [
			{ text: "I", start: 26.66 },
			{ text: "see", start: 26.88 },
			{ text: "my", start: 27.18 },
			{ text: "reflection", start: 27.48 },
			{ text: "in", start: 28.48 },
			{ text: "your", start: 28.88 },
			{ text: "eyes", start: 29.38 },
		],
	},
];

const diwaliLines: LyricLine[] = [
	{
		text: "Hmm Sadiyon Se Bhi Lambi Yeh",
		start: 1,
		end: 3.922,
		words: [
			{ text: "Hmm", start: 1 },
			{ text: "Sadiyon", start: 1.25 },
			{ text: "Se", start: 2.05 },
			{ text: "Bhi", start: 2.3 },
			{ text: "Lambi", start: 2.55 },
			{ text: "Yeh", start: 3.35 },
		],
	},
	{
		text: "Mann Ki Amavasein Hain",
		start: 3.922,
		end: 6.579,
		words: [
			{ text: "Mann", start: 3.922 },
			{ text: "Ki", start: 4.45 },
			{ text: "Amavasein", start: 4.75 },
			{ text: "Hain", start: 6.05 },
		],
	},
	{
		text: "Aur Tu Phuljhadiyon Wale",
		start: 6.579,
		end: 9.235,
		words: [
			{ text: "Aur", start: 6.579 },
			{ text: "Tu", start: 6.95 },
			{ text: "Phuljhadiyon", start: 7.25 },
			{ text: "Wale", start: 8.55 },
		],
	},
	{
		text: "Tyoharon Jaisi",
		start: 9.235,
		end: 10.831,
		words: [
			{ text: "Tyoharon", start: 9.235 },
			{ text: "Jaisi", start: 10.15 },
		],
	},
	{
		text: "Chanda Bhi Deewana Hai Tera",
		start: 10.831,
		end: 14.704,
		words: [
			{ text: "Chanda", start: 10.831 },
			{ text: "Bhi", start: 11.65 },
			{ text: "Deewana", start: 11.9 },
			{ text: "Hai", start: 13.1 },
			{ text: "Tera", start: 13.4 },
		],
	},
	{
		text: "Jalti Hai Tujhse",
		start: 14.704,
		end: 17.359,
		words: [
			{ text: "Jalti", start: 14.704 },
			{ text: "Hai", start: 15.6 },
			{ text: "Tujhse", start: 15.9 },
		],
	},
	{
		text: "Saari Chhakoriyan",
		start: 17.359,
		end: 20.812,
		words: [
			{ text: "Saari", start: 17.359 },
			{ text: "Chhakoriyan", start: 18.15 },
		],
	},
	{
		text: "Kajal Ki Siyahi Se Likhi",
		start: 20.812,
		end: 25.063,
		words: [
			{ text: "Kajal", start: 20.812 },
			{ text: "Ki", start: 21.55 },
			{ text: "Siyahi", start: 21.8 },
			{ text: "Se", start: 22.7 },
			{ text: "Likhi", start: 23.1 },
		],
	},
	{
		text: "Hai Tune Jaane",
		start: 25.063,
		end: 27.065,
		words: [
			{ text: "Hai", start: 25.063 },
			{ text: "Tune", start: 25.35 },
			{ text: "Jaane", start: 26.1 },
		],
	},
	{
		text: "Kitno Ki Love Story’an",
		start: 27.065,
		end: 32.799,
		words: [
			{ text: "Kitno", start: 27.065 },
			{ text: "Ki", start: 28.05 },
			{ text: "Love", start: 28.4 },
			{ text: "Story’an", start: 29.1 },
		],
	},
];

export const track = {
	default: {
		cover:
			"https://thumb.wikimedia.org/wikipedia/en/thumb/e/ec/The_Neighbourhood_-_The_Neighbourhood.jpg/250px-The_Neighbourhood_-_The_Neighbourhood.jpg",
		href: "https://open.spotify.com/track/2xql0pid3EUwW38AsywxhV?si=bcedd84155b74cdb",
		lines: defaultLines,
	},
	diwali: {
		cover:
			"https://thumb.wikimedia.org/wikipedia/en/thumb/3/3c/Kesariya_song_cover.jpg/250px-Kesariya_song_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
		href: "https://open.spotify.com/track/6VBhH7CyP56BXjp8VsDFPZ?si=5effb5e131c54604",
		lines: diwaliLines,
	},
};
