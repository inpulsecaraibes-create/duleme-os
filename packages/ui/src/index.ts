/**
 * @duleme/ui — Design System DULEME (composants réutilisables).
 *
 * Réservé pour le Sprint 2 : Button, Input, Card, Dialog, etc.
 * Les tokens de couleur/typo vivent dans @duleme/config (preset Tailwind).
 * Ce point d'entrée expose pour l'instant les constantes de marque.
 */

export const BRAND = {
  name: "DULEME AND CIE",
  signature: "Bien diriger est l'art de décider.",
  tagline: "Cabinet de la décision stratégique",
} as const;

export type Brand = typeof BRAND;
