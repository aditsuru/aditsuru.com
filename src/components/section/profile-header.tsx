"use client";

import { Panel, PanelContent } from "@/components/layout/grid";
import { FlipSentences } from "@/components/misc/flip-sentences";
import { VerifiedIcon } from "@/components/misc/verified-icon";
import { ImageCycler, ImageCyclerItem } from "@/components/ui/image-cycler";
import { USER } from "@/data/user";
import { useSound } from "@/hooks/soundcn/use-sound";
import { back001Sound } from "@/lib/soundcn/back-001";

export const ProfileHeader = () => {
	const [playSlide] = useSound(back001Sound, { volume: 0.4 });

	return (
		<Panel>
			<PanelContent className="p-0 flex">
				<ImageCycler
					className="size-30 rounded-full min-[24rem]:size-32 sm:size-40"
					transition="glitch"
					onIndexChange={() => playSlide()}
				>
					<ImageCyclerItem
						src="https://avatars.githubusercontent.com/u/193064835?v=4"
						alt="Github pfp"
					/>
					<ImageCyclerItem src="/adi.png" alt="Ghibli PFP" />
				</ImageCycler>
				<div className="border-l border-line grow flex flex-col justify-end">
					<div className="flex w-full items-center gap-2 pl-4 border-y border-line">
						<h1 className="type-6">{USER.displayName}</h1>
						<VerifiedIcon className="size-4.5 select-none" />
					</div>
					<FlipSentences className="h-12.5 py-1 pl-4 sm:h-9">
						{USER.flipSentences}
					</FlipSentences>
				</div>
			</PanelContent>
		</Panel>
	);
};
