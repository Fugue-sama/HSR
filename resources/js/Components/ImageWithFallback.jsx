import React, { useState } from 'react'

const ImageWithFallback = ({ src, alt, className, fallbackSrc }) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <img
            src={loaded ? src : fallbackSrc}
            onLoad={() => setLoaded(true)}
            alt={alt}
            className={className}
        />
    )
}

export default ImageWithFallback
