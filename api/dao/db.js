import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: 'coffee-app',
    password: 'coffeecoffee',
    host: 'localhost',
    port: 5432,
    database: 'coffee-app'
});

export default pool;
