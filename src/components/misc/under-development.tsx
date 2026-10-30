import { Panel, StripeDivider } from "@/components/layout/grid";

export function UnderDevelopment({ children }: { children?: React.ReactNode }) {
	return (
		<>
			<StripeDivider />
			<Panel className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
				<h1 className="type-7">Portfolio under development</h1>
				<p className="type-3 text-muted-foreground">
					Something good is being built here. Check back soon.
				</p>
				{children}
			</Panel>
		</>
	);
}
