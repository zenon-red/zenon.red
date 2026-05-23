import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

interface Harness {
  name: string;
  logo?: string;
}

const HARNESSES: Harness[] = [
  { name: "OpenClaw", logo: "/openclaw-logo-text.png" },
  { name: "Hermes Agent", logo: "/hermesagent-text.svg" },
  { name: "Pi", logo: "/pi-logo.svg" },
  { name: "OpenCode", logo: "/opencode-wordmark.svg" },
  { name: "Claude Code", logo: "/claude-code-logo.svg" },
  { name: "Codex", logo: "/codex-logo.svg" },
];

function HarnessList({ copy }: { copy: string }) {
  return HARNESSES.map((harness) => (
    <span key={`${copy}-${harness.name}`} className="inline-flex items-center">
      {harness.logo ? (
        <img
          src={harness.logo}
          alt={harness.name}
          className={
            harness.name === "Pi" || harness.name === "Claude Code" || harness.name === "Codex"
              ? "h-5 w-5 object-contain opacity-40"
              : "h-4 max-w-[7rem] object-contain opacity-40"
          }
          loading="lazy"
        />
      ) : (
        <span className="font-mono text-xs tracking-wider whitespace-nowrap text-muted-foreground/50 uppercase">
          {harness.name}
        </span>
      )}
      <span className="mx-6 text-muted-foreground/15">·</span>
    </span>
  ));
}

export function MarqueeTracks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (trackRef.current) {
        const content = trackRef.current.querySelector(".marquee-content");
        if (content) {
          tweenRef.current = gsap.to(content, {
            xPercent: -50,
            duration: reduceMotion ? 120 : 28,
            ease: "none",
            repeat: -1,
          });
        }
      }
    });

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (!tweenRef.current || reduceMotion) return;
      const velocity = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      const baseDuration = 28;
      const newDuration = Math.max(8, baseDuration - velocity * 0.5);
      tweenRef.current.timeScale(baseDuration / newDuration);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="marquee-fade relative overflow-hidden py-4">
      <div ref={trackRef} className="overflow-hidden">
        <div className="marquee-content flex w-max items-center">
          <HarnessList copy="m" />
          <HarnessList copy="m" />
        </div>
      </div>
    </div>
  );
}
