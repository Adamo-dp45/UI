### Angular `angular.dev` - Un framework client basé sur typescript 

- npm install -g @angular/cli
- ng new <project-name>
- npm start | ng serve

- **Command**
    > ng g c <component-name> | ng generate component .. : Permet de générer un composant, `--skip-tests` pour ne pas généré le fichier de test
    > ng generate environments : !! les fichiers d'environnements
    > ng g s <service-name> | .. service .. : !! un service
    > ng g p <pipe>: !! une pipe
    > ng build : Pour builder le projet vers un dossier `dist/`
    > ng test : !! exécuter les tests via `vitest`
        > ng e2e : !! end to end
    > ng generate --help

- **Important !!**
    > Le fichier de configuration `angular.json` va contenir en clé `projects` chaque projet qu'on vas crée
    > !! `tsconfig.app.json` une configuration qui hérite du `tsconfig.json`
    > !! `main.ts` le point d'entrée de l'application
    > !! `app.ts` le composant racine qui contient des références qui permettent de bien compilé les composants
        > !! `app.config.ts` la configuration globale de l'application
        > !! `app.routes.ts` !! pour les routes
        > !! `app.spec.ts` !! les tests
    > Pour utiliser un composant dans un autre on l'importe dans `imports` et on l'affiche via son `selector`
    > Si on écris du css dans le fichier `css` du composant elle est spécifique au composant
    > Dans la phase de compilation angular se base sur `angular.json`, si on modifie le `angular.json` on doit relancer l'application
    > On a une extension `Angular Language Service`
    > !! ajouter une configuration pour `prettier` dans `package.json` - `scripts/format` et `prettier`
    > Vu que par défaut on a pas de `SEO-Friendly` il a été compensé par le `SSR`

- **Cursus**
    > Les bases
        > Le `binding` permet de lier une propriété d'un composant à un attribut html `app.html`
        > Les `input` et `output` permet au composant parent et enfant d'échanger des données
            > `input` pour passer des données d'un composant parent à son enfant `test.ts`, `prompt-list.ts`
            > `output` .. d'un enfant vers son parent `test.ts`
        > Les flux de contrôle ou directives permettent de modifier l'apparence `Attribute Directive` ou la structure `Structural Directive` d'un élément du dom, angular nous fourni des directives.. 
            > Le Structural Directive `@if..@else if..@else`, `@for..@empty`, `@switch..@case`
            > Le Attribute Directive `ngClass` pour modifier la class d'un élément de façon dynamique, `ngStyle` !! le style d'un élément.., `ngModel` permet de faire le binding avec un élément de formulaire afin de gardé la valeur dans une variable, `ngSrc` pour optimiser le chargement des images
    > Les librairies ux ui
        > PrimeNG `npm install primeng @primeuix/themes primeicons primeflex`
        > primeflex `npm install primeflex` : Utility css pour primeng ou intégré `tailwind` de primeng
        > Pour importer `primeng` dans `app.config.ts`
            > !! changer le thème par défaut `Aura` et le `darkmode` on l'a fais dans `app.config.ts`
        > !! le style `primeicons` et `primeflex` dans `style.css`
    > Les services et injection de dépendances, pour éviter que chaque composant fasse un appel au backend pour récupérer les données on vas utiliser un service personnalisé qui permet à plusieurs composants qui utilisent la même données dans un service, dans `prompt-service.ts` et `prompt-list.ts`
        > On a des services pour le router, requête http, etc..
        > Pour générer les fichiers d'environnements `src/environments..` on aura `environment.ts` pour la production et `environment.development` pour le développement `prompt-service.ts`
            > ng generate environments
    > Les routes et formulaires
        > Si on utilise le router ça va injecter chaque composant à un endroit de l'application via `router-outlet` et va faire le lien entre les urls et les composants à afficher donc on aura plus besoin de code en dur quel composant on vas utiliser dans le `app.ts` et `app.html`, dans `app.routes.ts`
        > !! le formuliare `ng g c ..-form --skip-tests` ensuite `prompt-form.ts`
        > Pour récupérer les données d'un formulaire on a utilisé les `reactives forms` mais on a aussi `signal fomrs`..
    > L'authentification
        > Pour envoyer le token dans les requêtes on a utiliser un `Http interceptor` via `auth-interceptor.ts`
            > ng generate interceptor auth/auth --skip-tests
        > !! persister l'état de connexion de l'utilisateur vu qu'on a le `set-Cookie` dans le navigateur, dans `auth-service.ts` - `loadCurrentUser()`
        > !! protéger les routes réservées aux utilisateurs authentifiés on a utiliser le système de `Guard`
            > ng generate guard auth/auth --skip-tests
                > `CanActivate` si on donne l'autorisation ou pas d'activer une route
                > `CanActivateChild`..
    > Helper
        > Les `pipes` permettent de réaliser des transformations de données, utile pour formater des devises ou dates `app.ts`
        > Le `dark mode` dans `navbar.ts`
        > Pour les messages `flash` on a utiliser le composant `toast` de `primeng`, dans `app.config.ts` - `MessageService` puis dans `app.html` et on l'a utiliser `prompt-card.ts` - `copyToClipboard()`
        > !! une gestion d'erreur explicite on l'a géré dans le `auth-form.ts`
        > !! gérer le chargement on a testé en ajoutant un délai à nos appel http dans `prompt-service.ts` via `.pipe(delay)` donc pour y remédier on vas ajouter un `loader` pour indiquer le chargement à l'utilisateur `prompt-list.ts` et `prompt-form.ts`
        > Pour les store on a `NgNeat` qui est un state management légé et produit `@ngneat/until-destroy` pour la gestion automatique des subscriptions, `@ngneat/transloco` i18n, `@ngneat/query` comme `React Query` pour angular, là ou `NgRx` demande beaucoup de boilerplate
    > Les autres notions.. `Signal Queries`, `Lazy loading`, `Resolvers`

- **Le backend**
    > npm run start : Pour ouvrir le port sans la partie authentification
    > npm run start:auth : !! avec la partie authentification















Le problème est dans ta logique de guard ! Tu protèges la route `/auth` avec `authGuard`, mais la logique est inversée — le guard redirige vers `/auth` si l'utilisateur n'est pas connecté, ce qui crée une **boucle de redirection infinie** :

```
/auth → guard → non connecté → redirect /auth → guard → non connecté → redirect /auth → 💥
```

## Fix — Inverser la logique du guard

```typescript
export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService)
    const router = inject(Router)

    if (authService.currentUser()) {
        return router.createUrlTree(['/prompts']) // ✅ Déjà connecté → on redirige vers l'app
    }
    return true // ✅ Non connecté → on laisse accéder à /auth
}
```

## Et protéger les routes privées avec un second guard

```typescript
// guards/logged-in.guard.ts
export const loggedInGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService)
    const router = inject(Router)

    if (authService.currentUser()) {
        return true // ✅ Connecté → accès autorisé
    }
    return router.createUrlTree(['/auth']) // ✅ Non connecté → login
}
```

```typescript
// app.routes.ts
{ path: 'auth', component: AuthForm, canActivate: [authGuard] },       // redirige si déjà connecté
{ path: 'prompts', component: PromptList, canActivate: [loggedInGuard] }, // redirige si non connecté
```

Deux guards distincts, chacun avec sa responsabilité claire.










### Mcp

- 
- **Le projet transport**
    > Les dépendances
        > npm install primeng primeicons : Pour le style `tailwindcss` ou `primeflex`
        > npm install @angular/animations : !! les animations
        > ng generate environments
    > Le cursus
        > Pour injecter le `token jwt` dans l'en têtes des requêtes on a `jwt-interceptor.ts`
        > On a défini les routes dans `app.routes.ts`
        > !! les models de données renvoyés par l'api dans `..models/`





### 1.7 `app.config.ts` — Configuration standalone

C'est le fichier central qui remplace `AppModule`. Tous les providers globaux sont déclarés ici.

```typescript
// app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.dark-mode' },
      },
      ripple: true,
    }),
  ],
};
```


- On recharge l'utilisateur depuis `/me` à chaque démarrage de l'application vu que ses  permissions peuvent changer côté backend




### Ce qui se passe concrètement

```
App démarre
    └── AppComponent appelle loadCurrentUser()
            ├── token présent → GET /me → _currentUser.set(user) ✓
            └── pas de token  → clearSession() → redirect /login

Login
    └── POST /auth/login → storeTokens() → loadCurrentUser()

Composant vérifie une permission
    └── authService.hasPermission('Voyage', 'VOIR')
            └── _permissions().has('Voyage_VOIR') → true/false
```





## Étape 2.3 — JWT Interceptor

C'est une fonction (plus une classe depuis Angular 15+) qui **intercepte toutes les requêtes HTTP** sortantes et y ajoute automatiquement le header `Authorization: Bearer <token>`. Sans lui, tu devrais ajouter le token manuellement dans chaque appel API.

---

### Le flux complet

```
Composant → HttpClient.get('/api/voyages')
                └── jwt.interceptor
                        ├── token présent → ajoute Authorization: Bearer xxx
                        │       └── Requête parte → Backend Symfony
                        │               ├── Token valide   → réponse 200 ✓
                        │               └── Token expiré   → réponse 401
                        │                       └── interceptor → refreshToken()
                        │                               ├── succès → rejoue la requête
                        │                               └── échec  → logout()
                        └── pas de token → requête parte sans header
                                (le backend rejettera lui-même)
```

---

### `jwt.interceptor.ts`

```typescript
// core/interceptors/jwt.interceptor.ts
import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpEvent
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, switchMap, filter, take, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

// ─────────────────────────────────────────────────────────────
// État interne du refresh (partagé entre toutes les requêtes)
// ─────────────────────────────────────────────────────────────

// Évite de lancer plusieurs refresh en parallèle
let isRefreshing = false;

// File d'attente des requêtes qui attendent le nouveau token
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

// ─────────────────────────────────────────────────────────────
// L'interceptor
// ─────────────────────────────────────────────────────────────

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  const authService = inject(AuthService);
  const http        = inject(HttpClient);
  const token       = authService.getAccessToken();

  // 1. On clone la requête en ajoutant le token si présent
  const authReq = token ? addToken(req, token) : req;

  // 2. On envoie la requête et on gère les erreurs
  return next(authReq).pipe(
    catchError(error => {
      // Uniquement les 401 nous intéressent
      if (error instanceof HttpErrorResponse && error.status === 401) {

        // Ne pas tenter de refresh sur la route login ou refresh elle-même
        const isAuthRoute = req.url.includes('/auth/login')
                         || req.url.includes('/auth/token/refresh');

        if (isAuthRoute) {
          return throwError(() => error);
        }

        return handle401(req, next, authService, http);
      }

      return throwError(() => error);
    })
  );
};

// ─────────────────────────────────────────────────────────────
// Ajoute le header Authorization à la requête
// ─────────────────────────────────────────────────────────────

function addToken(
  req: HttpRequest<unknown>,
  token: string
): HttpRequest<unknown> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}

// ─────────────────────────────────────────────────────────────
// Gestion du 401 — refresh token
// ─────────────────────────────────────────────────────────────

function handle401(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  http: HttpClient
): Observable<HttpEvent<unknown>> {

  // Cas 1 — Aucun refresh en cours, on le lance
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null); // bloque les requêtes en attente

    const refreshToken = authService.getRefreshToken();

    if (!refreshToken) {
      isRefreshing = false;
      authService.logout();
      return throwError(() => new Error('No refresh token'));
    }

    return http
      .post<{ token: string }>(`${environment.apiUrl}/auth/token/refresh`, {
        refresh_token: refreshToken
      })
      .pipe(
        switchMap(response => {
          isRefreshing = false;
          // On notifie toutes les requêtes en attente avec le nouveau token
          refreshTokenSubject.next(response.token);
          // On rejoue la requête originale avec le nouveau token
          return next(addToken(req, response.token));
        }),
        catchError(err => {
          // Le refresh a échoué (token expiré côté serveur)
          isRefreshing = false;
          authService.logout();
          return throwError(() => err);
        })
      );
  }

  // Cas 2 — Un refresh est déjà en cours
  // On met la requête en file d'attente jusqu'à avoir le nouveau token
  return refreshTokenSubject.pipe(
    filter(token => token !== null),  // attend que le refresh soit terminé
    take(1),                           // prend uniquement le premier token émis
    switchMap(token => next(addToken(req, token!)))
  );
}
```

---

### Le problème du refresh concurrent expliqué

Imagine que 3 requêtes partent en même temps et que le token est expiré. Sans gestion du concurrent, les 3 déclencheraient un refresh simultané — 3 appels à `/auth/token/refresh`, race condition, chaos.

Avec `isRefreshing` + `BehaviorSubject` :

```
Requête A → 401 → isRefreshing = false → lance le refresh
Requête B → 401 → isRefreshing = true  → entre en attente sur refreshTokenSubject
Requête C → 401 → isRefreshing = true  → entre en attente sur refreshTokenSubject

Refresh terminé → refreshTokenSubject.next(nouveauToken)
    ├── Requête A rejouée avec nouveau token ✓
    ├── Requête B débloquée et rejouée      ✓
    └── Requête C débloquée et rejouée      ✓
```

---

### Rappel — il est déjà enregistré dans `app.config.ts`

```typescript
// app.config.ts — déjà fait à l'étape 1.7
provideHttpClient(withInterceptors([jwtInterceptor]))
```

Rien d'autre à faire pour l'activer.

---

Prêt pour **2.4 — `authGuard` et `permissionGuard`** qui protègent les routes ?









## Étape 2.4 — Guards

On a besoin de **2 guards** distincts qui ont des responsabilités différentes.

| Guard | Question posée | Redirige vers |
|---|---|---|
| `authGuard` | Est-ce que l'utilisateur est connecté ? | `/auth/login` |
| `permissionGuard` | Est-ce qu'il a la permission requise ? | `/403` |

---

## `authGuard`

Simple et direct. Il vérifie si un `access_token` existe dans le localStorage **et** si l'utilisateur est chargé en mémoire.

```typescript
// core/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router      = inject(Router);

  // Token présent ET utilisateur chargé en mémoire
  if (authService.getAccessToken() && authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};
```

---

## `permissionGuard`

Il lit la propriété `data.permission` définie sur la route et vérifie si l'utilisateur possède cette permission dans son `Set`.

```typescript
// core/auth/permission.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router      = inject(Router);

  // On récupère la permission déclarée sur la route
  // ex: { entity: 'Voyage', action: 'VOIR' }
  const { entity, action } = route.data['permission'] ?? {};

  // Pas de permission déclarée sur la route → accès libre
  if (!entity || !action) {
    return true;
  }

  if (authService.hasPermission(entity, action)) {
    return true;
  }

  // Permission refusée → page 403
  return router.createUrlTree(['/403']);
};
```

---

### Comment on les utilise dans les routes

Les deux guards se combinent. `authGuard` sur le layout parent, `permissionGuard` sur chaque route enfant.

```typescript
// features/exploitation/exploitation.routes.ts
import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/auth/permission.guard';

export const exploitationRoutes: Routes = [
  {
    path: 'voyages',
    canActivate: [permissionGuard],
    data: { permission: { entity: 'Voyage', action: 'VOIR' } },
    loadComponent: () =>
      import('./voyage/voyage-list/voyage-list.component')
        .then(m => m.VoyageListComponent),
  },
  {
    path: 'voyages/new',
    canActivate: [permissionGuard],
    data: { permission: { entity: 'Voyage', action: 'CREER' } },
    loadComponent: () =>
      import('./voyage/voyage-form/voyage-form.component')
        .then(m => m.VoyageFormComponent),
  },
  {
    path: 'voyages/:id/edit',
    canActivate: [permissionGuard],
    data: { permission: { entity: 'Voyage', action: 'MODIFIER' } },
    loadComponent: () =>
      import('./voyage/voyage-form/voyage-form.component')
        .then(m => m.VoyageFormComponent),
  },
];
```

---

## `hasPermission` directive

Le guard protège les **routes**, mais dans les templates on a aussi besoin de cacher les boutons "Créer", "Modifier", "Supprimer" selon les permissions. C'est le rôle de cette directive.

```typescript
// shared/directives/has-permission.directive.ts
import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
  effect
} from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Directive({
  standalone: true,
  selector: '[hasPermission]'
})
export class HasPermissionDirective {

  private templateRef     = inject(TemplateRef);
  private viewContainer   = inject(ViewContainerRef);
  private authService     = inject(AuthService);

  // Reçoit { entity: 'Voyage', action: 'CREER' }
  private _entity = '';
  private _action = '';

  @Input() set hasPermission(value: { entity: string; action: string }) {
    this._entity = value.entity;
    this._action = value.action;
    this.updateView();
  }

  // effect() réagit automatiquement si les permissions changent
  // (ex: rechargement du /me après modification de rôle)
  constructor() {
    effect(() => {
      // On "lit" le signal pour que effect() s'abonne aux changements
      this.authService.permissions();
      this.updateView();
    });
  }

  private updateView(): void {
    if (this.authService.hasPermission(this._entity, this._action)) {
      // Affiche l'élément
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      // Retire l'élément du DOM
      this.viewContainer.clear();
    }
  }
}
```

### Utilisation dans un template

```html
<!-- Le bouton n'apparaît dans le DOM que si l'utilisateur a Voyage_CREER -->
<button
  *hasPermission="{ entity: 'Voyage', action: 'CREER' }"
  pButton
  label="Nouveau voyage"
  icon="pi pi-plus"
  (click)="openForm()">
</button>

<!-- Même chose pour supprimer -->
<button
  *hasPermission="{ entity: 'Voyage', action: 'SUPPRIMER' }"
  pButton
  severity="danger"
  icon="pi pi-trash"
  (click)="delete(voyage.id)">
</button>
```

---

### Le flux complet de protection

```
Utilisateur tape /exploitation/voyages/new
        └── authGuard
                ├── non connecté → /auth/login
                └── connecté → permissionGuard
                        ├── vérifie data.permission = {entity:'Voyage', action:'CREER'}
                        ├── hasPermission('Voyage', 'CREER') → true  → page chargée ✓
                        └── hasPermission('Voyage', 'CREER') → false → /403

Dans la page VoyageListComponent
        └── *hasPermission="{entity:'Voyage', action:'CREER'}"
                ├── true  → bouton "Nouveau voyage" visible dans le DOM ✓
                └── false → bouton absent du DOM (pas juste caché)
```

---

Le Core est maintenant complet. Voici ce qu'on a mis en place :

```
core/
├── models/
│   ├── permission.model.ts  ✓
│   ├── entreprise.model.ts  ✓
│   └── user.model.ts        ✓
├── auth/
│   ├── auth.service.ts      ✓  (Signals, login, logout, permissions)
│   ├── auth.guard.ts        ✓  (vérifie si connecté)
│   └── permission.guard.ts  ✓  (vérifie les permissions RBAC)
├── interceptors/
│   └── jwt.interceptor.ts   ✓  (Bearer token + refresh automatique)
└── shared/directives/
    └── has-permission.directive.ts ✓
```

On passe à **l'Étape 3 — `AppComponent` et le démarrage de l'app** : comment on initialise `loadCurrentUser()` au boot avant que les routes se chargent ?









## `data` et `loadComponent` dans les routes Angular

---

### `data` — Attacher des métadonnées à une route

`data` est un objet statique que tu attaches à une route pour y stocker des informations supplémentaires. Angular ne fait rien avec par défaut, c'est toi qui décides comment l'utiliser.

```typescript
{
  path: 'voyages',
  data: { permission: { entity: 'Voyage', action: 'VOIR' } }
}
```

Dans le `permissionGuard`, on le récupère via `ActivatedRouteSnapshot` :

```typescript
const { entity, action } = route.data['permission'];
// entity = 'Voyage', action = 'VOIR'
```

Tu peux y mettre ce que tu veux. Dans ton app on pourrait aussi y mettre le titre de la page :

```typescript
{
  path: 'voyages',
  data: {
    permission: { entity: 'Voyage', action: 'VOIR' },
    title: 'Liste des voyages',      // pour le breadcrumb
    icon: 'pi pi-car'                // pour la sidebar
  }
}
```

---

### `loadComponent` vs `component` — Le lazy loading

**Sans lazy loading** avec `component` :

```typescript
import { VoyageListComponent } from './voyage-list.component'; // ← import immédiat

{
  path: 'voyages',
  component: VoyageListComponent  // chargé au démarrage de l'app
}
```

Tous les composants déclarés avec `component` sont inclus dans le **bundle initial** de l'application. L'utilisateur télécharge tout le code dès l'ouverture, même les pages qu'il ne visitera jamais.

**Avec lazy loading** avec `loadComponent` :

```typescript
{
  path: 'voyages',
  loadComponent: () =>
    import('./voyage-list.component')     // ← import dynamique
      .then(m => m.VoyageListComponent)   // chargé UNIQUEMENT quand on visite /voyages
}
```

Le composant est découpé en **chunk séparé** par le bundler. Il n'est téléchargé que quand l'utilisateur navigue vers cette route.

---

### Concrètement sur ton app

Ton application a 8 modules métier avec des dizaines de composants. Sans lazy loading le bundle initial pourrait peser plusieurs mégaoctets.

```
Avec component (sans lazy)          Avec loadComponent (lazy)
─────────────────────────           ─────────────────────────
Démarrage → charge TOUT             Démarrage → charge le minimum
├── Administration (200kb)          └── main.js (100kb)
├── Stock (300kb)
├── Flotte (250kb)                  Navigation vers /voyages
├── Exploitation (400kb)            └── exploitation.chunk.js (400kb)
├── Billetterie (200kb)
├── Courrier (300kb)                Navigation vers /stock
└── Dashboard (350kb)               └── stock.chunk.js (300kb)
= 2Mo chargés d'un coup             = chargé à la demande ✓
```

`loadChildren` fait la même chose mais pour un fichier de routes entier au lieu d'un seul composant :

```typescript
// Charge tout le fichier exploitation.routes.ts à la demande
{
  path: 'exploitation',
  loadChildren: () =>
    import('./features/exploitation/exploitation.routes')
      .then(m => m.exploitationRoutes)
}
```

---

### Résumé

| | `component` | `loadComponent` | `loadChildren` |
|---|---|---|---|
| Chargement | Au démarrage | À la navigation | À la navigation |
| Cible | Un composant | Un composant | Un fichier de routes |
| Bundle | Grossit le bundle initial | Chunk séparé | Chunk séparé |
| Usage | Rare, layout racine | Page standalone | Feature module entier |

---

On passe à **l'Étape 3 — `AppComponent` et l'initialisation au boot** ?








## Étape 3 — AppComponent et initialisation au boot

Le problème qu'on doit résoudre : quand l'utilisateur **rafraîchit la page**, Angular repart de zéro. Le Signal `_currentUser` est `null`, même si un `access_token` valide existe dans le localStorage. Si le `authGuard` s'exécute avant que `/me` soit chargé, il va rediriger vers `/login` alors que l'utilisateur est bien connecté.

Il faut donc **charger l'utilisateur avant que les routes s'activent**.

---

### La solution — `APP_INITIALIZER`

Angular fournit un token `APP_INITIALIZER` qui permet d'exécuter une fonction asynchrone **avant le premier rendu**. Les routes ne s'activent qu'une fois cette fonction terminée.

```
App démarre
    └── APP_INITIALIZER → loadCurrentUser()
            ├── token présent → GET /me → _currentUser.set(user) ✓
            │       └── Routes s'activent → authGuard → true ✓
            └── pas de token / token invalide → clearSession()
                    └── Routes s'activent → authGuard → false → /login
```

---

### `app.config.ts` — On ajoute l'initializer

```typescript
// app/app.config.ts
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  APP_INITIALIZER,
  inject
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { AuthService } from './core/auth/auth.service';

// Fonction d'initialisation — appelée une seule fois au boot
function initializeApp() {
  const authService = inject(AuthService);

  return () => {
    // Si pas de token, rien à charger
    if (!authService.getAccessToken()) {
      return Promise.resolve();
    }

    // Sinon on charge le profil et on attend la réponse
    return new Promise<void>(resolve => {
      authService.loadCurrentUser().subscribe({
        complete: () => resolve(),
        error:    () => resolve(), // même en cas d'erreur on laisse l'app démarrer
      });
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.dark-mode' },
      },
      ripple: true,
    }),

    // ← Ajout de l'initializer
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,   // permet d'avoir plusieurs APP_INITIALIZER
    },
  ],
};
```

---

### `app.component.ts`

Le composant racine est volontairement minimal. Il ne fait qu'afficher le `<router-outlet>` qui est le point d'entrée de toutes les routes.

```typescript
// app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast'; // notifications globales

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toast],
  template: `
    <p-toast position="top-right" />
    <router-outlet />
  `,
})
export class AppComponent {}
```

`<router-outlet>` sera remplacé par :
- `AuthLayoutComponent` si on est sur `/auth/login`
- `MainLayoutComponent` si on est sur n'importe quelle route protégée

---

### Les deux layouts

**`auth-layout`** — page de login, fond plein écran, pas de sidebar :

```typescript
// layouts/auth-layout/auth-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen flex align-items-center justify-content-center surface-ground">
      <router-outlet />
    </div>
  `,
})
export class AuthLayoutComponent {}
```

**`main-layout`** — sidebar + topbar + contenu, pour toutes les pages protégées :

```typescript
// layouts/main-layout/main-layout.component.ts
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="flex h-screen overflow-hidden">

      <!-- Sidebar -->
      <aside
        class="sidebar surface-section border-right-1 surface-border transition-all transition-duration-300"
        [class.w-4rem]="collapsed()"
        [class.w-16rem]="!collapsed()">
        <!-- On construira la sidebar dans l'étape suivante -->
      </aside>

      <!-- Contenu principal -->
      <div class="flex flex-column flex-1 overflow-hidden">

        <!-- Topbar -->
        <header class="topbar surface-section border-bottom-1 surface-border px-4 py-2 flex align-items-center justify-content-between">
          <button
            class="p-button p-button-text p-button-rounded"
            (click)="toggleSidebar()">
            <i class="pi pi-bars"></i>
          </button>
          <span class="font-semibold text-600">
            {{ authService.fullName() }}
          </span>
        </header>

        <!-- Zone de contenu scrollable -->
        <main class="flex-1 overflow-y-auto p-4">
          <router-outlet />
        </main>

      </div>
    </div>
  `,
})
export class MainLayoutComponent {
  authService = inject(AuthService);
  collapsed   = signal(false);

  toggleSidebar() {
    this.collapsed.update(v => !v);
  }
}
```

---

### Ce qu'on a maintenant — le flux complet

```
Navigateur ouvre l'app
    └── APP_INITIALIZER
            ├── token absent  → rien → authGuard → /auth/login
            │       └── AuthLayoutComponent
            │               └── LoginComponent
            └── token présent → GET /me → currentUser Signal rempli
                    └── authGuard → true → MainLayoutComponent
                            ├── Sidebar
                            ├── Topbar (affiche fullName())
                            └── router-outlet → feature chargée
```

---

Le socle est maintenant complet :

```
app.config.ts         ✓  APP_INITIALIZER + tous les providers
app.component.ts      ✓  RouterOutlet + Toast global
auth-layout           ✓  Conteneur pour le login
main-layout           ✓  Sidebar + Topbar + contenu
```

On passe à **l'Étape 4 — La page de Login** : formulaire, appel auth, redirection ?









## Étape 4 — Page de Login

---

### Ce qu'on va construire

```
AuthLayoutComponent
    └── LoginComponent
            ├── Reactive Form  (email + password)
            ├── Appel AuthService.login()
            ├── Gestion des erreurs (401, réseau)
            └── Redirection vers /dashboard après succès
```

---

### `login.component.ts`

```typescript
// features/auth/login/login.component.ts
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// PrimeNG
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputText,
    Password,
    Button,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  private fb             = inject(FormBuilder);
  private authService    = inject(AuthService);
  private router         = inject(Router);
  private messageService = inject(MessageService);

  // Signal pour gérer l'état du bouton pendant la requête
  loading = signal(false);

  form = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // Raccourcis pour le template
  get email()    { return this.form.controls.email; }
  get password() { return this.form.controls.password; }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // affiche toutes les erreurs de validation
      return;
    }

    this.loading.set(true);

    this.authService.login(this.form.getRawValue() as any).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);

        const status = err?.status;

        if (status === 401) {
          this.messageService.add({
            severity: 'error',
            summary:  'Échec de connexion',
            detail:   'Email ou mot de passe incorrect.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary:  'Erreur',
            detail:   'Une erreur est survenue. Veuillez réessayer.',
          });
        }
      },
    });
  }
}
```

---

### `login.component.html`

```html
<!-- features/auth/login/login.component.html -->
<div class="surface-card border-round-xl shadow-3 p-5 w-full" style="max-width: 420px">

  <!-- Logo / Titre -->
  <div class="text-center mb-5">
    <div class="text-900 text-3xl font-bold mb-2">Bienvenue</div>
    <span class="text-600">Connectez-vous à votre espace</span>
  </div>

  <form [formGroup]="form" (ngSubmit)="onSubmit()">

    <!-- Email -->
    <div class="flex flex-column gap-2 mb-4">
      <label for="email" class="font-medium text-900">Email</label>
      <input
        id="email"
        pInputText
        type="email"
        formControlName="email"
        placeholder="exemple@email.com"
        [class.ng-invalid]="email.invalid && email.touched"
        class="w-full" />

      @if (email.touched && email.hasError('required')) {
        <small class="text-red-500">L'email est requis.</small>
      } @else if (email.touched && email.hasError('email')) {
        <small class="text-red-500">Format d'email invalide.</small>
      }
    </div>

    <!-- Mot de passe -->
    <div class="flex flex-column gap-2 mb-5">
      <label for="password" class="font-medium text-900">Mot de passe</label>
      <p-password
        inputId="password"
        formControlName="password"
        placeholder="••••••••"
        [feedback]="false"
        [toggleMask]="true"
        styleClass="w-full"
        inputStyleClass="w-full"
        [class.ng-invalid]="password.invalid && password.touched" />

      @if (password.touched && password.hasError('required')) {
        <small class="text-red-500">Le mot de passe est requis.</small>
      } @else if (password.touched && password.hasError('minlength')) {
        <small class="text-red-500">Minimum 6 caractères.</small>
      }
    </div>

    <!-- Bouton -->
    <p-button
      type="submit"
      label="Se connecter"
      icon="pi pi-sign-in"
      styleClass="w-full"
      [loading]="loading()" />

  </form>
</div>
```

---

### Ce que fait chaque partie

**Le formulaire Reactive :**
```
form.group
  ├── email    → required + format email
  └── password → required + min 6 caractères

markAllAsTouched() → déclenche l'affichage de toutes 
                     les erreurs si on soumet sans remplir
```

**Le flux login :**
```
onSubmit()
    ├── form invalide → markAllAsTouched() → stop
    └── form valide
            └── loading.set(true)
                    └── authService.login()
                            ├── succès → navigate('/dashboard')
                            └── erreur
                                    ├── 401 → "Email ou mot de passe incorrect"
                                    └── autre → "Erreur serveur"
                                    └── loading.set(false)
```

**`@if` dans le template :**
C'est la nouvelle syntaxe Angular 17+ qui remplace `*ngIf`. Plus besoin d'importer `CommonModule` juste pour ça.

```html
<!-- Ancienne syntaxe -->
<small *ngIf="email.touched && email.hasError('required')">...</small>

<!-- Nouvelle syntaxe Angular 17+ -->
@if (email.touched && email.hasError('required')) {
  <small>...</small>
}
```

---

### `MessageService` — à ajouter dans `app.config.ts`

Le `Toast` de PrimeNG qu'on a mis dans `AppComponent` a besoin que `MessageService` soit fourni globalement :

```typescript
// app.config.ts — ajouter dans providers
import { MessageService } from 'primeng/api';

providers: [
  // ... providers existants
  MessageService,  // ← ajout
]
```

---

### Résultat

```
Utilisateur remplit email + password → Submit
    ├── Champs invalides → erreurs affichées sous chaque input
    └── Champs valides
            └── Bouton passe en état "loading" (spinner)
                    ├── Succès → /dashboard
                    └── Erreur → Toast en haut à droite
                            ├── 401 : "Email ou mot de passe incorrect"
                            └── Autre : "Erreur serveur"
```

---

Le module Auth est complet. On passe à **l'Étape 5 — Le layout principal** : sidebar avec navigation par modules et gestion des permissions sur les liens ?







Non, je ne les ai pas faits volontairement car ce sont des fonctionnalités qui dépendent de ce que ton backend expose. Faisons le point :

---

### "Remember me"

Côté Angular c'est simple — au lieu de stocker le token dans `sessionStorage` (perdu à la fermeture du navigateur) on le met dans `localStorage` (persistant). On a déjà choisi `localStorage` donc **le "remember me" est déjà le comportement par défaut**. Si tu veux le rendre optionnel :### "Mot de passe oublié"

Ça nécessite un endpoint backend du genre `POST /auth/forgot-password` qui envoie un email avec un lien de reset. Est-ce que tu as développé ça côté Symfony ?






Parfait, donc le "Remember me" est déjà géré par défaut, rien à changer.

Pour le **mot de passe oublié** tu n'as pas répondu — on le met de côté et on y reviendra quand le backend sera prêt. On peut toujours ajouter le lien dans la page login plus tard sans tout refaire.

---

La page Login est donc **complète telle quelle**. Ce qu'on n'a pas mis et pourquoi :

| Fonctionnalité | Décision |
|---|---|
| Remember me | `localStorage` par défaut → déjà géré |
| Mot de passe oublié | Backend pas encore prêt → à ajouter plus tard |
| Inscription | App multi-tenant fermée → les users sont créés par l'admin |
| 2FA | Non évoqué → hors scope |

---

On passe à **l'Étape 5 — Le layout principal** (sidebar + topbar) ?







## Étape 5 — Layout principal

On va construire la sidebar avec la navigation complète par modules, avec gestion des permissions sur les liens de navigation.

---

### Structure du layout

```
MainLayoutComponent
├── SidebarComponent
│   ├── Logo / Nom entreprise
│   ├── Navigation par groupes de modules
│   │   └── Lien visible uniquement si permission VOIR
│   └── Bouton logout
└── TopbarComponent
    ├── Bouton toggle sidebar
    ├── Nom de la page courante
    └── Avatar + nom utilisateur
```

---

### 5.1 — Modèle de navigation

On définit d'abord la structure des liens de la sidebar pour ne pas hardcoder dans le template.

```typescript
// shared/models/nav-item.model.ts
export interface NavItem {
  label:       string;
  icon:        string;
  route?:      string;        // null si c'est un groupe
  permission?: {              // null = toujours visible
    entity: string;
    action: string;
  };
  children?: NavItem[];       // sous-liens d'un groupe
}
```

---

### 5.2 — Configuration de la navigation

```typescript
// core/config/navigation.config.ts
import { NavItem } from '../../shared/models/nav-item.model';

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Tableau de bord',
    icon:  'pi pi-home',
    route: '/dashboard',
  },
  {
    label: 'Administration',
    icon:  'pi pi-cog',
    children: [
      {
        label:      'Entreprise',
        icon:       'pi pi-building',
        route:      '/administration/entreprise',
        permission: { entity: 'Entreprise', action: 'VOIR' },
      },
      {
        label:      'Utilisateurs',
        icon:       'pi pi-users',
        route:      '/administration/utilisateurs',
        permission: { entity: 'User', action: 'VOIR' },
      },
      {
        label:      'Rôles & Permissions',
        icon:       'pi pi-shield',
        route:      '/administration/roles',
        permission: { entity: 'Role', action: 'VOIR' },
      },
    ],
  },
  {
    label: 'Personnel',
    icon:  'pi pi-id-card',
    children: [
      {
        label:      'Personnel',
        icon:       'pi pi-user',
        route:      '/personnel/liste',
        permission: { entity: 'Personnel', action: 'VOIR' },
      },
      {
        label:      'Types de personnel',
        icon:       'pi pi-tag',
        route:      '/personnel/types',
        permission: { entity: 'Typepersonnel', action: 'VOIR' },
      },
    ],
  },
  {
    label: 'Stock',
    icon:  'pi pi-box',
    children: [
      {
        label:      'Pièces',
        icon:       'pi pi-wrench',
        route:      '/stock/pieces',
        permission: { entity: 'Piece', action: 'VOIR' },
      },
      {
        label:      'Approvisionnements',
        icon:       'pi pi-arrow-circle-down',
        route:      '/stock/approvisionnements',
        permission: { entity: 'Approvisionnement', action: 'VOIR' },
      },
      {
        label:      'Inventaire',
        icon:       'pi pi-list',
        route:      '/stock/inventaire',
        permission: { entity: 'Inventaire', action: 'VOIR' },
      },
      {
        label:      'Fournisseurs',
        icon:       'pi pi-truck',
        route:      '/stock/fournisseurs',
        permission: { entity: 'Fournisseur', action: 'VOIR' },
      },
    ],
  },
  {
    label: 'Flotte',
    icon:  'pi pi-car',
    children: [
      {
        label:      'Véhicules',
        icon:       'pi pi-car',
        route:      '/flotte/vehicules',
        permission: { entity: 'Car', action: 'VOIR' },
      },
      {
        label:      'Dépannages',
        icon:       'pi pi-exclamation-triangle',
        route:      '/flotte/depannages',
        permission: { entity: 'Depannage', action: 'VOIR' },
      },
    ],
  },
  {
    label: 'Exploitation',
    icon:  'pi pi-map',
    children: [
      {
        label:      'Gares',
        icon:       'pi pi-map-marker',
        route:      '/exploitation/gares',
        permission: { entity: 'Gare', action: 'VOIR' },
      },
      {
        label:      'Tarifs',
        icon:       'pi pi-dollar',
        route:      '/exploitation/tarifs',
        permission: { entity: 'Tarif', action: 'VOIR' },
      },
      {
        label:      'Trajets',
        icon:       'pi pi-arrow-right-arrow-left',
        route:      '/exploitation/trajets',
        permission: { entity: 'Trajet', action: 'VOIR' },
      },
      {
        label:      'Voyages',
        icon:       'pi pi-send',
        route:      '/exploitation/voyages',
        permission: { entity: 'Voyage', action: 'VOIR' },
      },
    ],
  },
  {
    label: 'Billetterie',
    icon:  'pi pi-ticket',
    children: [
      {
        label:      'Tickets',
        icon:       'pi pi-ticket',
        route:      '/billetterie/tickets',
        permission: { entity: 'Ticket', action: 'VOIR' },
      },
    ],
  },
  {
    label: 'Courrier',
    icon:  'pi pi-envelope',
    children: [
      {
        label:      'Courriers',
        icon:       'pi pi-envelope',
        route:      '/courrier/liste',
        permission: { entity: 'Courrier', action: 'VOIR' },
      },
      {
        label:      'Tarifs courrier',
        icon:       'pi pi-dollar',
        route:      '/courrier/tarifs',
        permission: { entity: 'Tarifcourrier', action: 'VOIR' },
      },
    ],
  },
  {
    label: 'Bagage',
    icon:  'pi pi-briefcase',
    children: [
      {
        label:      'Bagages',
        icon:       'pi pi-briefcase',
        route:      '/bagage/liste',
        permission: { entity: 'Bagage', action: 'VOIR' },
      },
      {
        label:      'Tarifs bagage',
        icon:       'pi pi-dollar',
        route:      '/bagage/tarifs',
        permission: { entity: 'Tarifbagage', action: 'VOIR' },
      },
    ],
  },
];
```

---

### 5.3 — SidebarComponent

```typescript
// layouts/main-layout/sidebar/sidebar.component.ts
import { Component, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';
import { NAV_ITEMS } from '../../../core/config/navigation.config';
import { NavItem } from '../../../shared/models/nav-item.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  authService = inject(AuthService);

  // Signal venant du MainLayoutComponent
  collapsed = input<boolean>(false);

  navItems = NAV_ITEMS;

  // Groupe actuellement ouvert
  openGroup = signal<string | null>(null);

  toggleGroup(label: string): void {
    this.openGroup.update(current => current === label ? null : label);
  }

  // Vérifie si un item ou ses enfants sont accessibles
  isVisible(item: NavItem): boolean {
    if (!item.permission) return true;
    return this.authService.hasPermission(
      item.permission.entity,
      item.permission.action
    );
  }

  // Un groupe est visible si au moins un enfant est visible
  isGroupVisible(item: NavItem): boolean {
    if (!item.children) return this.isVisible(item);
    return item.children.some(child => this.isVisible(child));
  }

  onLogout(): void {
    this.authService.logout();
  }
}
```

---

### `sidebar.component.html`

```html
<!-- layouts/main-layout/sidebar/sidebar.component.html -->
<div class="flex flex-column h-full">

  <!-- Logo -->
  <div class="flex align-items-center gap-3 px-4 py-4 border-bottom-1 surface-border">
    <i class="pi pi-send text-primary text-2xl"></i>
    @if (!collapsed()) {
      <span class="font-bold text-900 text-lg white-space-nowrap">
        {{ authService.currentUser()?.entreprise?.libelle ?? 'Transport' }}
      </span>
    }
  </div>

  <!-- Navigation -->
  <nav class="flex-1 overflow-y-auto py-3">
    @for (item of navItems; track item.label) {

      @if (isGroupVisible(item)) {

        <!-- Lien simple (ex: Dashboard) -->
        @if (!item.children) {
          
            [routerLink]="item.route"
            routerLinkActive="active-link"
            class="nav-link flex align-items-center gap-3 px-4 py-3 cursor-pointer
                   text-700 hover:surface-hover no-underline transition-colors
                   transition-duration-150">
            <i [class]="item.icon + ' text-lg'"></i>
            @if (!collapsed()) {
              <span class="white-space-nowrap">{{ item.label }}</span>
            }
          </a>
        }

        <!-- Groupe avec enfants -->
        @if (item.children) {
          <div>
            <!-- Header du groupe -->
            <div
              class="nav-link flex align-items-center gap-3 px-4 py-3 cursor-pointer
                     text-700 hover:surface-hover transition-colors transition-duration-150"
              (click)="toggleGroup(item.label)">
              <i [class]="item.icon + ' text-lg'"></i>
              @if (!collapsed()) {
                <span class="flex-1 white-space-nowrap">{{ item.label }}</span>
                <i class="pi text-sm transition-transform transition-duration-200"
                   [class.pi-chevron-down]="openGroup() !== item.label"
                   [class.pi-chevron-up]="openGroup() === item.label">
                </i>
              }
            </div>

            <!-- Enfants du groupe -->
            @if (openGroup() === item.label && !collapsed()) {
              <div class="pl-2">
                @for (child of item.children; track child.label) {
                  @if (isVisible(child)) {
                    
                      [routerLink]="child.route"
                      routerLinkActive="active-link"
                      class="nav-link flex align-items-center gap-3 pl-5 pr-4 py-2
                             cursor-pointer text-600 hover:surface-hover no-underline
                             transition-colors transition-duration-150">
                      <i [class]="child.icon + ' text-base'"></i>
                      <span class="white-space-nowrap">{{ child.label }}</span>
                    </a>
                  }
                }
              </div>
            }
          </div>
        }
      }
    }
  </nav>

  <!-- Logout -->
  <div class="border-top-1 surface-border p-3">
    <button
      class="nav-link flex align-items-center gap-3 px-4 py-3 cursor-pointer
             text-red-500 hover:surface-hover w-full border-none
             surface-section border-round transition-colors transition-duration-150"
      (click)="onLogout()">
      <i class="pi pi-sign-out text-lg"></i>
      @if (!collapsed()) {
        <span class="white-space-nowrap">Déconnexion</span>
      }
    </button>
  </div>

</div>
```

---

### 5.4 — TopbarComponent

```typescript
// layouts/main-layout/topbar/topbar.component.ts
import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [Avatar, Button, RouterLink],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  authService   = inject(AuthService);
  toggleSidebar = output<void>();
}
```

```html
<!-- layouts/main-layout/topbar/topbar.component.html -->
<header class="flex align-items-center justify-content-between
               px-4 py-2 surface-section border-bottom-1 surface-border h-4rem">

  <!-- Toggle sidebar -->
  <p-button
    icon="pi pi-bars"
    [text]="true"
    [rounded]="true"
    severity="secondary"
    (onClick)="toggleSidebar.emit()" />

  <!-- Profil utilisateur -->
  <div class="flex align-items-center gap-3">
    <div class="text-right hidden md:block">
      <div class="text-900 font-medium text-sm">
        {{ authService.fullName() }}
      </div>
      <div class="text-500 text-xs">
        {{ authService.currentUser()?.email }}
      </div>
    </div>
    <p-avatar
      [label]="authService.currentUser()?.prenom?.[0]?.toUpperCase()"
      shape="circle"
      styleClass="bg-primary text-white font-bold" />
  </div>

</header>
```

---

### 5.5 — `MainLayoutComponent` final

On assemble tout :

```typescript
// layouts/main-layout/main-layout.component.ts
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  collapsed = signal(false);

  toggleSidebar(): void {
    this.collapsed.update(v => !v);
  }
}
```

```html
<!-- layouts/main-layout/main-layout.component.html -->
<div class="flex h-screen overflow-hidden surface-ground">

  <!-- Sidebar -->
  <aside
    class="flex-shrink-0 surface-section border-right-1 surface-border
           transition-all transition-duration-300 overflow-hidden"
    [style.width]="collapsed() ? '4rem' : '16rem'">
    <app-sidebar [collapsed]="collapsed()" />
  </aside>

  <!-- Contenu -->
  <div class="flex flex-column flex-1 overflow-hidden">
    <app-topbar (toggleSidebar)="toggleSidebar()" />
    <main class="flex-1 overflow-y-auto p-4">
      <router-outlet />
    </main>
  </div>

</div>
```

---

### Ce qu'on a maintenant

```
Sidebar
  ├── Logo + nom entreprise (depuis currentUser Signal)
  ├── Groupes accordéon (toggleGroup)
  │   └── Liens filtrés selon hasPermission()
  │       ex: "Voyage_VOIR" absent → lien caché
  └── Bouton déconnexion

Topbar
  ├── Toggle sidebar (collapsed Signal)
  ├── Nom + email (depuis currentUser Signal)
  └── Avatar initiale prénom

Communication
  └── collapsed Signal passe de MainLayout → Sidebar via input()
      toggleSidebar event remonte de Topbar → MainLayout via output()
```

---

Le layout est complet. On passe à **l'Étape 6 — Le premier feature module : Administration** (Entreprise, Utilisateurs, Rôles & Permissions) ?








## Étape 6 — Feature Module : Administration

Ce module couvre : **Entreprise, Utilisateurs, Rôles & Permissions**.

On va commencer par poser la structure complète du module, puis traiter chaque entité une par une.

---

### Structure du module

```
features/administration/
├── administration.routes.ts
├── entreprise/
│   ├── entreprise.service.ts
│   ├── entreprise-detail/
│   │   └── entreprise-detail.component.ts/html
│   └── entreprise-form/
│       └── entreprise-form.component.ts/html
├── utilisateur/
│   ├── utilisateur.service.ts
│   ├── utilisateur-list/
│   ├── utilisateur-form/
│   └── utilisateur-detail/
└── role/
    ├── role.service.ts
    ├── role-list/
    └── role-form/          ← gère aussi les permissions du rôle
```

---

### `administration.routes.ts`

```typescript
// features/administration/administration.routes.ts
import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/auth/permission.guard';

export const administrationRoutes: Routes = [

  // Entreprise — pas de liste, c'est une fiche unique
  {
    path: 'entreprise',
    canActivate: [permissionGuard],
    data: { permission: { entity: 'Entreprise', action: 'VOIR' } },
    loadComponent: () =>
      import('./entreprise/entreprise-detail/entreprise-detail.component')
        .then(m => m.EntrepriseDetailComponent),
  },
  {
    path: 'entreprise/edit',
    canActivate: [permissionGuard],
    data: { permission: { entity: 'Entreprise', action: 'MODIFIER' } },
    loadComponent: () =>
      import('./entreprise/entreprise-form/entreprise-form.component')
        .then(m => m.EntrepriseFormComponent),
  },

  // Utilisateurs
  {
    path: 'utilisateurs',
    canActivate: [permissionGuard],
    data: { permission: { entity: 'User', action: 'VOIR' } },
    loadComponent: () =>
      import('./utilisateur/utilisateur-list/utilisateur-list.component')
        .then(m => m.UtilisateurListComponent),
  },
  {
    path: 'utilisateurs/new',
    canActivate: [permissionGuard],
    data: { permission: { entity: 'User', action: 'CREER' } },
    loadComponent: () =>
      import('./utilisateur/utilisateur-form/utilisateur-form.component')
        .then(m => m.UtilisateurFormComponent),
  },
  {
    path: 'utilisateurs/:id/edit',
    canActivate: [permissionGuard],
    data: { permission: { entity: 'User', action: 'MODIFIER' } },
    loadComponent: () =>
      import('./utilisateur/utilisateur-form/utilisateur-form.component')
        .then(m => m.UtilisateurFormComponent),
  },

  // Rôles
  {
    path: 'roles',
    canActivate: [permissionGuard],
    data: { permission: { entity: 'Role', action: 'VOIR' } },
    loadComponent: () =>
      import('./role/role-list/role-list.component')
        .then(m => m.RoleListComponent),
  },
  {
    path: 'roles/new',
    canActivate: [permissionGuard],
    data: { permission: { entity: 'Role', action: 'CREER' } },
    loadComponent: () =>
      import('./role/role-form/role-form.component')
        .then(m => m.RoleFormComponent),
  },
  {
    path: 'roles/:id/edit',
    canActivate: [permissionGuard],
    data: { permission: { entity: 'Role', action: 'MODIFIER' } },
    loadComponent: () =>
      import('./role/role-form/role-form.component')
        .then(m => m.RoleFormComponent),
  },

  { path: '', redirectTo: 'entreprise', pathMatch: 'full' },
];
```

---

On attaque la première entité. On commence par **Entreprise** car c'est la plus simple — pas de liste, juste une fiche détail + formulaire d'édition.

---

## 6.1 — Entreprise

### Modèle complet

```typescript
// features/administration/entreprise/entreprise.model.ts
export interface Entreprise {
  id:            number;
  libelle:       string;
  sigle?:        string;
  contact1?:     string;
  contact2?:     string;
  adresse?:      string;
  email?:        string;
  anneecreation?: number;
  siteweb?:      string;
  image?:        string;
  rccm?:         string;
  banque?:       string;
  type?:         string;
  centreimpot?:  string;
  tauxtva?:      number;
  createdAt?:    string;
  updatedAt?:    string;
}
```

---

### `entreprise.service.ts`

```typescript
// features/administration/entreprise/entreprise.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Entreprise } from './entreprise.model';

@Injectable({ providedIn: 'root' })
export class EntrepriseService {
  private http = inject(HttpClient);
  private url  = `${environment.apiUrl}/entreprises`;

  // L'utilisateur n'a qu'une entreprise → le backend retourne la sienne
  get() {
    return this.http.get<Entreprise>(`${this.url}/me`);
  }

  update(id: number, data: Partial<Entreprise>) {
    return this.http.put<Entreprise>(`${this.url}/${id}`, data);
  }

  uploadImage(id: number, file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<Entreprise>(
      `${this.url}/${id}/image`,
      formData
    );
  }
}
```

---

### `entreprise-detail.component.ts`

```typescript
// features/administration/entreprise/entreprise-detail/entreprise-detail.component.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { HasPermissionDirective } from '../../../../shared/directives/has-permission.directive';
import { EntrepriseService } from '../entreprise.service';
import { Entreprise } from '../entreprise.model';

@Component({
  selector: 'app-entreprise-detail',
  standalone: true,
  imports: [RouterLink, Button, Card, Tag, SkeletonModule, HasPermissionDirective],
  templateUrl: './entreprise-detail.component.html',
})
export class EntrepriseDetailComponent implements OnInit {
  private service = inject(EntrepriseService);

  entreprise = signal<Entreprise | null>(null);
  loading    = signal(true);
  error      = signal<string | null>(null);

  ngOnInit(): void {
    this.service.get().subscribe({
      next: data => {
        this.entreprise.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Impossible de charger les informations.');
        this.loading.set(false);
      }
    });
  }
}
```

---

### `entreprise-detail.component.html`

```html
<!-- features/administration/entreprise/entreprise-detail/entreprise-detail.component.html -->
<div class="flex flex-column gap-4">

  <!-- Header -->
  <div class="flex align-items-center justify-content-between">
    <div>
      <h2 class="text-900 font-bold text-2xl m-0">Mon Entreprise</h2>
      <p class="text-500 mt-1 mb-0">Informations générales de la compagnie</p>
    </div>
    
      *hasPermission="{ entity: 'Entreprise', action: 'MODIFIER' }"
      routerLink="/administration/entreprise/edit">
      <p-button
        label="Modifier"
        icon="pi pi-pencil"
        severity="secondary" />
    </a>
  </div>

  <!-- Skeleton pendant le chargement -->
  @if (loading()) {
    <div class="grid">
      @for (i of [1,2,3,4,5,6]; track i) {
        <div class="col-12 md:col-6">
          <p-skeleton height="60px" styleClass="mb-2" />
        </div>
      }
    </div>
  }

  <!-- Erreur -->
  @if (error()) {
    <div class="p-4 border-round bg-red-50 text-red-700">
      <i class="pi pi-exclamation-triangle mr-2"></i>
      {{ error() }}
    </div>
  }

  <!-- Contenu -->
  @if (entreprise(); as e) {
    <div class="grid">

      <!-- Logo -->
      @if (e.image) {
        <div class="col-12 flex justify-content-center mb-3">
          <img
            [src]="e.image"
            [alt]="e.libelle"
            class="border-round-xl shadow-2"
            style="max-height: 120px; object-fit: contain" />
        </div>
      }

      <!-- Champs -->
      <div class="col-12 md:col-6">
        <p-card>
          <div class="flex flex-column gap-3">
            <div class="field-row">
              <span class="text-500 text-sm">Raison sociale</span>
              <span class="text-900 font-medium">{{ e.libelle }}</span>
            </div>
            <div class="field-row">
              <span class="text-500 text-sm">Sigle</span>
              <span class="text-900 font-medium">{{ e.sigle ?? '—' }}</span>
            </div>
            <div class="field-row">
              <span class="text-500 text-sm">Email</span>
              <span class="text-900 font-medium">{{ e.email ?? '—' }}</span>
            </div>
            <div class="field-row">
              <span class="text-500 text-sm">Contact 1</span>
              <span class="text-900 font-medium">{{ e.contact1 ?? '—' }}</span>
            </div>
            <div class="field-row">
              <span class="text-500 text-sm">Contact 2</span>
              <span class="text-900 font-medium">{{ e.contact2 ?? '—' }}</span>
            </div>
            <div class="field-row">
              <span class="text-500 text-sm">Adresse</span>
              <span class="text-900 font-medium">{{ e.adresse ?? '—' }}</span>
            </div>
          </div>
        </p-card>
      </div>

      <div class="col-12 md:col-6">
        <p-card>
          <div class="flex flex-column gap-3">
            <div class="field-row">
              <span class="text-500 text-sm">RCCM</span>
              <span class="text-900 font-medium">{{ e.rccm ?? '—' }}</span>
            </div>
            <div class="field-row">
              <span class="text-500 text-sm">Banque</span>
              <span class="text-900 font-medium">{{ e.banque ?? '—' }}</span>
            </div>
            <div class="field-row">
              <span class="text-500 text-sm">Centre d'impôt</span>
              <span class="text-900 font-medium">{{ e.centreimpot ?? '—' }}</span>
            </div>
            <div class="field-row">
              <span class="text-500 text-sm">Taux TVA</span>
              <span class="text-900 font-medium">
                {{ e.tauxtva !== null ? (e.tauxtva + ' %') : '—' }}
              </span>
            </div>
            <div class="field-row">
              <span class="text-500 text-sm">Site web</span>
              <span class="text-900 font-medium">{{ e.siteweb ?? '—' }}</span>
            </div>
            <div class="field-row">
              <span class="text-500 text-sm">Année de création</span>
              <span class="text-900 font-medium">{{ e.anneecreation ?? '—' }}</span>
            </div>
          </div>
        </p-card>
      </div>

    </div>
  }

</div>
```

---

### Un style utilitaire à ajouter dans `styles.scss`

```scss
// styles.scss
.field-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--surface-border);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}
```

---

La fiche Entreprise est posée. On passe au **formulaire d'édition de l'entreprise** (`entreprise-form`) ou tu préfères qu'on enchaîne directement sur les **Utilisateurs** ?









## Étape 6.2 — Formulaire d'édition Entreprise

Ce formulaire est en mode **édition uniquement** — on charge les données existantes et on les met à jour. Pas de création car l'entreprise est créée côté backend à l'inscription.

---

### `entreprise-form.component.ts`

```typescript
// features/administration/entreprise/entreprise-form/entreprise-form.component.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// PrimeNG
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';

import { EntrepriseService } from '../entreprise.service';
import { Entreprise } from '../entreprise.model';

@Component({
  selector: 'app-entreprise-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    Button,
    Card,
    InputText,
    InputNumber,
    Textarea,
    SkeletonModule,
  ],
  templateUrl: './entreprise-form.component.html',
})
export class EntrepriseFormComponent implements OnInit {
  private service        = inject(EntrepriseService);
  private fb             = inject(FormBuilder);
  private router         = inject(Router);
  private messageService = inject(MessageService);

  entreprise  = signal<Entreprise | null>(null);
  loading     = signal(true);   // chargement initial
  saving      = signal(false);  // soumission du formulaire
  uploading   = signal(false);  // upload image

  form = this.fb.group({
    libelle:       ['', Validators.required],
    sigle:         [''],
    contact1:      [''],
    contact2:      [''],
    adresse:       [''],
    email:         ['', Validators.email],
    anneecreation: [null as number | null],
    siteweb:       [''],
    rccm:          [''],
    banque:        [''],
    type:          [''],
    centreimpot:   [''],
    tauxtva:       [null as number | null, [Validators.min(0), Validators.max(100)]],
  });

  // Raccourcis pour les erreurs dans le template
  get libelle() { return this.form.controls.libelle; }
  get email()   { return this.form.controls.email; }
  get tauxtva() { return this.form.controls.tauxtva; }

  ngOnInit(): void {
    this.service.get().subscribe({
      next: data => {
        this.entreprise.set(data);
        // On pré-remplit le formulaire avec les données existantes
        this.form.patchValue({
          libelle:       data.libelle,
          sigle:         data.sigle        ?? '',
          contact1:      data.contact1     ?? '',
          contact2:      data.contact2     ?? '',
          adresse:       data.adresse      ?? '',
          email:         data.email        ?? '',
          anneecreation: data.anneecreation ?? null,
          siteweb:       data.siteweb      ?? '',
          rccm:          data.rccm         ?? '',
          banque:        data.banque       ?? '',
          type:          data.type         ?? '',
          centreimpot:   data.centreimpot  ?? '',
          tauxtva:       data.tauxtva      ?? null,
        });
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary:  'Erreur',
          detail:   'Impossible de charger les informations de l\'entreprise.',
        });
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const id = this.entreprise()?.id;
    if (!id) return;

    this.saving.set(true);

    this.service.update(id, this.form.getRawValue()).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary:  'Succès',
          detail:   'Entreprise mise à jour avec succès.',
        });
        this.router.navigate(['/administration/entreprise']);
      },
      error: err => {
        this.saving.set(false);
        const detail = err?.error?.detail ?? 'Une erreur est survenue.';
        this.messageService.add({
          severity: 'error',
          summary:  'Erreur',
          detail,
        });
      }
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file  = input.files?.[0];
    const id    = this.entreprise()?.id;

    if (!file || !id) return;

    // Validation locale avant upload
    const maxSize  = 2 * 1024 * 1024; // 2 Mo
    const allowed  = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowed.includes(file.type)) {
      this.messageService.add({
        severity: 'warn',
        summary:  'Format invalide',
        detail:   'Formats acceptés : JPG, PNG, WEBP.',
      });
      return;
    }

    if (file.size > maxSize) {
      this.messageService.add({
        severity: 'warn',
        summary:  'Fichier trop lourd',
        detail:   'L\'image ne doit pas dépasser 2 Mo.',
      });
      return;
    }

    this.uploading.set(true);

    this.service.uploadImage(id, file).subscribe({
      next: updated => {
        this.entreprise.set(updated);
        this.uploading.set(false);
        this.messageService.add({
          severity: 'success',
          summary:  'Succès',
          detail:   'Logo mis à jour.',
        });
      },
      error: () => {
        this.uploading.set(false);
        this.messageService.add({
          severity: 'error',
          summary:  'Erreur',
          detail:   'Impossible de mettre à jour le logo.',
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/administration/entreprise']);
  }
}
```

---

### `entreprise-form.component.html`

```html
<!-- features/administration/entreprise/entreprise-form/entreprise-form.component.html -->
<div class="flex flex-column gap-4">

  <!-- Header -->
  <div class="flex align-items-center gap-3">
    <p-button
      icon="pi pi-arrow-left"
      [text]="true"
      [rounded]="true"
      severity="secondary"
      (onClick)="onCancel()" />
    <div>
      <h2 class="text-900 font-bold text-2xl m-0">Modifier l'entreprise</h2>
      <p class="text-500 mt-1 mb-0">Mettez à jour les informations de votre compagnie</p>
    </div>
  </div>

  <!-- Skeleton -->
  @if (loading()) {
    <div class="grid">
      @for (i of [1,2,3,4,5,6,7,8]; track i) {
        <div class="col-12 md:col-6">
          <p-skeleton height="56px" styleClass="mb-2" />
        </div>
      }
    </div>
  }

  <!-- Formulaire -->
  @if (!loading()) {
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="grid">

        <!-- ── Logo ── -->
        <div class="col-12">
          <p-card header="Logo">
            <div class="flex align-items-center gap-4">

              <!-- Aperçu -->
              <div
                class="border-round-xl border-1 surface-border overflow-hidden flex
                       align-items-center justify-content-center bg-gray-50"
                style="width: 100px; height: 100px;">
                @if (entreprise()?.image) {
                  <img
                    [src]="entreprise()!.image"
                    alt="Logo"
                    style="max-width: 100%; max-height: 100%; object-fit: contain" />
                } @else {
                  <i class="pi pi-image text-4xl text-400"></i>
                }
              </div>

              <!-- Upload -->
              <div class="flex flex-column gap-2">
                <label
                  for="imageInput"
                  class="p-button p-button-outlined p-button-secondary cursor-pointer
                         flex align-items-center gap-2 px-3 py-2 border-round">
                  @if (uploading()) {
                    <i class="pi pi-spin pi-spinner"></i>
                    <span>Envoi en cours...</span>
                  } @else {
                    <i class="pi pi-upload"></i>
                    <span>Choisir un logo</span>
                  }
                </label>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  class="hidden"
                  [disabled]="uploading()"
                  (change)="onImageSelected($event)" />
                <span class="text-400 text-xs">JPG, PNG, WEBP — max 2 Mo</span>
              </div>

            </div>
          </p-card>
        </div>

        <!-- ── Informations générales ── -->
        <div class="col-12">
          <p-card header="Informations générales">
            <div class="grid">

              <!-- Raison sociale -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="libelle" class="font-medium text-900">
                  Raison sociale <span class="text-red-500">*</span>
                </label>
                <input
                  id="libelle"
                  pInputText
                  formControlName="libelle"
                  placeholder="Ex: Transport Express SARL"
                  [class.ng-invalid]="libelle.invalid && libelle.touched" />
                @if (libelle.touched && libelle.hasError('required')) {
                  <small class="text-red-500">La raison sociale est requise.</small>
                }
              </div>

              <!-- Sigle -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="sigle" class="font-medium text-900">Sigle</label>
                <input
                  id="sigle"
                  pInputText
                  formControlName="sigle"
                  placeholder="Ex: TEX" />
              </div>

              <!-- Email -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="email" class="font-medium text-900">Email</label>
                <input
                  id="email"
                  pInputText
                  type="email"
                  formControlName="email"
                  placeholder="contact@entreprise.com"
                  [class.ng-invalid]="email.invalid && email.touched" />
                @if (email.touched && email.hasError('email')) {
                  <small class="text-red-500">Format d'email invalide.</small>
                }
              </div>

              <!-- Année de création -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="anneecreation" class="font-medium text-900">
                  Année de création
                </label>
                <p-inputnumber
                  inputId="anneecreation"
                  formControlName="anneecreation"
                  [useGrouping]="false"
                  placeholder="Ex: 2010"
                  styleClass="w-full" />
              </div>

              <!-- Contact 1 -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="contact1" class="font-medium text-900">Contact 1</label>
                <input
                  id="contact1"
                  pInputText
                  formControlName="contact1"
                  placeholder="+225 XX XX XX XX" />
              </div>

              <!-- Contact 2 -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="contact2" class="font-medium text-900">Contact 2</label>
                <input
                  id="contact2"
                  pInputText
                  formControlName="contact2"
                  placeholder="+225 XX XX XX XX" />
              </div>

              <!-- Site web -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="siteweb" class="font-medium text-900">Site web</label>
                <input
                  id="siteweb"
                  pInputText
                  formControlName="siteweb"
                  placeholder="https://monentreprise.com" />
              </div>

              <!-- Adresse -->
              <div class="col-12 flex flex-column gap-2">
                <label for="adresse" class="font-medium text-900">Adresse</label>
                <textarea
                  id="adresse"
                  pTextarea
                  formControlName="adresse"
                  rows="2"
                  placeholder="Adresse complète de l'entreprise"
                  class="w-full">
                </textarea>
              </div>

            </div>
          </p-card>
        </div>

        <!-- ── Informations fiscales & bancaires ── -->
        <div class="col-12">
          <p-card header="Informations fiscales & bancaires">
            <div class="grid">

              <!-- RCCM -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="rccm" class="font-medium text-900">RCCM</label>
                <input
                  id="rccm"
                  pInputText
                  formControlName="rccm"
                  placeholder="Ex: CI-ABJ-2010-B-12345" />
              </div>

              <!-- Banque -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="banque" class="font-medium text-900">Banque</label>
                <input
                  id="banque"
                  pInputText
                  formControlName="banque"
                  placeholder="Ex: SGCI" />
              </div>

              <!-- Centre d'impôt -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="centreimpot" class="font-medium text-900">
                  Centre d'impôt
                </label>
                <input
                  id="centreimpot"
                  pInputText
                  formControlName="centreimpot"
                  placeholder="Ex: DGI Abidjan" />
              </div>

              <!-- Taux TVA -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="tauxtva" class="font-medium text-900">Taux TVA (%)</label>
                <p-inputnumber
                  inputId="tauxtva"
                  formControlName="tauxtva"
                  [min]="0"
                  [max]="100"
                  [minFractionDigits]="0"
                  [maxFractionDigits]="2"
                  suffix=" %"
                  placeholder="Ex: 18"
                  styleClass="w-full"
                  [class.ng-invalid]="tauxtva.invalid && tauxtva.touched" />
                @if (tauxtva.touched && tauxtva.hasError('min')) {
                  <small class="text-red-500">Le taux ne peut pas être négatif.</small>
                }
                @if (tauxtva.touched && tauxtva.hasError('max')) {
                  <small class="text-red-500">Le taux ne peut pas dépasser 100%.</small>
                }
              </div>

              <!-- Type -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label for="type" class="font-medium text-900">Type d'entreprise</label>
                <input
                  id="type"
                  pInputText
                  formControlName="type"
                  placeholder="Ex: SARL, SA, SAS..." />
              </div>

            </div>
          </p-card>
        </div>

        <!-- ── Actions ── -->
        <div class="col-12 flex justify-content-end gap-3">
          <p-button
            type="button"
            label="Annuler"
            severity="secondary"
            [outlined]="true"
            (onClick)="onCancel()" />
          <p-button
            type="submit"
            label="Enregistrer"
            icon="pi pi-check"
            [loading]="saving()" />
        </div>

      </div>
    </form>
  }

</div>
```

---

### Ce que fait ce formulaire

```
ngOnInit()
    └── GET /entreprises/me
            └── patchValue() → pré-remplit tous les champs ✓

onSubmit()
    ├── form invalide → markAllAsTouched() → erreurs visibles
    └── form valide
            └── saving.set(true)
                    └── PUT /entreprises/:id
                            ├── succès → Toast succès → /administration/entreprise
                            └── erreur → Toast erreur → saving.set(false)

onImageSelected()
    ├── validation format (JPG/PNG/WEBP)
    ├── validation taille (max 2Mo)
    └── POST /entreprises/:id/image (FormData)
            ├── succès → aperçu mis à jour en temps réel
            └── erreur → Toast erreur
```

---

On passe à **6.3 — Utilisateurs** (liste + formulaire) ?








## Étape 6.3 — Utilisateurs

### Modèle

```typescript
// features/administration/utilisateur/utilisateur.model.ts
import { Entreprise } from '../entreprise/entreprise.model';

export type UserStatut = 'ACTIF' | 'INACTIF';

export interface UserRole {
  role: {
    id:   number;
    name: string;
  };
}

export interface Utilisateur {
  id:        number;
  nom:       string;
  prenom:    string;
  email:     string;
  avatar?:   string;
  etat:      boolean;
  statut:    UserStatut;
  roles:     string[];
  entreprise: Entreprise;
  userRoles: UserRole[];
}

// Payload création
export interface CreateUtilisateur {
  nom:      string;
  prenom:   string;
  email:    string;
  password: string;
  etat:     boolean;
}

// Payload modification
export interface UpdateUtilisateur {
  nom:    string;
  prenom: string;
  email:  string;
  etat:   boolean;
}
```

---

### `utilisateur.service.ts`

```typescript
// features/administration/utilisateur/utilisateur.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  Utilisateur,
  CreateUtilisateur,
  UpdateUtilisateur
} from './utilisateur.model';

// Réponse paginée API Platform
export interface PaginatedResponse<T> {
  'hydra:member':     T[];
  'hydra:totalItems': number;
}

export interface UtilisateurFilters {
  page?:     number;
  itemsPerPage?: number;
  search?:   string;
  etat?:     boolean;
}

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  private http = inject(HttpClient);
  private url  = `${environment.apiUrl}/users`;

  getAll(filters: UtilisateurFilters = {}) {
    const params: Record<string, string> = {};

    if (filters.page)         params['page']         = String(filters.page);
    if (filters.itemsPerPage) params['itemsPerPage'] = String(filters.itemsPerPage);
    if (filters.search)       params['search']       = filters.search;
    if (filters.etat !== undefined) params['etat']   = String(filters.etat);

    return this.http.get<PaginatedResponse<Utilisateur>>(this.url, { params });
  }

  getOne(id: number) {
    return this.http.get<Utilisateur>(`${this.url}/${id}`);
  }

  create(data: CreateUtilisateur) {
    return this.http.post<Utilisateur>(this.url, data);
  }

  update(id: number, data: UpdateUtilisateur) {
    return this.http.put<Utilisateur>(`${this.url}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  toggleEtat(id: number, etat: boolean) {
    return this.http.patch<Utilisateur>(`${this.url}/${id}/etat`, { etat });
  }

  assignRole(userId: number, roleId: number) {
    return this.http.post<void>(`${this.url}/${userId}/roles`, { roleId });
  }

  removeRole(userId: number, roleId: number) {
    return this.http.delete<void>(`${this.url}/${userId}/roles/${roleId}`);
  }

  uploadAvatar(id: number, file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.post<Utilisateur>(`${this.url}/${id}/avatar`, formData);
  }
}
```

---

### `utilisateur-list.component.ts`

```typescript
// features/administration/utilisateur/utilisateur-list/utilisateur-list.component.ts
import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { TableModule, TablePageEvent } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tag } from 'primeng/tag';
import { Avatar } from 'primeng/avatar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Select } from 'primeng/select';

import { HasPermissionDirective } from '../../../../shared/directives/has-permission.directive';
import { UtilisateurService } from '../utilisateur.service';
import { Utilisateur } from '../utilisateur.model';

@Component({
  selector: 'app-utilisateur-list',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    TableModule,
    Button,
    InputText,
    Tag,
    Avatar,
    ConfirmDialog,
    ToggleSwitch,
    IconField,
    InputIcon,
    Select,
    HasPermissionDirective,
  ],
  templateUrl: './utilisateur-list.component.html',
  providers: [ConfirmationService],
})
export class UtilisateurListComponent implements OnInit {
  private service             = inject(UtilisateurService);
  private messageService      = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  utilisateurs = signal<Utilisateur[]>([]);
  totalRecords = signal(0);
  loading      = signal(true);

  // Filtres
  search       = signal('');
  etatFilter   = signal<boolean | null>(null);
  page         = signal(1);
  rows         = signal(10);

  etatOptions = [
    { label: 'Tous',     value: null  },
    { label: 'Actifs',   value: true  },
    { label: 'Inactifs', value: false },
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);

    this.service.getAll({
      page:         this.page(),
      itemsPerPage: this.rows(),
      search:       this.search() || undefined,
      etat:         this.etatFilter() ?? undefined,
    }).subscribe({
      next: res => {
        this.utilisateurs.set(res['hydra:member']);
        this.totalRecords.set(res['hydra:totalItems']);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary:  'Erreur',
          detail:   'Impossible de charger les utilisateurs.',
        });
        this.loading.set(false);
      }
    });
  }

  onSearch(): void {
    this.page.set(1);
    this.loadData();
  }

  onPage(event: TablePageEvent): void {
    this.page.set((event.first / event.rows) + 1);
    this.rows.set(event.rows);
    this.loadData();
  }

  onFilterEtat(): void {
    this.page.set(1);
    this.loadData();
  }

  onToggleEtat(user: Utilisateur): void {
    this.service.toggleEtat(user.id, !user.etat).subscribe({
      next: updated => {
        this.utilisateurs.update(list =>
          list.map(u => u.id === updated.id ? updated : u)
        );
        this.messageService.add({
          severity: 'success',
          summary:  'Succès',
          detail:   `Utilisateur ${updated.etat ? 'activé' : 'désactivé'}.`,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary:  'Erreur',
          detail:   'Impossible de modifier l\'état.',
        });
      }
    });
  }

  confirmDelete(user: Utilisateur): void {
    this.confirmationService.confirm({
      message: `Supprimer l'utilisateur <strong>${user.prenom} ${user.nom}</strong> ?
                <br><small class="text-500">Cette action est irréversible.</small>`,
      header:  'Confirmer la suppression',
      icon:    'pi pi-exclamation-triangle',
      acceptLabel:        'Supprimer',
      rejectLabel:        'Annuler',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteUser(user),
    });
  }

  private deleteUser(user: Utilisateur): void {
    this.service.delete(user.id).subscribe({
      next: () => {
        this.utilisateurs.update(list => list.filter(u => u.id !== user.id));
        this.totalRecords.update(n => n - 1);
        this.messageService.add({
          severity: 'success',
          summary:  'Supprimé',
          detail:   `${user.prenom} ${user.nom} a été supprimé.`,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary:  'Erreur',
          detail:   'Impossible de supprimer cet utilisateur.',
        });
      }
    });
  }

  getInitials(user: Utilisateur): string {
    return `${user.prenom[0]}${user.nom[0]}`.toUpperCase();
  }
}
```

---

### `utilisateur-list.component.html`

```html
<!-- features/administration/utilisateur/utilisateur-list/utilisateur-list.component.html -->
<div class="flex flex-column gap-4">

  <!-- Header -->
  <div class="flex align-items-center justify-content-between">
    <div>
      <h2 class="text-900 font-bold text-2xl m-0">Utilisateurs</h2>
      <p class="text-500 mt-1 mb-0">
        {{ totalRecords() }} utilisateur{{ totalRecords() > 1 ? 's' : '' }} au total
      </p>
    </div>
    
      *hasPermission="{ entity: 'User', action: 'CREER' }"
      routerLink="/administration/utilisateurs/new">
      <p-button
        label="Nouvel utilisateur"
        icon="pi pi-plus" />
    </a>
  </div>

  <!-- Filtres -->
  <div class="flex gap-3 flex-wrap">
    <p-iconfield class="flex-1" style="min-width: 200px">
      <p-inputicon styleClass="pi pi-search" />
      <input
        pInputText
        placeholder="Rechercher un utilisateur..."
        [(ngModel)]="search"
        (keyup.enter)="onSearch()"
        class="w-full" />
    </p-iconfield>

    <p-select
      [options]="etatOptions"
      [(ngModel)]="etatFilter"
      optionLabel="label"
      optionValue="value"
      placeholder="Filtrer par état"
      (onChange)="onFilterEtat()"
      style="min-width: 180px" />
  </div>

  <!-- Table -->
  <p-table
    [value]="utilisateurs()"
    [loading]="loading()"
    [paginator]="true"
    [rows]="rows()"
    [totalRecords]="totalRecords()"
    [lazy]="true"
    (onPage)="onPage($event)"
    [rowsPerPageOptions]="[10, 25, 50]"
    [showCurrentPageReport]="true"
    currentPageReportTemplate="{first} - {last} sur {totalRecords}"
    styleClass="p-datatable-gridlines p-datatable-sm"
    [tableStyle]="{ 'min-width': '60rem' }">

    <ng-template pTemplate="header">
      <tr>
        <th style="width: 3rem">#</th>
        <th>Utilisateur</th>
        <th>Email</th>
        <th>Rôles</th>
        <th style="width: 8rem" class="text-center">État</th>
        <th style="width: 10rem" class="text-center">Actions</th>
      </tr>
    </ng-template>

    <ng-template pTemplate="body" let-user let-i="rowIndex">
      <tr>

        <!-- Numéro -->
        <td class="text-500 text-sm">{{ i + 1 }}</td>

        <!-- Avatar + Nom -->
        <td>
          <div class="flex align-items-center gap-3">
            @if (user.avatar) {
              <p-avatar
                [image]="user.avatar"
                shape="circle"
                size="normal" />
            } @else {
              <p-avatar
                [label]="getInitials(user)"
                shape="circle"
                styleClass="bg-primary text-white font-bold" />
            }
            <div>
              <div class="font-medium text-900">{{ user.prenom }} {{ user.nom }}</div>
            </div>
          </div>
        </td>

        <!-- Email -->
        <td class="text-600">{{ user.email }}</td>

        <!-- Rôles métier -->
        <td>
          <div class="flex gap-1 flex-wrap">
            @for (ur of user.userRoles; track ur.role.id) {
              <p-tag
                [value]="ur.role.name"
                severity="secondary" />
            }
            @if (user.userRoles.length === 0) {
              <span class="text-400 text-sm">Aucun rôle</span>
            }
          </div>
        </td>

        <!-- État toggle -->
        <td class="text-center">
          <p-toggleswitch
            *hasPermission="{ entity: 'User', action: 'MODIFIER' }"
            [ngModel]="user.etat"
            (onChange)="onToggleEtat(user)" />
          @if (!user.etat) {
            <p-tag value="Inactif" severity="danger" />
          }
        </td>

        <!-- Actions -->
        <td>
          <div class="flex justify-content-center gap-2">
            
              *hasPermission="{ entity: 'User', action: 'MODIFIER' }"
              [routerLink]="['/administration/utilisateurs', user.id, 'edit']">
              <p-button
                icon="pi pi-pencil"
                [text]="true"
                [rounded]="true"
                severity="secondary"
                pTooltip="Modifier" />
            </a>
            <p-button
              *hasPermission="{ entity: 'User', action: 'SUPPRIMER' }"
              icon="pi pi-trash"
              [text]="true"
              [rounded]="true"
              severity="danger"
              pTooltip="Supprimer"
              (onClick)="confirmDelete(user)" />
          </div>
        </td>

      </tr>
    </ng-template>

    <!-- État vide -->
    <ng-template pTemplate="emptymessage">
      <tr>
        <td colspan="6" class="text-center py-6 text-500">
          <i class="pi pi-users text-4xl mb-3 block"></i>
          Aucun utilisateur trouvé
        </td>
      </tr>
    </ng-template>

  </p-table>

</div>

<p-confirmdialog />
```

---

### Ce que fait la liste

```
ngOnInit → loadData()
    └── GET /users?page=1&itemsPerPage=10
            └── utilisateurs Signal mis à jour

Filtres
    ├── Recherche (keyup.enter) → page=1 → loadData()
    └── Filtre état (onChange)  → page=1 → loadData()

Pagination lazy
    └── onPage() → page/rows mis à jour → loadData()

Toggle état
    └── PATCH /users/:id/etat
            └── utilisateurs.update() → mise à jour locale sans reload

Suppression
    └── ConfirmDialog → DELETE /users/:id
            └── utilisateurs.update() → retrait local sans reload
```

---

On passe au **formulaire utilisateur** (création + édition) ?








## Étape 6.4 — Formulaire Utilisateur

Ce formulaire gère les deux cas : **création** et **édition**. On détecte le mode via la présence du paramètre `:id` dans l'URL.

---

### `utilisateur-form.component.ts`

```typescript
// features/administration/utilisateur/utilisateur-form/utilisateur-form.component.ts
import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// PrimeNG
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { Avatar } from 'primeng/avatar';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { Divider } from 'primeng/divider';

import { UtilisateurService } from '../utilisateur.service';
import { Utilisateur } from '../utilisateur.model';
import { RoleService } from '../../role/role.service';
import { Role } from '../../role/role.model';
import { HasPermissionDirective } from '../../../../shared/directives/has-permission.directive';

@Component({
  selector: 'app-utilisateur-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    Button,
    Card,
    InputText,
    Password,
    ToggleSwitch,
    Select,
    Tag,
    Avatar,
    SkeletonModule,
    Divider,
    HasPermissionDirective,
  ],
  templateUrl: './utilisateur-form.component.html',
})
export class UtilisateurFormComponent implements OnInit {
  private service        = inject(UtilisateurService);
  private roleService    = inject(RoleService);
  private fb             = inject(FormBuilder);
  private router         = inject(Router);
  private route          = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  // ── État ──
  utilisateur  = signal<Utilisateur | null>(null);
  roles        = signal<Role[]>([]);           // tous les rôles dispo
  loading      = signal(true);
  saving       = signal(false);
  uploading    = signal(false);

  // Mode création ou édition
  userId   = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? Number(id) : null;
  });
  isEdit   = computed(() => this.userId() !== null);
  pageTitle = computed(() => this.isEdit() ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur');

  // ── Formulaire ──
  form = this.fb.group({
    nom:      ['', Validators.required],
    prenom:   ['', Validators.required],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', this.isEdit() ? [] : [Validators.required, Validators.minLength(8)]],
    etat:     [true],
  });

  // Raccourcis
  get nom()      { return this.form.controls.nom;      }
  get prenom()   { return this.form.controls.prenom;   }
  get email()    { return this.form.controls.email;     }
  get password() { return this.form.controls.password; }

  // Rôle sélectionné à assigner
  selectedRole = signal<Role | null>(null);

  ngOnInit(): void {
    // Charge les rôles disponibles en parallèle
    this.roleService.getAll().subscribe({
      next: res => this.roles.set(res['hydra:member']),
    });

    if (this.isEdit()) {
      this.loadUtilisateur();
    } else {
      this.loading.set(false);
    }
  }

  private loadUtilisateur(): void {
    this.service.getOne(this.userId()!).subscribe({
      next: data => {
        this.utilisateur.set(data);
        this.form.patchValue({
          nom:    data.nom,
          prenom: data.prenom,
          email:  data.email,
          etat:   data.etat,
        });
        // En édition le password n'est pas requis
        this.password.clearValidators();
        this.password.updateValueAndValidity();
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary:  'Erreur',
          detail:   'Utilisateur introuvable.',
        });
        this.router.navigate(['/administration/utilisateurs']);
      }
    });
  }

  // ── Soumission formulaire ──
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const val = this.form.getRawValue();

    const request$ = this.isEdit()
      ? this.service.update(this.userId()!, {
          nom:    val.nom!,
          prenom: val.prenom!,
          email:  val.email!,
          etat:   val.etat!,
        })
      : this.service.create({
          nom:      val.nom!,
          prenom:   val.prenom!,
          email:    val.email!,
          password: val.password!,
          etat:     val.etat!,
        });

    request$.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary:  'Succès',
          detail:   this.isEdit()
            ? 'Utilisateur mis à jour.'
            : 'Utilisateur créé avec succès.',
        });
        this.router.navigate(['/administration/utilisateurs']);
      },
      error: err => {
        this.saving.set(false);
        const violations = err?.error?.violations;

        // Gestion des erreurs de validation API Platform
        if (violations?.length) {
          violations.forEach((v: any) => {
            this.messageService.add({
              severity: 'warn',
              summary:  'Validation',
              detail:   v.message,
            });
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary:  'Erreur',
            detail:   err?.error?.detail ?? 'Une erreur est survenue.',
          });
        }
      }
    });
  }

  // ── Gestion des rôles ──
  assignRole(): void {
    const role   = this.selectedRole();
    const userId = this.userId();

    if (!role || !userId) return;

    // Vérifie si le rôle est déjà assigné
    const alreadyAssigned = this.utilisateur()
      ?.userRoles.some(ur => ur.role.id === role.id);

    if (alreadyAssigned) {
      this.messageService.add({
        severity: 'warn',
        summary:  'Attention',
        detail:   'Ce rôle est déjà assigné à cet utilisateur.',
      });
      return;
    }

    this.service.assignRole(userId, role.id).subscribe({
      next: () => {
        // Mise à jour locale du signal
        this.utilisateur.update(u => u ? {
          ...u,
          userRoles: [...u.userRoles, { role: { id: role.id, name: role.name } }]
        } : u);
        this.selectedRole.set(null);
        this.messageService.add({
          severity: 'success',
          summary:  'Rôle assigné',
          detail:   `Le rôle "${role.name}" a été assigné.`,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary:  'Erreur',
          detail:   'Impossible d\'assigner ce rôle.',
        });
      }
    });
  }

  removeRole(roleId: number, roleName: string): void {
    const userId = this.userId();
    if (!userId) return;

    this.service.removeRole(userId, roleId).subscribe({
      next: () => {
        this.utilisateur.update(u => u ? {
          ...u,
          userRoles: u.userRoles.filter(ur => ur.role.id !== roleId)
        } : u);
        this.messageService.add({
          severity: 'success',
          summary:  'Rôle retiré',
          detail:   `Le rôle "${roleName}" a été retiré.`,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary:  'Erreur',
          detail:   'Impossible de retirer ce rôle.',
        });
      }
    });
  }

  // ── Avatar ──
  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file  = input.files?.[0];
    const id    = this.userId();

    if (!file || !id) return;

    const maxSize = 2 * 1024 * 1024;
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowed.includes(file.type)) {
      this.messageService.add({
        severity: 'warn',
        summary:  'Format invalide',
        detail:   'Formats acceptés : JPG, PNG, WEBP.',
      });
      return;
    }

    if (file.size > maxSize) {
      this.messageService.add({
        severity: 'warn',
        summary:  'Fichier trop lourd',
        detail:   'L\'image ne doit pas dépasser 2 Mo.',
      });
      return;
    }

    this.uploading.set(true);

    this.service.uploadAvatar(id, file).subscribe({
      next: updated => {
        this.utilisateur.set(updated);
        this.uploading.set(false);
        this.messageService.add({
          severity: 'success',
          summary:  'Succès',
          detail:   'Avatar mis à jour.',
        });
      },
      error: () => {
        this.uploading.set(false);
        this.messageService.add({
          severity: 'error',
          summary:  'Erreur',
          detail:   'Impossible de mettre à jour l\'avatar.',
        });
      }
    });
  }

  getInitials(): string {
    const u = this.utilisateur();
    if (!u) return '?';
    return `${u.prenom[0]}${u.nom[0]}`.toUpperCase();
  }

  onCancel(): void {
    this.router.navigate(['/administration/utilisateurs']);
  }
}
```

---

### `utilisateur-form.component.html`

```html
<!-- features/administration/utilisateur/utilisateur-form/utilisateur-form.component.html -->
<div class="flex flex-column gap-4">

  <!-- Header -->
  <div class="flex align-items-center gap-3">
    <p-button
      icon="pi pi-arrow-left"
      [text]="true"
      [rounded]="true"
      severity="secondary"
      (onClick)="onCancel()" />
    <div>
      <h2 class="text-900 font-bold text-2xl m-0">{{ pageTitle() }}</h2>
      <p class="text-500 mt-1 mb-0">
        {{ isEdit() ? 'Modifier les informations de l\'utilisateur' : 'Créer un nouveau compte utilisateur' }}
      </p>
    </div>
  </div>

  <!-- Skeleton -->
  @if (loading()) {
    <div class="grid">
      @for (i of [1,2,3,4]; track i) {
        <div class="col-12 md:col-6">
          <p-skeleton height="56px" styleClass="mb-2" />
        </div>
      }
    </div>
  }

  @if (!loading()) {
    <div class="grid">

      <!-- ── Colonne principale ── -->
      <div class="col-12 lg:col-8 flex flex-column gap-4">

        <!-- Informations personnelles -->
        <p-card header="Informations personnelles">
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="grid">

              <!-- Prénom -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label class="font-medium text-900">
                  Prénom <span class="text-red-500">*</span>
                </label>
                <input
                  pInputText
                  formControlName="prenom"
                  placeholder="Ex: Jean"
                  [class.ng-invalid]="prenom.invalid && prenom.touched" />
                @if (prenom.touched && prenom.hasError('required')) {
                  <small class="text-red-500">Le prénom est requis.</small>
                }
              </div>

              <!-- Nom -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label class="font-medium text-900">
                  Nom <span class="text-red-500">*</span>
                </label>
                <input
                  pInputText
                  formControlName="nom"
                  placeholder="Ex: Dupont"
                  [class.ng-invalid]="nom.invalid && nom.touched" />
                @if (nom.touched && nom.hasError('required')) {
                  <small class="text-red-500">Le nom est requis.</small>
                }
              </div>

              <!-- Email -->
              <div class="col-12 flex flex-column gap-2">
                <label class="font-medium text-900">
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  pInputText
                  type="email"
                  formControlName="email"
                  placeholder="jean.dupont@email.com"
                  [class.ng-invalid]="email.invalid && email.touched" />
                @if (email.touched && email.hasError('required')) {
                  <small class="text-red-500">L'email est requis.</small>
                }
                @if (email.touched && email.hasError('email')) {
                  <small class="text-red-500">Format d'email invalide.</small>
                }
              </div>

              <!-- Mot de passe — uniquement en création -->
              @if (!isEdit()) {
                <div class="col-12 flex flex-column gap-2">
                  <label class="font-medium text-900">
                    Mot de passe <span class="text-red-500">*</span>
                  </label>
                  <p-password
                    formControlName="password"
                    placeholder="Minimum 8 caractères"
                    [toggleMask]="true"
                    styleClass="w-full"
                    inputStyleClass="w-full"
                    [class.ng-invalid]="password.invalid && password.touched" />
                  @if (password.touched && password.hasError('required')) {
                    <small class="text-red-500">Le mot de passe est requis.</small>
                  }
                  @if (password.touched && password.hasError('minlength')) {
                    <small class="text-red-500">Minimum 8 caractères.</small>
                  }
                </div>
              }

              <!-- État -->
              <div class="col-12 flex align-items-center gap-3">
                <label class="font-medium text-900">Compte actif</label>
                <p-toggleswitch formControlName="etat" />
                <span class="text-500 text-sm">
                  {{ form.controls.etat.value ? 'L\'utilisateur peut se connecter' : 'Connexion bloquée' }}
                </span>
              </div>

              <!-- Actions -->
              <div class="col-12 flex justify-content-end gap-3 mt-2">
                <p-button
                  type="button"
                  label="Annuler"
                  severity="secondary"
                  [outlined]="true"
                  (onClick)="onCancel()" />
                <p-button
                  type="submit"
                  [label]="isEdit() ? 'Enregistrer' : 'Créer l\'utilisateur'"
                  icon="pi pi-check"
                  [loading]="saving()" />
              </div>

            </div>
          </form>
        </p-card>

        <!-- Gestion des rôles — uniquement en édition -->
        @if (isEdit()) {
          <p-card header="Rôles assignés">

            <!-- Rôles actuels -->
            <div class="flex flex-wrap gap-2 mb-4">
              @for (ur of utilisateur()?.userRoles; track ur.role.id) {
                <div class="flex align-items-center gap-2 border-1 surface-border
                            border-round-xl px-3 py-2">
                  <i class="pi pi-shield text-primary text-sm"></i>
                  <span class="font-medium text-900 text-sm">{{ ur.role.name }}</span>
                  <p-button
                    *hasPermission="{ entity: 'UserRole', action: 'SUPPRIMER' }"
                    icon="pi pi-times"
                    [text]="true"
                    [rounded]="true"
                    severity="danger"
                    size="small"
                    (onClick)="removeRole(ur.role.id, ur.role.name)" />
                </div>
              }
              @if (utilisateur()?.userRoles?.length === 0) {
                <span class="text-400 text-sm">Aucun rôle assigné.</span>
              }
            </div>

            <p-divider />

            <!-- Assigner un rôle -->
            <div
              *hasPermission="{ entity: 'UserRole', action: 'CREER' }"
              class="flex gap-3 align-items-center">
              <p-select
                [options]="roles()"
                [(ngModel)]="selectedRole"
                optionLabel="name"
                placeholder="Choisir un rôle..."
                class="flex-1" />
              <p-button
                label="Assigner"
                icon="pi pi-plus"
                [disabled]="!selectedRole()"
                (onClick)="assignRole()" />
            </div>

          </p-card>
        }

      </div>

      <!-- ── Colonne avatar — uniquement en édition ── -->
      @if (isEdit()) {
        <div class="col-12 lg:col-4">
          <p-card header="Avatar">
            <div class="flex flex-column align-items-center gap-4">

              <!-- Aperçu avatar -->
              @if (utilisateur()?.avatar) {
                <p-avatar
                  [image]="utilisateur()!.avatar"
                  shape="circle"
                  size="xlarge"
                  styleClass="w-7rem h-7rem" />
              } @else {
                <p-avatar
                  [label]="getInitials()"
                  shape="circle"
                  size="xlarge"
                  styleClass="bg-primary text-white font-bold text-4xl w-7rem h-7rem" />
              }

              <!-- Upload -->
              <label
                for="avatarInput"
                class="p-button p-button-outlined p-button-secondary
                       cursor-pointer flex align-items-center gap-2
                       px-3 py-2 border-round w-full justify-content-center">
                @if (uploading()) {
                  <i class="pi pi-spin pi-spinner"></i>
                  <span>Envoi...</span>
                } @else {
                  <i class="pi pi-upload"></i>
                  <span>Changer l'avatar</span>
                }
              </label>
              <input
                id="avatarInput"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                class="hidden"
                [disabled]="uploading()"
                (change)="onAvatarSelected($event)" />

              <span class="text-400 text-xs text-center">
                JPG, PNG, WEBP — max 2 Mo
              </span>

            </div>
          </p-card>
        </div>
      }

    </div>
  }

</div>
```

---

### Ce que fait ce formulaire

```
Mode détecté via ActivatedRoute
    ├── :id absent → isEdit() = false
    │   ├── password requis (min 8 car.)
    │   ├── sections Avatar et Rôles masquées
    │   └── POST /users à la soumission
    │
    └── :id présent → isEdit() = true
        ├── GET /users/:id → patchValue()
        ├── password non requis
        ├── section Avatar visible
        ├── section Rôles visible
        │   ├── POST /users/:id/roles  → assignRole()
        │   └── DELETE /users/:id/roles/:roleId → removeRole()
        └── PUT /users/:id à la soumission

Erreurs API Platform
    └── violations[] → un Toast par violation de contrainte
```

---

On passe à **6.5 — Rôles & Permissions** ?










## Étape 6.5 — Rôles & Permissions

C'est la partie la plus dense du module Administration. Le formulaire de rôle gère à la fois les infos du rôle **et** la matrice de permissions (entités × actions).

---

### Modèle

```typescript
// features/administration/role/role.model.ts

export type RoleAction = 'VOIR' | 'CREER' | 'MODIFIER' | 'SUPPRIMER';

export interface Permission {
  id?:    number;
  entity: string;
  action: RoleAction;
}

export interface Role {
  id:          number;
  name:        string;
  description?: string;
  typerole?:   string;
  permissions: Permission[];
}

export interface CreateRole {
  name:         string;
  description?: string;
  typerole?:    string;
}

// Liste de toutes les entités de l'app avec leur libellé lisible
export interface EntityDef {
  key:    string;   // "Voyage" — utilisé dans Permission.entity
  label:  string;   // "Voyages" — affiché dans la matrice
  module: string;   // "Exploitation" — pour grouper dans la matrice
}
```

---

### Configuration des entités

On centralise toutes les entités de l'app dans un fichier de config. C'est ce qui va générer la matrice de permissions.

```typescript
// core/config/entities.config.ts
import { EntityDef } from '../../features/administration/role/role.model';

export const ENTITY_DEFINITIONS: EntityDef[] = [
  // Administration
  { key: 'Entreprise',           label: 'Entreprise',           module: 'Administration' },
  { key: 'User',                 label: 'Utilisateurs',         module: 'Administration' },
  { key: 'Role',                 label: 'Rôles',                module: 'Administration' },
  { key: 'UserRole',             label: 'Attribution de rôles', module: 'Administration' },

  // Personnel
  { key: 'Typepersonnel',        label: 'Types de personnel',   module: 'Personnel'      },
  { key: 'Personnel',            label: 'Personnel',            module: 'Personnel'      },
  { key: 'Detailpersonnel',      label: 'Affectations',         module: 'Personnel'      },

  // Stock
  { key: 'Fournisseur',          label: 'Fournisseurs',         module: 'Stock'          },
  { key: 'Typepiece',            label: 'Types de pièce',       module: 'Stock'          },
  { key: 'Marquepiece',          label: 'Marques de pièce',     module: 'Stock'          },
  { key: 'Piece',                label: 'Pièces',               module: 'Stock'          },
  { key: 'Approvisionnement',    label: 'Approvisionnements',   module: 'Stock'          },
  { key: 'Inventaire',           label: 'Inventaire',           module: 'Stock'          },

  // Flotte
  { key: 'Marque',               label: 'Marques véhicule',     module: 'Flotte'         },
  { key: 'Typevehicule',         label: 'Types véhicule',       module: 'Flotte'         },
  { key: 'Modelvehicule',        label: 'Modèles véhicule',     module: 'Flotte'         },
  { key: 'Car',                  label: 'Véhicules',            module: 'Flotte'         },
  { key: 'Depannage',            label: 'Dépannages',           module: 'Flotte'         },

  // Exploitation
  { key: 'Gare',                 label: 'Gares',                module: 'Exploitation'   },
  { key: 'Tarif',                label: 'Tarifs',               module: 'Exploitation'   },
  { key: 'Trajet',               label: 'Trajets',              module: 'Exploitation'   },
  { key: 'Voyage',               label: 'Voyages',              module: 'Exploitation'   },

  // Billetterie
  { key: 'Ticket',               label: 'Tickets',              module: 'Billetterie'    },

  // Courrier
  { key: 'Tarifcourrier',        label: 'Tarifs courrier',      module: 'Courrier'       },
  { key: 'Courrier',             label: 'Courriers',            module: 'Courrier'       },

  // Bagage
  { key: 'Tarifbagage',          label: 'Tarifs bagage',        module: 'Bagage'         },
  { key: 'Bagage',               label: 'Bagages',              module: 'Bagage'         },
];

// Actions disponibles pour toutes les entités
export const ACTIONS: RoleAction[] = ['VOIR', 'CREER', 'MODIFIER', 'SUPPRIMER'];

// Groupement par module pour la matrice
export function getEntitiesByModule(): Map<string, EntityDef[]> {
  const map = new Map<string, EntityDef[]>();
  for (const entity of ENTITY_DEFINITIONS) {
    if (!map.has(entity.module)) map.set(entity.module, []);
    map.get(entity.module)!.push(entity);
  }
  return map;
}
```

---

### `role.service.ts`

```typescript
// features/administration/role/role.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Role, CreateRole, Permission } from './role.model';
import { PaginatedResponse } from '../utilisateur/utilisateur.service';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private http = inject(HttpClient);
  private url  = `${environment.apiUrl}/roles`;

  getAll() {
    return this.http.get<PaginatedResponse<Role>>(this.url);
  }

  getOne(id: number) {
    return this.http.get<Role>(`${this.url}/${id}`);
  }

  create(data: CreateRole) {
    return this.http.post<Role>(this.url, data);
  }

  update(id: number, data: CreateRole) {
    return this.http.put<Role>(`${this.url}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Ajoute une permission à un rôle
  addPermission(roleId: number, permission: Omit<Permission, 'id'>) {
    return this.http.post<Permission>(
      `${this.url}/${roleId}/permissions`,
      permission
    );
  }

  // Retire une permission d'un rôle
  removePermission(roleId: number, permissionId: number) {
    return this.http.delete<void>(
      `${this.url}/${roleId}/permissions/${permissionId}`
    );
  }
}
```

---

### `role-list.component.ts`

```typescript
// features/administration/role/role-list/role-list.component.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

// PrimeNG
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { HasPermissionDirective } from '../../../../shared/directives/has-permission.directive';
import { RoleService } from '../role.service';
import { Role } from '../role.model';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    RouterLink,
    TableModule,
    Button,
    Tag,
    ConfirmDialog,
    HasPermissionDirective,
  ],
  templateUrl: './role-list.component.html',
  providers: [ConfirmationService],
})
export class RoleListComponent implements OnInit {
  private service             = inject(RoleService);
  private messageService      = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  roles   = signal<Role[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: res => {
        this.roles.set(res['hydra:member']);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary:  'Erreur',
          detail:   'Impossible de charger les rôles.',
        });
        this.loading.set(false);
      }
    });
  }

  confirmDelete(role: Role): void {
    this.confirmationService.confirm({
      message: `Supprimer le rôle <strong>${role.name}</strong> ?
                <br><small class="text-500">
                  Les utilisateurs ayant ce rôle perdront ses permissions.
                </small>`,
      header:          'Confirmer la suppression',
      icon:            'pi pi-exclamation-triangle',
      acceptLabel:     'Supprimer',
      rejectLabel:     'Annuler',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.service.delete(role.id).subscribe({
          next: () => {
            this.roles.update(list => list.filter(r => r.id !== role.id));
            this.messageService.add({
              severity: 'success',
              summary:  'Supprimé',
              detail:   `Le rôle "${role.name}" a été supprimé.`,
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary:  'Erreur',
              detail:   'Impossible de supprimer ce rôle.',
            });
          }
        });
      }
    });
  }
}
```

### `role-list.component.html`

```html
<!-- features/administration/role/role-list/role-list.component.html -->
<div class="flex flex-column gap-4">

  <!-- Header -->
  <div class="flex align-items-center justify-content-between">
    <div>
      <h2 class="text-900 font-bold text-2xl m-0">Rôles & Permissions</h2>
      <p class="text-500 mt-1 mb-0">
        {{ roles().length }} rôle{{ roles().length > 1 ? 's' : '' }} configuré{{ roles().length > 1 ? 's' : '' }}
      </p>
    </div>
    
      *hasPermission="{ entity: 'Role', action: 'CREER' }"
      routerLink="/administration/roles/new">
      <p-button label="Nouveau rôle" icon="pi pi-plus" />
    </a>
  </div>

  <!-- Table -->
  <p-table
    [value]="roles()"
    [loading]="loading()"
    styleClass="p-datatable-gridlines p-datatable-sm"
    [tableStyle]="{ 'min-width': '40rem' }">

    <ng-template pTemplate="header">
      <tr>
        <th style="width: 3rem">#</th>
        <th>Nom du rôle</th>
        <th>Description</th>
        <th class="text-center">Permissions</th>
        <th style="width: 10rem" class="text-center">Actions</th>
      </tr>
    </ng-template>

    <ng-template pTemplate="body" let-role let-i="rowIndex">
      <tr>
        <td class="text-500 text-sm">{{ i + 1 }}</td>

        <td>
          <div class="flex align-items-center gap-2">
            <i class="pi pi-shield text-primary"></i>
            <span class="font-medium text-900">{{ role.name }}</span>
          </div>
        </td>

        <td class="text-600">{{ role.description ?? '—' }}</td>

        <td class="text-center">
          <p-tag
            [value]="role.permissions.length + ' permission' + (role.permissions.length > 1 ? 's' : '')"
            severity="secondary" />
        </td>

        <td>
          <div class="flex justify-content-center gap-2">
            
              *hasPermission="{ entity: 'Role', action: 'MODIFIER' }"
              [routerLink]="['/administration/roles', role.id, 'edit']">
              <p-button
                icon="pi pi-pencil"
                [text]="true"
                [rounded]="true"
                severity="secondary"
                pTooltip="Modifier & gérer les permissions" />
            </a>
            <p-button
              *hasPermission="{ entity: 'Role', action: 'SUPPRIMER' }"
              icon="pi pi-trash"
              [text]="true"
              [rounded]="true"
              severity="danger"
              pTooltip="Supprimer"
              (onClick)="confirmDelete(role)" />
          </div>
        </td>

      </tr>
    </ng-template>

    <ng-template pTemplate="emptymessage">
      <tr>
        <td colspan="5" class="text-center py-6 text-500">
          <i class="pi pi-shield text-4xl mb-3 block"></i>
          Aucun rôle configuré
        </td>
      </tr>
    </ng-template>

  </p-table>

</div>

<p-confirmdialog />
```

---

### `role-form.component.ts`

C'est le composant le plus complexe — il gère la matrice de permissions avec des cases à cocher.

```typescript
// features/administration/role/role-form/role-form.component.ts
import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// PrimeNG
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Checkbox } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';
import { Divider } from 'primeng/divider';

import { RoleService } from '../role.service';
import { Role, Permission, RoleAction } from '../role.model';
import {
  ENTITY_DEFINITIONS,
  ACTIONS,
  getEntitiesByModule
} from '../../../../core/config/entities.config';

// Structure interne de la matrice pour le template
interface MatrixRow {
  entityKey:   string;
  entityLabel: string;
  checks: {
    action:     RoleAction;
    checked:    boolean;
    permission: Permission | null; // null si pas encore assignée
  }[];
}

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Button,
    Card,
    InputText,
    Textarea,
    Checkbox,
    SkeletonModule,
    Tag,
    Divider,
  ],
  templateUrl: './role-form.component.html',
})
export class RoleFormComponent implements OnInit {
  private service        = inject(RoleService);
  private fb             = inject(FormBuilder);
  private router         = inject(Router);
  private route          = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  // ── État ──
  role    = signal<Role | null>(null);
  loading = signal(true);
  saving  = signal(false);

  roleId  = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? Number(id) : null;
  });
  isEdit    = computed(() => this.roleId() !== null);
  pageTitle = computed(() =>
    this.isEdit() ? 'Modifier le rôle' : 'Nouveau rôle'
  );

  // ── Matrice ──
  actions           = ACTIONS;
  entitiesByModule  = getEntitiesByModule();

  // Signal de la matrice — reconstruit à chaque changement de rôle
  matrix = signal<Map<string, MatrixRow[]>>(new Map());

  // Compteur de permissions cochées
  permissionCount = computed(() => {
    let count = 0;
    this.matrix().forEach(rows =>
      rows.forEach(row =>
        row.checks.forEach(c => { if (c.checked) count++; })
      )
    );
    return count;
  });

  // ── Formulaire ──
  form = this.fb.group({
    name:        ['', Validators.required],
    description: [''],
    typerole:    [''],
  });

  get name()        { return this.form.controls.name;        }
  get description() { return this.form.controls.description; }

  ngOnInit(): void {
    if (this.isEdit()) {
      this.loadRole();
    } else {
      this.buildMatrix([]);
      this.loading.set(false);
    }
  }

  private loadRole(): void {
    this.service.getOne(this.roleId()!).subscribe({
      next: data => {
        this.role.set(data);
        this.form.patchValue({
          name:        data.name,
          description: data.description ?? '',
          typerole:    data.typerole    ?? '',
        });
        this.buildMatrix(data.permissions);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary:  'Erreur',
          detail:   'Rôle introuvable.',
        });
        this.router.navigate(['/administration/roles']);
      }
    });
  }

  // ── Construction de la matrice ──
  // Construit une Map<module, MatrixRow[]>
  // Chaque case connait si elle est cochée et sa Permission associée
  private buildMatrix(permissions: Permission[]): void {
    const newMatrix = new Map<string, MatrixRow[]>();

    this.entitiesByModule.forEach((entities, module) => {
      const rows: MatrixRow[] = entities.map(entity => ({
        entityKey:   entity.key,
        entityLabel: entity.label,
        checks: this.actions.map(action => {
          const perm = permissions.find(
            p => p.entity === entity.key && p.action === action
          ) ?? null;
          return {
            action,
            checked:    perm !== null,
            permission: perm,
          };
        }),
      }));
      newMatrix.set(module, rows);
    });

    this.matrix.set(newMatrix);
  }

  // ── Toggle une permission ──
  togglePermission(row: MatrixRow, checkIndex: number): void {
    const check = row.checks[checkIndex];

    if (!this.isEdit()) {
      // En création : on coche/décoche localement, les permissions
      // seront envoyées à la soumission
      this.matrix.update(m => {
        const newMap = new Map(m);
        newMap.forEach((rows, module) => {
          rows.forEach(r => {
            if (r.entityKey === row.entityKey) {
              r.checks[checkIndex].checked = !r.checks[checkIndex].checked;
            }
          });
        });
        return newMap;
      });
      return;
    }

    // En édition : appel API immédiat
    if (check.checked && check.permission?.id) {
      // Retirer la permission
      this.service.removePermission(this.roleId()!, check.permission.id).subscribe({
        next: () => {
          this.updateCheck(row.entityKey, checkIndex, false, null);
          this.messageService.add({
            severity: 'success',
            summary:  'Permission retirée',
            detail:   `${row.entityLabel} → ${check.action}`,
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary:  'Erreur',
            detail:   'Impossible de retirer cette permission.',
          });
        }
      });
    } else {
      // Ajouter la permission
      this.service.addPermission(this.roleId()!, {
        entity: row.entityKey,
        action: check.action,
      }).subscribe({
        next: newPerm => {
          this.updateCheck(row.entityKey, checkIndex, true, newPerm);
          this.messageService.add({
            severity: 'success',
            summary:  'Permission ajoutée',
            detail:   `${row.entityLabel} → ${check.action}`,
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary:  'Erreur',
            detail:   'Impossible d\'ajouter cette permission.',
          });
        }
      });
    }
  }

  // Met à jour une case de la matrice après un appel API
  private updateCheck(
    entityKey:   string,
    checkIndex:  number,
    checked:     boolean,
    permission:  Permission | null
  ): void {
    this.matrix.update(m => {
      const newMap = new Map(m);
      newMap.forEach(rows => {
        rows.forEach(r => {
          if (r.entityKey === entityKey) {
            r.checks[checkIndex].checked    = checked;
            r.checks[checkIndex].permission = permission;
          }
        });
      });
      return newMap;
    });
  }

  // ── Tout cocher / décocher une ligne ──
  toggleRow(row: MatrixRow): void {
    const allChecked = row.checks.every(c => c.checked);
    row.checks.forEach((check, i) => {
      if (check.checked !== !allChecked) {
        this.togglePermission(row, i);
      }
    });
  }

  isRowChecked(row: MatrixRow): boolean {
    return row.checks.every(c => c.checked);
  }

  isRowIndeterminate(row: MatrixRow): boolean {
    const checkedCount = row.checks.filter(c => c.checked).length;
    return checkedCount > 0 && checkedCount < row.checks.length;
  }

  // ── Soumission (création uniquement) ──
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const val = this.form.getRawValue();

    if (this.isEdit()) {
      // En édition : on met à jour uniquement les infos du rôle
      // Les permissions sont gérées en temps réel via togglePermission()
      this.service.update(this.roleId()!, {
        name:        val.name!,
        description: val.description ?? undefined,
        typerole:    val.typerole    ?? undefined,
      }).subscribe({
        next: () => {
          this.saving.set(false);
          this.messageService.add({
            severity: 'success',
            summary:  'Succès',
            detail:   'Rôle mis à jour.',
          });
        },
        error: err => {
          this.saving.set(false);
          this.messageService.add({
            severity: 'error',
            summary:  'Erreur',
            detail:   err?.error?.detail ?? 'Une erreur est survenue.',
          });
        }
      });
      return;
    }

    // Création : on crée le rôle puis on envoie toutes les permissions cochées
    this.service.create({
      name:        val.name!,
      description: val.description ?? undefined,
      typerole:    val.typerole    ?? undefined,
    }).subscribe({
      next: newRole => {
        // Collecte toutes les permissions cochées
        const permissions: Omit<Permission, 'id'>[] = [];
        this.matrix().forEach(rows => {
          rows.forEach(row => {
            row.checks.forEach(check => {
              if (check.checked) {
                permissions.push({
                  entity: row.entityKey,
                  action: check.action,
                });
              }
            });
          });
        });

        if (permissions.length === 0) {
          this.saving.set(false);
          this.messageService.add({
            severity: 'success',
            summary:  'Succès',
            detail:   'Rôle créé sans permissions.',
          });
          this.router.navigate(['/administration/roles']);
          return;
        }

        // Envoie toutes les permissions en parallèle
        const requests = permissions.map(p =>
          this.service.addPermission(newRole.id, p)
        );

        Promise.all(requests.map(r => r.toPromise())).then(() => {
          this.saving.set(false);
          this.messageService.add({
            severity: 'success',
            summary:  'Succès',
            detail:   `Rôle créé avec ${permissions.length} permission(s).`,
          });
          this.router.navigate(['/administration/roles']);
        }).catch(() => {
          this.saving.set(false);
          this.messageService.add({
            severity: 'warn',
            summary:  'Attention',
            detail:   'Rôle créé mais certaines permissions n\'ont pas pu être assignées.',
          });
          this.router.navigate(['/administration/roles']);
        });
      },
      error: err => {
        this.saving.set(false);
        this.messageService.add({
          severity: 'error',
          summary:  'Erreur',
          detail:   err?.error?.detail ?? 'Une erreur est survenue.',
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/administration/roles']);
  }
}
```

---

### `role-form.component.html`

```html
<!-- features/administration/role/role-form/role-form.component.html -->
<div class="flex flex-column gap-4">

  <!-- Header -->
  <div class="flex align-items-center gap-3">
    <p-button
      icon="pi pi-arrow-left"
      [text]="true"
      [rounded]="true"
      severity="secondary"
      (onClick)="onCancel()" />
    <div>
      <h2 class="text-900 font-bold text-2xl m-0">{{ pageTitle() }}</h2>
      <p class="text-500 mt-1 mb-0">
        Définissez les informations et la matrice de permissions
      </p>
    </div>
  </div>

  @if (loading()) {
    <p-skeleton height="200px" />
  }

  @if (!loading()) {
    <div class="grid">

      <!-- ── Informations du rôle ── -->
      <div class="col-12">
        <p-card header="Informations du rôle">
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="grid">

              <!-- Nom -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label class="font-medium text-900">
                  Nom du rôle <span class="text-red-500">*</span>
                </label>
                <input
                  pInputText
                  formControlName="name"
                  placeholder="Ex: Responsable exploitation"
                  [class.ng-invalid]="name.invalid && name.touched" />
                @if (name.touched && name.hasError('required')) {
                  <small class="text-red-500">Le nom est requis.</small>
                }
              </div>

              <!-- Type de rôle -->
              <div class="col-12 md:col-6 flex flex-column gap-2">
                <label class="font-medium text-900">Type de rôle</label>
                <input
                  pInputText
                  formControlName="typerole"
                  placeholder="Ex: Opérationnel, Administratif..." />
              </div>

              <!-- Description -->
              <div class="col-12 flex flex-column gap-2">
                <label class="font-medium text-900">Description</label>
                <textarea
                  pTextarea
                  formControlName="description"
                  rows="2"
                  placeholder="Décrivez les responsabilités de ce rôle..."
                  class="w-full">
                </textarea>
              </div>

              <!-- Actions formulaire -->
              <div class="col-12 flex justify-content-end gap-3">
                <p-button
                  type="button"
                  label="Annuler"
                  severity="secondary"
                  [outlined]="true"
                  (onClick)="onCancel()" />
                <p-button
                  type="submit"
                  [label]="isEdit() ? 'Enregistrer les infos' : 'Créer le rôle'"
                  icon="pi pi-check"
                  [loading]="saving()" />
              </div>

            </div>
          </form>
        </p-card>
      </div>

      <!-- ── Matrice de permissions ── -->
      <div class="col-12">
        <p-card>
          <ng-template pTemplate="header">
            <div class="flex align-items-center justify-content-between w-full px-4 pt-4">
              <div>
                <span class="font-bold text-900 text-lg">Matrice des permissions</span>
                @if (isEdit()) {
                  <p class="text-500 text-sm mt-1 mb-0">
                    Les cases sont sauvegardées automatiquement
                  </p>
                } @else {
                  <p class="text-500 text-sm mt-1 mb-0">
                    Cochez les permissions puis créez le rôle
                  </p>
                }
              </div>
              <p-tag
                [value]="permissionCount() + ' permission' + (permissionCount() > 1 ? 's' : '')"
                severity="info" />
            </div>
          </ng-template>

          <!-- Un bloc par module -->
          @for (entry of entitiesByModule | keyvalue; track entry.key) {
            <div class="mb-5">

              <!-- Titre du module -->
              <div class="flex align-items-center gap-2 mb-3">
                <span class="font-bold text-700 text-sm uppercase tracking-wide">
                  {{ entry.key }}
                </span>
                <p-divider styleClass="flex-1 m-0" />
              </div>

              <!-- Table de la matrice -->
              <div class="overflow-x-auto">
                <table class="w-full" style="border-collapse: collapse">

                  <!-- En-tête colonnes -->
                  <thead>
                    <tr class="surface-ground">
                      <th
                        class="text-left px-3 py-2 text-500 text-sm font-medium border-1 surface-border"
                        style="min-width: 180px">
                        Entité
                      </th>
                      <th
                        class="px-3 py-2 border-1 surface-border text-center"
                        style="width: 100px">
                        <p-tag value="TOUT" severity="secondary" />
                      </th>
                      @for (action of actions; track action) {
                        <th
                          class="px-3 py-2 border-1 surface-border text-center text-sm font-medium"
                          style="width: 110px"
                          [class.text-blue-600]="action === 'VOIR'"
                          [class.text-green-600]="action === 'CREER'"
                          [class.text-orange-600]="action === 'MODIFIER'"
                          [class.text-red-600]="action === 'SUPPRIMER'">
                          {{ action }}
                        </th>
                      }
                    </tr>
                  </thead>

                  <!-- Corps — une ligne par entité -->
                  <tbody>
                    @for (row of matrix().get(entry.key); track row.entityKey) {
                      <tr class="hover:surface-hover transition-colors transition-duration-150">

                        <!-- Nom de l'entité -->
                        <td class="px-3 py-2 border-1 surface-border font-medium text-900 text-sm">
                          {{ row.entityLabel }}
                        </td>

                        <!-- Case "Tout" -->
                        <td class="px-3 py-2 border-1 surface-border text-center">
                          <p-checkbox
                            [binary]="true"
                            [ngModel]="isRowChecked(row)"
                            [indeterminate]="isRowIndeterminate(row)"
                            (onChange)="toggleRow(row)" />
                        </td>

                        <!-- Cases individuelles -->
                        @for (check of row.checks; track check.action; let i = $index) {
                          <td class="px-3 py-2 border-1 surface-border text-center">
                            <p-checkbox
                              [binary]="true"
                              [(ngModel)]="check.checked"
                              (onChange)="togglePermission(row, i)" />
                          </td>
                        }

                      </tr>
                    }
                  </tbody>

                </table>
              </div>

            </div>
          }

        </p-card>
      </div>

    </div>
  }

</div>
```

---

### Ce que fait la matrice

```
En création
    ├── Cases cochées localement (pas d'appel API)
    └── Soumission → POST /roles → puis POST /roles/:id/permissions
                     pour chaque case cochée

En édition
    ├── Chaque case déclenche un appel API immédiat
    │   ├── Cocher   → POST /roles/:id/permissions
    │   └── Décocher → DELETE /roles/:id/permissions/:permId
    └── Bouton "Enregistrer" → uniquement pour les infos du rôle
        (nom, description, typerole)

Case "TOUT" par ligne
    ├── Toutes cochées    → décocher toutes
    ├── Aucune cochée     → cocher toutes
    └── Partiellement     → état indéterminé (trait)
```

---

Le module Administration est complet :

```
Administration ✓
├── Entreprise    → fiche détail + formulaire édition
├── Utilisateurs  → liste paginée + formulaire création/édition + gestion rôles
└── Rôles         → liste + formulaire + matrice de permissions
```

On passe au **module Personnel** ?