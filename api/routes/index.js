import express from 'express';
import { healthController, getAllCoffeeController, getCoffeeByIdController } from '../controllers';

const router = express.Router();

router.get("/health", healthController);
router.get("/coffee", getAllCoffeeController);
router.get("/coffee/:id", getCoffeeByIdController);

export default router;
