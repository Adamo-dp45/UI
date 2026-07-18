export function Toast({title, content, type = 'default'}) {
    return (
        <div className={`toast toast-${type}`}>
            {title && (
                <p>
                    <strong>{title}</strong>
                </p>
            )}
            <p>{content}</p>
        </div>
    )
}