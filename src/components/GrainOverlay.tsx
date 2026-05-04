import { useEffect, useRef } from "react";

export function GrainOverlay() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const filter = svg.querySelector("feTurbulence") as SVGFETurbulenceElement;
    if (!filter) return;

    let frame = 0;
    let rafId: number;

    const animate = () => {
      frame++;
      if (frame % 3 === 0) {
        filter.setAttribute("seed", String(Math.floor(Math.random() * 1000)));
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
      style={{ mixBlendMode: "overlay", opacity: 0.4 }}
    >
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
