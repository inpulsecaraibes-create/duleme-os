import type { TextareaHTMLAttributes } from "react";
import { cn } from "../utils/cn";
import { fieldBase } from "./Input";

export function Textarea({
  className,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(fieldBase, "min-h-[130px] resize-y p-4 text-base", className)}
      {...rest}
    />
  );
}
