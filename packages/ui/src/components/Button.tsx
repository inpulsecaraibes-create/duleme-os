import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export type ButtonVariant = "primary" | "line" | "ghost";
export type ButtonSize = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<ButtonSize, string> = {
  md: "px-6 py-3.5 text-sm",
  sm: "px-4 py-2.5 text-[13px]",
};

const variants: Record<ButtonVariant, string> = {
  primary: "rounded-md bg-bord text-paper hover:bg-bord-deep",
  line: "rounded-md border border-bord text-accent hover:bg-bord/5",
  ghost:
    "border-b border-brass pb-1 text-ink hover:text-accent",
};

/** Classes partagées — utile pour styler un <Link> tiers comme un bouton. */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  // le variant "ghost" est un lien texte : il ignore le padding de taille
  const withSize = variant === "ghost" ? "" : sizes[size];
  return cn(base, withSize, variants[variant], className);
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}
