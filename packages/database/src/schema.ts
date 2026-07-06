import {
  pgTable,
  uuid,
  text,
  boolean,
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
