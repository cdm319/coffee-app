import { getAllRoasters, getRoasterById, createRoaster } from '../dao/roasterDao';
import { isValidId, isValidRoaster } from "../utils/validation";

const getAllRoastersController = async (req, res) => {
    const result = await getAllRoasters();

    res.json(result);
};

const getRoasterByIdController = async (req, res, next) => {
    const roasterId = req.params.id;

    if (isValidId(roasterId)) {
        const result = await getRoasterById(roasterId);
        res.json(result);
    } else {
        next();
    }
};

const createRoasterController = async (req, res, next) => {
    const roaster = req.body;

    if (isValidRoaster(roaster)) {
        const result = await createRoaster(roaster); // returns {id}

        res.status(201).send();
    } else {
        next();
    }
};

export { getAllRoastersController, getRoasterByIdController, createRoasterController };