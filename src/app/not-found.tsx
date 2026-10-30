import Link from "next/link";

import { UnderDevelopment } from "@/components/misc/under-development";

export default function NotFound() {
	return (
		<UnderDevelopment>
			<Link href="/" className="type-2 underline underline-offset-4">
				Back to home
			</Link>
		</UnderDevelopment>
	);
}
