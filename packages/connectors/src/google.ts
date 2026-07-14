/**
 * Google — Drive (documents), Agenda (RDV/rappels) et Meet (visio).
 * Rôle dans DULEME OS :
 *  - Drive : source officielle des documents, arborescence auto par client.
 *  - Agenda : calendrier maître, DULEME OS affiche/écrit les RDV.
 *  - Meet : lien visio créé automatiquement avec l'événement Agenda.
 *
 * Auth : OAuth2 « refresh token » du compte Google du cabinet (compte unique,
 * pas d'OAuth par utilisateur). Configurer GOOGLE_CLIENT_ID / _SECRET /
 * _REFRESH_TOKEN (obtenus une fois via l'OAuth Playground ou un script).
 * Dégradable : sans ces variables, `isConfigured()` = false.
 */
import { httpJson, NotConfiguredError } from "./http";

const DRIVE = "https://www.googleapis.com/drive/v3";
const CALENDAR = "https://www.googleapis.com/calendar/v3";

/** Sous-dossiers standard du dossier client (arborescence de la vision). */
export const CLIENT_SUBFOLDERS = [
  "01 Documents client",
  "02 Dossier DULEME",
  "03 Contrats",
  "04 Comptes rendus",
  "05 Livrables",
  "06 Archives",
] as const;

export function isGoogleConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN,
  );
}

function creds() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new NotConfiguredError("google");
  }
  return { clientId, clientSecret, refreshToken };
}

/** Échange le refresh token contre un access token (valable ~1h). */
export async function getAccessToken(): Promise<string> {
  const { clientId, clientSecret, refreshToken } = creds();
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });
  const res = await httpJson<{ access_token: string }>(
    "google",
    "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    },
  );
  return res.access_token;
}

async function driveAuth(token: string) {
  return { authorization: `Bearer ${token}`, "content-type": "application/json" };
}

async function findFolder(
  token: string,
  name: string,
  parentId?: string,
): Promise<string | null> {
  const q = [
    "mimeType='application/vnd.google-apps.folder'",
    "trashed=false",
    `name='${name.replace(/'/g, "\\'")}'`,
    parentId ? `'${parentId}' in parents` : null,
  ]
    .filter(Boolean)
    .join(" and ");
  const res = await httpJson<{ files: { id: string }[] }>(
    "google",
    `${DRIVE}/files?q=${encodeURIComponent(q)}&fields=files(id,name)&spaces=drive`,
    { headers: await driveAuth(token) },
  );
  return res.files[0]?.id ?? null;
}

async function createFolder(
  token: string,
  name: string,
  parentId?: string,
): Promise<string> {
  const res = await httpJson<{ id: string }>("google", `${DRIVE}/files?fields=id`, {
    method: "POST",
    headers: await driveAuth(token),
    body: JSON.stringify({
      name,
      mimeType: "application/vnd.google-apps.folder",
      ...(parentId ? { parents: [parentId] } : {}),
    }),
  });
  return res.id;
}

async function ensureFolder(
  token: string,
  name: string,
  parentId?: string,
): Promise<string> {
  return (await findFolder(token, name, parentId)) ?? createFolder(token, name, parentId);
}

/**
 * Crée (ou retrouve) l'arborescence complète d'un client :
 * DULEME / Clients / <nom> / {01…06}. Renvoie l'URL du dossier client.
 */
export async function ensureClientTree(
  clientName: string,
): Promise<{ folderId: string; url: string } | null> {
  if (!isGoogleConfigured()) return null;
  const token = await getAccessToken();
  const rootName = process.env.GOOGLE_DRIVE_ROOT || "DULEME";
  const root = await ensureFolder(token, rootName);
  const clients = await ensureFolder(token, "Clients", root);
  const clientFolder = await ensureFolder(token, clientName, clients);
  for (const sub of CLIENT_SUBFOLDERS) {
    await ensureFolder(token, sub, clientFolder);
  }
  return {
    folderId: clientFolder,
    url: `https://drive.google.com/drive/folders/${clientFolder}`,
  };
}

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  modifiedTime?: string;
};

/** Liste les fichiers d'un dossier Drive (pour affichage dans l'OS). */
export async function listFiles(folderId: string): Promise<DriveFile[]> {
  if (!isGoogleConfigured()) return [];
  const token = await getAccessToken();
  const q = `'${folderId}' in parents and trashed=false`;
  const res = await httpJson<{ files: DriveFile[] }>(
    "google",
    `${DRIVE}/files?q=${encodeURIComponent(q)}&fields=files(id,name,mimeType,webViewLink,modifiedTime)&orderBy=folder,name`,
    { headers: await driveAuth(token) },
  );
  return res.files ?? [];
}

/**
 * Crée un événement Agenda avec lien Meet automatique.
 * Renvoie l'id de l'événement, son lien Agenda et le lien Meet.
 */
export async function createEventWithMeet(input: {
  summary: string;
  description?: string;
  startISO: string;
  endISO: string;
  attendees?: string[];
  calendarId?: string;
}): Promise<{ eventId: string; htmlLink: string; meetLink: string | null } | null> {
  if (!isGoogleConfigured()) return null;
  const token = await getAccessToken();
  const calId = input.calendarId || process.env.GOOGLE_CALENDAR_ID || "primary";
  const res = await httpJson<{
    id: string;
    htmlLink: string;
    hangoutLink?: string;
  }>(
    "google",
    `${CALENDAR}/calendars/${encodeURIComponent(calId)}/events?conferenceDataVersion=1&sendUpdates=all`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        summary: input.summary,
        description: input.description,
        start: { dateTime: input.startISO },
        end: { dateTime: input.endISO },
        attendees: input.attendees?.map((email) => ({ email })),
        // Rappels : 1 semaine avant, la veille, 1 heure avant.
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 7 * 24 * 60 },
            { method: "email", minutes: 24 * 60 },
            { method: "email", minutes: 60 },
            { method: "popup", minutes: 60 },
          ],
        },
        conferenceData: {
          createRequest: {
            requestId: `duleme-${input.startISO}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      }),
    },
  );
  return { eventId: res.id, htmlLink: res.htmlLink, meetLink: res.hangoutLink ?? null };
}

/**
 * Dépose un document dans le dossier « 01 Documents client » du client
 * (crée l'arborescence si besoin). Renvoie l'id et le lien du fichier.
 */
export async function uploadClientDocument(
  clientName: string,
  filename: string,
  mimeType: string,
  bytes: Uint8Array,
): Promise<{ id: string; webViewLink?: string } | null> {
  if (!isGoogleConfigured()) return null;
  const token = await getAccessToken();
  const rootName = process.env.GOOGLE_DRIVE_ROOT || "DULEME";
  const root = await ensureFolder(token, rootName);
  const clients = await ensureFolder(token, "Clients", root);
  const clientFolder = await ensureFolder(token, clientName, clients);
  const docs = await ensureFolder(token, CLIENT_SUBFOLDERS[0], clientFolder); // "01 Documents client"

  // 1) métadonnées
  const meta = await httpJson<{ id: string }>("google", `${DRIVE}/files?fields=id`, {
    method: "POST",
    headers: await driveAuth(token),
    body: JSON.stringify({ name: filename, parents: [docs] }),
  });
  // 2) contenu (upload média)
  const up = await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${meta.id}?uploadType=media&fields=id,webViewLink`,
    {
      method: "PATCH",
      headers: { authorization: `Bearer ${token}`, "content-type": mimeType || "application/octet-stream" },
      // fetch accepte un Uint8Array à l'exécution ; cast pour le typage.
      body: bytes as unknown as BodyInit,
    },
  );
  const j = (await up.json()) as { id: string; webViewLink?: string };
  return { id: j.id, webViewLink: j.webViewLink };
}

/** Liste les documents déjà transmis (dossier « 01 Documents client »). */
export async function listClientDocuments(clientName: string): Promise<DriveFile[]> {
  if (!isGoogleConfigured()) return [];
  const token = await getAccessToken();
  const rootName = process.env.GOOGLE_DRIVE_ROOT || "DULEME";
  const root = await findFolder(token, rootName);
  if (!root) return [];
  const clients = await findFolder(token, "Clients", root);
  if (!clients) return [];
  const clientFolder = await findFolder(token, clientName, clients);
  if (!clientFolder) return [];
  const docs = await findFolder(token, CLIENT_SUBFOLDERS[0], clientFolder);
  if (!docs) return [];
  return listFiles(docs);
}

/** Créneaux occupés (fusionnés) sur un ou plusieurs agendas, entre deux dates. */
export async function listBusy(
  startISO: string,
  endISO: string,
  calendarIds?: string[],
): Promise<{ start: string; end: string }[]> {
  if (!isGoogleConfigured()) return [];
  const token = await getAccessToken();
  const ids =
    calendarIds && calendarIds.length
      ? calendarIds
      : [process.env.GOOGLE_CALENDAR_ID || "primary"];
  const res = await httpJson<{
    calendars: Record<string, { busy?: { start: string; end: string }[] }>;
  }>("google", `${CALENDAR}/freeBusy`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({
      timeMin: startISO,
      timeMax: endISO,
      items: ids.map((id) => ({ id })),
    }),
  });
  const out: { start: string; end: string }[] = [];
  for (const id of ids) {
    for (const b of res.calendars?.[id]?.busy ?? []) out.push(b);
  }
  return out;
}

export async function googleHealthCheck(): Promise<{ ok: boolean; detail: string }> {
  if (!isGoogleConfigured()) return { ok: false, detail: "OAuth non configuré" };
  try {
    const token = await getAccessToken();
    const me = await httpJson<{ user?: { emailAddress?: string } }>(
      "google",
      `${DRIVE}/about?fields=user(emailAddress)`,
      { headers: await driveAuth(token) },
    );
    return {
      ok: true,
      detail: me.user?.emailAddress ? `Compte ${me.user.emailAddress}` : "Connecté",
    };
  } catch (e) {
    return { ok: false, detail: e instanceof Error ? e.message : "Erreur" };
  }
}
