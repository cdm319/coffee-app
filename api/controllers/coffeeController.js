import { getAllCoffee, getCoffeeById } from '../dao/coffeeDao';
import { isValidId } from '../utils/validation';

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

export { getAllCoffeeController, getCoffeeByIdController };
