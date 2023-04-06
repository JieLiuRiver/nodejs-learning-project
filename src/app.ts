import 'module-alias';
import express from 'express';
import { findAvailablePort } from './shared/port';
import cors from 'cors';
import router from '@/router';
import log from '@/services/logServices';
import config from '@/config';
import logApiMiddleware from '@/middlewares/logApiMiddleware';
import logExceptionMiddleware from '@/middlewares/logExceptionMiddleware';
import formatResponse from '@/middlewares/formatResponse';

process.on('uncaughtException', (err) => {
    log.error(err);
    process.exit(1);
});
process.on('unhandledRejection', (err) => {
    log.error(err);
    process.exit(1);
});

const PORT = process.env.PORT || config.port;
const app = express();

app.use(formatResponse);
app.use(express.json());
app.use(express.urlencoded());
app.use(logApiMiddleware, logExceptionMiddleware);
app.use(express.static('public'));
app.use(cors({
    // Change to the origin of your front-end application
    origin: 'http://localhost:8000',
    allowedHeaders: 'Content-Type',
    // allow with cookie or authorization
    credentials: true,
    methods: 'GET, POST, PUT'
}));
app.use(config.api_base_url, router);


findAvailablePort(app, Number(PORT))
    .then((port) => {
        port !== PORT &&
      console.log(
          `Port ${PORT} is in use by another process. choosed ${port} port and start the server now.`
      );
        app.listen(port, () =>
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
        );
    })
    .catch((err) => console.error(err));
