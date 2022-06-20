import express from 'express'
import Image from '../models/image'
import {io} from '../index'

const imageService = require("../services/imageService");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const images = await Image.find()
        res.send(images)
    } catch (error) {
        res.send(error)
    }
});

router.post('/', async (req, res) => {

    try {
        await imageService.create(req.body);

        setTimeout(async () => {
            const images = await imageService.get();
            io.emit('images-added', images)
        }, 2000);

        return res.json({
            url: req.body,
            ok: true,
            message: "Images processed successfully!",
        });
    } catch (error) {
        return res.status(400).json({ok: false, message: error.message});
    }
});

export default router