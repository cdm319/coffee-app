import db from './db';

const getAllRoasters = async () => {
    try {
        await db.connect();

        const result = await db.query("SELECT * FROM roaster");

        return result.rows;
    } catch (e) {
        throw new Error('Could not connect to database.');
    }
};

const getRoasterById = async (id) => {
    try {
        await db.connect();

        const result = await db.query({
            name: 'getRoasterById',
            text: 'SELECT * FROM roaster WHERE id = $1',
            values: [id]
        });

        return result.rows[0];
    } catch (e) {
        throw new Error('Could not connect to database.');
    }
};

const createRoaster = async (roaster) => {
    try {
        await db.connect();

        const result = await db.query({
            name: 'createRoaster',
            text: 'INSERT INTO roaster (name, url, country, created_by, created) VALUES ($1, $2, $3, 1, NOW()) RETURNING id',
            values: [roaster.name, roaster.url, roaster.country]
        });

        return result.rows[0];
    } catch (e) {
        throw new Error('Could not connect to database.');
    }
};

export { getAllRoasters, getRoasterById, createRoaster };
