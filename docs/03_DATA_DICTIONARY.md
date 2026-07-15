DATA DICTIONARY
DULEME OS

Version : 1.0

1. Objet

Ce document décrit l'ensemble des objets métier manipulés par DULEME OS.

Il constitue la référence officielle de la structure des données.

Toute évolution de la base de données doit être documentée ici avant son implémentation.

2. Principes

Toutes les données respectent les règles suivantes :

Une donnée est créée une seule fois.
Une donnée possède un propriétaire unique.
Les relations entre les objets sont explicites.
Toutes les données sont historisées lorsque cela est pertinent.
Toutes les données sont exportables.
Les suppressions critiques sont logiques (Soft Delete).
3. Objets métier

DULEME OS repose sur les objets suivants :

Objet	Description
Contact	Une personne connue du cabinet
Entreprise	Une organisation liée à un ou plusieurs contacts
Mission	Un accompagnement réalisé par DULEME AND CIE
Décision	Une décision stratégique suivie par le cabinet
Dossier DULEME	Livrable produit pendant une mission
Rendez-vous	Rencontre physique ou visio
Interaction	Toute interaction avec un contact
Tâche	Action à réaliser
Document	Fichier associé à un objet
Contenu	Publication ou ressource éditoriale
Concept	Élément du patrimoine intellectuel DULEME
Conférence	Intervention publique
Témoignage	Retour d'expérience d'un client
Notification	Information destinée à un utilisateur
Utilisateur	Personne disposant d'un accès à DULEME OS
4. Objet Contact
Description

Représente une personne connue de DULEME AND CIE.

Champs
Champ	Type	Obligatoire
id	UUID	Oui
prénom	Texte	Oui
nom	Texte	Oui
email	Texte	Non
téléphone	Texte	Non
fonction	Texte	Non
linkedin	URL	Non
origine	Enum	Oui
statut	Enum	Oui
entreprise_id	UUID	Non
created_at	DateTime	Oui
updated_at	DateTime	Oui
Relations

Un Contact :

appartient à une Entreprise (optionnel) ;
possède plusieurs Interactions ;
peut avoir plusieurs Missions ;
peut être lié à plusieurs Décisions ;
peut participer à plusieurs Rendez-vous.
5. Objet Entreprise
Champs
id
nom
secteur
effectif
chiffre_affaires
site_web
pays
ville
description
created_at
updated_at
Relations

Une Entreprise :

possède plusieurs Contacts ;
possède plusieurs Missions ;
possède plusieurs Décisions ;
possède plusieurs Documents.
6. Objet Mission
Champs
id
numéro
type
statut
entreprise_id
responsable_id
date_début
date_fin
prix
created_at
updated_at
Relations

Une Mission :

appartient à une Entreprise ;
possède plusieurs Rendez-vous ;
possède plusieurs Décisions ;
possède un Dossier DULEME ;
possède plusieurs Documents.
7. Objet Décision
Champs
id
titre
contexte
statut
priorité
entreprise_id
mission_id
responsable_id
date_décision
date_revue
created_at
updated_at
Relations

Une Décision :

appartient à une Mission (optionnel) ;
appartient à une Entreprise ;
possède plusieurs Documents ;
possède plusieurs Actions ;
possède plusieurs Rendez-vous.
8. Objet Dossier DULEME
Champs
id
numéro
mission_id
version
statut
date_validation
created_at
updated_at
Relations

Le Dossier :

appartient à une Mission ;
contient plusieurs Décisions ;
contient plusieurs Documents.
9. Objet Rendez-vous
Champs
id
titre
date
heure
durée
google_event_id
mission_id
décision_id
compte_rendu
transcription
created_at
updated_at
Relations

Un Rendez-vous :

appartient à une Mission (optionnel) ;
peut être lié à une Décision ;
possède plusieurs Participants.
10. Objet Interaction

Historique des échanges.

Types :

Email
Téléphone
Visio
Réunion
Networking
LinkedIn
WhatsApp
11. Objet Document
Champs
id
nom
type
url
taille
propriétaire
created_at

Un document peut être lié à plusieurs objets.

12. Objet Contenu

Types :

Article
Newsletter
LinkedIn
Instagram
Citation
Schéma
Conférence
Champs
titre
slug
résumé
contenu_markdown
statut
auteur
date_publication
13. Objet Concept

Exemples :

Faux Dilemme
Décision Critique
Question DULEME
Champs
nom
description
catégorie
version
statut
14. Objet Conférence
Champs
titre
date
lieu
organisateur
description
documents
15. Objet Témoignage
Champs
client
mission
texte
note
autorisation
anonymisé
16. Objet Utilisateur
Types
Administrateur
Collaborateur
Client
17. Objet Notification

Types :

Information
Rappel
Validation
Erreur
Succès
18. Énumérations
Statut Mission
Brouillon
Proposition
Acceptée
En cours
Terminée
Archivée
Statut Décision
À analyser
En cours
Validée
Reportée
Abandonnée
Origine Contact
Site
LinkedIn
Conférence
Recommandation
Networking
Newsletter
Autre
19. Relations principales
Entreprise
│
├── Contacts
│
├── Missions
│     │
│     ├── Rendez-vous
│     ├── Décisions
│     ├── Documents
│     └── Dossier DULEME
│
└── Décisions
20. Règles métier
Une entreprise peut exister sans mission.
Une mission appartient toujours à une entreprise.
Une décision peut exister sans mission.
Un rendez-vous peut être lié à une mission, une décision ou les deux.
Un document peut être partagé entre plusieurs objets.
Un contenu n'est jamais dupliqué.
Les suppressions critiques sont logiques.
Toutes les modifications importantes sont historisées.