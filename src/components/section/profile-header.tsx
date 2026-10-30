import { Panel, PanelContent } from "@/components/layout/grid";
import { FlipSentences } from "@/components/misc/flip-sentences";
import { VerifiedIcon } from "@/components/misc/verified-icon";
import { USER } from "@/data/user";

export const ProfileHeader = () => {
	return (
		<Panel>
			<PanelContent className="p-0 flex">
				<img
					src="/adi.png"
					alt=""
					className="relative size-30 rounded-full min-[24rem]:size-32 sm:size-40 outline-1 outline-black/10 -outline-offset-1 dark:outline-white/10 m-0.5"
				/>
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
