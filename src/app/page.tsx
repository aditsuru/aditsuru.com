import { Panel, PanelContent, StripeDivider } from "@/components/layout/grid";
import { DotGrid } from "@/components/misc/dot-grid";
import { About } from "@/components/section/about";
import { ProfileHeader } from "@/components/section/profile-header";
import { SocialLinks } from "@/components/section/social-links";

export default function Home() {
	return (
		<>
			<div className="w-full border-x border-line" />
			<DotGrid />
			<ProfileHeader />

			<StripeDivider />

			<SocialLinks />

			<StripeDivider />

			<About />

			<StripeDivider />

			<Panel>
				<PanelContent className="flex justify-center items-center">
					<p className="type-8 font-handwritten">Portfolio Under Development</p>
				</PanelContent>
			</Panel>

			<StripeDivider />
		</>
	);
}
