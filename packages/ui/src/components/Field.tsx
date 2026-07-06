import type { ReactNode } from "react";
import { cn } from "../utils/cn";

/** Étiquette + champ. `htmlFor` doit pointer vers l'id du champ enfant. */
export function Field({
  label,
  htmlFor,
  children,
  className,
  serif = false,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
  serif?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <label
        htmlFor={htmlFor}
        className={cn(
          serif
            ? "font-serif text-lg font-semibold sm:text-2xl"
            : "font-sans text-sm font-medium text-ink",
        )}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
