import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex w-full flex-1 items-center justify-center">
			<Link href="/" className="type-3 underline underline-offset-4">
				<span>Back to home</span>
			</Link>
		</div>
	);
}
