// Le Premier Regard™ — contenu des 8 situations (pré-écrit, voix de Téféry).
// « Ce document ne contient pas des réponses. Il rassemble les questions qui
//   méritent désormais votre attention. »

export const PR_HEADER =
  "Ce document ne contient pas des réponses. Il rassemble les questions qui méritent désormais votre attention.";

export const INTRO_TITLE = "Faisons un pas de côté.";
export const INTRO_TEXT =
  "La plupart des dirigeants que je rencontre s'épuisent à régler les urgences de la semaine en pensant s'attaquer à la source de leurs blocages. Pourtant, un problème de trésorerie, un agenda saturé ou une équipe sous tension ne sont presque jamais des fatalités : ce sont des signaux d'alarme.\n\nPrenons trois minutes pour faire un pas de côté et poser un regard lucide, sans fard, sur votre activité. Pas de grands discours théoriques, juste un échange sincère pour identifier là où votre énergie se perd.";

export const REVENUE_RANGES = [
  "Moins de 100 k€",
  "100 – 250 k€",
  "250 – 500 k€",
  "500 k€ – 1 M€",
  "Plus d'1 M€",
];
export const REMUNERATION_RANGES = [
  "Moins de 1 500 € net / mois",
  "1 500 – 3 000 € net / mois",
  "3 000 – 5 000 € net / mois",
  "Plus de 5 000 € net / mois",
];

// Écran de fin
export const END_EYEBROW = "Vos 3 pistes de réflexion";
export const END_INTRO =
  "Au vu de vos réponses, votre situation met en lumière trois angles sur lesquels il vaut la peine de vous pencher.";
export const CTA_HEADLINE = "Et maintenant ?";
export const CTA_TEXT =
  "Le Premier Regard™ a mis en lumière plusieurs points qui méritent votre attention. À ce stade, il serait prématuré d'en tirer des conclusions. C'est précisément l'objet de DISCERNER™ : vérifier si le problème que vous cherchez aujourd'hui à résoudre est bien celui qui mérite votre énergie, votre temps et vos décisions.";
export const CTA_BUTTON = "Échanger avec Téféry";

export const OPEN_QUESTION =
  "Si nous étions assis ensemble et que vous pouviez me confier votre plus grande frustration actuelle : quel est le vrai problème qui vous empêche de dormir, et qu'est-ce qu'il vous coûte chaque jour, en clarté ou en sérénité ?";

export const CAPTURE_MESSAGE =
  "Merci pour votre confiance et pour la sincérité de vos réponses. Votre situation ne sera pas traitée par un outil automatisé. Pour poursuivre cet échange et recevoir votre Premier Regard™, indiquez-moi simplement vos coordonnées.";

export const METIERS: { label: string; desc: string }[] = [
  {
    label: "Consultant / Prestataire de services / Profession libérale",
    desc: "Je vends principalement mon expertise, mon conseil ou mon temps.",
  },
  {
    label: "Artisan / Créateur",
    desc: "Je fabrique, transforme ou réalise un produit grâce à un savoir-faire technique ou manuel.",
  },
  {
    label: "Commerçant / Restaurateur",
    desc: "Je vends des produits via un point de vente physique, une boutique ou un site e-commerce.",
  },
  {
    label: "Artiste / Auteur",
    desc: "Mon activité repose sur la création artistique, culturelle ou intellectuelle.",
  },
  {
    label: "Dirigeant de TPE / PME",
    desc: "Je dirige une entreprise avec une équipe structurée et j'en pilote le développement.",
  },
  {
    label: "Autre profil",
    desc: "Précisez votre activité en quelques mots.",
  },
];

export type PRQuestion = { q: string; choices: string[] };
export type Situation = {
  id: string;
  label: string;
  hint: string;
  histoire: string;
  questions: [PRQuestion, PRQuestion, PRQuestion];
  pistes: { structure: string; posture: string; risque: string };
};

export const SITUATIONS: Situation[] = [
  {
    id: "grandir",
    label: "Grandir",
    hint: "quand l'entreprise change d'échelle",
    histoire:
      "La plupart des dirigeants croient qu'il leur faut plus : plus de clients, plus d'équipe, plus de moyens. Mais une entreprise qui change d'échelle n'ajoute pas — elle révèle. Elle amplifie ce qui était déjà là : le solide comme le fragile. La vraie question n'est donc pas « comment grandir », mais « qu'est-ce que ma croissance va agrandir ? »",
    questions: [
      {
        q: "Ce qui vous pousse à grandir aujourd'hui, c'est surtout :",
        choices: [
          "une demande que vous n'absorbez plus",
          "une ambition ancienne",
          "une pression extérieure",
          "une fuite en avant que vous n'osez pas nommer",
        ],
      },
      {
        q: "Si votre activité doublait dans six mois, qu'est-ce qui casserait en premier ?",
        choices: ["votre organisation", "votre trésorerie", "votre équipe", "vous"],
      },
      {
        q: "Grandir, pour vous, c'est d'abord :",
        choices: ["plus de chiffre", "plus de liberté", "plus d'impact", "vous ne savez plus vraiment"],
      },
    ],
    pistes: {
      structure:
        "Une organisation qui tenait à votre échelle actuelle ne tiendra pas à la suivante. La croissance n'attend pas que le système soit prêt : elle expose l'endroit exact où il ne l'est pas. Où, chez vous, tout repose encore sur une seule personne ou une seule habitude ?",
      posture:
        "Grandir demande souvent de cesser de faire ce qui vous a fait réussir. On a bâti par le contrôle ; il faut apprendre à bâtir par la confiance. Quelle part de votre réussite d'aujourd'hui vous empêche de passer à l'échelle ?",
      risque:
        "Une croissance mal posée ne se paie pas tout de suite, mais plus tard : en marge érodée, en équipe épuisée, en dirigeant prisonnier d'une machine plus grosse et pas plus libre. Et si la vraie question n'était pas la vitesse de votre croissance, mais sa direction ?",
    },
  },
  {
    id: "recruter",
    label: "Recruter et s'entourer",
    hint: "quand une personne semble devenir la solution",
    histoire:
      "Quand une entreprise fatigue, une idée revient toujours : « il me faut la bonne personne. » On cherche un renfort — un bras droit, un expert, un associé — qui réglerait ce qu'on n'arrive pas à trancher soi-même. Mais une personne ne répare jamais un problème que le dirigeant n'a pas d'abord nommé. Recruter pour combler un vide, c'est souvent déplacer le vide.",
    questions: [
      {
        q: "La personne que vous cherchez doit surtout :",
        choices: [
          "vous décharger",
          "apporter une compétence qui vous manque",
          "décider à votre place",
          "vous rassurer",
        ],
      },
      {
        q: "La dernière fois qu'un recrutement clé a déçu, le problème venait :",
        choices: [
          "de la personne",
          "de ce que vous en attendiez",
          "d'un rôle mal défini",
          "vous ne l'avez jamais vraiment analysé",
        ],
      },
      {
        q: "Ce que vous confieriez à cette personne idéale et à personne d'autre :",
        choices: ["vos décisions", "vos chiffres", "votre vision", "rien, au fond"],
      },
    ],
    pistes: {
      structure:
        "Un recrutement ne crée pas un rôle : il révèle si le rôle existait vraiment. Beaucoup de « mauvais recrutements » sont de bons profils posés sur un poste jamais défini. Le rôle que vous voulez pourvoir est-il écrit, ou seulement ressenti ?",
      posture:
        "Chercher « la » personne-solution, c'est parfois refuser de trancher soi-même. Déléguer une tâche soulage ; déléguer une décision engage. Qu'attendez-vous d'elle que vous pourriez, en réalité, décider vous-même ?",
      risque:
        "S'entourer pour ne pas décider crée une dépendance plus coûteuse que le vide qu'elle comble : le jour où la personne part, le problème revient intact. De qui votre entreprise dépend-elle aujourd'hui plus que de vous ?",
    },
  },
  {
    id: "temps",
    label: "Retrouver du temps",
    hint: "quand le dirigeant devient le goulot d'étranglement",
    histoire:
      "Vous manquez de temps — c'est du moins ce que vous vous dites. Mais un agenda ne déborde jamais par hasard : il déborde parce qu'une décision, quelque part, n'a pas été prise, et que tout s'organise autour de ce vide. La plupart des dirigeants ne manquent pas de temps. Ils manquent d'arbitrage sur ce qu'ils acceptent de porter seuls.",
    questions: [
      {
        q: "Si vous vous absentez trois semaines complètes, quelle décision est immédiatement paralysée ?",
        choices: ["une décision financière", "commerciale", "humaine", "presque toutes"],
      },
      {
        q: "Ce qui remplit vraiment vos journées :",
        choices: [
          "des urgences",
          "des validations que vous seul donnez",
          "des tâches que vous n'avez jamais lâchées",
          "vous ne sauriez pas dire",
        ],
      },
      {
        q: "Le temps que vous voulez récupérer servirait d'abord à :",
        choices: ["souffler", "penser", "développer", "vivre"],
      },
    ],
    pistes: {
      structure:
        "Quand tout remonte à vous, ce n'est pas un problème d'emploi du temps, mais de droit de décider. Vos équipes ont-elles le droit de se tromper ? Si non, vous trancherez tout — et vous manquerez toujours de temps.",
      posture:
        "On confond souvent sa valeur ajoutée avec son volume d'effort. Être indispensable rassure ; cela enferme aussi. Qu'est-ce que vous continuez de porter parce que vous seul savez le faire — et non parce que vous seul devez le faire ?",
      risque:
        "À ce rythme, votre prochaine décision importante ne sera pas prise dans la clarté, mais dans la fatigue. Le manque de temps ne casse pas l'entreprise d'un coup : il abîme la qualité de chaque décision. Laquelle avez-vous déjà prise, épuisé, sans y penser vraiment ?",
    },
  },
  {
    id: "decider-ensemble",
    label: "Décider ensemble",
    hint: "associés, CODIR, équipe, conflits",
    histoire:
      "À plusieurs, on décide rarement mieux : on décide autrement. Ce qui bloque une entreprise dirigée à plusieurs est rarement le désaccord — c'est le non-dit. Les tensions entre associés ou en comité ne portent presque jamais sur le sujet affiché. Elles portent sur ce que personne n'ose mettre sur la table.",
    questions: [
      {
        q: "Le vrai sujet de tension, entre vous, porte sur :",
        choices: ["l'argent", "le pouvoir", "la vision", "un non-dit ancien"],
      },
      {
        q: "Quand une décision importante coince, c'est le plus souvent parce que :",
        choices: [
          "vous n'êtes pas d'accord sur la réponse",
          "pas d'accord sur le problème",
          "personne ne veut trancher",
          "chacun protège son territoire",
        ],
      },
      {
        q: "Ce dont vous n'avez jamais parlé franchement avec votre associé :",
        choices: ["l'avenir", "l'équité", "la confiance", "vous préférez ne pas"],
      },
    ],
    pistes: {
      structure:
        "Décider à plusieurs sans règle du jeu, c'est rejouer chaque décision depuis le début. Qui décide quoi, sur quels sujets, en dernier ressort ? Tant que ce n'est pas posé, chaque arbitrage devient un rapport de force.",
      posture:
        "Un désaccord se traite ; un non-dit s'infecte. Ce que vous taisez pour « préserver » la relation est souvent ce qui la ronge. Quelle conversation repoussez-vous, et depuis combien de temps ?",
      risque:
        "Les entreprises à plusieurs meurent rarement du marché. Elles meurent d'un conflit qu'on a laissé se déguiser en problème d'organisation. Le vrai sujet, entre vous, est-il encore réparable — ou déjà seulement évité ?",
    },
  },
  {
    id: "financer",
    label: "Financer l'avenir",
    hint: "investissements, trésorerie, croissance",
    histoire:
      "L'argent est rarement le vrai problème : il en est souvent la conséquence. Un dirigeant qui cherche un financement pour un modèle fragile ne finance pas son avenir — il prolonge une question qu'il n'a pas tranchée. Avant de se demander « comment financer », il faut oser se demander « qu'est-ce que je cherche vraiment à financer ? »",
    questions: [
      {
        q: "Le financement que vous cherchez servirait d'abord à :",
        choices: ["tenir", "accélérer", "vous rassurer", "éviter une décision plus difficile"],
      },
      {
        q: "Votre tension de trésorerie vient surtout :",
        choices: ["d'un problème de marge", "de modèle", "de rythme", "vous ne savez pas vraiment"],
      },
      {
        q: "Si l'argent n'était pas un sujet demain, la vraie décision à prendre serait :",
        choices: ["changer de modèle", "changer d'échelle", "changer de rôle", "vous y pensez sans oser"],
      },
    ],
    pistes: {
      structure:
        "Un financement pose de l'argent sur un système ; il n'en corrige pas la logique. Si la marge fuit ou si le modèle ne tient pas, l'argent ne fait qu'agrandir la fuite. Qu'est-ce que votre trésorerie dit de votre modèle, que vous préférez ne pas regarder ?",
      posture:
        "Chercher de l'argent est parfois plus confortable que trancher. On s'active, on pitche, on relance — pour ne pas décider. Le financement est-il votre projet, ou votre manière d'éviter une décision ?",
      risque:
        "De l'argent injecté sur une mauvaise question accélère l'erreur au lieu de la corriger. On ne rembourse pas seulement une dette : on rembourse une décision qu'on n'a pas prise à temps. Financez-vous un avenir, ou un report ?",
    },
  },
  {
    id: "transformer",
    label: "Transformer l'organisation",
    hint: "délégation, process, structuration",
    histoire:
      "On rêve de « structurer » comme d'un remède : des process, des outils, un organigramme, et tout irait mieux. Mais une organisation n'est pas un problème technique : c'est le reflet des décisions que son dirigeant répète. Ajouter des process sur une posture inchangée, c'est habiller le désordre. La structure suit la décision — jamais l'inverse.",
    questions: [
      {
        q: "Ce que vous appelez « manque de structure » est en réalité :",
        choices: ["un manque de process", "de décisions claires", "de délégation", "de temps pour y penser"],
      },
      {
        q: "Vos process échouent parce que :",
        choices: [
          "personne ne les suit",
          "ils n'ont jamais été vraiment décidés",
          "vous les court-circuitez vous-même",
          "ils n'existent pas",
        ],
      },
      {
        q: "Déléguer, pour vous, c'est surtout :",
        choices: ["gagner du temps", "perdre le contrôle", "former quelqu'un", "une chose que vous remettez toujours"],
      },
    ],
    pistes: {
      structure:
        "Un process ne tient que s'il repose sur une décision claire : qui décide quoi. Sans cela, chaque règle se contourne — à commencer par vous. Vos process décrivent-ils une organisation réelle, ou une organisation espérée ?",
      posture:
        "Déléguer n'est pas un problème d'outil, c'est une décision sur soi : accepter que ce soit fait autrement que par vous. Qu'est-ce que vous refusez de lâcher — non parce que c'est risqué, mais parce que c'est à vous ?",
      risque:
        "Une entreprise qui se « structure » sans que son dirigeant change de posture finit plus lourde, pas plus libre : le désordre revient, mieux habillé. Cherchez-vous à structurer votre entreprise, ou à éviter de changer votre place dedans ?",
    },
  },
  {
    id: "nouveau-chapitre",
    label: "Ouvrir un nouveau chapitre",
    hint: "pivot, transmission, diversification, acquisition",
    histoire:
      "Il vient un moment où l'on sent qu'un cycle se termine. On veut diversifier, transmettre, acquérir, pivoter. Mais l'envie d'un nouveau chapitre cache souvent une question sur l'ancien : qu'est-ce que je fuis, et qu'est-ce que je veux vraiment construire ? Une direction prise pour de mauvaises raisons n'ouvre pas un chapitre — elle en répète un.",
    questions: [
      {
        q: "Ce nouveau chapitre, vous le voulez d'abord parce que :",
        choices: [
          "l'actuel vous lasse",
          "une opportunité se présente",
          "vous préparez la suite",
          "vous ne savez plus pourquoi vous continuez",
        ],
      },
      {
        q: "Ce que vous appelez diversifier ou pivoter répond surtout à :",
        choices: [
          "un vrai besoin du marché",
          "votre besoin de renouveau",
          "une fuite d'un problème non réglé",
          "vous n'êtes pas sûr",
        ],
      },
      {
        q: "Si vous quittiez votre entreprise dans deux ans, ce qui vous inquiéterait le plus :",
        choices: [
          "qu'elle ne tienne pas sans vous",
          "de ne pas savoir qui vous êtes sans elle",
          "de partir sans avoir construit ce que vous vouliez",
          "vous n'osez pas y penser",
        ],
      },
    ],
    pistes: {
      structure:
        "Un nouveau chapitre s'appuie sur ce qui tient déjà. Une entreprise qui dépend entièrement de son dirigeant ne se transmet pas, ne se diversifie pas sereinement, ne s'acquiert pas sans risque. Ce que vous voulez ouvrir repose-t-il sur des fondations qui vous survivraient ?",
      posture:
        "Ouvrir un chapitre, c'est accepter d'en fermer un — et de renoncer à qui l'on était dedans. Beaucoup de pivots échouent parce que le dirigeant change de projet sans changer de posture. Qu'est-ce que ce nouveau chapitre vous demande de laisser derrière vous ?",
      risque:
        "Une décision de transmission, de pivot ou d'acquisition prise dans la lassitude engage des années. Le prix d'un mauvais chapitre ne se voit pas à l'ouverture, mais à la fin. Ouvrez-vous une direction, ou fuyez-vous la précédente ?",
    },
  },
  {
    id: "ne-sais-pas",
    label: "Je ne sais pas par où commencer",
    hint: "quand tout s'entrechoque",
    histoire:
      "Quand tout s'entrechoque, essayer de thématiser le problème est déjà une erreur. Vous n'avez pas à choisir une case. Le trop-plein n'est pas un manque de clarté : c'est un signal. Il dit qu'il y a, quelque part, une décision que vous portez seul depuis trop longtemps. Commençons par vider le trop-plein — non pour trouver la réponse, mais pour laisser remonter la vraie question.",
    questions: [
      {
        q: "En ce moment, ce que vous ressentez le plus :",
        choices: ["la fatigue", "la confusion", "la solitude", "l'urgence permanente"],
      },
      {
        q: "Si vous ne deviez régler qu'une seule chose ce mois-ci, vous :",
        choices: [
          "ne sauriez pas laquelle",
          "en avez trop",
          "savez laquelle mais l'évitez",
          "attendez que ça se calme",
        ],
      },
      {
        q: "Ce dont vous auriez le plus besoin, là, tout de suite :",
        choices: ["souffler", "y voir clair", "parler à quelqu'un qui comprend", "qu'on vous aide à trancher"],
      },
    ],
    pistes: {
      structure:
        "Quand tout semble prioritaire, c'est souvent qu'aucune décision de fond n'a été prise depuis longtemps. Le désordre n'est pas la cause : il en est la conséquence. Et si une seule décision, tranchée, faisait retomber la moitié du reste ?",
      posture:
        "Ne pas savoir par où commencer n'est pas une faiblesse : c'est souvent le moment le plus lucide, celui où l'on cesse de faire semblant de tout tenir. Qu'est-ce que vous portez seul et que vous n'avez jamais dit à voix haute ?",
      risque:
        "Attendre que « ça se calme » est déjà une décision : celle de laisser la fatigue décider à votre place. Le trop-plein ne se vide pas tout seul. Par quoi, aujourd'hui, accepteriez-vous de commencer ?",
    },
  },
];

export function situationById(id: string): Situation | undefined {
  return SITUATIONS.find((s) => s.id === id);
}
