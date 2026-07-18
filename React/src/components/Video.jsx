import { useEffect, useRef } from "react"

export function Video({url}) {
    const video = useRef(null)

    useEffect(() => {
        const videoEl = video.current
        videoEl?.play()
        return () => {
            videoEl?.pause()
        }
    }, [])

    return <video 
        src={url}
        controls
        playsInline
        ref={video}
        muted
    ></video>
}