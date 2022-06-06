import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import register from './routers/register';
import auth from './routers/authorize';
import { config } from './config/config';
import Logging from './library/Logging';
import authorRoutes from './routers/author';
import bookRoutes from './routers/task';
import refresh from './routers/refresh';
import logout from './routers/logout';
import verifyJWT from './middleware/verifyJWT';
import corsOptions from './config/corsOptions';
import cors from 'cors';
import credentials from './middleware/credentials';
var cookieParser = require('cookie-parser')
const router = express();

/** Connect to Mongo */



mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Mongo connected successfully.');
        StartServer();
    })
    .catch((error) => Logging.error(error));

/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    // Handle options credentials check - before CORS!
    // and fetch cookies credentials requirement
    router.use(credentials);

    // Cross Origin Resource Sharing
    router.use(cors(corsOptions));
    // built-in middleware to handle urlencoded form data
    router.use(express.urlencoded({ extended: false }));

    // built-in middleware for json 
    router.use(express.json());

    //middleware for cookies
    router.use(cookieParser());

    /** Routes */
    router.use('/authors', authorRoutes);
    router.use('/task', bookRoutes);
    router.use('/register', register);
    router.use('/auth', auth);
    router.use('/refresh', refresh);
    router.use('/logout', logout);

    router.use(verifyJWT);

    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};