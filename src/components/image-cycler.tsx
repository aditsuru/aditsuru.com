/** biome-ignore-all lint/a11y/useSemanticElements: required */
"use client";

import { Button } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import {
	Children,
	createContext,
	isValidElement,
	type ReactElement,
	useContext,
	useState,
} from "react";
import { cn } from "@/lib/utils";

const imageCyclerItemVariants = cva(
	"pointer-events-none absolute inset-0 h-full w-full rounded-[inherit] object-cover object-center outline-[1px] -outline-offset-1 outline-black/15 motion-reduce:transition-none dark:outline-white/15",
	{
		variants: {
			transition: {
				default:
					"opacity-0 transition-opacity duration-300 data-active:opacity-100",
				blur: "opacity-0 blur-md transition-[opacity,filter] duration-500 ease-out data-active:opacity-100 data-active:blur-none",
				zoom: "scale-110 opacity-0 transition-[opacity,scale] duration-700 ease-out data-active:scale-100 data-active:opacity-100",
				nudge:
					"translate-y-2 opacity-0 transition-[opacity,translate] duration-300 ease-out data-active:translate-y-0 data-active:opacity-100",
				morph:
					"scale-95 opacity-0 blur-xs brightness-110 transition-[opacity,scale,filter] duration-500 ease-in-out data-active:scale-100 data-active:opacity-100 data-active:blur-none data-active:brightness-100",
			},
		},
		defaultVariants: {
			transition: "default",
		},
	}
);

type ImageCyclerTransition = VariantProps<
	typeof imageCyclerItemVariants
>["transition"];

type ImageCyclerProps = {
	index?: number;
	defaultIndex?: number;
	onIndexChange?: (index: number) => void;
	buttonLabel?: string;
	ratio?: number;
	transition?: ImageCyclerTransition;
};

const ImageCyclerContext = createContext<{
	activeIndex: number;
	transition: ImageCyclerTransition;
} | null>(null);
const ItemIndexContext = createContext<null | number>(null);

function useImageCyclerContext() {
	const ctx = useContext(ImageCyclerContext);
	if (ctx === null)
		throw new Error("useImageCyclerContext must be used within <ImageCycler>");
	return ctx;
}

function useItemIndexContext() {
	const ctx = useContext(ItemIndexContext);
	if (ctx === null)
		throw new Error("useItemIndexContext must be used within <ImageCycler>");
	return ctx;
}

function ImageCycler({
	index,
	defaultIndex = 0,
	onIndexChange,
	buttonLabel,
	ratio = 16 / 9,
	className,
	children,
	transition = "default",
	...props
}: React.ComponentProps<"div"> & ImageCyclerProps) {
	const [internalIndex, setInternalIndex] = useState(defaultIndex);

	const isControlled = index !== undefined;
	const rawIndex = isControlled ? index : internalIndex;

	const items = Children.toArray(children).filter(isValidElement);
	const count = items.length;

	if (count === 0) {
		return null;
	}

	const activeIndex = Math.min(Math.max(rawIndex, 0), count - 1);
	const nextIndex = (activeIndex + 1) % count;

	const handleCycle = () => {
		if (!isControlled) {
			setInternalIndex(nextIndex);
		}

		onIndexChange?.(nextIndex);
	};

	return (
		<div
			role="group"
			aria-label="Images"
			data-index={activeIndex}
			data-slot="image-cycler"
			style={{ aspectRatio: ratio, ...props.style }}
			{...props}
			className={cn("rounded-xl", className)}
		>
			<Button
				type="button"
				onClick={handleCycle}
				className="focus-visible:border-ring focus-visible:ring-ring/50 block h-full w-full rounded-[inherit] outline-none select-none focus-visible:ring-3"
				aria-label={buttonLabel ?? "Next Image"}
			>
				<ImageCyclerContext value={{ activeIndex, transition }}>
					<span className="relative block h-full w-full rounded-[inherit]">
						{items.map((child, i) => (
							<ItemIndexContext
								key={(child as ReactElement).key ?? i}
								value={i}
							>
								{child}
							</ItemIndexContext>
						))}
					</span>
				</ImageCyclerContext>
			</Button>
			<span className="sr-only" aria-live="polite">
				Image ({activeIndex + 1} of {count})
			</span>
		</div>
	);
}

function ImageCyclerItem({
	alt,
	className,
	...props
}: React.ComponentProps<"img">) {
	const { activeIndex, transition } = useImageCyclerContext();
	const index = useItemIndexContext();

	const [isInitialActive] = useState(() => activeIndex === index);

	return (
		<img
			alt={alt}
			data-active={activeIndex === index}
			loading="lazy"
			decoding="async"
			fetchPriority={isInitialActive ? "auto" : "low"}
			{...props}
			className={cn(imageCyclerItemVariants({ transition }), className)}
		/>
	);
}

export { ImageCycler, ImageCyclerItem };
