/**
 * Registre des connecteurs — source unique pour la page « Connecteurs »
 * du back-office. `configured` est calculé depuis l'environnement (synchrone).
 */
import { isBrevoConfigured } from "./brevo";
import { isFirefliesConfigured } from "./fireflies";
import { isSinaoConfigured } from "./sinao";
import { isGoogleConfigured } from "./google";

export type ConnectorKey =
  | "google-drive"
  | "google-calendar"
  | "google-meet"
  | "fireflies"
  | "sinao"
  | "brevo";

export type ConnectorInfo = {
  key: ConnectorKey;
  name: string;
  role: string;
  configured: boolean;
  envVars: string[];
  setup: string;
};

export function getConnectors(): ConnectorInfo[] {
  const google = isGoogleConfigured();
  return [
    {
      key: "google-drive",
      name: "Google Drive",
      role: "Source officielle des documents — arborescence automatique par client.",
      configured: google,
      envVars: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN"],
      setup:
        "Créer un projet Google Cloud + identifiants OAuth (Drive + Calendar), puis obtenir un refresh token du compte du cabinet.",
    },
    {
      key: "google-calendar",
      name: "Google Agenda",
      role: "Calendrier maître — RDV, rappels et invitations.",
      configured: google,
      envVars: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN", "GOOGLE_CALENDAR_ID"],
      setup: "Mêmes identifiants Google que Drive (scope Calendar).",
    },
    {
      key: "google-meet",
      name: "Google Meet",
      role: "Lien visio créé automatiquement avec chaque événement Agenda.",
      configured: google,
      envVars: ["(via Google Agenda)"],
      setup: "Activé automatiquement dès que Google Agenda est connecté.",
    },
    {
      key: "fireflies",
      name: "Fireflies.ai",
      role: "Transcription, résumé et compte-rendu automatiques des RDV.",
      configured: isFirefliesConfigured(),
      envVars: ["FIREFLIES_API_KEY"],
      setup: "Fireflies → Settings → Developer → API key.",
    },
    {
      key: "sinao",
      name: "Sinao",
      role: "Devis, factures et paiements (aucune facturation interne).",
      configured: isSinaoConfigured(),
      envVars: ["SINAO_API_KEY", "SINAO_API_BASE (optionnel)"],
      setup: "Régénérer la clé API dans Sinao (l'ancienne a été exposée) puis la coller ici.",
    },
    {
      key: "brevo",
      name: "Brevo",
      role: "Emails, notifications, rappels et newsletter.",
      configured: isBrevoConfigured(),
      envVars: ["BREVO_API_KEY", "BREVO_SENDER_EMAIL", "BREVO_SENDER_NAME"],
      setup: "Brevo → SMTP & API → API Keys → créer une clé v3.",
    },
  ];
}
