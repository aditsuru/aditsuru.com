import {
	GitHubIcon,
	InstagramIcon,
	LinkedInIcon,
	XIcon,
} from "@/components/icons";

export const SOCIAL = {
	twitter: {
		title: "Twitter",
		handle: "@aditsuru",
		href: "https://x.com/aditsuru",
		Icon: XIcon,
	},
	github: {
		title: "GitHub",
		handle: "aditsuru",
		href: "https://github.com/aditsuru",
		Icon: GitHubIcon,
	},
	linkedin: {
		title: "LinkedIn",
		handle: "aditsuru",
		href: "https://linkedin.com/in/aditsuru",
		Icon: LinkedInIcon,
	},
	instagram: {
		title: "Instagram",
		handle: "aditsuru",
		href: "https://instagram.com/aditsuru",
		Icon: InstagramIcon,
	},
};

export const SOCIAL_LINKS: SocialLinks[] = Object.values(SOCIAL);

type SocialLinks = {
	title: string;
	handle: string;
	href: string;
	Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
};
