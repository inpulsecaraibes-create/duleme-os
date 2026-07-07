import { twMerge } from "tailwind-merge";

/**
 * Concatène des classes conditionnelles et résout les conflits Tailwind :
 * la dernière classe d'un même groupe (ex. text-*, bg-*) l'emporte toujours.
 */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return twMerge(parts.filter(Boolean).join(" "));
}
