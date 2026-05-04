import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Zoe() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const inner = innerRef.current;
      const content = contentRef.current;
      const imageContainer = imageContainerRef.current;
      const image = imageRef.current;
      if (!section || !inner || !content || !imageContainer || !image) return;

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

      gsap.fromTo(
        imageContainer,
        {
          autoAlpha: 0,
          clipPath: "inset(100% 0% 0% 0%)",
        },
        {
          autoAlpha: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: reduceMotion ? 0.1 : 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        image,
        { scale: 1.3 },
        {
          scale: 1,
          duration: reduceMotion ? 0.1 : 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      );

      const elements = content.querySelectorAll(".zoe-element");
      gsap.fromTo(
        elements,
        {
          autoAlpha: 0,
          x: -50,
          skewX: 2,
        },
        {
          autoAlpha: 1,
          x: 0,
          skewX: 0,
          duration: reduceMotion ? 0.1 : 0.9,
          stagger: { each: 0.12, from: "start" },
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        },
      );

      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: reduceMotion ? 0.1 : 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section ref={sectionRef} id="zoe" className="relative px-6 py-32 md:py-48">
      <div ref={innerRef} className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div ref={contentRef}>
            <p className="zoe-element mb-4 font-mono text-sm tracking-[0.18em] text-muted-foreground/50 uppercase md:text-base">
              Maintainer Team
            </p>

            <h2
              className="zoe-element font-sans font-bold tracking-[-0.03em] text-foreground"
              style={{ fontSize: "clamp(3rem, 6vw, 7rem)", lineHeight: 1.05 }}
            >
              ZŌE
            </h2>

            <p
              className="zoe-element mt-6 max-w-md font-sans text-lg leading-relaxed text-muted-foreground md:text-xl"
              style={{ textWrap: "balance" }}
            >
              Autonomous maintenance of the organization by a team of agents. Earn ZŌE&apos;s
              respect to be promoted as a maintainer.
            </p>

            <a
              href="https://github.com/zr-zoe"
              target="_blank"
              rel="noopener noreferrer"
              className="zoe-element mt-8 inline-flex items-center gap-2 font-mono text-sm tracking-widest text-foreground uppercase transition-colors duration-200 hover:text-primary"
            >
              <Github className="h-3.5 w-3.5" />
              github.com/zr-zoe
              <ExternalLink className="h-3 w-3 opacity-50" />
            </a>
          </div>

          <div
            className="relative flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Glow behind image */}
            <div
              ref={glowRef}
              className="pointer-events-none absolute inset-0 opacity-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.72 0.015 255 / 0.12) 0%, transparent 60%)",
                transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
                transition: "transform 0.3s ease-out",
              }}
            />

            <div
              ref={imageContainerRef}
              className="relative overflow-hidden rounded-2xl border border-foreground/5 bg-surface/30"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 0.3}deg) rotateX(${mousePos.y * -0.3}deg)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <img
                ref={imageRef}
                src="/zoe_praying.png"
                alt="ZŌE"
                className="h-auto max-h-[400px] w-auto object-contain md:max-h-[500px]"
              />
              {/* Subtle overlay gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
