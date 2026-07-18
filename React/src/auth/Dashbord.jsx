import { useAccount } from "./useAccount"

export function Dashbord() {
    const {account} = useAccount()

    return <>
        <h1 className="display-6">Bienvenue {account.username}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum laborum sint mollitia. Omnis magnam, blanditiis placeat vel, ipsum molestiae doloribus qui animi cupiditate deserunt voluptates sunt cum numquam expedita.</p>
    </>
}