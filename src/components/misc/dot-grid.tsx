"use client";

import { useEffect, useRef } from "react";

import {
	HandwrittenArrow,
	HandwrittenNote,
} from "@/components/misc/handwritten-note";
import { cn } from "@/lib/utils";

export function DotGrid({ className }: { className?: string }) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		let x = 0;
		let y = 0;
		let frame = 0;

		const paint = () => {
			frame = 0;
			const rect = el.getBoundingClientRect();
			el.style.setProperty("--x", `${x - rect.left}px`);
			el.style.setProperty("--y", `${y - rect.top}px`);
		};

		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(paint);
		};

		const onMove = (e: PointerEvent) => {
			if (e.pointerType !== "mouse") return;
			x = e.clientX;
			y = e.clientY;
			el.style.setProperty("--glow", "1");
			schedule();
		};

		const onLeave = () => el.style.setProperty("--glow", "0");

		window.addEventListener("pointermove", onMove, { passive: true });
		window.addEventListener("scroll", schedule, { passive: true });
		document.documentElement.addEventListener("pointerleave", onLeave);

		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("scroll", schedule);
			document.documentElement.removeEventListener("pointerleave", onLeave);
			if (frame) cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<div className={cn("relative h-32 w-full border-x border-line", className)}>
			<div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden">
				<div className="dot-grid absolute inset-0" />
				<div className="dot-grid-lit absolute inset-0" />
			</div>

			<HandwrittenNote className="top-3 left-full ml-4 hidden w-24 flex-col items-start lg:flex">
				<HandwrittenArrow className="size-7 -scale-y-100 -rotate-6" />
				<span className="-rotate-6">move your cursor</span>
			</HandwrittenNote>
		</div>
	);
}
