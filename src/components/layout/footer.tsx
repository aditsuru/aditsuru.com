import { SOURCE_CODE_GITHUB_URL } from "@/data/site";
import { SOCIAL } from "@/data/social-links";
import type { BuildInfo } from "@/lib/build-info";
import { getBuildInfo, getStack } from "@/lib/build-info";
import { cn } from "@/lib/utils";

// Imported here rather than through `@/config/site`, which client components
// pull in, to keep the manifest out of client bundles.
import packageJson from "../../../package.json";

const OPENPANEL_URL =
	"https://openpanel.dev?utm_source=aditsuru.com&utm_medium=referral&utm_campaign=footer";

// Not derived from `SITE_INFO.url`: that follows `NEXT_PUBLIC_APP_URL` and
// would read `localhost` in dev.
const SITE_TITLE = "aditsuru.com";

const SITE_SUBTITLE = packageJson.description;

const SITE_VERSION = packageJson.version;

export function Footer() {
	const xLink = SOCIAL.twitter;
	const githubLink = SOCIAL.github;
	const linkedinLink = SOCIAL.linkedin;

	const build = getBuildInfo();
	const stack = getStack();

	return (
		<footer className="screen-line-bottom max-w-screen overflow-x-clip px-2">
			<div className="border-x-line mx-auto border-x group-has-data-[slot=layout-wide]/layout:container md:max-w-3xl">
				<div className="screen-line-top screen-line-bottom before:z-1">
					<div className="stripe-divider h-12" />
				</div>

				<div className="relative">
					<div className="screen-line-bottom flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-4 py-3">
						<span className="type-4">{SITE_TITLE}</span>
						<span className="text-muted-foreground text-sm">
							{SITE_SUBTITLE}
						</span>
					</div>

					<dl className="bg-line grid grid-cols-2 gap-px font-mono md:grid-cols-4">
						<Field label="Crafted by">
							<a
								className="link-underline"
								href={xLink.href}
								target="_blank"
								rel="noopener"
							>
								{xLink.handle}
							</a>
						</Field>

						<Field label="Build">
							<BuildValue build={build} />
						</Field>

						<Field label="Date">
							<time dateTime={build.date}>{build.date}</time>
						</Field>

						<Field label="Registry">0 items</Field>

						<Field label="Deployed on">
							<span className="font-sans" aria-hidden>
								▲
							</span>
							<span className="sr-only">Vercel</span>
						</Field>

						<Field label="Source code">
							<a
								className="link-underline"
								href={SOURCE_CODE_GITHUB_URL}
								target="_blank"
								rel="noopener"
							>
								GitHub
							</a>
						</Field>

						<Field label="Version">
							<span>{SITE_VERSION}</span>
						</Field>

						<Field label="Typeface">
							<a
								className="link-underline"
								href="https://vercel.com/font"
								target="_blank"
								rel="noopener"
							>
								Geist
							</a>
						</Field>

						<Field className="col-span-2" label="Stack">
							<ul className="flex flex-col gap-1">
								{stack.map(({ name, version }) => (
									<li key={name}>
										{name}@{version}
									</li>
								))}
							</ul>
						</Field>

						<Field label="Analytics">
							<a
								className="link-underline"
								href={OPENPANEL_URL}
								target="_blank"
								rel="noopener"
							>
								OpenPanel
							</a>
						</Field>

						<Field label="For agents">
							<ul className="flex flex-col gap-1">
								<li>
									<a
										className="link-underline"
										href="/llms.txt"
										target="_blank"
										rel="noopener"
									>
										llms.txt
									</a>
								</li>
								<li>
									<a
										className="link-underline"
										href="/index.md"
										target="_blank"
										rel="noopener"
									>
										index.md
									</a>
								</li>
							</ul>
						</Field>

						<Field className="col-span-2" label="Design and Components by">
							<a
								className="link-underline"
								href="https://x.com/iamncdai"
								target="_blank"
								rel="noopener"
							>
								@iamncdai
							</a>
						</Field>

						<Field label="Links">
							<ul className="flex flex-col gap-1">
								<li>
									<a
										className="link-underline"
										href={xLink.href}
										target="_blank"
										rel="noopener"
									>
										X
									</a>
								</li>
								<li>
									<a
										className="link-underline"
										href={githubLink.href}
										target="_blank"
										rel="noopener"
									>
										GitHub
									</a>
								</li>
								<li>
									<a
										className="link-underline"
										href={linkedinLink.href}
										target="_blank"
										rel="noopener"
									>
										LinkedIn
									</a>
								</li>
							</ul>
						</Field>

						<Field label="Approved by">
							<span>me lol</span>
						</Field>
					</dl>
				</div>
			</div>

			<div className="screen-line-top h-20" />
		</footer>
	);
}

function BuildValue({ build }: { build: BuildInfo }) {
	if (!build.commitShortSha) {
		return <span className="text-muted-foreground">unavailable</span>;
	}

	return (
		<>
			{build.commitUrl ? (
				<a
					className="link-underline"
					href={build.commitUrl}
					target="_blank"
					rel="noopener"
				>
					{build.commitShortSha}
				</a>
			) : (
				build.commitShortSha
			)}

			{build.environment !== "production" && (
				<span className="text-muted-foreground">
					{" "}
					({build.environment === "development" ? "local" : build.environment})
				</span>
			)}
		</>
	);
}

function Field({
	className,
	label,
	children,
}: {
	className?: string;
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div
			className={cn(
				"bg-background flex min-w-0 flex-col gap-1 px-4 py-3",
				className
			)}
		>
			<dt className="text-muted-foreground text-[0.625rem]/4 font-medium tracking-wider uppercase">
				{label}
			</dt>
			<dd className="flex-1 text-sm">{children}</dd>
		</div>
	);
}
