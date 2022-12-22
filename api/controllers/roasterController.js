import { getAllRoasters, getRoasterById, createRoaster } from '../dao/roasterDao.js';
import { isValidId, isValidRoaster } from '../utils/validation.js';

const getAllRoastersController = async (req, res) => {
    const result = await getAllRoasters();

    return res.json(result);
};

const getRoasterByIdController = async (req, res, next) => {
    const roasterId = req.params.id;

    if (isValidId(roasterId)) {
        const result = await getRoasterById(roasterId);
        return res.json(result);
    } else {
        return next();
    }
};

const createRoasterController = async (req, res, next) => {
    const roaster = req.body;

    if (isValidRoaster(roaster)) {
        const result = await createRoaster(roaster); // returns {id}

        return res.status(201).send();
    } else {
        return next();
    }
};

export { getAllRoastersController, getRoasterByIdController, createRoasterController };