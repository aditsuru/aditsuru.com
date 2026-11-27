import { MailIcon } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import {
	HandwrittenArrow,
	HandwrittenNote,
} from "@/components/handwritten-note";
import { Panel, PanelContent } from "@/components/layout/panel";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { SOCIAL_LINKS } from "@/data/social-links";
import { USER } from "@/data/user";

export function SocialLinks() {
	return (
		<Panel className="py-2">
			<h2 className="sr-only">Social links</h2>

			<PanelContent>
				<ul className="flex flex-wrap gap-2">
					<li>
						<span className="sr-only">Email copy</span>
						<CopyButton size="default" variant="eink" text={USER.email}>
							<MailIcon className="size-4.5" />
							{USER.email}
						</CopyButton>
					</li>
					{SOCIAL_LINKS.map((item) => (
						<li key={item.title}>
							<Tooltip>
								<TooltipTrigger
									render={
										<Button
											className="[&_svg:not([class*='size-'])]:size-4.5"
											variant="eink"
											nativeButton={false}
											render={
												<a href={item.href} target="_blank" rel="noopener">
													<item.Icon />
													{item.title}
												</a>
											}
										/>
									}
								/>
								<TooltipContent>
									{item.title} ({item.handle})
								</TooltipContent>
							</Tooltip>
						</li>
					))}
				</ul>
			</PanelContent>

			<HandwrittenNote className="-top-7 right-full mr-4 hidden w-20 flex-col items-end lg:flex">
				<span className="-rotate-6">connect</span>
				<HandwrittenArrow className="size-7 translate-x-3 -scale-x-100 -rotate-6" />
			</HandwrittenNote>
		</Panel>
	);
}
