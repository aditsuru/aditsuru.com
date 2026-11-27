"use client";

import type { Transition, Variants } from "motion/react";
import {
	motion,
	useInView,
	useMotionValue,
	useReducedMotion,
	useSpring,
	useTransform,
} from "motion/react";
import { useEffect, useId, useRef } from "react";
import { useSound } from "@/hooks/soundcn/use-sound";
import { metalClickSound } from "@/lib/soundcn/metal-click";

const transition: Transition = {
	type: "spring",
	mass: 0.5,
	damping: 18,
	stiffness: 200,
};

/** Angle of the receding edges, measured from horizontal. 30 = isometric, 45 = oblique. */
const ANGLE = 30;

/** How tall each slab is, and how far a press sinks its top face. */
const THICK = 24;
const PRESS = 12;

/** Margin inside the viewBox so 1px strokes aren't clipped. */
const PAD = 1;

type P = [number, number];

/**
 * Top face of every slab, in grid units (one grid unit = one step along a
 * receding edge when ANGLE is 45). The slab list is in paint order, back to front.
 * Corners go around the parallelogram, in order.
 */
const GRID: P[][] = [
	[
		[96, 217],
		[128, 185],
		[256, 313],
		[224, 345],
	],
	[
		[64, 185],
		[96, 217],
		[32, 281],
		[0, 249],
	],
	[
		[126, 247],
		[158, 279],
		[94, 343],
		[62, 311],
	],
	[
		[0, 313],
		[32, 281],
		[160, 409],
		[128, 441],
	],
	[
		[120, 129],
		[248, 1],
		[280, 33],
		[152, 161],
	],
	[
		[200, 113],
		[232, 81],
		[360, 209],
		[328, 241],
	],
];

/** Stretch that turns grid units into the chosen angle: 45deg -> 1, 30deg -> 1.732. */
const K = 1 / Math.tan((ANGLE * Math.PI) / 180);

const project = ([x, y]: P): P => [x * K + PAD, y + PAD];
const n = (v: number) => +v.toFixed(2);
const pt = ([x, y]: P) => `${n(x)} ${n(y)}`;
const poly = (pts: P[]) => `M${pts.map(pt).join(" L")} Z`;

type Interval = [number, number];

/**
 * Parts of the top-face edge a -> b of slab i that are NOT shared with another
 * slab's top face. Where two slabs meet flush on the surface, that stretch of
 * edge is a seam, not a real edge, so it doesn't get a line.
 * Returns pieces as fractions along the edge: [[0, 1]] means the whole edge.
 */
function exposedEdge(i: number, a: number, b: number): Interval[] {
	const A = GRID[i][a];
	const B = GRID[i][b];
	const d: P = [B[0] - A[0], B[1] - A[1]];
	const len2 = d[0] * d[0] + d[1] * d[1];
	const along = (p: P) => ((p[0] - A[0]) * d[0] + (p[1] - A[1]) * d[1]) / len2;
	const onLine = (p: P) => d[0] * (p[1] - A[1]) - d[1] * (p[0] - A[0]) === 0;

	const shared: Interval[] = [];
	GRID.forEach((other, j) => {
		if (j === i) return;
		other.forEach((c, m) => {
			const e = other[(m + 1) % 4];
			if (!onLine(c) || !onLine(e)) return;
			const lo = Math.max(0, Math.min(along(c), along(e)));
			const hi = Math.min(1, Math.max(along(c), along(e)));
			if (hi - lo > 1e-9) shared.push([lo, hi]);
		});
	});

	shared.sort((x, y) => x[0] - y[0]);
	const exposed: Interval[] = [];
	let at = 0;
	for (const [lo, hi] of shared) {
		if (lo > at) exposed.push([at, lo]);
		at = Math.max(at, hi);
	}
	if (at < 1) exposed.push([at, 1]);
	return exposed;
}

/**
 * True when corner k of slab i lands in the middle of another slab's top edge,
 * i.e. the two slabs are joined there. The vertical edge that would hang from
 * that corner is part of one continuous wall, so it isn't drawn.
 */
function isJoint(i: number, k: number): boolean {
	const v = GRID[i][k];
	return GRID.some(
		(other, j) =>
			j !== i &&
			other.some((c, m) => {
				const e = other[(m + 1) % 4];
				const d: P = [e[0] - c[0], e[1] - c[1]];
				if (d[0] * (v[1] - c[1]) - d[1] * (v[0] - c[0]) !== 0) return false;
				const t =
					((v[0] - c[0]) * d[0] + (v[1] - c[1]) * d[1]) /
					(d[0] * d[0] + d[1] * d[1]);
				return t > 0 && t < 1;
			})
	);
}

const lerp = (p: P, q: P, t: number): P => [
	p[0] + (q[0] - p[0]) * t,
	p[1] + (q[1] - p[1]) * t,
];

/** Draws p -> q as one line per exposed piece. */
const edge = (p: P, q: P, pieces: Interval[] = [[0, 1]]) =>
	pieces
		.map(([s, e]) => `M${pt(lerp(p, q, s))} L${pt(lerp(p, q, e))}`)
		.join(" ");

/**
 * Builds one slab at a given height. Normal and pressed come from the same
 * function, so their path commands always match and Motion can morph them.
 *
 * - fill:   outline of top face + both visible walls (painted in the page colour
 *           so it hides whatever is behind)
 * - stroke: every visible edge, as separate lines, minus the stretches of the
 *           top face that butt up against another slab
 */
function buildSlab(i: number, top: P[], drop: number, thick: number) {
	const T = top.map(([x, y]): P => [x, y + drop]);
	const B = T.map(([x, y]): P => [x, y + thick]);

	// nearest (lowest on screen) corner of the top face
	const f = T.reduce((best, p, k) => (p[1] > T[best][1] ? k : best), 0);
	const at = (k: number) => (f + k) % 4;

	const hull: P[] = [T[at(1)], T[at(2)], T[at(3)], B[at(3)], B[f], B[at(1)]];

	return {
		fill: poly(hull),
		stroke: [
			edge(T[at(1)], T[at(2)], exposedEdge(i, at(1), at(2))),
			edge(T[at(2)], T[at(3)], exposedEdge(i, at(2), at(3))),
			isJoint(i, at(3)) ? "" : edge(T[at(3)], B[at(3)]),
			edge(B[at(3)], B[f]),
			edge(B[f], B[at(1)]),
			isJoint(i, at(1)) ? "" : edge(B[at(1)], T[at(1)]),
			edge(T[f], T[at(1)], exposedEdge(i, f, at(1))),
			edge(T[f], T[at(3)], exposedEdge(i, f, at(3))),
			isJoint(i, f) ? "" : edge(T[f], B[f]),
		]
			.filter(Boolean)
			.join(" "),
		front: B[f],
	};
}

const SLABS = GRID.map((grid, i) => {
	const top = grid.map(project);
	const normal = buildSlab(i, top, 0, THICK);
	const pressed = buildSlab(i, top, PRESS, THICK - PRESS);
	return {
		face: poly(top),
		fill: { normal: normal.fill, pressed: pressed.fill },
		stroke: { normal: normal.stroke, pressed: pressed.stroke },
		front: normal.front,
	};
});

/** viewBox size, derived from the slabs so the spotlight and guides follow any change. */
const W = Math.ceil(Math.max(...GRID.flat().map((p) => project(p)[0])) + PAD);
const H = Math.ceil(Math.max(...SLABS.map((s) => s.front[1])) + PAD);

/** Lowest corner of the whole mark. */
const LOWEST = SLABS.reduce((a, s) => (s.front[1] > a.front[1] ? s : a)).front;

/** Bottom of the left corner of the T's top slab (slab 4 in GRID). */
const T_LEFT = project(GRID[4][0]);
const T_LEFT_BOTTOM: P = [T_LEFT[0], T_LEFT[1] + THICK];

/** Dashed guide lines: a point and an angle in degrees (0 = horizontal, positive = down-right). */
const GUIDES: { x: number; y: number; angle: number }[] = [
	{ x: LOWEST[0], y: LOWEST[1], angle: -ANGLE }, // the base
	{ x: LOWEST[0], y: LOWEST[1], angle: ANGLE }, // runs along the left leg
	{ x: T_LEFT_BOTTOM[0], y: T_LEFT_BOTTOM[1], angle: ANGLE }, // runs along the bottom of the T's top slab, left end
];

/** How far the guide lines run past the mark. Clip them with `overflow-clip` on a parent. */
const REACH = 1500;

const slabVariants = (normal: string, pressed: string): Variants => ({
	normal: { d: normal },
	pressed: { d: pressed },
});

const faceVariants: Variants = {
	normal: { y: 0 },
	pressed: { y: PRESS },
};

export type SpotlightLogoProps = {
	className?: string;
	/** Called after each press, alongside the click sound. */
	onPress?: () => void;
};

/**
 * An isometric mark whose outline is traced by a gradient highlight that
 * follows the cursor, with a springy press and a tactile click sound.
 *
 * Put it inside a parent with `overflow-clip` so the guide lines stop at the
 * parent's edge instead of extending the page.
 */
export function SpotlightLogo({ className, onPress }: SpotlightLogoProps) {
	const id = useId().replace(/:/g, "");
	const ids = {
		facePattern: `spotlight-logo-face-pattern-${id}`,
		stroke: (i: number) => `spotlight-logo-stroke-${id}-${i}`,
		radialGradient: `spotlight-logo-radial-gradient-${id}`,
	};

	const ref = useRef<SVGSVGElement>(null);

	const [play] = useSound(metalClickSound);

	const shouldReduceMotion = useReducedMotion();
	const isInView = useInView(ref, { margin: "80px" });

	const mouseX = useMotionValue(0.5);
	const mouseY = useMotionValue(0.5);

	const cx = useSpring(useTransform(mouseX, [0, 1], [0, W]), {
		stiffness: 300,
		damping: 30,
		mass: 0.1,
	});

	const cy = useSpring(useTransform(mouseY, [0, 1], [0, H]), {
		stiffness: 300,
		damping: 30,
		mass: 0.1,
	});

	useEffect(() => {
		if (shouldReduceMotion || !isInView) {
			return;
		}

		if (window.matchMedia("(hover: none)").matches) {
			return;
		}

		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX / window.innerWidth);
			mouseY.set(e.clientY / window.innerHeight);
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [shouldReduceMotion, isInView, mouseX, mouseY]);

	return (
		<motion.svg
			ref={ref}
			className={[
				"h-full w-auto touch-manipulation overflow-visible",
				"[--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))]",
				"[--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]",
				className,
			]
				.filter(Boolean)
				.join(" ")}
			viewBox={`0 0 ${W} ${H}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden
			initial="normal"
			whileTap="pressed"
			onTap={() => {
				play();
				onPress?.();
			}}
		>
			<defs>
				<pattern
					id={ids.facePattern}
					x="0"
					y="0"
					width="10"
					height="10"
					patternUnits="userSpaceOnUse"
				>
					<path
						d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
						stroke="var(--pattern)"
						strokeWidth="1"
					/>
				</pattern>

				{SLABS.map((slab, i) => (
					<motion.path
						key={JSON.stringify(slab)}
						id={ids.stroke(i)}
						variants={slabVariants(slab.stroke.normal, slab.stroke.pressed)}
						transition={transition}
					/>
				))}

				<motion.radialGradient
					id={ids.radialGradient}
					cx={cx}
					cy={cy}
					r="200"
					gradientUnits="userSpaceOnUse"
				>
					<stop
						className="dark:[stop-color:#fff]"
						stopColor="var(--color-zinc-700)"
					/>
					<stop
						className="dark:[stop-color:var(--color-zinc-600)]"
						offset="1"
						stopColor="var(--color-zinc-400)"
						stopOpacity="0"
					/>
				</motion.radialGradient>
			</defs>

			{/* Guide lines. Drawn first so the slabs' fills hide them. */}
			<g
				stroke="var(--stroke)"
				strokeWidth="1"
				strokeDasharray="4 4"
				pointerEvents="none"
			>
				{GUIDES.map(({ x, y, angle }) => {
					const dx = Math.cos((angle * Math.PI) / 180) * REACH;
					const dy = Math.sin((angle * Math.PI) / 180) * REACH;
					return (
						<line
							key={JSON.stringify({ x, y, angle })}
							x1={x - dx}
							y1={y - dy}
							x2={x + dx}
							y2={y + dy}
							vectorEffect="non-scaling-stroke"
						/>
					);
				})}
			</g>

			{/* Per slab: silhouette fill, hatched top face, outline, spotlight. */}
			{SLABS.map((slab, i) => (
				<g key={JSON.stringify(slab)}>
					<motion.path
						className="fill-background"
						variants={slabVariants(slab.fill.normal, slab.fill.pressed)}
						transition={transition}
					/>
					<motion.path
						d={slab.face}
						fill={`url(#${ids.facePattern})`}
						variants={faceVariants}
						transition={transition}
					/>
					<use
						href={`#${ids.stroke(i)}`}
						stroke="var(--stroke)"
						strokeWidth="1"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<use
						href={`#${ids.stroke(i)}`}
						stroke={`url(#${ids.radialGradient})`}
						strokeWidth="1"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
			))}
		</motion.svg>
	);
}
