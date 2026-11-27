import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const MARK_PATH =
	"M0 160V32H32V0H96V32H128V160H96V32H32V160H0Z M32 96V64H96V96H32Z M160 32V0H288V32H160Z M208 160V32H240V160H208Z";

export function AditsuruMark({ className, ...props }: ComponentProps<"svg">) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="16 -48 256 256"
			shapeRendering="crispEdges"
			aria-hidden
			className={cn("overflow-visible", className)}
			{...props}
		>
			<path fill="currentColor" d={MARK_PATH} />
		</svg>
	);
}

export function getMarkSVG() {
	return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 288 160" shape-rendering="crispEdges"><path fill="currentColor" d="${MARK_PATH}"/></svg>`;
}
