import { Button } from "../components/Button"

export function Card({
    image,
    title,
    description,
    href,
    buttonLabel
}) {

    return <>
        <div className="card">
            {image && <img src={image} className="card-img-top" />}
            {title && <div className="card-title">{title}</div>}
            {href && buttonLabel && <Button href={href}>{buttonLabel}</Button>}
        </div>
    </>
}