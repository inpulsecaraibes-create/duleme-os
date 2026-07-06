GUIDE DE DÉVELOPPEMENT
DULEME OS
Version 1.0

1. Objet
Ce document définit les règles de développement de DULEME OS.
Il garantit la cohérence du code, la qualité du logiciel et la maintenabilité du projet.
Ces règles s'appliquent à tout nouveau développement.
En cas de contradiction avec le PRD, le PRD prévaut.

2. Objectifs
Le développement de DULEME OS doit produire un logiciel :
robuste ;
maintenable ;
évolutif ;
performant ;
sécurisé ;
indépendant des fournisseurs externes.
La simplicité est toujours privilégiée.

3. Architecture
Architecture générale
Le projet est construit selon une architecture modulaire.
Chaque module possède une responsabilité unique.
Les modules communiquent uniquement par des interfaces clairement définies.
Aucun module ne dépend directement du fonctionnement interne d'un autre module.

Découpage
/apps
   web
   admin
   client

/packages
   ui
   database
   auth
   relationship
   decision
   mission
   dossier
   content
   assistant
   notifications
   analytics

/docs

/database

/public

Règles
un module = une responsabilité ;
aucun code métier dans l'interface utilisateur ;
aucune dépendance circulaire ;
composants réutilisables ;
séparation claire entre métier, interface et infrastructure.

4. Qualité du code
Tout développement doit être :
lisible ;
documenté ;
testé ;
réutilisable.
Le code est écrit pour être compris par un développeur dans cinq ans.

Interdictions
Ne jamais :
dupliquer du code ;
créer une fonction inutilement complexe ;
dépasser plusieurs centaines de lignes dans un composant sans justification ;
laisser du code mort ;
commenter du code supprimé.

Documentation
Chaque module possède un README contenant :
objectif ;
responsabilités ;
dépendances ;
limites ;
évolutions prévues.

5. Conventions
Nommage
Utiliser un vocabulaire cohérent.
Exemples :
Relationship
Decision
Mission
Content
Dossier
Éviter :
Stuff
Data2
Temp
NewFile
TestFinalV2

Langue
Le code est écrit en anglais.
Le contenu affiché aux utilisateurs est en français.

Structure
Une fonctionnalité = un dossier.
Chaque dossier contient :
Component

Hooks

Services

Types

Tests

Git
Branches :
main

develop

feature/*

fix/*

hotfix/*
Aucun développement direct sur main.

6. Base de données
Toute modification passe par une migration.
Aucune modification directe en production.
Chaque table possède :
id ;
created_at ;
updated_at.
Les suppressions sont logiques (soft delete) lorsque nécessaire.

7. API
Toutes les API sont documentées.
Chaque endpoint précise :
objectif ;
paramètres ;
permissions ;
réponses ;
erreurs possibles.
Aucune API ne doit exposer des données inutiles.

8. Sécurité
Toutes les communications utilisent HTTPS.
Les secrets sont stockés dans des variables d'environnement.
Aucune clé API dans le dépôt Git.

Authentification
Connexion sécurisée.
Gestion des rôles.
Permissions côté serveur.
Expiration des sessions.

Données
Chaque utilisateur n'accède qu'aux données auxquelles il est autorisé.
Les exports sont tracés.
Les suppressions importantes sont journalisées.

9. Performance
Objectifs :
Dashboard < 2 secondes.
Recherche < 1 seconde.
Chargement d'une fiche < 1 seconde.
Les performances sont vérifiées avant chaque mise en production.

10. Tests
Chaque nouvelle fonctionnalité comprend :
tests unitaires ;
tests d'intégration ;
tests fonctionnels si nécessaire.
Une fonctionnalité non testée n'est pas considérée comme terminée.

11. Journalisation
Le système enregistre :
connexions ;
erreurs ;
exports ;
suppressions ;
automatisations ;
synchronisations.
Les journaux doivent permettre de comprendre un incident.

12. Sauvegardes
Sauvegardes automatiques.
Possibilité de restauration.
Les procédures de restauration sont documentées et testées.

13. Dépendances
Avant d'ajouter une bibliothèque externe, vérifier :
qu'elle répond à un besoin réel ;
qu'elle est maintenue ;
que son remplacement est possible ;
qu'elle ne crée pas une dépendance inutile.

14. Définition de terminé (Definition of Done)
Une fonctionnalité est terminée lorsque :
le PRD est respecté ;
les tests passent ;
le code est documenté ;
les performances sont conformes ;
la sécurité est vérifiée ;
l'accessibilité est respectée ;
le responsive fonctionne ;
le code a été relu.

15. Évolutivité
Le système doit permettre :
d'ajouter un nouveau module sans modifier les autres ;
de remplacer un fournisseur externe ;
d'ajouter un nouveau type de contenu ;
d'ajouter un nouveau type de mission ;
d'ajouter un nouveau connecteur.
Le coût d'évolution doit rester faible.

16. Règles spécifiques à DULEME OS
Le développement doit toujours respecter les principes suivants :
Une donnée est saisie une seule fois.
Les données restent exportables.
Les modules restent indépendants.
Les automatisations sont désactivables.
L'IA propose, l'humain valide.
Les choix techniques ne doivent jamais enfermer DULEME AND CIE dans un fournisseur unique.
Toute évolution doit préserver le patrimoine intellectuel du cabinet.

