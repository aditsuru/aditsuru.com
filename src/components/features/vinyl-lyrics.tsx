import { Suspense } from "react";
import { Panel, PanelContent } from "@/components/layout/panel";
import { VinylPlayer } from "@/components/vinyl-player";
import { track } from "@/data/vinyl-lyrics";
import { getCurrentSeason } from "@/lib/get-active-season";

async function VinylLyricsBase() {
	const season = await getCurrentSeason();
	const id = season.id === "diwali" ? "diwali" : "default";
	return <VinylPlayer {...track[id]} />;
}

function VinylLyricsSkeleton() {
	return (
		<div className="animate-shimmer via-foreground/10 h-50 bg-linear-to-r from-transparent to-transparent" />
	);
}

function VinylLyrics() {
	return (
		<Panel>
			<PanelContent className="overflow-x-clip py-4">
				<Suspense fallback={<VinylLyricsSkeleton />}>
					<VinylLyricsBase />
				</Suspense>
			</PanelContent>
		</Panel>
	);
}

export { VinylLyrics };
