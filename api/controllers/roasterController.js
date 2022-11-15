import { getAllRoasters, getRoasterById } from '../dao/roasterDao';
import { isValidId } from "../utils/validation";

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

export { getAllRoastersController, getRoasterByIdController };