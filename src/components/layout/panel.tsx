import { mergeProps, useRender } from "@base-ui/react";
import { cn } from "@/lib/utils";

function Panel({ className, ...props }: React.ComponentProps<"section">) {
	return (
		<section
			className={cn("screen-line-top screen-line-bottom", className)}
			{...props}
		/>
	);
}

function PanelTitle({
	className,
	render,
	...props
}: useRender.ComponentProps<"span">) {
	return useRender({
		defaultTagName: "span",
		render,
		props: mergeProps<"span">(
			{
				className: cn("type-6 screen-line-bottom px-4", className),
			},
			props
		),
		state: {
			slot: "panel-title",
		},
	});
}

function PanelContent({
	className,
	...props
}: React.ComponentProps<"section">) {
	return <section className={cn("p-2 px-4", className)} {...props} />;
}

function PanelStripeDivider({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div aria-hidden className={cn("stripe-divider", className)} {...props} />
	);
}

function PanelDivider({ className, ...props }: React.ComponentProps<"div">) {
	return <div aria-hidden className={cn("h-8 w-full", className)} {...props} />;
}

export { Panel, PanelContent, PanelDivider, PanelStripeDivider, PanelTitle };
