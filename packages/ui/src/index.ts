/**
 * @duleme/ui — Design System DULEME (composants réutilisables).
 * Tokens de couleur/typo : voir @duleme/config (preset Tailwind).
 */

export const BRAND = {
  name: "DULEME AND CIE",
  signature: "Bien diriger est l'art de décider.",
  tagline: "Cabinet de la décision stratégique",
} as const;

export type Brand = typeof BRAND;

export { cn } from "./utils/cn";
export {
  Button,
  ButtonLink,
  buttonClasses,
  type ButtonVariant,
  type ButtonSize,
} from "./components/Button";
export { Container } from "./components/Container";
export { Section } from "./components/Section";
export { Eyebrow } from "./components/Eyebrow";
export { Heading } from "./components/Heading";
export { Card } from "./components/Card";
export { Input } from "./components/Input";
export { Textarea } from "./components/Textarea";
export { Field } from "./components/Field";
export { Checkbox } from "./components/Checkbox";
export { Badge, type BadgeTone } from "./components/Badge";
export { Stat } from "./components/Stat";
export { ThemeToggle } from "./components/ThemeToggle";
