import { Hero } from "@/components/features/hero";
import {
	Panel,
	PanelContent,
	PanelStripeDivider,
	PanelTitle,
} from "@/components/layout/panel";

export default function Page() {
	return (
		<div>
			<Hero />
			<PanelStripeDivider />
			<Panel>
				<PanelTitle render={<h2>About Me</h2>} />
				<PanelContent>
					I'm Adi — a self-taught full-stack developer and design engineer with
					2+ years of experience, comfortable working across the whole stack,
					from interface to database.
				</PanelContent>
			</Panel>
		</div>
	);
}
