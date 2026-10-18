import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;

const getCdnPatterns = (): NonNullable<
	NextConfig["images"]
>["remotePatterns"] => {
	if (!cdnUrl) {
		console.warn("⚠️ NEXT_PUBLIC_CDN_URL is missing in production environment.");
		return [];
	}

	try {
		const parsedUrl = new URL(cdnUrl);
		return [
			{
				protocol: parsedUrl.protocol.replace(":", "") as "http" | "https",
				hostname: parsedUrl.hostname,
				port: parsedUrl.port || "",
				pathname: "/**",
			},
		];
	} catch {
		console.warn(
			"⚠️ Invalid NEXT_PUBLIC_CDN_URL provided. Images may not load."
		);
		return [];
	}
};

const nextConfig: NextConfig = {
	images: {
		unoptimized: isDev,
		remotePatterns: isDev ? [] : getCdnPatterns(),
	},
};

export default nextConfig;
