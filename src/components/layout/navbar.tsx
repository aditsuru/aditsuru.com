import Link from "next/link";

import { CommandMenu } from "@/components/misc/command-menu";
import { ThemeToggle } from "@/components/misc/theme-toggle";
import { Separator } from "@/components/ui/separator";

export const Navbar = () => {
	return (
		<header className="max-w-screen sticky top-0 bg-background z-50 screen-line-bottom overflow-x-clip px-2">
			<div className="mx-auto md:max-w-3xl flex justify-between items-center border-x border-line pl-4 pr-2 py-2">
				<Link href="/" aria-label="Home">
					<img
						src="/icon/logo-black.svg"
						alt=""
						className="size-10 dark:hidden"
					/>
					<img
						src="/icon/logo-white.svg"
						alt=""
						className="hidden size-10 dark:block"
					/>
				</Link>
				<div className="flex items-center gap-2">
					<CommandMenu />
					<Separator
						orientation="vertical"
						className="max-sm:hidden data-vertical:h-5 data-vertical:self-center"
					/>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
};
