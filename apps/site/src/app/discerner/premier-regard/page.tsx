import type { Metadata } from "next";
import { PremierRegard } from "./PremierRegard";

export const metadata: Metadata = {
  title: "Le Premier Regard™ — DULEME AND CIE",
  description: "Trois minutes pour vérifier que vous travaillez sur le bon problème.",
  robots: { index: false, follow: false },
};

export default function PremierRegardPage() {
  return (
    <main className="bg-paper">
      <PremierRegard bookingBase="/discerner/reserver" />
    </main>
  );
}
