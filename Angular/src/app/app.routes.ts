import { Routes } from '@angular/router';
import { PromptList } from './prompts/prompt-list/prompt-list';
import { PromptForm } from './prompts/prompt-form/prompt-form';
import { AuthForm } from './auth/auth-form/auth-form';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'prompts', // Ou.. 'home' et on peut lui donner une fonction
        pathMatch: 'full'
    }, /*
        - Si on met un path '' ça va correspondre à toute les urls donc pour qu'il corr.. à l'ensemble du chemin ou à la racine on ajoute 'pathMatch' à 'full'
    */
    { path: 'prompts', component: PromptList },
    { path: 'prompts/create', component: PromptForm },
    {
        path: 'prompts/:promptId/edit', /*
            - On vas utiliser le paramètre ':promptId' comme input pour notre composant via 'app.config.ts' - 'provideRouter(..withComponentInputBinding())' puis dans le composant 'promptId=input..'
        */
        component: PromptForm
    },
    /*
        {
            path: '**',
            component: PageNotFoundComponent
        }
    */
    { path: 'auth', component: AuthForm, canActivate: [authGuard] }, /*
        - Le 'canActivate: [authGuard]' permet de protéger la route
    */

    /* Transport
     */
    /*
    {
        path: 'auth',
        loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
        ]
    }, /*
        - Auth layout sans sidebar
    */
    /*
    {
        path: '', /*
            - Main layout avec sidebar
        *
        canActivate: [authGuard],
        loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent)
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
            },
            {
                path: 'administration',
                loadChildren: () => import('./features/administration/administration.routes').then(m => m.administrationRoutes)
            },
            {
                path: 'stock',
                loadChildren: () => import('./features/stock/stock.routes').then(m => m.stockRoutes)
            },
            {
                path: 'flotte',
                loadChildren: () => import('./features/flotte/flotte.routes').then(m => m.flotteRoutes)
            },
            {
                path: 'exploitation',
                loadChildren: () => import('./features/exploitation/exploitation.routes').then(m => m.exploitationRoutes)
            },
            {
                path: 'billetterie',
                loadChildren: () => import('./features/billetterie/billetterie.routes').then(m => m.billeterieRoutes)
            },
            {
                path: 'courrier',
                loadChildren: () => import('./features/courrier/courrier.routes').then(m => m.courrierRoutes)
            },
            {
                path: 'bagage',
                loadChildren: () => import('./features/bagage/bagage.routes').then(m => m.bagageRoutes)
            },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
    */
]; /*
    - Vu qu'on utilise le router va injecter chaque composant à un endroit de l'application via 'router-outlet'
*/