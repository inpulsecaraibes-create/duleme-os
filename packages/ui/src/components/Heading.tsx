import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type Level = 1 | 2 | 3;
type Size = "sm" | "md" | "lg" | "xl";

const sizes: Record<Size, string> = {
  sm: "text-xl sm:text-2xl",
  md: "text-[26px] sm:text-[32px]",
  lg: "text-[26px] sm:text-[40px]",
  xl: "text-4xl sm:text-5xl md:text-[60px]",
};

export function Heading({
  children,
  level = 2,
  size = "lg",
  className,
}: {
  children: ReactNode;
  level?: Level;
  size?: Size;
  className?: string;
}) {
  const Tag = (`h${level}` as unknown) as "h1";
  return (
    <Tag
      className={cn(
        "font-serif font-semibold leading-[1.08]",
        sizes[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
