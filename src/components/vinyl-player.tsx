/** biome-ignore-all lint/suspicious/noArrayIndexKey: none */
"use client";

import {
	AnimatePresence,
	MotionConfig,
	motion,
	useInView,
	usePageInView,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SpotifyIcon } from "@/components/icons";

type VinylCoverProps = {
	playing?: boolean;
	cover: string;
	href: string;
	vinyl?: string;
	label?: string;
	loading?: "eager" | "lazy";
};

function VinylCover({
	playing = true,
	cover,
	href,
	vinyl = "/vinyl-record.png",
	label = "Open song",
	loading = "eager",
}: VinylCoverProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener"
			className="focus-visible:border-ring focus-visible:ring-ring/50 relative block w-fit rounded-xl outline-none focus-visible:ring-3"
		>
			<span className="sr-only">{label} (opens in a new tab)</span>

			{/* Cover */}
			<img
				alt=""
				src={cover}
				className="relative z-20 size-50 rounded-[inherit] outline-[1px] -outline-offset-1 outline-black/15 brightness-90 select-none dark:outline-white/15"
				draggable="false"
				loading={loading}
			/>

			<div
				aria-hidden="true"
				className="absolute top-0 left-0 z-10 size-50 translate-x-2/3 animate-[spin_6s_linear_infinite] will-change-transform motion-reduce:animate-none"
				style={{
					animationPlayState: playing ? "running" : "paused",
				}}
			>
				{/* Disk */}
				<img
					alt=""
					src={vinyl}
					className="size-full scale-[1.25] select-none"
					draggable={false}
					loading={loading}
				/>

				{/* Cover as the label */}
				<div
					className="absolute aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-cover bg-center brightness-90"
					style={{
						left: "50%",
						top: "50%",
						width: "40%",
						backgroundImage: `url(${cover})`,
					}}
				/>
			</div>
		</a>
	);
}

type LyricWord = {
	text: string;
	start: number; // seconds
};

type LyricLine = {
	text: string; // full line, used when `words` is omitted and for screen readers
	start: number; // seconds
	end: number; // seconds
	words?: LyricWord[];
};

function useLyricPosition(
	lines: LyricLine[],
	duration: number,
	running: boolean
) {
	const [pos, setPos] = useState({ line: -1, word: -1 });
	const timeRef = useRef(0); // survives pauses, so playback resumes where it stopped

	useEffect(() => {
		if (!running || !duration) return;

		let frame = 0;
		let last = performance.now();

		const tick = (now: number) => {
			// clamp so a long gap (throttled tab) can't jump the song forward
			const delta = Math.min(now - last, 100) / 1000;
			last = now;
			timeRef.current = (timeRef.current + delta) % duration;
			const t = timeRef.current;

			let line = lines.findIndex((l) => t >= l.start && t < l.end);

			// loopDelay: hold the last line on screen until the loop restarts
			if (line === -1 && lines.length > 0 && t >= lines[lines.length - 1].end) {
				line = lines.length - 1;
			}

			let word = -1;
			if (line !== -1) {
				const words = lines[line].words;
				if (words) {
					for (let i = 0; i < words.length; i++) {
						if (words[i].start <= t) word = i;
					}
				}
			}

			// same values = no re-render, so React only updates on line/word changes
			setPos((prev) =>
				prev.line === line && prev.word === word ? prev : { line, word }
			);
			frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [running, lines, duration]);

	return pos;
}

type VinylLyricsProps = {
	lines: LyricLine[];
	loopDelay?: number; // blank seconds after the last line before it restarts
	playing?: boolean;
};

function VinylLyrics({
	lines,
	loopDelay = 1,
	playing = true,
}: VinylLyricsProps) {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref);
	const pageInView = usePageInView();

	const total = Math.max(0, ...lines.map((l) => l.end)) + loopDelay;
	const { line, word } = useLyricPosition(
		lines,
		total,
		playing && inView && pageInView
	);
	const active = lines[line];

	return (
		<MotionConfig reducedMotion="user">
			<section
				ref={ref}
				aria-label="Lyrics"
				className="grid h-50 items-center justify-items-start pr-6 pl-8"
			>
				<p className="sr-only">{lines.map((l) => l.text).join(" ")}</p>

				<AnimatePresence mode="wait">
					{active && (
						<motion.p
							key={line}
							aria-hidden="true"
							className="font-lyrics col-start-1 row-start-1 text-[1.35rem] leading-[1.2] font-bold tracking-tighter text-balance"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2, ease: "easeOut" }}
						>
							{active.words
								? active.words.map((w, i) => (
										<motion.span
											key={i}
											initial={false}
											animate={{ opacity: i <= word ? 1 : 0.3 }}
											transition={{ duration: 0.3, ease: "easeOut" }}
										>
											{w.text}{" "}
										</motion.span>
									))
								: active.text}
						</motion.p>
					)}
				</AnimatePresence>
			</section>
		</MotionConfig>
	);
}

type VinylPlayerProps = {
	lyrics?: boolean;
	lines?: LyricLine[];
	loopDelay?: number;
	spotifyLogo?: boolean;
};

function VinylPlayer({
	lyrics = true,
	lines,
	loopDelay,
	playing = true,
	spotifyLogo = true,
	...props
}: VinylCoverProps & VinylPlayerProps) {
	return (
		<div className="relative grid max-md:justify-items-center md:grid-cols-2">
			<div className="translate-x-0 max-md:-translate-x-1/4 max-md:pt-8">
				<VinylCover playing={playing} {...props} />
			</div>
			{lyrics && lines && (
				<VinylLyrics lines={lines} loopDelay={loopDelay} playing={playing} />
			)}
			{spotifyLogo && (
				<SpotifyIcon className="absolute right-0 bottom-0 size-5" />
			)}
		</div>
	);
}

export type { LyricLine, LyricWord };
export { VinylCover, VinylLyrics, VinylPlayer };
