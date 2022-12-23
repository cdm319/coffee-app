import { jest } from '@jest/globals';
import db from "./db.js";

import { createCoffee, getAllCoffee, getCoffeeById } from './coffeeDao.js';

import fakeCoffees from '../testData/fakeCoffees.json' assert { type:"json" };
import fakeCoffee from '../testData/fakeCoffee.json' assert { type: "json" };

describe('Coffee DAO', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllCoffee', () => {
        it('should return an array of coffee summaries', async () => {
            db.connect = jest.fn().mockReturnThis();
            db.query = jest.fn().mockReturnValueOnce({
                rows: [ Object.assign({}, fakeCoffees) ]
            });

            const result = await getAllCoffee();

            expect(result.length).toBe(1);
            expect(result[0]).toEqual(fakeCoffees);
        });

        it('should throw an error when something goes wrong with the database', async () => {
            db.connect.mockImplementation(() => {
                throw new Error('Some horrible error');
            });

            expect(async () => await getAllCoffee()).rejects.toThrow('Could not connect to database.');
        });
    });

    describe('getCoffeeById', () => {
        it('should return a coffee object', async () => {
            db.connect = jest.fn().mockReturnThis();
            db.query = jest.fn().mockReturnValueOnce({
                rows: [ Object.assign({}, fakeCoffee) ]
            });

            const result = await getCoffeeById(1);

            expect(result).toEqual(fakeCoffee);
        });

        it('should throw an error when something goes wrong with the database', async () => {
            db.connect.mockImplementation(() => {
                throw new Error('Some horrible error');
            });

            expect(async () => await getCoffeeById(1)).rejects.toThrow('Could not connect to database.');
        });
    });

    describe('createCoffee', () => {
        it('should return the id of the inserted row', async () => {
            db.connect = jest.fn().mockReturnThis();
            db.query = jest.fn();
            db.query.mockReturnValue({
                rows: [ { id: 100 } ]
            });

            const result = await createCoffee({});

            expect(db.query).toHaveBeenCalledTimes(1);
            expect(result).toEqual({ id: 100 });
        });

        it('should throw an error when something goes wrong with the database', async () => {
            db.connect.mockImplementation(() => {
                throw new Error('Some horrible error');
            });

            expect(async () => await createCoffee({})).rejects.toThrow('Could not connect to database.');
        });
    });
});