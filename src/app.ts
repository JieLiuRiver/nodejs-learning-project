import 'module-alias';
import express from 'express';
import { findAvailablePort } from './shared/port';
import cors from 'cors';
import router from '@/router';
import log from '@/services/logServices';
import logApiMiddleware from '@/middlewares/logApiMiddleware';
import logExceptionMiddleware from '@/middlewares/logExceptionMiddleware';
import formatResponse from '@/middlewares/formatResponse';

process.on('uncaughtException', (err) => {
    console.error('An uncaught error occurred：');
    log.error(err);
    process.exit(1);
});
process.on('unhandledRejection', (err) => {
    log.error(err);
});

const PORT = process.env.PORT || 3000;
const app = express();

app.use(formatResponse);
app.use(express.json());
app.use(logApiMiddleware, logExceptionMiddleware);
app.use(express.static('public'));
app.use(cors());
app.use('/api/v1', router);


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
