import { getAllCoffee, getCoffeeById, createCoffee } from '../dao/coffeeDao';
import {isValidCoffee, isValidId, isValidRoaster} from '../utils/validation';
import {createRoaster} from "../dao/roasterDao";

const getAllCoffeeController = async (req, res) => {
    try {
        const result = await getAllCoffee();
        return res.json(result);
    } catch (e) {
        return res.status(500).send();
    }
}

const getCoffeeByIdController = async (req, res, next) => {
    const coffeeId = req.params.id;

    if (isValidId(coffeeId)) {
        try {
            const result = await getCoffeeById(coffeeId);
            return res.json(result);
        } catch (e) {
            return res.status(500).send();
        }
    } else {
        return next();
    }
};

const createCoffeeController = async (req, res, next) => {
    const coffee = req.body;

    if (isValidCoffee(coffee)) {
        try {
            await createCoffee(coffee);
            return res.status(201).send();
        } catch (e) {
            return res.status(500).send();
        }
    } else {
        return next();
    }
};

const createCoffeeAndRoasterController = async (req, res, next) => {
    const { coffee, roaster } = req.body;

    if (isValidRoaster(roaster)) {
        try {
            const roasterResult = await createRoaster(roaster);
            coffee.roasterId = roasterResult.id;
        } catch (e) {
            return res.status(500).send();
        }

        if (isValidCoffee(coffee)) {
            try {
                await createCoffee(coffee);
                return res.status(201).send();
            } catch (e) {
                return res.status(500).send();
            }
        } else {
            return next();
        }
    } else {
        return next();
    }
};

export {
    getAllCoffeeController,
    getCoffeeByIdController,
    createCoffeeController,
    createCoffeeAndRoasterController
};
