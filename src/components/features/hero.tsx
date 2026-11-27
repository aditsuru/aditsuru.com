"use client";

import { FlipSentences } from "@/components/flip-sentences";
import {
	HandwrittenArrow,
	HandwrittenNote,
} from "@/components/handwritten-note";
import { VerifiedIcon } from "@/components/icons";
import { ImageCycler, ImageCyclerItem } from "@/components/image-cycler";
import { Panel } from "@/components/layout/panel";
import { SpotlightLogo } from "@/components/spotlight-logo";
import { USER } from "@/data/user";
import { useSound } from "@/hooks/soundcn/use-sound";
import { hoverTickSound } from "@/lib/soundcn/hover-tick";

function Hero() {
	const [playTick] = useSound(hoverTickSound, { volume: 0.4 });

	return (
		<div className="@container relative overflow-y-clip">
			{/* Wide: reserve space above the profile row; the logo overlaps into it. */}
			<div aria-hidden className="hidden h-88 @2xl:block" />

			{/*
				Narrow: the logo sits in normal flow above the profile row and scales
				with the container, so it can never run into the avatar.
				Wide (container >= 42rem): same absolute placement and fixed height as before.
			*/}
			<div className="relative z-10 ml-auto max-w-143 px-3 pt-3 pb-2.5 @2xl:absolute @2xl:right-6 @2xl:bottom-22 @2xl:h-102 @2xl:max-w-none @2xl:p-0">
				<SpotlightLogo className="h-auto! w-full! @2xl:h-full! @2xl:w-auto!" />
			</div>

			<Panel className="flex">
				<ImageCycler
					className="relative z-20 size-30 shrink-0 rounded-full min-[24rem]:size-32 sm:size-40"
					transition="morph"
					onIndexChange={() => playTick()}
				>
					{USER.displayPfps.map((item) => (
						<ImageCyclerItem
							key={item.alt}
							src={item.src}
							alt={item.alt}
							fetchPriority="high"
							loading="eager"
						/>
					))}
				</ImageCycler>

				<div className="border-line flex grow flex-col justify-end border-l">
					<div className="border-line relative z-20 flex w-full items-center gap-2 border-y pl-4">
						<h1 className="type-5 sm:type-6">{USER.displayName}</h1>
						<VerifiedIcon className="size-4.5 select-none" />
					</div>
					<FlipSentences className="relative z-20 h-12.5 py-1 pl-4 sm:h-9">
						{USER.flipSentences}
					</FlipSentences>
				</div>

				<HandwrittenNote className="-top-7 right-full mr-4 hidden w-22 flex-col items-end lg:flex">
					<span className="-rotate-6">click to swap</span>
					<HandwrittenArrow className="size-7 translate-x-3 -scale-x-100 -rotate-6" />
				</HandwrittenNote>
			</Panel>
			<HandwrittenNote className="bottom-1/2 left-full z-20 ml-4 hidden w-30 flex-col items-start lg:flex">
				<HandwrittenArrow className="size-8 -translate-x-3 -scale-x-100 rotate-180" />
				<span className="-translate-y-1 -rotate-6">move your cursor</span>
			</HandwrittenNote>
		</div>
	);
}

export { Hero };
