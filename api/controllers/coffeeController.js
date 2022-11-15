import { getAllCoffee, getCoffeeById } from '../dao/coffeeDao';

const getAllCoffeeController = async (req, res) => {
    const coffeeRes = await getAllCoffee();

    console.log(coffeeRes);

    res.json(coffeeRes);
}

const getCoffeeByIdController = async (req, res) => {
    const coffeeRes = await getCoffeeById(req.params.id);

    console.log(coffeeRes);

    res.json(coffeeRes);
}

export {
    getAllCoffeeController,
    getCoffeeByIdController
};
