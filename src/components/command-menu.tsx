"use client";

import {
	BookOpenTextIcon,
	BoxIcon,
	BriefcaseIcon,
	GraduationCapIcon,
	HeartIcon,
	LayersIcon,
	MonitorIcon,
	MoonIcon,
	SearchIcon,
	Share2Icon,
	SunIcon,
	UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { AditsuruMark } from "@/components/aditsuru-mark";
import { ReactIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

const ICON_STYLE = "text-muted-foreground size-4";

const PAGES = [
	{ title: "Home", href: "/", Icon: AditsuruMark },
	{ title: "Components", href: "/components", Icon: ReactIcon },
	{ title: "Blog", href: "/blog", Icon: BookOpenTextIcon },
	{ title: "Projects", href: "/projects", Icon: BoxIcon },
	{ title: "Favorites", href: "/favorites", Icon: HeartIcon },
];

const SECTIONS = [
	{
		title: "About",
		href: "/#about-section",
		keywords: ["bio", "me"],
		Icon: UserIcon,
	},
	{
		title: "Projects",
		href: "/#projects-section",
		keywords: ["work", "portfolio"],
		Icon: BoxIcon,
	},
	{
		title: "Experience",
		href: "/#experience-section",
		keywords: ["jobs", "career", "work history"],
		Icon: BriefcaseIcon,
	},
	{
		title: "Education",
		href: "/#education-section",
		keywords: ["school", "university", "degree"],
		Icon: GraduationCapIcon,
	},
	{
		title: "Stack",
		href: "/#stack-section",
		keywords: ["tech", "tools", "skills"],
		Icon: LayersIcon,
	},
	{
		title: "Blog",
		href: "/#blog-section",
		keywords: ["posts", "articles", "writing"],
		Icon: BookOpenTextIcon,
	},
	{
		title: "Socials",
		href: "/#socials-section",
		keywords: ["links", "contact", "profiles"],
		Icon: Share2Icon,
	},
];

const THEMES = [
	{ title: "Light", value: "light", Icon: SunIcon },
	{ title: "Dark", value: "dark", Icon: MoonIcon },
	{ title: "System", value: "system", Icon: MonitorIcon },
] as const;

export const CommandMenu = () => {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const { setTheme } = useTheme();

	useHotkeys("mod+k", (e: Event) => {
		e.preventDefault();
		setOpen((o) => !o);
	});

	const go = (href: string) => {
		setOpen(false);
		router.push(href);
	};

	const changeTheme = (theme: (typeof THEMES)[number]["value"]) => {
		setTheme(theme);
		setOpen(false);
	};

	return (
		<>
			<Button
				variant="ghost"
				className="group"
				onClick={() => setOpen(true)}
				aria-label="Open command menu"
				aria-haspopup="dialog"
				aria-expanded={open}
				aria-keyshortcuts="Control+K Meta+K"
			>
				<SearchIcon className="text-muted-foreground group-hover:text-foreground size-4.5 transition-all" />
				<KbdGroup aria-hidden="true" className="hidden md:flex">
					<Kbd>Ctrl</Kbd>
					<Kbd>K</Kbd>
				</KbdGroup>
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen} className="sm:max-w-lg">
				<Command className="bg-background">
					<CommandInput placeholder="Search…" aria-label="Search commands" />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>

						<CommandGroup heading="Pages">
							{PAGES.map(({ title, href, Icon }) => (
								<CommandItem
									key={href}
									value={`${title} page`}
									onSelect={() => go(href)}
								>
									<Icon className={ICON_STYLE} />
									{title}
								</CommandItem>
							))}
						</CommandGroup>

						<CommandGroup heading="Sections">
							{SECTIONS.map(({ title, href, keywords, Icon }) => (
								<CommandItem
									key={href}
									value={`${title} section`}
									keywords={keywords}
									onSelect={() => go(href)}
								>
									<Icon className={ICON_STYLE} />
									{title}
								</CommandItem>
							))}
						</CommandGroup>

						<CommandGroup heading="Theme">
							{THEMES.map(({ title, value, Icon }) => (
								<CommandItem
									key={value}
									value={`${title} theme`}
									onSelect={() => changeTheme(value)}
								>
									<Icon className={ICON_STYLE} />
									{title}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</CommandDialog>
		</>
	);
};
