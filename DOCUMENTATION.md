# Documentation du projet Todo App

## Racine du projet

| Fichier | Rôle |
|---------|------|
| `package.json` | Liste des dépendances et scripts du projet (dev, build, start, lint) |
| `tsconfig.json` | Configuration TypeScript (règles de compilation) |
| `next.config.ts` | Configuration de Next.js |
| `postcss.config.mjs` | Configuration PostCSS pour Tailwind CSS |
| `eslint.config.mjs` | Configuration du linter ESLint |
| `components.json` | Configuration des composants shadcn/ui |
| `next-env.d.ts` | Types automatiques de Next.js (ne pas modifier) |

---

## Dossier `app/` — Pages et routes

| Fichier | Rôle |
|---------|------|
| `app/layout.tsx` | Layout principal (Police Manrope, Navbar, AuthProvider) |
| `app/page.tsx` | Page d'accueil → redirige vers `/auth/login` |
| `app/globals.css` | Styles globaux (variables CSS, thème shadcn) |
| `app/auth/login/page.tsx` | Page de connexion |
| `app/auth/register/page.tsx` | Page d'inscription |
| `app/dashboard/page.tsx` | Page du tableau de bord (tâches) |

---

## Dossier `features/` — Logique métier

### `features/auth/` — Authentification

| Fichier | Rôle |
|---------|------|
| `types.ts` | Types : `User`, `AuthState`, `LoginCredentials`, `RegisterCredentials` |
| `useAuth.ts` | Hook : `login()`, `register()`, `logout()` avec localStorage |

### `features/tasks/` — Gestion des tâches

| Fichier | Rôle |
|---------|------|
| `types.ts` | Type : `Task` (id, titre, description, isDone, createdAt) |
| `data.ts` | Données mockées de départ (2 tâches d'exemple) |
| `useTasks.ts` | Hook : `addTask()`, `deleteTask()`, `toggleTask()`, `updateTask()`, filtres |

---

## Dossier `components/` — Composants UI

### `components/ui/` — Composants shadcn (bases)

| Fichier | Rôle |
|---------|------|
| `button.tsx` | Bouton (variantes: default, outline, ghost, destructive, link) |
| `card.tsx` | Carte (Card, CardHeader, CardContent, CardFooter...) |
| `input.tsx` | Champ de saisie texte |
| `label.tsx` | Étiquette pour champs de formulaire |

### `components/shared/` — Composants réutilisables

| Fichier | Rôle |
|---------|------|
| `Navbar.tsx` | Barre de navigation (affiche après connexion, masquée sur login/register) |
| `Modal.tsx` | Fenêtre modale avec overlay (backdrop) |
| `EmptyState.tsx` | État vide quand la liste de tâches est vide |

### `components/features/auth/` — Composants d'authentification

| Fichier | Rôle |
|---------|------|
| `LoginForm.tsx` | Formulaire de connexion (email + mot de passe) |
| `RegisterForm.tsx` | Formulaire d'inscription (nom + email + mot de passe + confirmation) |

### `components/features/tasks/` — Composants de tâches

| Fichier | Rôle |
|---------|------|
| `TaskCard.tsx` | Carte d'une tâche (titre, description, date, boutons Modifier/Supprimer) |
| `TaskList.tsx` | Liste des tâches (utilise TaskCard + EmptyState) |
| `TaskForm.tsx` | Formulaire d'ajout/édition de tâche |
| `TaskFilter.tsx` | Boutons de filtre (Toutes / En cours / Terminées) |

---

## Dossier `libs/` — Hooks et utilitaires

| Fichier | Rôle |
|---------|------|
| `hooks/useAuthContext.tsx` | Contexte React pour partager l'auth dans toute l'app |

---

## Dossier `lib/` — Utilitaires

| Fichier | Rôle |
|---------|------|
| `utils.ts` | Fonction `cn()` pour fusionner les classes CSS |

---

## Dossier `hooks/` — Hooks personnalisés

| Fichier | Rôle |
|---------|------|
| `useLocalStorage.ts` | Hook pour sauvegarder des données dans localStorage |

---

## Flux de l'application

```
1. Utilisateur ouvre l'app
   → Redirigé vers /auth/login

2. Pas de compte ?
   → Clique sur "S'inscrire" → /auth/register
   → Remplit le formulaire → Redirigé vers /auth/login

3. Connexion
   → Remplit email + mot de passe → Redirigé vers /dashboard

4. Dashboard
   → Voit la liste des tâches
   → Peut ajouter/modifier/supprimer/marquer terminée
   → Peut filtrer (Toutes / En cours / Terminées)

5. Déconnexion
   → Clique sur "Déconnexion" → Redirigé vers /
```
