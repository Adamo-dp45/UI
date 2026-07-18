import { useAccount } from "./useAccount"

export function Header() {
    const {account} = useAccount()

    return <>
        <header>
            <nav className="navbar navbar-expand-md navbar-light bg-primary mb-2">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Authy</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#home" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="home">
                        <ul className="navbar-nav me-auto mb-lg-0">
                            <li className="nav-item">
                                <a href="" className="nav-link">Blog</a>
                            </li>
                        </ul>
                        <div className="ms-auto">
                            <ul className="navbar-nav">
                                <li className="navbar-item">
                                    <a href="" className="nav-link">Deconnexion</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <p>
            Bonjour {account.username}
        </p>
    </>
}