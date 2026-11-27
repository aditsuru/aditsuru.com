import { Suspense } from "react";
import { TimeOfDayGreeting } from "@/components/time-of-day-greeting";
import { type ActiveSeasonId, getCurrentSeason } from "@/lib/get-active-season";
import { cn } from "@/lib/utils";

type FestivalGreeting = {
	lead: string;
	highlight: string;
	gradient: string;
};

const FESTIVAL_GREETINGS: Partial<Record<ActiveSeasonId, FestivalGreeting>> = {
	holi: {
		lead: "Happy",
		highlight: "Holi",
		gradient:
			"from-[#f472b6] to-[#831843] dark:from-[#fbcfe8] dark:to-[#ec4899]",
	},
	diwali: {
		lead: "Happy",
		highlight: "Diwali",
		gradient:
			"from-[#ffb347] to-[#9b1c1c] dark:from-[#fde68a] dark:to-[#f97316]",
	},
	christmas: {
		lead: "Merry",
		highlight: "Christmas",
		gradient:
			"from-[#ff6b6b] to-[#7a0c1e] dark:from-[#ffb3b8] dark:to-[#e5384f]",
	},
	halloween: {
		lead: "Happy",
		highlight: "Halloween",
		gradient:
			"from-[#f68c41] to-[#1f2328] dark:from-[#e3d04f] dark:to-[#c46212]",
	},
};

async function Greeting({ className, ...props }: React.ComponentProps<"h2">) {
	const season = await getCurrentSeason();
	const festival = FESTIVAL_GREETINGS[season.id];

	if (!festival) {
		return <TimeOfDayGreeting className={className} {...props} />;
	}

	return (
		<h2 className={className} {...props}>
			{festival.lead}{" "}
			<span
				className={cn(
					"bg-linear-to-r bg-clip-text text-transparent",
					festival.gradient
				)}
			>
				{festival.highlight}
			</span>
		</h2>
	);
}

function GreeterFallback({ className, ...props }: React.ComponentProps<"h2">) {
	return (
		<h2
			className={cn(className, "relative overflow-hidden")}
			aria-hidden
			{...props}
		>
			{/* Invisible copy of the heading: reserves the real height, no matter the breakpoint. */}
			<span className={"invisible"}>Good Afternoon</span>

			<span className="animate-shimmer via-foreground/10 absolute inset-0 bg-linear-to-r from-transparent to-transparent" />
		</h2>
	);
}

export function Greeter({ ...props }: React.ComponentProps<"h2">) {
	return (
		<Suspense fallback={<GreeterFallback {...props} />}>
			<Greeting {...props} />
		</Suspense>
	);
}
