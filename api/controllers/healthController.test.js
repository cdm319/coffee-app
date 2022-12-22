import sinon from 'sinon';
import { expect } from 'chai';

import healthController from "./healthController.js";

let req, res;
describe('Health Controller', () => {

    beforeEach(() => {
        req = {};
        res = { send: () => res };
    })

    it('should return the express response object', async () => {
        const result = await healthController(req, res);

        expect(result).to.deep.equal(res);
    })
});
