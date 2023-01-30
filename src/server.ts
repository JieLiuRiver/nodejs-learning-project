

import express, { Express } from 'express';
import cors from 'cors';
import router from '@/router';
import logApiMiddleware from '@/middlewares/logApiMiddleware';
import logExceptionMiddleware from '@/middlewares/logExceptionMiddleware';
import config from '@/config';

export default (): Express => {
    const app: Express = express();
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(logApiMiddleware, logExceptionMiddleware);
    app.use(express.static('public'));
    app.use(cors());
    app.use(config.api_base_url!, router);
    return app;
};
