import 'dotenv/config';
import ExpressServer from './server/expressServer';
import routes from './routes/purchased-corns.routes'
import express from 'express';
import cors from 'cors'

const HOST: string = process.env.HOST || 'localhost';
const PORT: number = Number(process.env.PORT) || 3000;

const server = new ExpressServer(HOST, PORT);

server.getExpress().use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

server.getExpress().use(cors(corsOptions))
server.getExpress().use('/v1/purchased-corns', routes);

try {
    server.listen();
} catch (e) {
    console.log(e);
    process.exit(1);
}
