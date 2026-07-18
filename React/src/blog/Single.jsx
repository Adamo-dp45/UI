import { Spinner } from "../components/Spinner"
import { Button } from "../components/Button"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { useFetch } from "../hooks/useFetch"
import { useToggle } from "../hooks/useToggle"

function App({postId}) {
    const {data: post, loading, error, setData} = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    useDocumentTitle(post?.title) // Les hook ne doivent pas être dans une condition
    const [isEditing, toggleEditing] = useToggle(false)
    const handleSave = (data) => {
        setData({
            ...post,
            ...data
        })
        toggleEditing()
    }

    return <>
        {loading && <Spinner />}
        {error && 'Erreur'}
        {post && <div>
            <img src={`https://picsum.photos/id/${post.id}/600/400`} alt="" />
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            {isEditing && <EditPostModal post={post} onClose={toggleEditing} onSave={handleSave}>Edition de l'article</EditPostModal>}
            <p>
                <Button variant={'primary'} onClick={toggleEditing}>Editer l'article</Button>
            </p>
            <p>
                <a href={`#posts:${post.id + 1}`}>Article suivant</a>
                <a href={`#posts:${post.id - 1}`}>Article précédent</a>
            </p>
        </div>}
    </>
}

export default App