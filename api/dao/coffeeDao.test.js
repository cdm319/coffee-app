import sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import pg from 'pg';

import { createCoffee, getAllCoffee, getCoffeeById } from './coffeeDao.js';

import fakeCoffees from '../testData/fakeCoffees.json' assert { type:"json" };
import fakeCoffee from '../testData/fakeCoffee.json' assert { type: "json" };

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Coffee DAO', () => {

    afterEach(() => {
        sinon.restore();
    });

    describe('getAllCoffee', () => {
        it('should return an array of coffee summaries', async () => {
            sinon.stub(pg.Client.prototype, 'connect');
            sinon.stub(pg.Client.prototype, 'query').resolves({
                rows: [ Object.assign({}, fakeCoffees) ]
            });

            const result = await getAllCoffee();

            expect(result).to.be.an('array');
            expect(result.length).to.equal(1);
            expect(result[0]).to.deep.equal(fakeCoffees);
        });

        it('should throw an error when something goes wrong with the database', async () => {
            sinon.stub(pg.Client.prototype, 'connect').throws('SOME HORRIBLE ERROR');

            await expect(getAllCoffee()).to.be.rejectedWith('Could not connect to database.');
        });
    });

    describe('getCoffeeById', () => {
        it('should return a coffee object', async () => {
            sinon.stub(pg.Client.prototype, 'connect');
            sinon.stub(pg.Client.prototype, 'query').resolves({
                rows: [ Object.assign({}, fakeCoffee) ]
            });

            const result = await getCoffeeById(1);

            expect(result).to.be.an('object');
            expect(result).to.deep.equal(fakeCoffee);
        });

        it('should throw an error when something goes wrong with the database', async () => {
            sinon.stub(pg.Client.prototype, 'connect').throws('SOME HORRIBLE ERROR');

            await expect(getCoffeeById(1)).to.be.rejectedWith('Could not connect to database.');
        });
    });

    describe('createCoffee', () => {
        it('should return the id of the inserted row', async () => {
            sinon.stub(pg.Client.prototype, 'connect');
            const insertStub = sinon.stub(pg.Client.prototype, 'query').resolves({
                rows: [ { id: 100 } ]
            });

            const result = await createCoffee({});

            expect(insertStub.calledOnce).to.be.true;

            expect(result).to.be.an('object');
            expect(result).to.haveOwnProperty('id');
            expect(result.id).to.equal(100);
        });

        it('should throw an error when something goes wrong with the database', async () => {
            sinon.stub(pg.Client.prototype, 'connect').throws('SOME HORRIBLE ERROR');

            await expect(createCoffee({})).to.be.rejectedWith('Could not connect to database.');
        });
    });
});