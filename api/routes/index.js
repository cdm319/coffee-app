import express from 'express';
import healthController from "../controllers/healthController.js";
import { createCoffeeAndRoasterController, createCoffeeController, getAllCoffeeController, getCoffeeByIdController } from "../controllers/coffeeController.js";
import { createRoasterController, getAllRoastersController, getRoasterByIdController } from "../controllers/roasterController.js";

const router = express.Router();

router.get("/health", healthController);

router.get("/coffees", getAllCoffeeController);
router.get("/coffee/:id", getCoffeeByIdController);
router.post("/coffee", createCoffeeController);

router.get("/roasters", getAllRoastersController);
router.get("/roaster/:id", getRoasterByIdController);
router.post("/roaster", createRoasterController);

router.post("/coffee-with-roaster", createCoffeeAndRoasterController);

export default router;
