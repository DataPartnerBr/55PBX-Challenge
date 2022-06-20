import './config/db'
import express from 'express'
import {PORT, API_VERSION} from './config/variables'
import cors from 'cors'
import http from 'http'
import socketIO from 'socket.io';


import imageRouter from './controllers/image'

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    transports: ['polling'],
    cors: {
        cors: {
            origin: "http://localhost:3000"
        }
    }
});

io.on('connection', (socket) => {
    console.log('New connection!');

    socket.on('message', (message) => {
        console.log(`message from ${socket.id} : ${message}`);
    });

    socket.on('disconnect', () => {
        console.log(`socket ${socket.id} disconnected`);
    })
});

export {io};

app.use(express.json());
app.use(cors());
app.use(`${API_VERSION}/images`, imageRouter);

app.get('/', (req, res) => {
    res.send('API 55PBX ON')
});

server.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});