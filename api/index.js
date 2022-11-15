import express from 'express';
import routes from './routes';

const app = express();

// Security hardening
app.disable("x-powered-by");

// Config
app.use(express.json());

// Set up API routes and default to 404
app.use(routes);
app.use((req, res) => res.sendStatus(404));

// Spin up server
app.listen(3000, () => {
    console.log("Coffee App API running...");
});
