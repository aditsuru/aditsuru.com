"use client";

import {
	IconDeviceDesktop,
	IconMoon,
	IconSearch,
	IconSun,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
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

const PAGES = [
	{ title: "Blog", href: "/blog" },
	{ title: "Favorites", href: "/favorites" },
];

const SECTIONS = [
	{ title: "About", href: "/#about", keywords: ["bio", "me"] },
	{ title: "Projects", href: "/#projects", keywords: ["work", "portfolio"] },
];

const ICON_STYLE = "text-muted-foreground size-4";

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

	const changeTheme = (theme: "light" | "dark" | "system") => {
		setTheme(theme);
		setOpen(false);
	};

	return (
		<>
			<Button variant="ghost" className="group" onClick={() => setOpen(true)}>
				<IconSearch className="text-muted-foreground size-4.5 group-hover:text-foreground transition-all" />
				<KbdGroup className="hidden md:flex">
					<Kbd>Ctrl</Kbd>
					<Kbd>K</Kbd>
				</KbdGroup>
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen} className="sm:max-w-lg">
				<Command className="bg-background">
					<CommandInput placeholder="Search…" />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>

						<CommandGroup heading="Pages">
							{PAGES.map((page) => (
								<CommandItem key={page.href} onSelect={() => go(page.href)}>
									{page.title}
								</CommandItem>
							))}
						</CommandGroup>

						<CommandGroup heading="Sections">
							{SECTIONS.map((section) => (
								<CommandItem
									key={section.href}
									keywords={section.keywords}
									onSelect={() => go(section.href)}
								>
									{section.title}
								</CommandItem>
							))}
						</CommandGroup>

						<CommandGroup heading="Theme">
							<CommandItem onSelect={() => changeTheme("light")}>
								<IconSun className={ICON_STYLE} />
								Light
							</CommandItem>
							<CommandItem onSelect={() => changeTheme("dark")}>
								<IconMoon className={ICON_STYLE} />
								Dark
							</CommandItem>
							<CommandItem onSelect={() => changeTheme("system")}>
								<IconDeviceDesktop className={ICON_STYLE} />
								System
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</CommandDialog>
		</>
	);
};
