import Link from "next/link";

export default function Home() {
    return (
        <div>
            Blog
            <p>
                <Link href="/blog/1">Voir un item</Link>
            </p>
        </div>
    )
}
