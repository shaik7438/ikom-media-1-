import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { track, type ConversionEvent } from "../lib/analytics";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  to: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  /** Conversion event to fire on click */
  event?: ConversionEvent;
  eventParams?: Record<string, string | number>;
  /** Open external links in a new tab */
  newTab?: boolean;
  "aria-label"?: string;
};

const isExternal = (to: string) => /^(https?:|mailto:|tel:)/.test(to);

export function ButtonLink({
  to,
  children,
  variant = "primary",
  arrow = false,
  className = "",
  event,
  eventParams,
  newTab,
  ...rest
}: Props) {
  const cls = `btn btn-${variant} ${className}`;
  const onClick = event ? () => track(event, eventParams) : undefined;
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="arrow size-4" aria-hidden="true" />}
    </>
  );
  if (isExternal(to)) {
    return (
      <a
        href={to}
        className={cls}
        onClick={onClick}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} onClick={onClick} {...rest}>
      {content}
    </Link>
  );
}

/** The site-wide consultation CTA, tracked consistently. */
export function ConsultationButton({
  children = "Book a Free Consultation",
  location,
  variant = "primary",
  className,
}: {
  children?: ReactNode;
  location: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <ButtonLink
      to="/contact"
      variant={variant}
      arrow
      className={className}
      event="consultation_cta_click"
      eventParams={{ location }}
    >
      {children}
    </ButtonLink>
  );
}
