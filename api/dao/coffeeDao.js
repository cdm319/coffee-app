import pg from "pg";
const { Client } = pg;

const dbConfig = {
    user: 'coffee-app',
    password: 'coffeecoffee',
    host: 'localhost',
    port: 5432,
    database: 'coffee-app'
};

const getAllCoffee = async () => {
    const db = new Client(dbConfig);
    db.connect();

    return db
        .query("SELECT c.id, r.name as roaster, c.name as coffee, c.avg_rating, c.num_reviews FROM coffee c LEFT JOIN roaster r ON r.id = c.roaster_id ORDER BY roaster ASC, coffee ASC;")
        .then(res => {
            db.end();
            return res.rows;
        });
};

const getCoffeeById = async (id) => {
    const db = new Client(dbConfig);
    db.connect();

    const query = {
        name: 'getCoffeeById',
        text: 'SELECT * FROM coffee WHERE id = $1',
        values: [id]
    };

    return db
        .query(query)
        .then(res => {
            db.end();
            return res.rows;
        });
};

const createCoffee = async (coffee) => {
    const db = new Client(dbConfig);
    db.connect();

    const query = {
        name: 'createCoffee',
        text: 'INSERT INTO coffee (name, roaster_id, url, photo, roast_type, best_for, origin, country, tasting_notes, created_by, created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 1, NOW()) RETURNING id',
        values: [coffee.name, coffee.roasterId, coffee.url, coffee.photo, coffee.roastType, coffee.bestFor, coffee.origin, coffee.country, coffee.tastingNotes]
    };

    return db
        .query(query)
        .then(res => {
            db.end();
            return res.rows[0];
        });
};

export { getAllCoffee, getCoffeeById, createCoffee };
