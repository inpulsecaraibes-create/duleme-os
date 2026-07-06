import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-card p-6 shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}
