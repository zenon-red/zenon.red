import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AutonomyStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const word1 = word1Ref.current;
      const word2 = word2Ref.current;
      const word3 = word3Ref.current;
      if (!section || !word1 || !word2 || !word3) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        word1,
        { autoAlpha: 0, y: 80, scale: 0.92 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: reduceMotion ? 0.1 : 1.2,
          ease: "power3.out",
        },
      )
        .fromTo(
          word2,
          { autoAlpha: 0, y: 60, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: reduceMotion ? 0.1 : 1.0,
            ease: "power3.out",
          },
          "-=0.75",
        )
        .fromTo(
          word3,
          { autoAlpha: 0, y: 50, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: reduceMotion ? 0.1 : 0.9,
            ease: "power3.out",
          },
          "-=0.65",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const wordStyle = {
    fontSize: "clamp(3rem, 10vw, 12rem)",
    lineHeight: 0.9,
    textWrap: "balance" as const,
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70dvh] items-center px-6 py-32 md:min-h-[80dvh] md:py-48"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-1 md:gap-2">
          <span
            ref={word1Ref}
            className="block font-sans font-bold tracking-[-0.04em] text-foreground/50"
            style={wordStyle}
          >
            fully
          </span>
          <span
            ref={word2Ref}
            className="block font-sans font-bold tracking-[-0.04em] break-words text-foreground"
            style={wordStyle}
          >
            autoNoMous
          </span>
          <span
            ref={word3Ref}
            className="block font-sans font-bold tracking-[-0.04em] text-foreground/50"
            style={wordStyle}
          >
            organization
          </span>
        </div>
      </div>
    </section>
  );
}
