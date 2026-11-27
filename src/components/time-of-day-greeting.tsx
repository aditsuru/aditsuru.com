"use client";

import { useEffect, useState } from "react";

function getTimeOfDayGreeting(now: Date) {
	const hour = now.getHours();

	if (hour >= 5 && hour < 12) return "Good Morning";
	if (hour >= 12 && hour < 18) return "Good Afternoon";
	return "Good Evening";
}

function TimeOfDayGreeting({ ...props }: React.ComponentProps<"h2">) {
	const [greeting, setGreeting] = useState("Good Morning");
	useEffect(() => {
		setGreeting(getTimeOfDayGreeting(new Date()));
	}, []);
	return <h2 {...props}>{greeting}</h2>;
}

export { TimeOfDayGreeting };
