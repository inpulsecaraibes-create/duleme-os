import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export type BadgeTone = "neutral" | "ok" | "warn" | "alert" | "accent";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-line/40 text-mut",
  ok: "bg-ok/15 text-ok",
  warn: "bg-warn/15 text-warn",
  alert: "bg-alert/15 text-alert",
  accent: "bg-bord/10 text-accent",
};

export function Badge({
  children,
  tone = "neutral",
  dot = false,
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[11.5px] font-semibold",
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      )}
      {children}
    </span>
  );
}
