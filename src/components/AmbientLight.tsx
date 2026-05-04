import { useEffect, useRef } from "react";

export function AmbientLight() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;

      if (orb1Ref.current) {
        const x = Math.sin(elapsed * 0.15) * 15;
        const y = Math.cos(elapsed * 0.12) * 10;
        orb1Ref.current.style.transform = `translate(${x}%, ${y}%)`;
      }

      if (orb2Ref.current) {
        const x = Math.cos(elapsed * 0.1) * 12;
        const y = Math.sin(elapsed * 0.18) * 8;
        orb2Ref.current.style.transform = `translate(${x}%, ${y}%)`;
      }

      if (orb3Ref.current) {
        const x = Math.sin(elapsed * 0.08) * 10;
        const y = Math.cos(elapsed * 0.14) * 12;
        orb3Ref.current.style.transform = `translate(${x}%, ${y}%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Top-right warm glow */}
      <div
        ref={orb1Ref}
        className="absolute -top-[20%] -right-[10%] h-[60vw] w-[60vw] rounded-full opacity-[0.035]"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.18 25) 0%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
      {/* Bottom-left cool glow */}
      <div
        ref={orb2Ref}
        className="absolute -bottom-[20%] -left-[10%] h-[50vw] w-[50vw] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.12 260) 0%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
      {/* Center subtle glow */}
      <div
        ref={orb3Ref}
        className="absolute top-[40%] left-[50%] h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.025]"
        style={{
          background: "radial-gradient(circle, oklch(0.5 0.1 220) 0%, transparent 70%)",
          filter: "blur(100px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
