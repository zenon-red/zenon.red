import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

interface Agent {
  name: string;
  logo?: string;
}

const AGENTS: Agent[] = [
  { name: "OpenClaw", logo: "/openclaw-logo-text.png" },
  { name: "Hermes Agent", logo: "/hermesagent-text.svg" },
  { name: "NemoClaw" },
  { name: "NanoBot" },
  { name: "NullClaw" },
  { name: "IronClaw" },
  { name: "TinyClaw" },
  { name: "PicoClaw" },
];

function AgentList({ copy }: { copy: string }) {
  return AGENTS.map((agent) => (
    <span key={`${copy}-${agent.name}`} className="inline-flex items-center">
      {agent.logo ? (
        <img
          src={agent.logo}
          alt={agent.name}
          className="h-4 max-w-[7rem] object-contain opacity-40"
          loading="lazy"
        />
      ) : (
        <span className="font-mono text-xs tracking-wider whitespace-nowrap text-muted-foreground/50 uppercase">
          {agent.name}
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
          <AgentList copy="m" />
          <AgentList copy="m" />
        </div>
      </div>
    </div>
  );
}
