import express from 'express';
import bodyParser from "body-parser";

const app = express();
const router = express.Router();

app.disable("x-powered-by");
app.use(bodyParser.json());

router.get("/health", async (req, res) => {
    res.send();
});

app.use(router);

app.listen(3000, () => {
    console.log("Coffee App API running...");
});

export default app;
