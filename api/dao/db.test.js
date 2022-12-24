import { jest } from '@jest/globals';

jest.unstable_mockModule('pg', () => ({
    default: { Pool: jest.fn().mockReturnValue({}) }
}));

const pg = await import('pg');

describe('DB', () => {
    it('should setup a Postgres Pool when imported', async () => {
        const db = await import('./db.js');

        expect(pg.default.Pool).toHaveBeenCalled();
    });
});