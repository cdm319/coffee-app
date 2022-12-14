import db from './db';

const getAllCoffee = async () => {
    try {
        await db.connect();

        const result = await db.query("SELECT c.id, r.name as roaster, c.name as coffee, c.avg_rating, c.num_reviews FROM coffee c LEFT JOIN roaster r ON r.id = c.roaster_id ORDER BY roaster ASC, coffee ASC;")

        return result.rows;
    } catch (e) {
        throw new Error("Could not connect to database.");
    }
};

const getCoffeeById = async (id) => {
    try {
        await db.connect();

        const result = await db.query({
            name: 'getCoffeeById',
            text: 'SELECT * FROM coffee WHERE id = $1',
            values: [id]
        });

        return result.rows[0];
    } catch (e) {
        throw new Error("Could not connect to database.");
    }
};

const createCoffee = async (coffee) => {
    try {
        await db.connect();

        const result = await db.query({
            name: 'createCoffee',
            text: 'INSERT INTO coffee (name, roaster_id, url, photo, roast_type, best_for, origin, country, tasting_notes, created_by, created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 1, NOW()) RETURNING id',
            values: [coffee.name, coffee.roasterId, coffee.url, coffee.photo, coffee.roastType, coffee.bestFor, coffee.origin, coffee.country, coffee.tastingNotes]
        });

        return result.rows[0];
    } catch (e) {
        throw new Error('Could not connect to database.');
    }
};

export { getAllCoffee, getCoffeeById, createCoffee };
