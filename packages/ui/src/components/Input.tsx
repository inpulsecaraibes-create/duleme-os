import type { InputHTMLAttributes } from "react";
import { cn } from "../utils/cn";

const fieldBase =
  "w-full rounded border border-line bg-paper2 p-3 text-[15px] text-ink placeholder:text-mut/70 focus:border-bord focus:outline focus:outline-2 focus:outline-brass";

export function Input({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, className)} {...rest} />;
}

export { fieldBase };
