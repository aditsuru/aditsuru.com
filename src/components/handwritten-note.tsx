import { cn } from "@/lib/utils";

function HandwrittenNote({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="handwritten-note"
			className={cn(
				"font-handwritten text-xl/none text-muted-foreground pointer-events-none absolute tracking-normal select-none",
				className
			)}
			{...props}
		/>
	);
}

function HandwrittenArrow({
	className,
	...props
}: React.ComponentProps<"svg">) {
	return (
		<svg
			className={cn("text-muted-foreground size-8 shrink-0", className)}
			viewBox="0 0 40 40"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
			{...props}
		>
			<path d="M34 4c1 15-5 26-21 30" />
			<path d="m22 37-9-3 7.5-8" />
		</svg>
	);
}

export { HandwrittenArrow, HandwrittenNote };
