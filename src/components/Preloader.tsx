import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";

export function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    const preloader = preloaderRef.current;
    if (!preloader) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const minDisplayTime = 800;
    const startTime = performance.now();

    const hide = () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, minDisplayTime - elapsed);

      setTimeout(() => {
        gsap.to(preloader, {
          autoAlpha: 0,
          duration: reduceMotion ? 0.15 : 0.6,
          ease: "power2.inOut",
          onComplete: () => setHidden(true),
        });
      }, remaining);
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(hide);
    } else {
      hide();
    }
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Loading
        </span>
        <div className="h-px w-16 overflow-hidden bg-border">
          <div className="h-full w-full origin-left animate-load-bar bg-foreground" />
        </div>
      </div>
    </div>
  );
}
