import pg from "pg";
const { Pool } = pg;

let dbPool;

const getDbClient = () => dbPool ? dbPool : new Pool({
    user: 'coffee-app',
    password: 'coffeecoffee',
    host: 'localhost',
    port: 5432,
    database: 'coffee-app'
});

const getAllCoffee = async () => {
    const db = getDbClient();

    return db
        .query("SELECT r.name as roaster, c.name as coffee, c.avg_rating, c.num_reviews FROM coffee c LEFT JOIN roaster r ON r.id = c.roaster_id ORDER BY roaster ASC, coffee ASC;")
        .then(res => res.rows);
};

const getCoffeeById = async (id) => {
    const db = getDbClient();
    const query = {
        name: 'getCoffeeById',
        text: 'SELECT * FROM coffee WHERE id = $1',
        values: [id]
    };

    return db
        .query(query)
        .then(res => res.rows);
};

export {
    getAllCoffee,
    getCoffeeById
};
