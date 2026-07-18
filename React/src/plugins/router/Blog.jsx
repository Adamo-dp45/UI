import { Suspense } from "react"
import { Await, NavLink, useLoaderData } from "react-router-dom"
import { Spinner } from "../../components/Spinner"

export function Blog() {
    const posts = useLoaderData()
    // const { posts } = useLoaderData() -- Si on utilise defer dans la partie router, on aura une promesse

    return <>
        <h1>Mon Blog</h1>
        {/*
            <Suspense fallback={<Spinner />}>
                <Await resolve={posts}>
                    {(posts) => (
                        <ul>
                           {posts.map((post) => (
                                <li key={post.id}>
                                    <NavLink to={post.id}>{post.title}</NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                </Await>
            </Suspense>
        */}
        {/*
            {posts.map((post) => (
                <li key={post.id}>
                    <NavLink to={post.id}>{post.title}</NavLink>
                </li>
            ))}
        */}
    </>
}