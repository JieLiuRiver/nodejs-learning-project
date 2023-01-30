
import bunyan from 'bunyan';

const logger = bunyan.createLogger({
    name: "Bode's NodeJS App",
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            stream: process.stdout
        }
    ]
});

export default logger;
