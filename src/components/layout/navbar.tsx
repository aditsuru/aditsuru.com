import { CommandMenu } from "@/components/misc/command-menu";
import { ThemeToggle } from "@/components/misc/theme-toggle";
import { Separator } from "@/components/ui/separator";

export const Navbar = () => {
	return (
		<header className="max-w-screen sticky top-0 bg-background z-50 screen-line-bottom overflow-x-clip">
			<div className="mx-auto md:max-w-3xl flex justify-between items-center border-x border-line pl-4 pr-2 py-2">
				<img src="/icon/logo-white.svg" alt="" className="size-10" />
				<div className="flex items-center gap-2">
					<CommandMenu />
					<Separator
						orientation="vertical"
						className="mr-2 max-sm:hidden data-vertical:h-5 data-vertical:self-center"
					/>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
};
