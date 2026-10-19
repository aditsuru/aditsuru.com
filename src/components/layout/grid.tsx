import type * as React from "react";
import { cn } from "@/lib/utils";

function Panel({ className, ...props }: React.ComponentProps<"section">) {
	return (
		<section
			className={cn(
				"screen-line-top screen-line-bottom border-x border-line",
				className
			)}
			{...props}
		/>
	);
}

function PanelHeader({ className, ...props }: React.ComponentProps<"header">) {
	return (
		<header className={cn("screen-line-bottom px-4", className)} {...props} />
	);
}

function PanelTitle({
	as: Comp = "h2",
	className,
	...props
}: React.ComponentProps<"h2"> & { as?: "h2" | "div" }) {
	return <Comp className={cn("type-6", className)} {...props} />;
}

function PanelTitleSup({ className, ...props }: React.ComponentProps<"sup">) {
	return (
		<sup
			className={cn(
				"type-2 top-[-0.75em] ml-1 text-muted-foreground",
				className
			)}
			{...props}
		/>
	);
}

function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("p-4", className)} {...props} />;
}

function StripeDivider({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			aria-hidden
			className={cn("stripe-divider w-full border-x border-line", className)}
			{...props}
		/>
	);
}

export {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
	PanelTitleSup,
	StripeDivider,
};
