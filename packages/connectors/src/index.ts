// Connecteurs externes de DULEME OS — tous dégradables (secrets par env).
export * from "./http";
export * from "./registry";

export {
  isBrevoConfigured,
  sendEmail,
  upsertContact,
  brevoHealthCheck,
  type EmailInput,
} from "./brevo";

export {
  isFirefliesConfigured,
  listTranscripts,
  getTranscript,
  firefliesHealthCheck,
  type FirefliesTranscript,
} from "./fireflies";

export {
  isSinaoConfigured,
  sinaoRequest,
  listInvoices,
  listQuotes,
  sinaoHealthCheck,
  type SinaoDocument,
} from "./sinao";

export {
  isGoogleConfigured,
  getAccessToken,
  ensureClientTree,
  listFiles,
  createEventWithMeet,
  googleHealthCheck,
  CLIENT_SUBFOLDERS,
  type DriveFile,
} from "./google";
