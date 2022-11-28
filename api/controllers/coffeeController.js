import { getAllCoffee, getCoffeeById, createCoffee } from '../dao/coffeeDao';
import {isValidCoffee, isValidId, isValidRoaster} from '../utils/validation';
import {createRoaster} from "../dao/roasterDao";

const getAllCoffeeController = async (req, res) => {
    const result = await getAllCoffee();

    res.json(result);
}

const getCoffeeByIdController = async (req, res, next) => {
    const coffeeId = req.params.id;

    if (isValidId(coffeeId)) {
        const result = await getCoffeeById(coffeeId);
        res.json(result);
    } else {
        next();
    }
};

const createCoffeeController = async (req, res, next) => {
    const coffee = req.body;

    if (isValidCoffee(coffee)) {
        const result = await createCoffee(coffee); // returns {id}

        res.status(201).send();
    } else {
        next();
    }
};

const createCoffeeAndRoasterController = async (req, res, next) => {
    const { coffee, roaster } = req.body;

    if (isValidRoaster(roaster)) {
        const roasterResult = await createRoaster(roaster);

        coffee.roasterId = roasterResult.id;

        if (isValidCoffee(coffee)) {
            const coffeeResult = await createCoffee(coffee);

            res.status(201).send();
        } else {
            next();
        }
    } else {
        next();
    }
};

export {
    getAllCoffeeController,
    getCoffeeByIdController,
    createCoffeeController,
    createCoffeeAndRoasterController
};
