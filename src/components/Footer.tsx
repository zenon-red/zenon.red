import { useRef, useState, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate } from "animejs";
import { Github, Copy, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ZNN_WALLET = "z1qpwfngy3hqeacs7t0s9nfeftta3she4y4a7ats";

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const copyIconRef = useRef<HTMLDivElement>(null);
  const checkIconRef = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(ZNN_WALLET)
      .then(() => {
        setCopied(true);

        if (copyIconRef.current && checkIconRef.current) {
          animate(copyIconRef.current, {
            scale: [1, 0],
            opacity: [1, 0],
            rotate: [0, -45],
            duration: 450,
            ease: "inOut(3)",
          });
          animate(checkIconRef.current, {
            scale: [0, 1],
            opacity: [0, 1],
            rotate: [45, 0],
            duration: 450,
            ease: "inOut(3)",
            delay: 50,
          });
        }

        setTimeout(() => {
          setCopied(false);
          if (copyIconRef.current && checkIconRef.current) {
            animate(checkIconRef.current, {
              scale: [1, 0],
              opacity: [1, 0],
              rotate: [0, 45],
              duration: 400,
              ease: "inOut(3)",
            });
            animate(copyIconRef.current, {
              scale: [0, 1],
              opacity: [0, 1],
              rotate: [-45, 0],
              duration: 400,
              ease: "inOut(3)",
              delay: 50,
            });
          }
        }, 2000);
      })
      .catch(() => {
        setCopied(false);
      });
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: reduceMotion ? 0.1 : 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (contentRef.current) {
        const children = contentRef.current.querySelectorAll(".footer-animate");
        gsap.fromTo(
          children,
          { autoAlpha: 0, y: 50, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: reduceMotion ? 0.1 : 1.1,
            stagger: { each: 0.12, from: "start" },
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-6 py-32 md:py-48">
      {/* Top line */}
      <div
        ref={lineRef}
        className="absolute top-0 right-0 left-0 mx-auto h-px max-w-6xl origin-left bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
        style={{ transform: "scaleX(0)" }}
      />

      <div ref={contentRef} className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <img
          src="/zenon-red-logo.png"
          alt="Zenon Red"
          className="footer-animate h-24 w-auto object-contain opacity-70 md:h-32"
        />

        <h2
          className="footer-animate mt-12 font-sans font-bold tracking-[-0.03em] text-foreground"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1.05,
            textWrap: "balance",
          }}
        >
          Stream your tokens through ZR
        </h2>

        <a
          href="https://github.com/zenon-red"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-animate mt-10 inline-flex items-center gap-2 font-mono text-base tracking-widest text-foreground transition-colors duration-200 hover:text-muted-foreground"
        >
          <Github className="h-4 w-4" />
          github.com/zenon-red
        </a>

        <p className="footer-animate mt-10 font-mono text-sm tracking-[0.15em] text-muted-foreground/60 uppercase md:text-base">
          Open Source, forever.
        </p>

        {/* Donation */}
        <div className="footer-animate mt-20 flex flex-col items-center text-center">
          <div className="mx-auto mb-8 h-px w-32 bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

          <p className="font-sans text-xl font-semibold tracking-[-0.02em] text-muted-foreground">
            Every stream needs a source.
          </p>

          <p className="mt-2 font-mono text-xs tracking-[0.1em] text-muted-foreground/40 uppercase">
            Support the burn rate directly.
          </p>

          <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:gap-3">
            <span className="font-mono text-xs tracking-[0.04em] break-all text-muted-foreground/50 sm:text-sm">
              {ZNN_WALLET}
            </span>
            {/* Desktop: circle button */}
            <button
              onClick={handleCopy}
              className="relative hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-foreground/10 transition-colors duration-200 hover:bg-foreground/20 sm:inline-flex"
              aria-label={copied ? "Copied" : "Copy wallet address"}
            >
              <div ref={copyIconRef} className="absolute inset-0 flex items-center justify-center">
                <Copy className="h-3 w-3 text-foreground/50" />
              </div>
              <div
                ref={checkIconRef}
                className="absolute inset-0 flex items-center justify-center opacity-0"
              >
                <Check className="h-3 w-3 text-foreground/50" />
              </div>
            </button>
            {/* Mobile: pill button with caption */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground/70 transition-colors duration-200 hover:bg-foreground/15 sm:hidden"
              style={{ backgroundColor: "oklch(0.94 0.005 30 / 0.08)" }}
              aria-label={copied ? "Copied" : "Copy wallet address"}
            >
              {copied ? (
                <Check className="h-4 w-4 text-foreground/50" />
              ) : (
                <Copy className="h-4 w-4 text-foreground/50" />
              )}
              {copied ? "Copied" : "Copy address"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
