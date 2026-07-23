// Questionnaires de témoignage — 3 temps sur le cycle de vie client.
// Les questions sont stockées avec les réponses (auto-descriptif), donc le
// back-office n'a pas besoin de connaître ces définitions.

export type SurveyPhase = "t0" | "m1" | "m3";

export const SURVEY_META: Record<
  SurveyPhase,
  { title: string; intro: string }
> = {
  t0: {
    title: "Avant de commencer",
    intro:
      "Quelques mots pour partir du bon endroit. C'est notre point de départ commun — nous y reviendrons plus tard pour mesurer le chemin parcouru.",
  },
  m1: {
    title: "Un mois plus tard",
    intro: "Un premier regard en arrière, à chaud. Rien de formel.",
  },
  m3: {
    title: "Trois mois plus tard",
    intro:
      "Le moment de mesurer le chemin parcouru depuis nos premiers échanges.",
  },
};

export const SURVEY_QUESTIONS: Record<SurveyPhase, string[]> = {
  t0: [
    "Qu'est-ce qui vous a amené à nous solliciter aujourd'hui ?",
    "Qu'est-ce qui, dans votre situation, vous pèse le plus en ce moment ?",
    "Qu'attendez-vous de cette collaboration ?",
    "Quels outils utilisez-vous pour votre comptabilité et votre facturation ? (logiciel, expert-comptable, tableur…)",
    "Utilisez-vous un CRM pour suivre vos clients et prospects ? Si oui, lequel ?",
    "Quel(s) logiciel(s) métier utilisez-vous au quotidien pour votre activité ?",
    "D'autres outils essentiels à votre gestion (RH, projet, stock, caisse, paie…) ?",
  ],
  m1: [
    "Un mois après notre démarrage, qu'est-ce qui a changé dans votre façon de voir votre décision ?",
    "Y a-t-il eu un moment de déclic ? Lequel ?",
    "Comment décririez-vous notre manière de travailler ensemble ?",
  ],
  m3: [
    "Trois mois plus tard, qu'est-ce qui a concrètement changé pour vous ?",
    "Si vous deviez expliquer à un autre dirigeant ce que cette collaboration vous a apporté, que diriez-vous ?",
    "Une phrase que vous garderiez de cette expérience ?",
  ],
};

export function isSurveyPhase(v: string): v is SurveyPhase {
  return v === "t0" || v === "m1" || v === "m3";
}
