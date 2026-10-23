# Time2Meet

Time2Meet est une application web qui a pour objectif d'aider les groupes d'amis à organiser des sorties ensemble en trouvant une activité ou une date qui convient au plus grand nombre.

## Fonctionnalités

L'application permet de :

- Créer un espace de discussion et d'organisation appelé « salle ».
- Partager une salle avec ses amis grâce à un code unique.
- Créer des sondages à choix multiples.
- Ajouter plusieurs propositions à un sondage.
- Voter pour une ou plusieurs propositions et annuler son vote.
- Visualiser le nombre de votes pour chaque proposition.

## Technologies utilisées

- **Backend :** AdonisJS 6
- **Frontend :** React
- **Navigation et liaison frontend/backend :** Inertia.js
- **Langage :** TypeScript
- **Base de données :** SQLite
- **ORM :** Lucid

## Installation et lancement

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer l'environnement

Vérifier que le fichier `.env` est présent et que les variables d'environnement nécessaires sont correctement configurées.

### 3. Exécuter les migrations

```bash
node ace migration:run
```

### 4. Démarrer l'application

```bash
npm run dev
```

L'application est ensuite accessible à l'adresse locale indiquée dans le terminal.

## Retour sur l'utilisation de l'intelligence artificielle

L'intelligence artificielle a été utilisée comme outil d'aide au développement de Time2Meet.

Elle m'a accompagné dans l'écriture du code TypeScript, la compréhension des erreurs de typage et leur correction, ainsi que dans la mise en place de certaines fonctionnalités, notamment les sondages et la gestion des votes.

Son utilisation a permis de gagner du temps et de mieux comprendre certains concepts. Cependant, certaines propositions de code ont nécessité des vérifications et des corrections, notamment pour résoudre des erreurs de typage et assurer la cohérence entre le backend et le frontend.

