import { Entreprise } from "./entreprise.model";
import { Permission } from "./permission.model";

export interface Role {
    id: number
    name: string
    description?: string
    permissions: Permission[]
}

export interface UserRole {
    role: Role
}

export interface User {
    id: number
    email: string
    nom: string
    prenom: string
    roles: string[]
    entreprise?: Entreprise
    userRoles: UserRole[]
    statut: string
}