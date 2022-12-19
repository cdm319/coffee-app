import sinon from 'sinon';
import { expect } from 'chai';
import pg from 'pg';

import { createRoaster, getAllRoasters, getRoasterById } from './roasterDao.js';

import fakeRoasters from '../testData/fakeRoasters.json' assert { type: 'json' };

describe('Roaster DAO', () => {

   afterEach(() => {
       sinon.restore();
   });

   describe('getAllRoasters', () => {
       it('should return an array of roasters', async () => {
           sinon.stub(pg.Client.prototype, 'connect');
           sinon.stub(pg.Client.prototype, 'query').resolves({
               rows: [Object.assign({}, fakeRoasters)]
           });

           const result = await getAllRoasters();

           expect(result).to.be.an('array');
           expect(result.length).to.equal(1);
           expect(result[0]).to.deep.equal(fakeRoasters);
       });

       it('should throw an error when something goes wrong with the database', async () => {
           sinon.stub(pg.Client.prototype, 'connect').throws('SOME HORRIBLE ERROR');

           await expect(getAllRoasters()).to.be.rejectedWith('Could not connect to database.');
       });
   });

   describe('getRoasterById', () => {
       it('should return a roaster object', async () => {
           sinon.stub(pg.Client.prototype, 'connect');
           sinon.stub(pg.Client.prototype, 'query').resolves({
               rows: [Object.assign({}, fakeRoasters)]
           });

           const result = await getRoasterById(1);

           expect(result).to.be.an('object');
           expect(result).to.deep.equal(fakeRoasters);
       });

       it('should throw an error when something goes wrong with the database', async () => {
           sinon.stub(pg.Client.prototype, 'connect').throws('SOME HORRIBLE ERROR');

           await expect(getRoasterById(1)).to.be.rejectedWith('Could not connect to database.');
       });
   });

   describe('createRoaster', () => {
       it('should return the id of the inserted roaster', async () => {
           sinon.stub(pg.Client.prototype, 'connect');
           const insertStub = sinon.stub(pg.Client.prototype, 'query').resolves({
               rows: [ { id: 100 } ]
           });

           const result = await createRoaster({});

           expect(insertStub.calledOnce).to.be.true;

           expect(result).to.be.an('object');
           expect(result).to.haveOwnProperty('id');
           expect(result.id).to.equal(100);
       });

       it('should throw an error when something goes wrong with the database', async () => {
           sinon.stub(pg.Client.prototype, 'connect').throws('SOME HORRIBLE ERROR');

           await expect(createRoaster({})).to.be.rejectedWith('Could not connect to database.');
       });
   });
});