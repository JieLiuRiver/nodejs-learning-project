import config from '@/config';
import 'module-alias';
import { connectSequelize } from '@/data-access/sequelize';
import { findAvailablePort } from './shared/port';
import log from '@/services/logService';
import createServer from './server';

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
    .then(() => createServer())
    .then(async (app) => {
       const port = await findAvailablePort(app, Number(PORT))
        if (port !== PORT) {
            console.log(
                `Port ${PORT} is in use by another process. choosed ${port} port and start the server now.`
            );
        }
        app.listen(port, () =>
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
        );
    })
    .catch(e => log.error(`Error:${e}`));
