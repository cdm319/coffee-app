import healthController from "./healthController.js";

let req, res;
describe('Health Controller', () => {

    beforeEach(() => {
        req = {};
        res = { send: () => res };
    })

    it('should return the express response object', async () => {
        const result = await healthController(req, res);

        expect(result).toEqual(res);
    })
});
