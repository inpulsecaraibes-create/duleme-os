// Cas réels (anonymisés) — la preuve la plus forte du cabinet.
// Partagés entre la home et la page DISCERNER pour rester cohérents.

export type Case = {
  metier: string;
  croyait: string;
  realite: string;
  resultat: string;
};

export const CASES: Case[] = [
  {
    metier: "Dirigeant d'une salle de sport",
    croyait: "« J'ai un problème de marketing — je dois surtout réduire mes coûts. »",
    realite:
      "Le vrai sujet n'était pas le marketing. Il faisait le travail de son équipe et n'occupait plus sa place de dirigeant. Une seule question a tout changé : « Tu es l'ami de ton équipe, ou leur dirigeant ? »",
    resultat:
      "Il a repris sa place, posé des limites, retrouvé du temps pour sa famille — et porte aujourd'hui un projet à 1 à 2 millions d'euros.",
  },
  {
    metier: "Consultante indépendante",
    croyait: "« Je manque de clients, il faut que j'en trouve plus. »",
    realite:
      "En une heure, elle a compris que le problème n'était pas le nombre de clients, mais la valeur qu'elle accordait à son propre travail.",
    resultat:
      "Elle a doublé ses tarifs et attiré des clients qui reconnaissaient enfin la valeur de son expertise.",
  },
  {
    metier: "Fondatrice d'une application",
    croyait: "« J'ai un problème de communication : je n'arrive pas à expliquer mon activité. »",
    realite:
      "En quelques heures, le vrai sujet est apparu : elle ne savait pas réellement quel problème son produit résolvait.",
    resultat:
      "Business model repensé, proposition de valeur clarifiée — elle présente enfin son activité avec simplicité et confiance.",
  },
];
