/*
    -- Permet de capturer les erreurs et les placés à un différent endroit dans notre application
        - Doc React copier la class ErrorBoundary, on a fais l'utilisation dans 'Products'
        - fallback : Text ou composant à utiliser lors d'une erreur

    <ErrorBoundary fallback={<p>Impossible d'afficher la liste des produits</p>} >
        Composant
    <ErrorBoundary />

    - On n'est obligé de créer cette class nous même à partir de la doc, il existe déjà une librairie
    - react-error-boundary : A en plus une méthode onRest() qui va permettre de réinitialiser les choses comme recharger les données dépuis le serveur

    <ErrorBoundary
        FallbackComponent={AlertError}
        onReset={() => console.log('Reset')}
    >
    </ErrorBoundary>

    function AlertError({error, resetErrorBoundary}) {
        return <div className="alert alert-danger">
            {error.toString()}
            <button className="btn btn-info" onClick={resetErrorBoundary}>Reset</button>
        </div>
    }
*/

function App() {

}

export default App