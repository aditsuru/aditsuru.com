import { Panel, PanelContent } from "@/components/layout/panel";
import { VinylPlayer } from "@/components/vinyl-player";
import { track } from "@/data/vinyl-lyrics";

function VinylLyrics() {
	return (
		<Panel>
			<PanelContent>
				<VinylPlayer {...track} />
			</PanelContent>
		</Panel>
	);
}

export { VinylLyrics };
