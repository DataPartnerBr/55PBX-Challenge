import mongoose from 'mongoose'
import {DB_URL} from '../config/variables'

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Connect DB successfully`))
    .catch(err => console.error('Could not connect', err));