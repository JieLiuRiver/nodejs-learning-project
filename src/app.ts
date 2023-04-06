import config from '@/config';
import express from 'express';
import 'module-alias';
import { connectSequelize } from '@/data-access/sequelize';
import { findAvailablePort } from './shared/port';
import log from '@/services/logService';
import cors from 'cors';
import router from '@/router';
import logApiMiddleware from '@/middlewares/logApiMiddleware';
import logExceptionMiddleware from '@/middlewares/logExceptionMiddleware';
import formatResponse from './middlewares/formatResponse';
import { asyncModel } from './models';


const app = express();

const PORT = process.env.PORT || config.port;

process.on('uncaughtException', (err) => {
    log.error(err);
    process.exit(1);
});
process.on('unhandledRejection', (err) => {
    log.error(err);
    process.exit(1);
});

connectSequelize()
    .then(async () => {
        await asyncModel();
        app.use(formatResponse);
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(logApiMiddleware, logExceptionMiddleware);
        app.use(express.static('public'));
        app.use(cors());
        app.use(config.api_base_url!, router);
    })
    .then(async () => {
        const port = await findAvailablePort(app, Number(PORT));
        port !== PORT &&
            console.log(
                `Port ${PORT} is in use by another process. choosed ${port} port and start the server now.`
            );
        app.listen(port, () =>
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
        );
    })
    .catch(e => log.error(`Error:${e}`));
