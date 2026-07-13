import {
  pgTable,
  uuid,
  text,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * Demande de rendez-vous / prise de contact depuis le site public.
 * Point d'entrée du parcours : un prospect deviendra ensuite un Contact
 * dans le Relationship OS (Sprint Back Office).
 */
export const contactRequest = pgTable("contact_request", {
  id: uuid("id").primaryKey().defaultRandom(),
  message: text("message").notNull(),
  name: text("name"),
  company: text("company"),
  email: text("email"),
  callbackRequested: boolean("callback_requested").default(false).notNull(),
  source: text("source").default("site").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type ContactRequest = typeof contactRequest.$inferSelect;
export type NewContactRequest = typeof contactRequest.$inferInsert;

/**
 * Témoignage client (média « Ils en parlent mieux que moi »).
 * Éditable depuis le Back Office, affiché sur le site.
 */
export const testimonial = pgTable("testimonial", {
  id: uuid("id").primaryKey().defaultRandom(),
  headline: text("headline").notNull(),
  body: text("body").notNull(),
  attribution: text("attribution")
    .notNull()
    .default("Dirigeant·e de PME — témoignage anonymisé"),
  published: boolean("published").notNull().default(true),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Testimonial = typeof testimonial.$inferSelect;
export type NewTestimonial = typeof testimonial.$inferInsert;

/**
 * Client / Prospect — cœur du back-office.
 * Un prospect (issu d'une demande de RDV) devient client quand une mission
 * démarre. `driveFolderUrl` pointera vers le dossier Google Drive
 * (source officielle des documents — rien n'est stocké dans DULEME OS).
 */
export const client = pgTable("client", {
  id: uuid("id").primaryKey().defaultRandom(),
  // "prospect" | "client"
  type: text("type").notNull().default("prospect"),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email"),
  phone: text("phone"),
  // "nouveau" | "actif" | "en_pause" | "clos"
  status: text("status").notNull().default("nouveau"),
  source: text("source").default("site").notNull(),
  driveFolderUrl: text("drive_folder_url"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Client = typeof client.$inferSelect;
export type NewClient = typeof client.$inferInsert;

/**
 * Mission — unité de travail du cabinet, rattachée à un client.
 * Champs alignés sur la vision : documents demandés/reçus, livrables,
 * notes internes, Dossier DULEME™. Les rendez-vous, l'historique et les
 * documents « vivants » viendront des connecteurs (Agenda / Drive / Fireflies).
 */
export const mission = pgTable("mission", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => client.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  // "cadrage" | "en_cours" | "livraison" | "archivee"
  status: text("status").notNull().default("cadrage"),
  documentsRequested: text("documents_requested"),
  documentsReceived: text("documents_received"),
  deliverables: text("deliverables"),
  internalNotes: text("internal_notes"),
  // Lien Google Drive vers le Dossier DULEME™ (02 Dossier DULEME)
  dossierUrl: text("dossier_url"),
  startDate: timestamp("start_date", { withTimezone: true }),
  dueDate: timestamp("due_date", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Mission = typeof mission.$inferSelect;
export type NewMission = typeof mission.$inferInsert;

/**
 * Message — conversation simple entre le client et le cabinet.
 * Le client écrit depuis l'espace client → Téféry est notifiée par email
 * (Brevo) → elle répond depuis le back-office → le client est notifié.
 * Toute la conversation reste archivée ici. Pas de messagerie complexe.
 */
export const message = pgTable("message", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => client.id, { onDelete: "cascade" }),
  // "client" | "cabinet"
  sender: text("sender").notNull(),
  body: text("body").notNull(),
  readAt: timestamp("read_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Message = typeof message.$inferSelect;
export type NewMessage = typeof message.$inferInsert;

/**
 * Survey — questionnaire de témoignage, en 3 temps sur le cycle de vie client :
 *   t0 (démarrage) · m1 (+1 mois) · m3 (+3 mois).
 * Capte le « avant » et le « après » pour un témoignage de transformation
 * authentique. Le questionnaire apparaît dans l'espace client quand `dueAt`
 * est atteint ; une relance email (Brevo) est envoyée par tâche planifiée.
 * `answers` stocke [{q, a}] (auto-descriptif). `consentPublish` = accord de
 * publication anonymisée → peut alimenter la rubrique Témoignages.
 */
export const survey = pgTable("survey", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => client.id, { onDelete: "cascade" }),
  phase: text("phase").notNull(), // "t0" | "m1" | "m3"
  dueAt: timestamp("due_at", { withTimezone: true }).notNull(),
  answeredAt: timestamp("answered_at", { withTimezone: true }),
  answers: text("answers"), // JSON: [{ q, a }]
  consentPublish: boolean("consent_publish").notNull().default(false),
  attribution: text("attribution"),
  relancedAt: timestamp("relanced_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Survey = typeof survey.$inferSelect;
export type NewSurvey = typeof survey.$inferInsert;

/**
 * DULEME Content OS — pièce de contenu (projet séparé, réutilise la même base).
 * Une idée génère plusieurs pièces (article, LinkedIn, Instagram, newsletter).
 * Cycle : draft → validated → scheduled → published.
 * Publication automatique sur le SITE uniquement, à cadence fixe (2/mois).
 */
export const contentPiece = pgTable("content_piece", {
  id: uuid("id").primaryKey().defaultRandom(),
  theme: text("theme").notNull(), // l'idée de départ
  channel: text("channel").notNull().default("site"), // site|linkedin|instagram|newsletter
  title: text("title"),
  body: text("body"),
  visualBrief: text("visual_brief"), // brief pour le visuel (Canva)
  status: text("status").notNull().default("draft"), // draft|validated|scheduled|published
  scheduledFor: timestamp("scheduled_for", { withTimezone: true }),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type ContentPiece = typeof contentPiece.$inferSelect;
export type NewContentPiece = typeof contentPiece.$inferInsert;
