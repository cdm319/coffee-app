import express from 'express';
import { healthController, getAllCoffeeController, getCoffeeByIdController, getAllRoastersController, getRoasterByIdController } from '../controllers';

const router = express.Router();

router.get("/health", healthController);

router.get("/coffees", getAllCoffeeController);
router.get("/coffee/:id", getCoffeeByIdController);
//router.post("/coffee", createCoffeeController);

router.get("/roasters", getAllRoastersController);
router.get("/roaster/:id", getRoasterByIdController);

export default router;
