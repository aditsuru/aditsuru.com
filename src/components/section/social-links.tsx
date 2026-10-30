import {
	IconBrandGithub,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandX,
} from "@tabler/icons-react";

import { Panel, PanelContent } from "@/components/layout/grid";
import {
	HandwrittenArrow,
	HandwrittenNote,
} from "@/components/misc/handwritten-note";
import { Button } from "@/components/ui/button";

const SOCIALS = [
	{
		name: "GitHub",
		href: "https://github.com/aditsuru",
		icon: IconBrandGithub,
	},
	{ name: "X", href: "https://x.com/aditsuru", icon: IconBrandX },
	{
		name: "LinkedIn",
		href: "https://www.linkedin.com/in/aditsuru",
		icon: IconBrandLinkedin,
	},
	{
		name: "Instagram",
		href: "https://www.instagram.com/aditsuru",
		icon: IconBrandInstagram,
	},
];

export function SocialLinks() {
	return (
		<Panel>
			<h2 className="sr-only">Social links</h2>

			<PanelContent>
				<ul className="flex flex-wrap gap-2">
					{SOCIALS.map(({ name, href, icon: Icon }) => (
						<li key={name}>
							<Button
								variant="outline"
								size="icon-sm"
								nativeButton={false}
								className="text-foreground/80 shadow-none [&_svg:not([class*='size-'])]:size-4.5"
								render={
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										title={`${name} (@aditsuru)`}
									>
										<Icon aria-hidden />
										<span className="sr-only">{name}</span>
									</a>
								}
							/>
						</li>
					))}
				</ul>
			</PanelContent>

			<HandwrittenNote className="-top-4 right-full mr-4 hidden w-20 flex-col items-end lg:flex">
				<span className="-rotate-6">follow me</span>
				<HandwrittenArrow className="size-7 translate-x-3 -scale-x-100 -rotate-6" />
			</HandwrittenNote>
		</Panel>
	);
}
