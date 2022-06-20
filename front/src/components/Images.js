import React, {useEffect, useState} from 'react'
import axios from 'axios';
import api from '../services/api'
import Image from './Image'
import {io} from 'socket.io-client'

export default function Images() {
    const [images, setImages] = useState([])

    useEffect(() => {
        const socket = io('ws://localhost:5000')

        socket.on('connnection', () => {
            console.log('connected to server');
        })

        socket.on('image-added', (newImages) => {
            setImages(newImages)
        })

        socket.on('message', (message) => {
            console.log(message);
        })

        socket.on('disconnect', () => {
            console.log('Socket disconnecting');
        })

    }, [])

    useEffect(() => {
        const getImages = async () => {
            const response = await axios.get('http://localhost:5000/api/v1/images')
            const imagesData = response.data;
            setImages(imagesData)
        }

        getImages();

        const interval = setInterval(() => {
            getImages()
        }, 10000)


        return () => clearInterval(interval)

    }, []);

    return (
        <div className='image-list'>
            {images && images.map(image => {
                return <div key={image._id}><Image image={image}/></div>
            })}
        </div>
    )
}
