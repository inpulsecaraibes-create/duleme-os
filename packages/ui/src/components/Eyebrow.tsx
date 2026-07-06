import type { ReactNode } from "react";
import { cn } from "../utils/cn";

/** Sur-titre : petite capitale espacée, couleur d'accent. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-sans text-xs font-light uppercase tracking-eyebrow text-accent",
        className,
      )}
    >
      {children}
    </p>
  );
}
