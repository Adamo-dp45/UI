import { Category } from "./category.model"

export interface Prompt {
    id: number
    title: string
    content: string
    score: number
    createdAt: string
    category: Category // Ou.. {id: number, name:string}
    author: {
        id: number
        username: string
    }
    userVote: null | 'up' | 'down' 
} /*
    - Pour représenter nos données
*/