export interface Permission {
    entity: string /*
        - L'api renvoi 'Voyage', 'Trajet'..
    */
    action: string /*
        - !! 'VOIR', 'CREER', 'MODIFIER'.. pour les actions
    */
}

export type PermissionKey = string /*
    - La clé combinée qu'on utilisera partout dans l'application, ex: 'Voyage_VOIR'..
*/