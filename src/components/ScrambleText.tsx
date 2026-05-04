import { useRef, useCallback } from "react";
import { animate, scrambleText } from "animejs";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateGibberish(length: number): string {
  return Array.from({ length }, () => CHARSET[Math.floor(Math.random() * CHARSET.length)]).join("");
}

interface ScrambleTextProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
}

export function ScrambleText({ text, className, children }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (!ref.current) return;

    ref.current.innerHTML = generateGibberish(text.length);

    animate(ref.current, {
      innerHTML: scrambleText({ text }),
      duration: 350,
      ease: "inOut(2)",
    });
  }, [text]);

  return (
    <span ref={ref} onMouseEnter={handleMouseEnter} className={className}>
      {children ?? text}
    </span>
  );
}
