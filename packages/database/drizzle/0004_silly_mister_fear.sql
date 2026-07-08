CREATE TABLE IF NOT EXISTS "survey" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid NOT NULL,
	"phase" text NOT NULL,
	"due_at" timestamp with time zone NOT NULL,
	"answered_at" timestamp with time zone,
	"answers" text,
	"consent_publish" boolean DEFAULT false NOT NULL,
	"attribution" text,
	"relanced_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "survey" ADD CONSTRAINT "survey_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
