import { getAllRoasters, getRoasterById, createRoaster } from '../dao/roasterDao.js';
import { isValidId, isValidRoaster } from '../utils/validation.js';

const getAllRoastersController = async (req, res) => {
    try {
        const result = await getAllRoasters();
        return res.json(result);
    } catch (e) {
        return res.status(500).send();
    }
};

const getRoasterByIdController = async (req, res, next) => {
    const roasterId = req.params.id;

    if (isValidId(roasterId)) {
        try {
            const result = await getRoasterById(roasterId);
            return res.json(result);
        } catch (e) {
            return res.status(500).send();
        }
    } else {
        return next();
    }
};

const createRoasterController = async (req, res, next) => {
    const roaster = req.body;

    if (isValidRoaster(roaster)) {
        try {
            await createRoaster(roaster);
            return res.status(201).send();
        } catch (e) {
            return res.status(500).send();
        }
    } else {
        return next();
    }
};

export { getAllRoastersController, getRoasterByIdController, createRoasterController };