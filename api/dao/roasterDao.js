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
    const db = new Client(dbConfig);
    db.connect();

    return db
        .query("SELECT * FROM roaster")
        .then(res => {
            db.end();
            return res.rows;
        });
};

const getRoasterById = async (id) => {
    const db = new Client(dbConfig);
    db.connect();

    const query = {
        name: 'getRoasterById',
        text: 'SELECT * FROM roaster WHERE id = $1',
        values: [id]
    };

    return db
        .query(query)
        .then(res => {
            db.end();
            return res.rows;
        });
};

const createRoaster = async (roaster) => {
    const db = new Client(dbConfig);
    db.connect();

    const query = {
        name: 'createRoaster',
        text: 'INSERT INTO roaster (name, url, country, created_by, created) VALUES ($1, $2, $3, 1, NOW()) RETURNING id',
        values: [roaster.name, roaster.url, roaster.country]
    };

    return db
        .query(query)
        .then(res => {
            db.end();
            return res.rows[0];
        });
};

export { getAllRoasters, getRoasterById, createRoaster };
