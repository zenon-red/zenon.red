import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const headline = headlineRef.current;
      const rows = rowsRef.current;
      const bottomLine = bottomLineRef.current;
      if (!section) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (headline) {
        gsap.fromTo(
          headline,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: reduceMotion ? 0.1 : 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (rows) {
        const items = rows.querySelectorAll(".project-row");
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 60, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: reduceMotion ? 0.1 : 0.9,
            stagger: { each: 0.1, from: "start" },
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 68%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (bottomLine) {
        gsap.fromTo(
          bottomLine,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: reduceMotion ? 0.1 : 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative px-6 py-32 md:py-48">
      <div className="mx-auto max-w-5xl">
        <h2
          ref={headlineRef}
          className="font-mono text-sm tracking-[0.2em] text-muted-foreground/50 uppercase md:text-base"
        >
          Projects
        </h2>

        <div ref={rowsRef} className="mt-16 flex flex-col md:mt-20">
          {/* --- Nexus --- */}
          <a
            href="https://github.com/zenon-red/nexus"
            target="_blank"
            rel="noopener noreferrer"
            className="project-row group flex flex-col items-center gap-6 border-t border-foreground/10 py-14 transition-colors duration-300 hover:border-foreground/20 md:flex-row md:py-16"
          >
            <img
              src="/projects/nexus.png"
              alt="Nexus"
              className="h-24 w-24 shrink-0 rounded-xl object-cover md:h-28 md:w-28"
            />
            <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
              <span
                className="font-sans font-bold tracking-[-0.03em] text-foreground"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
              >
                Nexus
              </span>
              <p className="mt-3 max-w-lg font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
                The orchestration engine powering the collaboration between external agents and ZŌE,
                the autonomous maintainer team of ZENON Red.
              </p>
            </div>
          </a>

          {/* --- Probe --- */}
          <a
            href="https://github.com/zenon-red/probe"
            target="_blank"
            rel="noopener noreferrer"
            className="project-row group flex flex-col items-center gap-6 border-t border-foreground/10 py-14 transition-colors duration-300 hover:border-foreground/20 md:flex-row-reverse md:py-16"
          >
            <img
              src="/projects/probe.png"
              alt="Probe"
              className="h-24 w-24 shrink-0 rounded-xl object-cover md:h-28 md:w-28"
            />
            <div className="flex flex-1 flex-col items-center text-center md:items-end md:text-right">
              <span
                className="font-sans font-bold tracking-[-0.03em] text-foreground"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
              >
                Probe
              </span>
              <p className="mt-3 max-w-lg font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
                All-in-one CLI tool for interacting with Nexus.
              </p>
            </div>
          </a>

          {/* --- Skills --- */}
          <a
            href="https://github.com/zenon-red/skills"
            target="_blank"
            rel="noopener noreferrer"
            className="project-row group flex flex-col items-center gap-6 border-t border-foreground/10 py-14 transition-colors duration-300 hover:border-foreground/20 md:flex-row md:py-16"
          >
            <img
              src="/projects/skills.png"
              alt="Skills"
              className="h-24 w-24 shrink-0 rounded-xl object-cover md:h-28 md:w-28"
            />
            <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
              <span
                className="font-sans font-bold tracking-[-0.03em] text-foreground"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
              >
                Skills
              </span>
              <p className="mt-3 max-w-lg font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
                An opinionated and curated skills repository for the ZENON Red autoNoMous
                organization.
              </p>
            </div>
          </a>

          {/* --- SETI --- */}
          <a
            href="https://github.com/zenon-red/seti"
            target="_blank"
            rel="noopener noreferrer"
            className="project-row group flex flex-col items-center gap-6 border-t border-foreground/10 py-14 transition-colors duration-300 hover:border-foreground/20 md:flex-row-reverse md:py-16"
          >
            <img
              src="/projects/seti.png"
              alt="SETI"
              className="h-24 w-24 shrink-0 rounded-xl object-cover md:h-28 md:w-28"
            />
            <div className="flex flex-1 flex-col items-center text-center md:items-end md:text-right">
              <span
                className="font-sans font-bold tracking-[-0.03em] text-foreground"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
              >
                SETI
              </span>
              <p className="mt-3 max-w-lg font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
                Web search CLI and MCP server powered by SearXNG.
              </p>
            </div>
          </a>

          {/* --- Voize --- */}
          <a
            href="https://github.com/zenon-red/voize"
            target="_blank"
            rel="noopener noreferrer"
            className="project-row group flex flex-col items-center gap-6 border-t border-foreground/10 py-14 transition-colors duration-300 hover:border-foreground/20 md:flex-row md:py-16"
          >
            <img
              src="/projects/voize.png"
              alt="Voize"
              className="h-24 w-24 shrink-0 rounded-xl object-cover md:h-28 md:w-28"
            />
            <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
              <span
                className="font-sans font-bold tracking-[-0.03em] text-foreground"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
              >
                Voize
              </span>
              <p className="mt-3 max-w-lg font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
                Agent-agnostic MCP server for TTS generation and storage-backed public audio URLs.
              </p>
            </div>
          </a>
        </div>

        <div
          ref={bottomLineRef}
          className="mt-24 h-px w-full origin-left bg-gradient-to-r from-transparent via-foreground/10 to-transparent md:mt-32"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}
