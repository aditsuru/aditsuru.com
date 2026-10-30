import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const fontHandwritten = Caveat({
	weight: ["400", "500"],
	display: "swap",
	variable: "--font-handwritten",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://aditsuru.com"),

	title: {
		default: "Adi — Design Engineer & Full-Stack Developer",
		template: "%s | Aditsuru",
	},

	description:
		"I'm Adi, a self-taught design engineer and full-stack developer crafting thoughtful digital experiences with Next.js, TypeScript, PostgreSQL, GSAP, and Motion.",

	applicationName: "Aditsuru",

	authors: [
		{
			name: "Adi",
			url: "https://aditsuru.com",
		},
	],

	creator: "Adi",

	keywords: [
		"Adi",
		"Aditsuru",
		"Adi developer",
		"Aditsuru developer",
		"Design Engineer",
		"Full-Stack Developer",
		"Self-Taught Developer",
		"Frontend Developer",
		"Creative Developer",
		"Next.js Developer",
		"TypeScript Developer",
		"React Developer",
		"GSAP",
		"Motion",
		"PostgreSQL",
		"Web Development",
		"UI Engineering",
		"Interactive Web Experiences",
		"Web Animation",
	],

	alternates: {
		canonical: "/",
	},

	openGraph: {
		type: "website",
		locale: "en_IN",
		url: "https://aditsuru.com",
		siteName: "Aditsuru",
		title: "Adi — Design Engineer & Full-Stack Developer",
		description:
			"Building thoughtful digital experiences at the intersection of engineering and design. Explore my work, projects, and experiments.",
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: "Adi — Design Engineer & Full-Stack Developer",
			},
		],
	},

	twitter: {
		card: "summary_large_image",
		title: "Adi — Design Engineer & Full-Stack Developer",
		description:
			"Building thoughtful digital experiences at the intersection of engineering and design.",
		images: ["/og.png"],
		creator: "@aditsuru",
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},

	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},

	category: "technology",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn(
				"h-full",
				"antialiased",
				"font-sans",
				"dark",
				geistSans.variable,
				geistMono.variable,
				geist.variable,
				fontHandwritten.variable
			)}
			suppressHydrationWarning
		>
			<body>
				<Providers>
					<div className="relative isolate flex min-h-dvh flex-col">
						<Navbar />
						<main className="flex flex-1 flex-col overflow-x-clip px-2">
							<div className="mx-auto flex w-full flex-1 flex-col md:max-w-3xl">
								{children}
							</div>
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
