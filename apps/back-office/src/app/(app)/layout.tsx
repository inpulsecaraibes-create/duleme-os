import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession, SESSION_COOKIE } from "@duleme/auth";
import { LogoutButton } from "@/components/LogoutButton";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = verifySession(cookies().get(SESSION_COOKIE)?.value);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-paper2">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between px-7 pt-4">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-lg font-semibold">DULEME</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brass">
              Back Office
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-[13px] text-mut sm:inline">
              {session.sub}
            </span>
            <LogoutButton />
          </div>
        </div>
        <nav className="mx-auto flex max-w-[1160px] flex-wrap gap-1 px-7 pt-3">
          <Link
            href="/"
            className="px-3 py-2 text-[13px] text-mut transition-colors hover:text-accent"
          >
            Demandes de RDV
          </Link>
          <Link
            href="/clients"
            className="px-3 py-2 text-[13px] text-mut transition-colors hover:text-accent"
          >
            Clients
          </Link>
          <Link
            href="/missions"
            className="px-3 py-2 text-[13px] text-mut transition-colors hover:text-accent"
          >
            Missions
          </Link>
          <Link
            href="/temoignages"
            className="px-3 py-2 text-[13px] text-mut transition-colors hover:text-accent"
          >
            Témoignages
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-[1160px] px-7 py-8">{children}</main>
    </div>
  );
}
