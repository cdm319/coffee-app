import express from 'express';
import bodyParser from "body-parser";
import router from './routes';

const app = express();

// Security hardening
app.disable("x-powered-by");

// Config
app.use(bodyParser.json());

// Set up API routes and default to 404
app.use(router);
app.use((req, res) => res.sendStatus(404));

// Spin up server
app.listen(3000, () => {
    console.log("Coffee App API running...");
});

export default app;
