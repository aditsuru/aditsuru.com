import { Contributions } from "@/components/features/contributions";
import { Hero } from "@/components/features/hero";
import { SocialLinks } from "@/components/features/social-links";
import { Greeter } from "@/components/greeter";
import {
	Panel,
	PanelContent,
	PanelDivider,
	PanelStripeDivider,
	PanelTitle,
} from "@/components/layout/panel";

export default function Page() {
	return (
		<div>
			<Hero />
			<PanelStripeDivider />
			<Contributions />
			<PanelStripeDivider />
			<Panel>
				<PanelTitle render={<Greeter />} />
				<PanelContent>
					I'm Adi — a self-taught full-stack developer and design engineer with
					2+ years of experience, comfortable working across the whole stack,
					from interface to database.
				</PanelContent>
			</Panel>
			<PanelDivider />
			<SocialLinks />
		</div>
	);
}
