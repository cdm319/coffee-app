import { jest } from '@jest/globals';

import fakeCoffees from '../testData/fakeCoffees.json' assert { type:"json" };
import fakeCoffee from '../testData/fakeCoffee.json' assert { type: "json" };
import fakeRoasters from "../testData/fakeRoasters.json";

jest.unstable_mockModule('../dao/coffeeDao.js', () => ({
    getAllCoffee: jest.fn().mockReturnValue([Object.assign({}, fakeCoffees)]),
    getCoffeeById: jest.fn().mockReturnValue(Object.assign({}, fakeCoffee)),
    createCoffee: jest.fn().mockReturnValue({ id: 100 })
}));

jest.unstable_mockModule('../dao/roasterDao.js', () => ({
    createRoaster: jest.fn().mockReturnValue({ id: 100 })
}));

const { getAllCoffee, getCoffeeById, createCoffee } = await import('../dao/coffeeDao.js');
const { createRoaster } = await import('../dao/roasterDao.js');
const { getAllCoffeeController, getCoffeeByIdController, createCoffeeController, createCoffeeAndRoasterController } = await import('./coffeeController.js');

let req, res, next;

describe('Coffee Controller', () => {
    beforeEach(() => {
        req = jest.fn();
        res = { status: jest.fn(), json: jest.fn(), send: jest.fn() };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllCoffeeController', () => {
        it('should call coffeeDao and send response', async () => {
            res.json.mockReturnValue(res);

            const result = await getAllCoffeeController(req, res);

            expect(getAllCoffee).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith([fakeCoffees]);
            expect(result).toEqual(res);
        });

        it('should send a 500 when coffeeDao throws an error', async () => {
            getAllCoffee.mockImplementationOnce(() => {
                throw new Error('Some horrible error');
            });

            res.status.mockReturnValue(res);
            res.send.mockReturnValue(res);

            const result = await getAllCoffeeController(req, res);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(result).toEqual(res);
        });
    });

    describe('getCoffeeByIdController', () => {
        it('should call coffeeDao and send response when id is valid', async () => {
            req = { params: { id: 100 } };
            res.json.mockReturnValue(res);

            const result = await getCoffeeByIdController(req, res, next);

            expect(getCoffeeById).toHaveBeenCalledTimes(1);
            expect(getCoffeeById).toHaveBeenCalledWith(100);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(fakeCoffee);
            expect(result).toEqual(res);
        });

        it('should not call coffeeDao and call next when id is invalid', async () => {
            req = { params: { id: 'abc' } };
            next.mockReturnValue(next);

            const result = await getCoffeeByIdController(req, res, next);

            expect(getCoffeeById).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledTimes(1);
            expect(result).toEqual(next);
        });

        it('should send a 500 when coffeeDao throws an error', async () => {
            getCoffeeById.mockImplementationOnce(() => {
                throw new Error('Some horrible error');
            });

            req = { params: { id: 100 } };
            res.status.mockReturnValue(res);
            res.send.mockReturnValue(res);

            const result = await getCoffeeByIdController(req, res, next);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(result).toEqual(res);
        });
    });

    describe('createCoffeeController', () => {
        it('should call coffeeDao and send response when coffee is valid', async () => {
            req = {
                body: { name: 'Brazilian Love Affair', roasterId: 1, url: 'https://200degs.com/collections/coffee-beans/products/brazilian-love-affair', roastType: 'dark', bestFor: 'espresso', origin: 'blend', country: 'United Kingdom' }
            };
            res.status.mockReturnValue(res);
            res.send.mockReturnValue(res);

            const result = await createCoffeeController(req, res, next);

            expect(createCoffee).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(result).toEqual(res);
        });

        it('should not call coffeeDao and call next when coffee is invalid', async () => {
            req = { body: { coffee: 'invalid' } };
            next.mockReturnValue(next);

            const result = await createCoffeeController(req, res, next);

            expect(createCoffee).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledTimes(1);
            expect(result).toEqual(next);
        });

        it('should send a 500 when coffeeDao throws an error', async () => {
            createCoffee.mockImplementationOnce(() => {
                throw new Error('Some horrible error');
            });

            req = {
                body: { name: 'Brazilian Love Affair', roasterId: 1, url: 'https://200degs.com/collections/coffee-beans/products/brazilian-love-affair', roastType: 'dark', bestFor: 'espresso', origin: 'blend', country: 'United Kingdom' }
            };
            res.status.mockReturnValue(res);
            res.send.mockReturnValue(res);

            const result = await createCoffeeController(req, res, next);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(result).toEqual(res);
        });
    });

    describe('createCoffeeAndRoasterController', () => {
        it('should call coffeeDao and roasterDao and send response when coffee and roaster are valid', async () => {
            const coffee = { name: 'Brazilian Love Affair', url: 'https://200degs.com/collections/coffee-beans/products/brazilian-love-affair', roastType: 'dark', bestFor: 'espresso', origin: 'blend', country: 'United Kingdom' };
            const roaster = { name: '200 Degrees', url: 'https://200degs.com', country: 'United Kingdom' };

            req = { body: { coffee, roaster } };
            res.status.mockReturnValue(res);
            res.send.mockReturnValue(res);

            const result = await createCoffeeAndRoasterController(req, res, next);

            expect(createRoaster).toHaveBeenCalledTimes(1);
            expect(createRoaster).toHaveBeenCalledWith(roaster);

            // controller should set coffee's roasterID to result of createRoaster
            expect(createCoffee).toHaveBeenCalledTimes(1);
            expect(createCoffee).toHaveBeenCalledWith(Object.assign({}, coffee, { roasterId: 100 }));

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(result).toEqual(res);
        });

        it('should not call roasterDao or coffeeDao when roaster is invalid', async () => {
            const coffee = { name: 'Brazilian Love Affair', url: 'https://200degs.com/collections/coffee-beans/products/brazilian-love-affair', roastType: 'dark', bestFor: 'espresso', origin: 'blend', country: 'United Kingdom' };
            const roaster = { roaster: 'invalid' };

            req = { body: { coffee, roaster } };
            next.mockReturnValue(next);

            const result = await createCoffeeAndRoasterController(req, res, next);

            expect(createRoaster).not.toHaveBeenCalled();
            expect(createCoffee).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledTimes(1);
            expect(result).toEqual(next);
        });

        it('should not call coffeeDao when coffee is invalid', async () => {
            const coffee = { coffee: 'invalid' };
            const roaster = { name: '200 Degrees', url: 'https://200degs.com', country: 'United Kingdom' };

            req = { body: { coffee, roaster } };
            next.mockReturnValue(next);

            const result = await createCoffeeAndRoasterController(req, res, next);

            expect(createRoaster).toHaveBeenCalledTimes(1);
            expect(createRoaster).toHaveBeenCalledWith(roaster);
            expect(createCoffee).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledTimes(1);
            expect(result).toEqual(next);
        });

        it('should send a 500 when roasterDao throws an error', async () => {
            createRoaster.mockImplementationOnce(() => {
                throw new Error('Some horrible error');
            });

            const coffee = { name: 'Brazilian Love Affair', url: 'https://200degs.com/collections/coffee-beans/products/brazilian-love-affair', roastType: 'dark', bestFor: 'espresso', origin: 'blend', country: 'United Kingdom' };
            const roaster = { name: '200 Degrees', url: 'https://200degs.com', country: 'United Kingdom' };

            req = { body: { coffee, roaster } };
            res.status.mockReturnValue(res);
            res.send.mockReturnValue(res);

            const result = await createCoffeeAndRoasterController(req, res, next);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(result).toEqual(res);
        });

        it('should send a 500 when coffeeDao throws an error', async () => {
            createCoffee.mockImplementationOnce(() => {
                throw new Error('Some horrible error');
            });

            const coffee = { name: 'Brazilian Love Affair', url: 'https://200degs.com/collections/coffee-beans/products/brazilian-love-affair', roastType: 'dark', bestFor: 'espresso', origin: 'blend', country: 'United Kingdom' };
            const roaster = { name: '200 Degrees', url: 'https://200degs.com', country: 'United Kingdom' };

            req = { body: { coffee, roaster } };
            res.status.mockReturnValue(res);
            res.send.mockReturnValue(res);

            const result = await createCoffeeAndRoasterController(req, res, next);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(result).toEqual(res);
        });
    });
});
