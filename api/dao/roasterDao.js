import pg from "pg";
const { Client } = pg;

const dbConfig = {
    user: 'coffee-app',
    password: 'coffeecoffee',
    host: 'localhost',
    port: 5432,
    database: 'coffee-app'
};

const getAllRoasters = async () => {
    try {
        const db = new Client(dbConfig);
        await db.connect();

        const result = await db.query("SELECT * FROM roaster");

        db.end();

        return result.rows;
    } catch (e) {
        throw new Error('Could not connect to database.');
    }
};

const getRoasterById = async (id) => {
    try {
        const db = new Client(dbConfig);
        await db.connect();

        const result = await db.query({
            name: 'getRoasterById',
            text: 'SELECT * FROM roaster WHERE id = $1',
            values: [id]
        });

        db.end();

        return result.rows[0];
    } catch (e) {
        throw new Error('Could not connect to database.');
    }
};

const createRoaster = async (roaster) => {
    try {
        const db = new Client(dbConfig);
        await db.connect();

        const result = await db.query({
            name: 'createRoaster',
            text: 'INSERT INTO roaster (name, url, country, created_by, created) VALUES ($1, $2, $3, 1, NOW()) RETURNING id',
            values: [roaster.name, roaster.url, roaster.country]
        });

        db.end();

        return result.rows[0];
    } catch (e) {
        throw new Error('Could not connect to database.');
    }
};

export { getAllRoasters, getRoasterById, createRoaster };
