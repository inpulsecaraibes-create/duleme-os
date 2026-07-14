import { sendEmail } from "@duleme/connectors";

const MART = "America/Martinique";
const H72 = 72 * 3600 * 1000;

function whenStr(d: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: MART,
  }).format(d);
}

type Kind = "j7" | "veille" | "h1";

export function reminderContent(kind: Kind, firstName: string, bookedAt: Date, meetLink: string | null) {
  const when = whenStr(bookedAt);
  const M: Record<Kind, [string, string]> = {
    j7: ["Votre échange avec Téféry approche", "Dans une semaine, nous prenons 20 minutes ensemble."],
    veille: ["C'est demain — votre échange avec Téféry", "Petit rappel : notre échange a lieu demain."],
    h1: ["Dans une heure — votre échange avec Téféry", "Notre échange commence dans une heure."],
  };
  const [subject, intro] = M[kind];
  const html = `<p>Bonjour ${firstName || ""},</p>
    <p>${intro}</p>
    <p><strong>${when}</strong> (heure de Martinique)</p>
    ${meetLink ? `<p>Lien Google Meet : <a href="${meetLink}">${meetLink}</a></p>` : ""}
    <p>À très vite,<br/>Téféry</p>`;
  return { subject, html };
}

/** Programme (via Brevo) les rappels « veille » et « 1h avant » qui tombent dans les 72h. */
export async function scheduleVeilleAnd1h(
  email: string,
  firstName: string,
  bookedAt: Date,
  meetLink: string | null,
): Promise<void> {
  const now = Date.now();
  const t = bookedAt.getTime();
  const jobs: [Kind, number][] = [
    ["veille", t - 24 * 3600 * 1000],
    ["h1", t - 3600 * 1000],
  ];
  for (const [kind, at] of jobs) {
    if (at > now + 60000 && at - now <= H72) {
      const { subject, html } = reminderContent(kind, firstName, bookedAt, meetLink);
      try {
        await sendEmail({
          to: [{ email, name: firstName }],
          subject,
          htmlContent: html,
          scheduledAt: new Date(at).toISOString(),
        });
      } catch (e) {
        console.error("[rappel] programmation échouée", e);
      }
    }
  }
}
