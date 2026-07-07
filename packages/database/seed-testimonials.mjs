// Insère les 3 témoignages actuels s'ils ne sont pas déjà en base.
//   node --env-file=../../.env.local seed-testimonials.mjs
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, { prepare: false });

const [{ n }] = await sql`select count(*)::int as n from testimonial`;
if (n > 0) {
  console.log(`Déjà ${n} témoignage(s) en base — rien à faire.`);
  await sql.end();
  process.exit(0);
}

const items = [
  {
    headline: "Elle a vu quelque chose que je ne voyais plus.",
    body:
      "J'étais persuadé que mon problème était commercial. En quelques échanges, elle m'a montré que je passais complètement à côté du vrai sujet. Ce qui m'a marqué, ce n'est pas qu'elle ait trouvé une solution. C'est qu'elle ait réussi à mettre des mots sur quelque chose que je ressentais depuis longtemps sans parvenir à l'expliquer.",
    attribution: "Dirigeant de PME — témoignage anonymisé",
    position: 1,
  },
  {
    headline: "Je ne me suis jamais sentie jugée.",
    body:
      "Quand on dirige une entreprise, tout le monde donne son avis. Les banques. Les partenaires. Les proches. Les salariés. Avec Téféry, j'ai eu l'impression, pour la première fois depuis longtemps, de pouvoir réfléchir sans avoir besoin de me justifier. Cette qualité d'écoute est probablement ce qui m'a le plus marquée.",
    attribution: "Dirigeante de PME — témoignage anonymisé",
    position: 2,
  },
  {
    headline: "Elle m'a redonné le droit d'être ambitieuse.",
    body:
      "Je m'étais fixé des limites sans même m'en rendre compte. Au fil des échanges, j'ai compris que je n'avais pas un problème de compétences. J'avais un problème d'autorisation : je ne m'autorisais plus à voir plus grand. Aujourd'hui, je ne regarde plus mon entreprise de la même manière.",
    attribution: "Dirigeante de PME — témoignage anonymisé",
    position: 3,
  },
];

for (const t of items) {
  await sql`insert into testimonial (headline, body, attribution, position)
            values (${t.headline}, ${t.body}, ${t.attribution}, ${t.position})`;
}
console.log(`${items.length} témoignages insérés.`);
await sql.end();
