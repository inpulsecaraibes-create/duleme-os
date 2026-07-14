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
export const END_EYEBROW = "Vos hypothèses de réflexion";
export const END_INTRO =
  "Au regard de vos réponses, trois hypothèses attirent mon attention. Ce ne sont pas des conclusions — mais des angles qu'il vaut la peine d'explorer.";
export const CTA_HEADLINE = "Et maintenant ?";
export const CTA_TEXT =
  "Le Premier Regard™ ne donne pas de réponses : il fait émerger de meilleures questions. Si vous souhaitez poursuivre cette réflexion, je vous propose un premier échange confidentiel de 20 minutes. Nous vérifierons ensemble si la décision qui vous préoccupe aujourd'hui est bien celle qui mérite votre attention — et si DISCERNER™ est la bonne étape pour vous.";
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
export type Piste = { titre: string; hypothese: string; question: string };
export type Situation = {
  id: string;
  label: string;
  hint: string;
  histoire: string;
  questions: [PRQuestion, PRQuestion, PRQuestion];
  pistes: [Piste, Piste, Piste];
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
    pistes: [
      {
        titre: "La structure",
        hypothese:
          "Au regard de vos réponses, il est possible que ce qui vous freine tienne moins à un manque de moyens qu'à une organisation encore construite pour votre échelle actuelle. C'est une hypothèse, pas une conclusion.",
        question:
          "Où, dans votre entreprise, tout repose-t-il encore sur une seule personne ou une seule habitude ?",
      },
      {
        titre: "Votre posture",
        hypothese:
          "Il est possible que grandir vous demande surtout de cesser de faire ce qui vous a fait réussir jusqu'ici.",
        question:
          "Quelle part de votre réussite d'aujourd'hui pourrait vous empêcher de passer à l'échelle ?",
      },
      {
        titre: "Le véritable risque",
        hypothese:
          "Ce qui semble urgent — accélérer — n'est peut-être pas le plus important. Une croissance mal posée se paie plus tard.",
        question:
          "Si vous ne changiez rien pendant six mois, votre croissance vous rendrait-elle plus libre, ou plus prisonnier ?",
      },
    ],
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
    pistes: [
      {
        titre: "La structure",
        hypothese:
          "Au regard de vos réponses, il est possible que le sujet qui vous préoccupe soit moins lié aux personnes qu'à la manière dont votre entreprise est organisée. C'est une hypothèse, pas une conclusion.",
        question:
          "Si vous ne recrutiez personne demain, quel problème resterait exactement le même ?",
      },
      {
        titre: "Votre posture",
        hypothese:
          "Il est possible que la difficulté ne soit pas uniquement dans la personne à trouver, mais dans une décision que vous préférez confier plutôt que trancher.",
        question:
          "Qu'attendez-vous de cette personne que vous pourriez, en réalité, décider vous-même ?",
      },
      {
        titre: "Le véritable risque",
        hypothese:
          "Ce qui semble urgent — renforcer l'équipe — cache peut-être un risque plus grand : créer une dépendance de plus.",
        question:
          "Si vous ne changiez rien pendant six mois, de qui votre entreprise dépendrait-elle encore plus qu'aujourd'hui ?",
      },
    ],
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
    pistes: [
      {
        titre: "La structure",
        hypothese:
          "Il est possible que ce que vous vivez ne soit pas un problème d'emploi du temps, mais de droit de décider : tout remonte à vous. C'est une hypothèse, pas une conclusion.",
        question:
          "Vos équipes ont-elles le droit de se tromper — ou devez-vous tout valider vous-même ?",
      },
      {
        titre: "Votre posture",
        hypothese:
          "Il est possible que vous confondiez votre valeur avec votre volume d'effort, et que rester indispensable vous rassure autant que cela vous enferme.",
        question:
          "Qu'est-ce que vous continuez de porter parce que vous seul savez le faire — et non parce que vous seul devez le faire ?",
      },
      {
        titre: "Le véritable risque",
        hypothese:
          "Ce qui semble urgent occupe tout ; mais le vrai risque est ailleurs : la qualité de vos décisions s'abîme dans la fatigue.",
        question:
          "Si rien ne changeait pendant six mois, quelle décision importante finiriez-vous par prendre, épuisé, sans y penser vraiment ?",
      },
    ],
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
    pistes: [
      {
        titre: "La structure",
        hypothese:
          "Il est possible que ce qui bloque ne soit pas le désaccord, mais l'absence de règle du jeu : qui décide quoi, en dernier ressort. C'est une hypothèse, pas une conclusion.",
        question:
          "Sur les décisions qui comptent, savez-vous précisément qui tranche ?",
      },
      {
        titre: "Votre posture",
        hypothese:
          "Il est possible que le vrai sujet ne soit pas sur la table : un non-dit se traite bien plus difficilement qu'un désaccord.",
        question: "Quelle conversation repoussez-vous, et depuis combien de temps ?",
      },
      {
        titre: "Le véritable risque",
        hypothese:
          "Ce qui semble être un problème d'organisation cache parfois un conflit qu'on préfère déguiser.",
        question:
          "Si rien ne changeait pendant six mois, ce qui vous sépare serait-il encore réparable, ou seulement évité ?",
      },
    ],
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
    pistes: [
      {
        titre: "La structure",
        hypothese:
          "Il est possible que l'argent ne soit pas le problème, mais la conséquence : un financement pose de l'argent sur un système, il n'en corrige pas la logique. C'est une hypothèse, pas une conclusion.",
        question:
          "Qu'est-ce que votre trésorerie dit de votre modèle, que vous préférez ne pas regarder ?",
      },
      {
        titre: "Votre posture",
        hypothese:
          "Il est possible que chercher un financement soit, en partie, une manière de ne pas trancher une décision plus difficile.",
        question: "Le financement est-il votre projet — ou votre façon d'éviter une décision ?",
      },
      {
        titre: "Le véritable risque",
        hypothese:
          "Ce qui semble urgent — trouver l'argent — peut accélérer une erreur au lieu de la corriger.",
        question:
          "Si rien ne changeait pendant six mois, financeriez-vous un avenir, ou un report ?",
      },
    ],
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
    pistes: [
      {
        titre: "La structure",
        hypothese:
          "Il est possible que ce que vous appelez « manque de structure » soit d'abord un manque de décisions claires : un process ne tient que s'il repose sur un « qui décide quoi ». C'est une hypothèse, pas une conclusion.",
        question:
          "Vos process décrivent-ils une organisation réelle, ou une organisation espérée ?",
      },
      {
        titre: "Votre posture",
        hypothese:
          "Il est possible que déléguer ne soit pas un problème d'outil, mais une décision sur vous-même : accepter que ce soit fait autrement que par vous.",
        question:
          "Qu'est-ce que vous refusez de lâcher — non parce que c'est risqué, mais parce que c'est à vous ?",
      },
      {
        titre: "Le véritable risque",
        hypothese:
          "Ce qui semble structurant peut, sans changement de posture, rendre l'entreprise plus lourde et pas plus libre.",
        question:
          "Cherchez-vous à structurer votre entreprise, ou à éviter de changer votre place dedans ?",
      },
    ],
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
    pistes: [
      {
        titre: "La structure",
        hypothese:
          "Il est possible que ce nouveau chapitre s'appuie sur des fondations encore trop dépendantes de vous. C'est une hypothèse, pas une conclusion.",
        question:
          "Ce que vous voulez ouvrir reposerait-il sur des bases qui vous survivraient ?",
      },
      {
        titre: "Votre posture",
        hypothese:
          "Il est possible que ce chapitre vous demande surtout de renoncer à qui vous étiez dans le précédent.",
        question: "Qu'est-ce que ce nouveau chapitre vous demande de laisser derrière vous ?",
      },
      {
        titre: "Le véritable risque",
        hypothese:
          "Ce qui semble une opportunité peut, prise dans la lassitude, n'être qu'une fuite déguisée.",
        question:
          "Si rien ne changeait pendant six mois, ouvririez-vous une direction — ou fuiriez-vous la précédente ?",
      },
    ],
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
    pistes: [
      {
        titre: "La structure",
        hypothese:
          "Il est possible que le trop-plein ne soit pas la cause, mais la conséquence : aucune décision de fond n'a été tranchée depuis longtemps. C'est une hypothèse, pas une conclusion.",
        question:
          "Et si une seule décision, prise pour de bon, faisait retomber la moitié du reste ?",
      },
      {
        titre: "Votre posture",
        hypothese:
          "Il est possible que ne pas savoir par où commencer soit, en réalité, le moment le plus lucide : celui où l'on cesse de faire semblant de tout tenir.",
        question:
          "Qu'est-ce que vous portez seul et que vous n'avez jamais dit à voix haute ?",
      },
      {
        titre: "Le véritable risque",
        hypothese:
          "Ce qui ressemble à « attendre que ça se calme » est déjà une décision : laisser la fatigue décider à votre place.",
        question:
          "Si rien ne changeait pendant six mois, qu'est-ce qui vous coûterait le plus cher ?",
      },
    ],
  },
];

export function situationById(id: string): Situation | undefined {
  return SITUATIONS.find((s) => s.id === id);
}
