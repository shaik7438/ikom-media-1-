import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  /** Heading level — sections use h2 by default */
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", as: H = "h2", id, className = "", children }: Props) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <H id={id} className={`${H === "h1" ? "text-h1" : "text-h2"} mt-4`}>
        {title}
      </H>
      {intro && <p className={`mt-5 text-lead text-intro ${center ? "mx-auto" : ""} max-w-2xl`}>{intro}</p>}
      {children}
    </Reveal>
  );
}
