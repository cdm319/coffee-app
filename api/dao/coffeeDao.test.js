import sinon from 'sinon';
import { expect } from 'chai';
import pg from 'pg';

import { createCoffee, getAllCoffee, getCoffeeById } from './coffeeDao.js';

import fakeCoffees from '../testData/fakeCoffees.json' assert { type:"json" };
import fakeCoffee from '../testData/fakeCoffee.json' assert { type: "json" };

describe('Coffee DAO', () => {
    beforeEach(() => {
        sinon.stub(pg.Client.prototype, 'connect');
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getAllCoffee', () => {
        it('should return an array of coffee summaries', async () => {
            sinon.stub(pg.Client.prototype, 'query').resolves({
                rows: [ Object.assign({}, fakeCoffees) ]
            });

            const result = await getAllCoffee();

            expect(result).to.be.an('array');
            expect(result.length).to.equal(1);
            expect(result[0]).to.deep.equal(fakeCoffees);
        });
    });

    describe('getCoffeeById', () => {
        it('should return a coffee object', async () => {
            sinon.stub(pg.Client.prototype, 'query').resolves({
                rows: [ Object.assign({}, fakeCoffee) ]
            });

            const result = await getCoffeeById(1);

            expect(result).to.be.an('object');
            expect(result).to.deep.equal(fakeCoffee);
        });
    });

    describe('createCoffee', () => {
        it('should return the id of the inserted row', async () => {
            const insertStub = sinon.stub(pg.Client.prototype, 'query').resolves({
                rows: [ { id: 100 } ]
            });

            const result = await createCoffee({});

            expect(insertStub.calledOnce).to.be.true;

            expect(result).to.be.an('object');
            expect(result).to.haveOwnProperty('id');
            expect(result.id).to.equal(100);
        });
    });
});