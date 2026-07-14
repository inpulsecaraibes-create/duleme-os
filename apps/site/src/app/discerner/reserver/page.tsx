import type { Metadata } from "next";
import { isGoogleConfigured } from "@duleme/connectors";
import { getSlots } from "./actions";
import { Reserver } from "./Reserver";

export const metadata: Metadata = {
  title: "Réserver votre échange — DULEME AND CIE",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ReserverPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const configured = isGoogleConfigured();
  const slots = configured ? await getSlots() : [];
  return (
    <main className="min-h-screen bg-paper">
      <Reserver slots={slots} leadId={searchParams.id ?? null} configured={configured} />
    </main>
  );
}
