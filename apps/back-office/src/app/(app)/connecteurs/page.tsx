import { getConnectors } from "@duleme/connectors";

export const dynamic = "force-dynamic";

export default function ConnecteursPage() {
  const connectors = getConnectors();
  const active = connectors.filter((c) => c.configured).length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brass">
            Système · intégrations
          </p>
          <h1 className="mt-1 font-serif text-[28px] font-semibold">Connecteurs</h1>
          <p className="mt-1 max-w-[60ch] text-sm text-mut">
            Les outils externes de DULEME OS. Chacun est <strong>dégradable</strong> :
            tant que la clé n&apos;est pas renseignée, le connecteur reste inactif
            et rien ne casse. Les clés se posent dans les variables
            d&apos;environnement (jamais dans le code).
          </p>
        </div>
        <span className="rounded-full bg-bord/10 px-3 py-1 text-[12.5px] font-semibold text-accent">
          {active}/{connectors.length} actif{active > 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {connectors.map((c) => (
          <div
            key={c.key}
            className="rounded-lg border border-line bg-card p-5 shadow-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-serif text-lg font-semibold">{c.name}</p>
                <p className="mt-1 text-[13px] text-mut">{c.role}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  c.configured ? "bg-ok/15 text-ok" : "bg-warn/15 text-warn"
                }`}
              >
                {c.configured ? "Actif" : "À configurer"}
              </span>
            </div>

            <div className="mt-4 border-t border-line pt-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-mut">
                Variables requises
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {c.envVars.map((v) => (
                  <code
                    key={v}
                    className="rounded bg-paper2 px-1.5 py-0.5 font-mono text-[11px] text-ink"
                  >
                    {v}
                  </code>
                ))}
              </div>
              {!c.configured && (
                <p className="mt-3 text-[12px] leading-snug text-mut">
                  <span className="font-semibold text-ink">Pour l&apos;activer : </span>
                  {c.setup}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
