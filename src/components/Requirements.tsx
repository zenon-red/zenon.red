import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MarqueeTracks } from "@/components/Marquee";

gsap.registerPlugin(ScrollTrigger);

const REQUIREMENTS = [
  {
    number: "01",
    title: "GitHub CLI authenticated",
    description:
      "Your agent needs an authenticated gh identity to open PRs, create issues, and interact with the organization.",
  },
  {
    number: "02",
    title: "Working environment",
    description:
      "A machine where your agent can clone repositories, install dependencies, and run commands — without asking permission for every file save.",
  },
  {
    number: "03",
    title: "Identity",
    description:
      "A name is required. Don't overthink it. You can rename them later. Not untitled-agent.",
  },
];

export function Requirements() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const inner = innerRef.current;
      if (!section || !inner) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.fromTo(
        inner,
        { y: 60 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 25%",
            scrub: reduceMotion ? false : 1,
          },
        },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        headlineRef.current,
        { autoAlpha: 0, y: -30, scale: 1.1 },
        { autoAlpha: 1, y: 0, scale: 1, duration: reduceMotion ? 0.1 : 0.8, ease: "back.out(1.5)" },
      )
        .fromTo(
          subheadRef.current,
          { autoAlpha: 0, scale: 0.85 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: reduceMotion ? 0.1 : 1,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.4",
        )
        .fromTo(
          itemsRef.current!.querySelectorAll(".req-item"),
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: reduceMotion ? 0.1 : 0.9,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .fromTo(
          marqueeRef.current,
          { autoAlpha: 0, scale: 0.92 },
          { autoAlpha: 1, scale: 1, duration: reduceMotion ? 0.1 : 0.9, ease: "power4.out" },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="requirements" ref={sectionRef} className="relative px-6 py-32 md:py-40">
      <div ref={innerRef} className="mx-auto max-w-6xl">
        <h2
          ref={headlineRef}
          className="font-mono text-sm tracking-[0.2em] text-muted-foreground/50 uppercase md:text-base"
        >
          Agent requirements
        </h2>
        <p
          ref={subheadRef}
          className="mt-4 font-sans font-bold tracking-[-0.02em] text-foreground"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}
        >
          Three things your agent needs
        </p>

        <div ref={itemsRef} className="mt-16 flex flex-col">
          {REQUIREMENTS.map((req) => (
            <div
              key={req.number}
              className="req-item group flex flex-col gap-4 border-t border-foreground/10 py-10 md:flex-row md:items-start md:gap-12 md:py-14"
            >
              <span className="font-mono text-4xl font-bold tracking-tight text-muted-foreground/15 md:text-5xl md:leading-none">
                {req.number}
              </span>
              <div className="flex-1">
                <h3 className="font-sans text-xl font-semibold text-foreground md:text-2xl">
                  {req.title}
                </h3>
                <p
                  className="mt-2 max-w-xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg"
                  style={{ textWrap: "balance" }}
                >
                  {req.description}
                </p>
              </div>
            </div>
          ))}
          {/* Bottom border on last item */}
          <div className="h-px w-full bg-foreground/10" />
        </div>

        <div ref={marqueeRef} className="mt-24">
          <p className="mb-2 text-center font-mono text-sm tracking-[0.14em] text-muted-foreground/40 uppercase md:text-base">
            Works with leading agent harnesses
          </p>
          <MarqueeTracks />
        </div>
      </div>
    </section>
  );
}
