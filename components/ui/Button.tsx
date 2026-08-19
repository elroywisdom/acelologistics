import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "accent" | "outline" | "whatsapp";

type BaseProps = {
  variant?: Variant;
  /** For the outline variant: whether it sits on a dark/colored background. */
  onDark?: boolean;
  className?: string;
  children: React.ReactNode;
};

const base =
  "tap-target inline-flex items-center justify-center gap-2 rounded-md px-[22px] py-3 text-[14px] font-normal transition-colors";

function variantClasses(variant: Variant, onDark: boolean) {
  switch (variant) {
    case "primary":
      return "bg-primary text-white hover:bg-primary-hover";
    case "accent":
      return "bg-accent text-text hover:bg-[#e6c100]";
    case "whatsapp":
      return "bg-whatsapp text-white hover:bg-[#1fb958]";
    case "outline":
      return onDark
        ? "border-2 border-border/60 text-white hover:border-white"
        : "border-2 border-primary text-primary hover:bg-tint-blue-100";
  }
}

type ButtonAsButton = BaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };
type ButtonAsLink = BaseProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", onDark = false, className, children, ...rest } =
    props;
  const classes = clsx(base, variantClasses(variant, onDark), className);

  if ("href" in rest && rest.href) {
    return (
      <Link {...(rest as ComponentPropsWithoutRef<typeof Link>)} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...(rest as ComponentPropsWithoutRef<"button">)} className={classes}>
      {children}
    </button>
  );
}
