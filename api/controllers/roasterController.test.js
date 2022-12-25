import { jest } from '@jest/globals';

import fakeRoasters from '../testData/fakeRoasters.json' assert { type: 'json' };

jest.unstable_mockModule('../dao/roasterDao.js', () => ({
    getAllRoasters: jest.fn().mockReturnValue([Object.assign({}, fakeRoasters)]),
    getRoasterById: jest.fn().mockReturnValue(Object.assign({}, fakeRoasters)),
    createRoaster: jest.fn().mockReturnValue({ id: 100 })
}));

const { getAllRoasters, getRoasterById, createRoaster } = await import('../dao/roasterDao.js');
const { getAllRoastersController, getRoasterByIdController, createRoasterController } = await import('./roasterController.js');

let req, res, next;

describe('Roaster Controller', () => {
    beforeEach(() => {
        req = jest.fn();
        res = { status: jest.fn(), json: jest.fn(), send: jest.fn() };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('getAllRoastersController', () => {
        it('should call roasterDao and send response', async () => {
            res.json.mockReturnValue(res);

            const result = await getAllRoastersController(req, res);

            expect(getAllRoasters).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith([fakeRoasters])
            expect(result).toEqual(res);
        });

        it('should send a 500 when roasterDao throws an error', async () => {
            getAllRoasters.mockImplementationOnce(() => {
                throw new Error('Some horrible error');
            });

            res.status.mockReturnValue(res);
            res.send.mockReturnValue(res);

            const result = await getAllRoastersController(req, res, next);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(result).toEqual(res);
        });
    });

    describe('getRoasterByIdController', () => {
        it('should call roasterDao and send response when id is valid', async () => {
            req = { params: { id: 100 } };
            res.json.mockReturnValue(res);

            const result = await getRoasterByIdController(req, res, next);

            expect(getRoasterById).toHaveBeenCalledTimes(1);
            expect(getRoasterById).toHaveBeenCalledWith(100);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(fakeRoasters);
            expect(result).toEqual(res);
        });

        it('should not call roasterDao and call next when id is invalid', async () => {
            req = { params: { id: 'abc' } };
            next.mockReturnValue(next);

            const result = await getRoasterByIdController(req, res, next);

            expect(getRoasterById).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledTimes(1);
            expect(result).toEqual(next);
        });

        it('should send a 500 when roasterDao throws an error', async () => {
            getRoasterById.mockImplementationOnce(() => {
                throw new Error('Some horrible error');
            });

            req = { params: { id: 100 } };
            res.status.mockReturnValue(res);
            res.send.mockReturnValue(res);

            const result = await getRoasterByIdController(req, res, next);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(result).toEqual(res);
        });
    });

    describe('createRoasterController', () => {
        it('should call roasterDao and send response when roaster is valid', async () => {
            req = {
                body: { name: '200 Degrees', url: 'https://200degs.com', country: 'United Kingdom' }
            };
            res.status.mockReturnValue(res);
            res.send.mockReturnValue(res);

            const result = await createRoasterController(req, res, next);

            expect(createRoaster).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(result).toEqual(res);
        });

        it('should not call roasterDao and call next when roaster is invalid', async () => {
            req = { body: { roaster: 'invalid' } };
            next.mockReturnValue(next);

            const result = await createRoasterController(req, res, next);

            expect(createRoaster).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledTimes(1);
            expect(result).toEqual(next);
        });

        it('should send a 500 when roasterDao throws an error', async () => {
            createRoaster.mockImplementationOnce(() => {
                throw new Error('Some horrible error');
            });

            req = {
                body: { name: '200 Degrees', url: 'https://200degs.com', country: 'United Kingdom' }
            };
            res.status.mockReturnValue(res);
            res.send.mockReturnValue(res);

            const result = await createRoasterController(req, res, next);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(result).toEqual(res);
        });
    });
});
