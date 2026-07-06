import { cn } from "../utils/cn";

export function Stat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("border-t border-line pt-4", className)}>
      <div className="font-serif text-[30px] font-semibold leading-none text-accent tabular-nums sm:text-[44px]">
        {value}
      </div>
      <div className="mt-2 text-[12.5px] leading-snug text-mut">{label}</div>
    </div>
  );
}
