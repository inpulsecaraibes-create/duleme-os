import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export function Checkbox({
  label,
  className,
  ...rest
}: { label: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-2.5 text-sm text-mut",
        className,
      )}
    >
      <input
        type="checkbox"
        className="h-4 w-4 accent-bord focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
        {...rest}
      />
      {label}
    </label>
  );
}
