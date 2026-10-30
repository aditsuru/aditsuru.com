import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from "@/components/layout/grid";

const ABOUT = [
	"I'm Adi — a self-taught full-stack developer and design engineer with 2+ years of experience, comfortable working across the whole stack, from interface to database.",
	"On the front end I sweat the details: layout, motion, and the small interactions that make a site feel considered. On the back end I care about clean APIs, solid authentication, and systems that scale.",
	"I build with Next.js, TypeScript, and PostgreSQL, and bring interfaces to life with GSAP and Motion.",
];

export function About() {
	return (
		<Panel id="about">
			<PanelHeader>
				<PanelTitle>About</PanelTitle>
			</PanelHeader>
			<PanelContent>
				<ul className="list-disc space-y-4 ps-4 marker:text-muted-foreground">
					{ABOUT.map((text) => (
						<li key={text} className="type-3">
							{text}
						</li>
					))}
				</ul>
			</PanelContent>
		</Panel>
	);
}
