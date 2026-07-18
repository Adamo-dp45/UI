export default async function Item(props: {
    params: Promise<{
        id: number
    }>;
    searchParams: Promise<Record<string, string | string[]>> /*
        - On.. récupérer 'searchParams' via '?..' dans l'url
    */
}) {
    const params = await props.params
    const searchParams = await props.searchParams

    return <>
        <p>
            Item {JSON.stringify(params, null, 2)} - {params.id}
        </p>
        <p>
            Search params {JSON.stringify(searchParams, null, 2)}
        </p>
    </>
}