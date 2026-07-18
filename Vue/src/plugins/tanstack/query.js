const { useQuery, useQueryClient, useMutation, useInfiniteQuery } = require("@tanstack/vue-query")
const { computed } = require("vue")

// -- Tanstack Query
const {data, isLoading, error} = useQuery({
    queryKey: ['posts'], // Une clé qui permettra de faire reférence à cette query pour ensuite l'invalider à l'extérieur ou charger/recharger les données
    queryFn: () => {/* return un appel fetch */}, // Permet d'indiquer comment on récupère les données
    staleTime: 30000, // 30s pour être considérer comme périmé, comme ça il n'y aura de nouvelle appel ajax à moins de 30s
    // gcTime: -- Combien de temps la requête va être conserver dans le cache, utile pour les requête dynamique
}) // A partir du queryFn on verra une mise en cache lors de la navigation, va afficher le cache en attendant de faire une nouvelle requête pour la remplaçer, par défaut le temps pour être périmer est 5min et dès qu'il est créer il le considère comme périmé - On peut aussi modifier les options de manière globale

// Requête dynamique - Faire une nouvelle requête à chaque que notre id change - Lui fais une nouvelle que quand la queryKey change : queryKey: computed(() => ['posts', props.id])

// Dans le cas d'une édition d'article, on voudra invalider manuellement le cache
const queryClient = useQueryClient()
const onSubmit = () => {
    updatedPost()
    queryClient.invalidateQueries({queryKey: ['post']})
    // queryClient.invalidateQueries({queryKey: ['post', post.id]})

    // Sol 2 : Ici on peut dire ça sert à rien d'invalider le cache car ici on n'a déjà les données qui sont mises à jour, donc on vas mettre à jour le cache
    queryClient.setQueriesData(['posts'], (oldData) => { // Met à jour une plusieurs query
        return {
            ...oldData, // Ancienne données
            ...updatedPost() // Mettre à jour avec aussi les nouvelles données
        } // On verra que lorsqu'on modifira les données seront mises à jour sans qu'il y'est de nouvelle appel serveur
    })
    queryClient.setQueryData(['post', post.id]) // Met à jour une seule query
}

// Pour cette partie de mise à jour
const {isError, isPending, mutate, mutateAsync} = useMutation({ // mutate : Lance la mutation, mutateAsync : Renvoi une promesse
    mutationFn: () => updatePost(post.id, updatedPost),
    onSuccess: (data) => { // Lorsque j'ai de nouvelle données
        queryClient.setQueriesData(['posts'], (oldData) => {
            return {
                ...oldData,
                ...data
            }
        })
    },
    onMutate: () => { // Va être lancer dès lors que la mutation va être lancer, Rendu optimisc, les données seront directement mise à jour et après la reponse du serveur va remettre à jour, on part du principe que l'API va bien repondre
        queryClient.setQueriesData(['posts'], (oldData) => {
            return {
                ...oldData,
                ...updatedPost
            }
        })
    }
}) // @submit.prevent="mutate" :disabled="isPending"

// Pagination infini
const {data: posts, isLoading: loading, isFetching, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['posts'],
    initialPageParam: 1, // Params de la page initial
    queryFn: ({pageParam}) => getPosts({page: pageParam}),
    getNextPageParam: (lastPage, pages) => pages.length === 3 ? null : pages.length + 1
})
// Ici le data est un objet et renvoi des pages, est aussi réactive
const postsData = computed(() => posts.value?.pages.flat() ?? []) // La liste des articles, flat : Pour avoir tous les articles au même niveau

// v-for="post in postsData"
// v-if="hasNextPage" :disabled="isFetching" @click="fetchNextPage" Page suivante