import React from 'react'

export default function Image(props) {
    const {image} = props
    return (
        <div className='image'>
            <p>{image.baseUrl}</p>
            <p><img src={image.baseUrl + '/' + image.url} className='image-width'></img></p>
        </div>
    )
}
