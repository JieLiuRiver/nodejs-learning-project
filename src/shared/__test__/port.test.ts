import express from 'express';
import { Express } from 'express';
import { findAvailablePort } from '../port';

describe('findAvailablePort', () => {
    let app: Express | null;
    beforeEach(() => {
        app = express();
    });

    afterEach(() => {
        app = null;
    });

    it('should resolve with the given port if it is available', async () => {
        const port = 4000;
        const resolvedPort = await findAvailablePort(app!, port);
        expect(resolvedPort).toBe(port);
    });

    it('should resolve with the next available port if the given port is in use', async () => {
        const port = 4100;
        const server = app!.listen(port);
        const resolvedPort = await findAvailablePort(app!, port);
        server.close();
        expect(resolvedPort).toBe(port + 1);
    });
});
