"use client"

import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
/*
    - 'redirect('/')' permet de rediriger
*/
export default function Home() {
    const [isLoading, setIsLoading] = useState(false) /*
        - Vu qu'on est dans un client component on.. l'utiliser
    */
    const create = async (FormData: FormData) => {
        setIsLoading(true) // Ou.. 'SubmitButton' qui la meilleur manière de faire
        const result = await fetch('/api/blog', {
            body: JSON.stringify({
                name: FormData.get('name')
            }),
            method: 'post'
        })
        const json = await result.json()
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                Hello <Button>Bouton</Button>
                <Link href="/blog">Lien</Link>
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={100}
                    height={20}
                    priority
                />
            </main>
            <div>
                <form action={async (formData) => {
                        await create(formData)
                    }}
                    method="post"
                >
                    <label>
                        Champ
                        <input type="text" name="text" />
                    </label>
                    {/* <button disabled={isLoading}>{isLoading ? 'Loading..' : 'Soumettre'}</button> */}
                    <SubmitButton />
                </form>
            </div>
        </div>
    );
}

const SubmitButton = () => {
    const {pending} = useFormStatus()
    return (
        <Button disabled={pending} type="submit">
            {pending ? 'Loading..' : 'Soumettre'}
        </Button>
    )
}