"use client";

import { ArrowUpRightIcon, DownloadIcon } from "lucide-react";
import Link from "next/link";
import { AditsuruMark, getMarkSVG } from "@/components/aditsuru-mark";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { toast } from "@/components/ui/toast";
import { BRAND_ASSETS_URL } from "@/content/user";

function BrandContextMenu() {
	const handleOpenInNewTab = () => {
		window.open("/", "_blank", "noopener,noreferrer");
	};

	const handleCopyMark = async () => {
		try {
			await navigator.clipboard.writeText(getMarkSVG());
			toast.add({
				title: "Mark as SVG copied",
				type: "success",
			});
		} catch (error) {
			console.error("Failed to copy SVG:", error);
		}
	};

	const handleDownloadAssets = () => {
		const link = document.createElement("a");
		link.href = BRAND_ASSETS_URL;
		link.download = "aditsuru-brand-assets.zip";
		document.body.appendChild(link);
		link.click();
		link.remove();
	};

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<Link href="/" aria-label="Home" className="flex shrink-0 items-center">
					<AditsuruMark className="text-foreground size-8" />
				</Link>
			</ContextMenuTrigger>
			<ContextMenuContent className="border-border min-w-48 border">
				<ContextMenuItem onClick={handleOpenInNewTab}>
					<ArrowUpRightIcon />
					Open Link In New Tab
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem onClick={handleCopyMark}>
					<AditsuruMark />
					Copy Mark as SVG
				</ContextMenuItem>
				<ContextMenuItem onClick={handleDownloadAssets}>
					<DownloadIcon />
					Download Brand Assets
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}

export { BrandContextMenu };
