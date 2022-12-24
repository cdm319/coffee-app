import { jest } from '@jest/globals';
import db from "./db.js";

import { createRoaster, getAllRoasters, getRoasterById } from './roasterDao.js';

import fakeRoasters from '../testData/fakeRoasters.json' assert { type: 'json' };

describe('Roaster DAO', () => {

   afterEach(() => {
       jest.clearAllMocks();
   });

   describe('getAllRoasters', () => {
       it('should return an array of roasters', async () => {
           db.connect = jest.fn().mockReturnThis();
           db.query = jest.fn().mockReturnValueOnce({
               rows: [ Object.assign({}, fakeRoasters) ]
           });

           const result = await getAllRoasters();

           expect(result.length).toBe(1);
           expect(result[0]).toEqual(fakeRoasters);
       });

       it('should throw an error when something goes wrong with the database', async () => {
           db.connect.mockImplementation(() => {
               throw new Error('Some horrible error');
           });

           expect(async () => await getAllRoasters()).rejects.toThrow('Could not connect to database.');
       });
   });

   describe('getRoasterById', () => {
       it('should return a roaster object', async () => {
           db.connect = jest.fn().mockReturnThis();
           db.query = jest.fn().mockReturnValueOnce({
               rows: [ Object.assign({}, fakeRoasters) ]
           });

           const result = await getRoasterById(1);

           expect(result).toEqual(fakeRoasters);
       });

       it('should throw an error when something goes wrong with the database', async () => {
           db.connect.mockImplementation(() => {
               throw new Error('Some horrible error');
           });

           expect(async () => await getRoasterById(1)).rejects.toThrow('Could not connect to database.');
       });
   });

   describe('createRoaster', () => {
       it('should return the id of the inserted roaster', async () => {
           db.connect = jest.fn().mockReturnThis();
           db.query = jest.fn();
           db.query.mockReturnValue({
               rows: [ { id: 100 } ]
           });

           const result = await createRoaster({});

           expect(db.query).toHaveBeenCalledTimes(1);
           expect(result).toEqual({ id: 100 });
       });

       it('should throw an error when something goes wrong with the database', async () => {
           db.connect.mockImplementation(() => {
               throw new Error('Some horrible error');
           });

           expect(async () => await createRoaster({})).rejects.toThrow('Could not connect to database.');
       });
   });
});