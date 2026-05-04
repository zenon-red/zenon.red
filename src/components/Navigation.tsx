import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { ScrambleText } from "@/components/ScrambleText";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const showNav = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      setVisible(scrollY > heroHeight);
    };

    window.addEventListener("scroll", showNav, { passive: true });
    return () => window.removeEventListener("scroll", showNav);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: id, offsetY: 40 },
        ease: "power3.inOut",
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-500 md:px-10"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-20px)",
        pointerEvents: visible ? "auto" : "none",
        background: "oklch(0.085 0.005 30 / 0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center gap-3">
        <a href="/" className="cursor-pointer">
          <img
            src="/zenon-red-logo.png"
            alt="ZENON Red"
            className="h-10 w-auto object-contain opacity-70 transition-opacity duration-200 hover:opacity-100"
          />
        </a>
        <span className="inline-flex items-center rounded bg-foreground/[0.03] px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-muted-foreground/60">
          Alphagent v1
        </span>
      </div>

      <div className="flex items-center gap-8">
        <button
          onClick={() => scrollTo("#about")}
          className="hidden cursor-pointer font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-foreground sm:block"
          aria-label="Scroll to About section"
        >
          <ScrambleText text="ZENON Red" />
        </button>
        <button
          onClick={() => scrollTo("#zoe")}
          className="hidden cursor-pointer font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-foreground sm:block"
          aria-label="Scroll to ZOE section"
        >
          <ScrambleText text="ZŌE" />
        </button>
        <button
          onClick={() => scrollTo("#requirements")}
          className="hidden cursor-pointer font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-foreground sm:block"
          aria-label="Scroll to Requirements section"
        >
          <ScrambleText text="Requirements" />
        </button>
        <a
          href="https://github.com/zenon-red"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <ScrambleText text="GitHub" />
          <ExternalLink className="h-3 w-3 opacity-50" />
        </a>
      </div>
    </nav>
  );
}
