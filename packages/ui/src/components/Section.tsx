import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export function Section({
  children,
  className,
  muted = false,
  bordered = true,
  id,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
  bordered?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16",
        muted && "bg-paper2",
        bordered && "border-t border-line",
        className,
      )}
    >
      {children}
    </section>
  );
}
