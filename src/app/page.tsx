import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
	PanelTitleSup,
	StripeDivider,
} from "@/components/layout/grid";
import { ProfileHeader } from "@/components/section/profile-header";

export default function Home() {
	return (
		<>
			<ProfileHeader />

			<StripeDivider />

			<Panel id="about">
				<PanelHeader className="py-3">
					<PanelTitle>About</PanelTitle>
				</PanelHeader>
				<PanelContent>
					<p className="type-3">A short paragraph about you goes here.</p>
				</PanelContent>
			</Panel>

			<StripeDivider />

			<Panel id="projects">
				<PanelHeader className="py-300">
					<PanelTitle>
						Projects <PanelTitleSup>3</PanelTitleSup>
					</PanelTitle>
				</PanelHeader>
				<PanelContent>
					<p className="type-3 text-muted-foreground">Project cards go here.</p>
				</PanelContent>
			</Panel>

			<StripeDivider />
		</>
	);
}
