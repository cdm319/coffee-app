import sinon from 'sinon';
import { expect } from 'chai';

import { getAllRoastersController, getRoasterByIdController, createRoasterController } from "./roasterController.js";
import * as roasterDao from '../dao/roasterDao.js';
import fakeRoasters from '../testData/fakeRoasters.json' assert { type: 'json' };


let req, res, next;

describe('Roaster Controller', () => {
    beforeEach(() => {
        req = sinon.stub();

        res = {
            status: sinon.stub().returns(res),
            json: sinon.stub().returns(res),
            send: sinon.stub().returns(res)
        };

        next = sinon.stub().returns(next);
    });

    afterEach(() => {
        sinon.restore();
    })

    describe('getAllRoastersController', () => {
        it('should ...', async () => {
            const daoStub = sinon.stub(roasterDao, 'getAllRoasters').returns([Object.assign({}, fakeRoasters)]);

            const result = await getAllRoastersController(req, res);

            expect(daoStub.calledOnce).to.be.true;
            expect(result).to.deep.equal(res);
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
