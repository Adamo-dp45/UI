export default async function Loading() {
    await new Promise((r) => setTimeout(r, 1000)) /*
        - 'async' et 'await' pour simuler un chargement va s'appliquer au fichier de 'blog'
    */
    return <>
        Loading...
    </>
}