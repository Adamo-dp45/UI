import { useState, useEffect, useCallback, useRef } from "react"
import { visit } from "@hotwired/turbo"

export interface PaginatedResult<T> {
    data:       T[]
    totalItems: number
    totalPages: number
    page:       number
}

export interface ApiFilters {
    [key: string]: string | number | undefined
}

export interface SortState {
    field:     string
    direction: "asc" | "desc"
}

interface Options<T> {
    endpoint:     string          // ex: /api/pieces
    apiUrl:       string          // ex: https://api.monapp.com
    token:        string
    perPage?:     number
    defaultSort?: SortState
    searchField?: string | string[] // "libelle" ou ["nom", "prenom"]
}

export function usePaginatedApi<T>({
    endpoint,
    apiUrl,
    token,
    perPage: initialPerPage = 25,
    defaultSort,
    searchField = "libelle",
}: Options<T>) {

    const [data,       setData]       = useState<T[]>([])
    const [totalItems, setTotalItems] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [page,       setPage]       = useState(1)
    const [perPage,    setPerPage]    = useState(initialPerPage) // ← exposé
    const [search,     setSearch]     = useState("")
    const [filters,    setFilters]    = useState<ApiFilters>({})
    const [sort,       setSort]       = useState<SortState | undefined>(defaultSort)
    const [loading,    setLoading]    = useState(false)
    const [error,      setError]      = useState<string | null>(null)

    // Debounce sur la recherche
    const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [debouncedSearch, setDebouncedSearch] = useState("")

    useEffect(() => {
        if (searchDebounce.current) clearTimeout(searchDebounce.current)
        searchDebounce.current = setTimeout(() => {
            setDebouncedSearch(search)
            setPage(1)
        }, 350)
        return () => {
            if (searchDebounce.current) clearTimeout(searchDebounce.current)
        }
    }, [search])

    // Reset page quand les filtres changent
    const updateFilters = useCallback((newFilters: ApiFilters) => {
        setFilters(newFilters)
        setPage(1)
    }, [])

    // Toggle tri
    const updateSort = useCallback((field: string) => {
        setSort((prev) => {
            if (prev?.field === field) {
                return { field, direction: prev.direction === "asc" ? "desc" : "asc" }
            }
            return { field, direction: "asc" }
        })
        setPage(1)
    }, [])

    // Changement de perPage → reset à la page 1
    const updatePerPage = useCallback((newPerPage: number) => {
        setPerPage(newPerPage)
        setPage(1)
    }, [])

    // Fetch principal
    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const params = new URLSearchParams()

            params.set("page",         String(page))
            params.set("itemsPerPage", String(perPage))

            if (debouncedSearch) {
                const fields = Array.isArray(searchField) ? searchField : [searchField]
                fields.forEach((field) => {
                    if (field) params.set(field, debouncedSearch)
                })
            }

            // Filtres dynamiques ex: { "typepiece.id": "3", "marquepiece.id": "1" }
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== "") {
                    params.set(key, String(value))
                }
            })

            // Tri ex: order[libelle]=asc
            if (sort) {
                params.set(`order[${sort.field}]`, sort.direction)
            }

            const res = await fetch(`${apiUrl}${endpoint}?${params.toString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/ld+json",
                },
            }) /*
                - Pour l'appel vers le proxy Symfony on a pas besoin de 'token' et 'apiUrl'
                const res = await fetch(`/proxy${endpoint}?${params.toString()}`, {
                    headers: {
                        Accept: "application/ld+json",
                        -- Le cookie de session Symfony est envoyé automatiquement
                    }
                })
            */

            if (res.status === 401) {
                // On peut mettre un 'flash' pour lui dire que sa session a expiré
                visit("/connexion")
                return
            }

            if (!res.ok) {
                throw new Error(`Erreur ${res.status}`)
            }

            const json = await res.json()

            setData(json["member"] ?? [])
            setTotalItems(json["totalItems"] ?? 0)
            setTotalPages(
                Math.ceil((json["totalItems"] ?? 0) / perPage) || 1
            )
        } catch (e: any) {
            setError(e.message ?? "Une erreur est survenue.")
        } finally {
            setLoading(false)
        }
    }, [page, perPage, debouncedSearch, filters, sort, endpoint, apiUrl, token, searchField])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return {
        // Données
        data,
        totalItems,
        totalPages,
        loading,
        error,

        // État
        page,
        perPage,      // ← nouveau
        search,
        filters,
        sort,

        // Actions
        setPage,
        setSearch,
        updateFilters,
        updateSort,
        updatePerPage, // ← nouveau
        refresh: fetchData,
    }
}