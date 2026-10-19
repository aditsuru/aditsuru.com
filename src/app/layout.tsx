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
	title: "Adi – Design Engineer",
	description: "Sample project's description.",
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
					<div className="relative isolate">
						<Navbar />
						<main className="overflow-x-clip px-2">
							<div className="mx-auto md:max-w-3xl">{children}</div>
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
