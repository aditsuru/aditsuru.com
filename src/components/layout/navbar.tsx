import Link from "next/link";

import { AditsuruMark } from "@/components/aditsuru-mark";
import { CommandMenu } from "@/components/command-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";

const NAV_ITEMS = [
	{ title: "Components", href: "/components" },
	{ title: "Blog", href: "/blog" },
	{ title: "Projects", href: "/projects" },
	{ title: "Favorites", href: "/favorites" },
] as const;

function NavDivider() {
	return (
		<Separator
			orientation="vertical"
			className="data-vertical:h-4 data-vertical:self-center max-sm:hidden"
		/>
	);
}

function Navbar() {
	return (
		<header className="bg-background screen-line-bottom sticky top-0 z-50 max-w-screen overflow-x-clip px-2">
			<div className="screen-line-bottom h-2 w-full" aria-hidden="true" />

			<div className="border-line mx-auto flex h-12 items-center justify-between border-x px-5 md:max-w-3xl">
				<Link href="/" aria-label="Home" className="shrink-0">
					<AditsuruMark className="text-foreground size-10" />
				</Link>

				<div className="flex items-center gap-2.5 max-sm:hidden">
					<nav
						aria-label="Main navigation"
						className="flex items-center gap-4 px-1.5"
					>
						{NAV_ITEMS.map(({ title, href }) => (
							<Link
								key={href}
								href={href}
								className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
							>
								{title}
							</Link>
						))}
					</nav>

					<NavDivider />
					<CommandMenu />
					<NavDivider />
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}

export { Navbar };
