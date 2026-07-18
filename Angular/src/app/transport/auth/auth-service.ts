import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment'
import { User } from '../models/user.model'
import { PermissionKey } from '../models/permission.model'
import { catchError, EMPTY, tap } from 'rxjs'

interface AuthTokens {
    token: string /*
        - Le 'jwt' envoyé dans chaque requête
    */
    refresh_token: string /*
        - Pour renouveller le 'jwt' sans demandé à l'utilisateur de se connecté
    */
}

interface LoginCredentials {
    email: string
    password: string
}

@Injectable({
    providedIn: 'root',
})
export class AuthService { /*
        - On a aplatie les permissions en 'Set<string>' pour des vérifications instantanées
    */

    private http = inject(HttpClient);
    private router = inject(Router);
    private api = environment.apiTransportUrl;

    // ───────────────────────────────────────────
  // Signals — source de vérité de l'état auth
  // ───────────────────────────────────────────

  // L'utilisateur connecté (null = non connecté)
  private _currentUser = signal<User | null>(null);

  // true pendant le chargement du /me au démarrage
  private _loading = signal<boolean>(false);

  // Permissions aplaties : Set {"Voyage_VOIR", "Piece_CREER", ...}
  private _permissions = signal<Set<PermissionKey>>(new Set());

  // ───────────────────────────────────────────
  // Signals publics (lecture seule pour les composants)
  // ───────────────────────────────────────────

  readonly currentUser = this._currentUser.asReadonly();
  readonly loading     = this._loading.asReadonly();
  readonly permissions = this._permissions.asReadonly();

  // Computed : est-ce que l'utilisateur est connecté ?
  readonly isAuthenticated = computed(() => this._currentUser() !== null);

  // Computed : nom complet pour l'affichage dans la topbar
  readonly fullName = computed(() => {
    const u = this._currentUser();
    return u ? `${u.prenom} ${u.nom}` : '';
  });

  // ───────────────────────────────────────────
  // Login
  // ───────────────────────────────────────────

  login(credentials: LoginCredentials) {
    return this.http
      .post<AuthTokens>(`${this.api}/auth/login`, credentials)
      .pipe(
        tap(tokens => {
          // 1. On stocke les tokens
          this.storeTokens(tokens);
          // 2. On charge immédiatement le profil utilisateur
          this.loadCurrentUser().subscribe();
        })
      );
  }

  // ───────────────────────────────────────────
  // Charger le profil depuis /me
  // Appelé au login ET au démarrage de l'app
  // ───────────────────────────────────────────

  loadCurrentUser() {
    this._loading.set(true);

    return this.http.get<User>(`${this.api}/me`).pipe(
      tap(user => {
        this._currentUser.set(user);
        this._permissions.set(this.buildPermissions(user));
        this._loading.set(false);
      }),
      catchError(() => {
        // Token expiré ou invalide → on nettoie
        this.clearSession();
        this._loading.set(false);
        return EMPTY;
      })
    );
  }

  // ───────────────────────────────────────────
  // Vérifier une permission
  // Utilisé par le guard et la directive
  // ───────────────────────────────────────────

  hasPermission(entity: string, action: string): boolean {
    return this._permissions().has(`${entity}_${action}`);
  }

  // ───────────────────────────────────────────
  // Logout
  // ───────────────────────────────────────────

  logout() {
    this.clearSession();
    this.router.navigate(['/auth/login']);
  }

  // ───────────────────────────────────────────
  // Getters pour les tokens (utilisés par l'interceptor)
  // ───────────────────────────────────────────

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  // ───────────────────────────────────────────
  // Méthodes privées
  // ───────────────────────────────────────────

  private storeTokens(tokens: AuthTokens): void {
    localStorage.setItem('access_token', tokens.token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

  private clearSession(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this._currentUser.set(null);
    this._permissions.set(new Set());
  }

  // Aplatit tous les rôles → toutes les permissions → Set de clés
  // [{entity: "Voyage", action: "VOIR"}, ...] → Set{"Voyage_VOIR", ...}
  // Si l'utilisateur a **2 rôles** avec des permissions qui se chevauchent, le `Set` déduplique automatiquement. Pas de doublon, pas de vérification en double
  private buildPermissions(user: User): Set<PermissionKey> {
    const keys = user.userRoles
      .flatMap(ur => ur.role.permissions)
      .map(p => `${p.entity}_${p.action}`);

    return new Set(keys);
  }
}
