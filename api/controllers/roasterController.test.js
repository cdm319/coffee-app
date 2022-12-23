import { jest } from '@jest/globals';

import fakeRoasters from '../testData/fakeRoasters.json' assert { type: 'json' };

let req, res, next;

jest.unstable_mockModule('../dao/roasterDao.js', () => ({
    getAllRoasters: jest.fn().mockReturnValue([Object.assign({}, fakeRoasters)]),
    getRoasterById: jest.fn().mockReturnValue([Object.assign({}, fakeRoasters)]),
    createRoaster: jest.fn().mockReturnValue({ id:100 })
}));

const { getAllRoasters, getRoasterById, createRoaster } = await import('../dao/roasterDao.js');
const { getAllRoastersController, getRoasterByIdController, createRoasterController } = await import('./roasterController.js');

describe('Roaster Controller', () => {
    beforeEach(() => {
        req = jest.fn();

        res = {
            status: jest.fn(),
            json: jest.fn(),
            send: jest.fn()
        };

        next = jest.fn().mockReturnValue(next)
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('getAllRoastersController', () => {
        it('should call roasterDao and send response', async () => {
            res.json.mockReturnValue(res);

            const result = await getAllRoastersController(req, res);

            expect(getAllRoasters).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(result).toEqual(res);
        });
    });

    // describe('getRoasterByIdController', () => {
    //     it('should ...', async () => {
    //         sinon.stub(roasterDao, 'getRoasterById').returns(Object.assign({}, fakeRoasters));
    //     });
    // });
    //
    // describe('createRoasterController', () => {
    //     it('should ...', async () => {
    //         sinon.stub(roasterDao, 'createRoaster').returns({ id: 100 });
    //     });
    // });
});
