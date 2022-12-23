import { isValidId, isValidRoaster, isValidCoffee } from './validation';

describe('Validation Utils', () => {
    describe('isValidId', () => {
        it('should return true when id is a number', () => {
            expect(isValidId(123)).toBe(true);
        });

        it('should return false when id is a numeric string', () => {
            expect(isValidId('123')).toBe(false);
        });

        it('should return false when id is not a number', () => {
            expect(isValidId('abc')).toBe(false);
        })
    });

    describe('isValidRoaster', () => {
        it('should return true when passed a valid roaster object', () => {
            const roaster = { name: '200 Degrees', url: 'https://200degs.com', country: 'United Kingdom' };
            expect(isValidRoaster(roaster)).toBe(true);
        });

        it('should return false when passed a non-object', () => {
            expect(isValidRoaster('roaster')).toBe(false);
        });

        it('should return false when name, url or country is an empty string', () => {
            const roaster = { name: '200 Degrees', url: '', country: 'United Kingdom' };
            expect(isValidRoaster(roaster)).toBe(false);
        })

        it('should return false when name, url or country is not a string', () => {
            const roaster = { name: 200, url: 'https://200degs.com', country: 'United Kingdom' };
            expect(isValidRoaster(roaster)).toBe(false);
        });
    });

    describe('isValidCoffee', () => {
        const validCoffee = {
            name: 'Brazilian Love Affair',
            roasterId: 1,
            url: 'https://200degs.com/collections/coffee-beans/products/brazilian-love-affair',
            roastType: 'dark',
            bestFor: 'espresso',
            origin: 'blend',
            country: 'United Kingdom'
        };

        it('should return true when passed an object with all properties valid', () => {
            expect(isValidCoffee(validCoffee)).toBe(true);
        });

        it('should return true when passed an object with all required properties valid', () => {
            const {roastType, bestFor, ...testCoffee} = validCoffee;
            expect(testCoffee.roastType).toBeUndefined();
            expect(testCoffee.bestFor).toBeUndefined();
            expect(isValidCoffee(testCoffee)).toBe(true);
        });

        it('should return false when name is empty', () => {
            const testCoffee = Object.assign({}, validCoffee, { name: '' });
            expect(isValidCoffee(testCoffee)).toBe(false);
        });

        it('should return false when roasterId is invalid', () => {
            const testCoffee = Object.assign({}, validCoffee, { roasterId: 'abc' });
            expect(isValidCoffee(testCoffee)).toBe(false);
        });

        it('should return false when url is empty', () => {
            const testCoffee = Object.assign({}, validCoffee, { url: '' });
            expect(isValidCoffee(testCoffee)).toBe(false);
        });

        it('should return false when roastType is not in allowed set', () => {
            const testCoffee = Object.assign({}, validCoffee, { roastType: 'incinerated' });
            expect(isValidCoffee(testCoffee)).toBe(false);
        });

        it('should return false when bestFor is not in allowed set', () => {
            const testCoffee = Object.assign({}, validCoffee, { bestFor: 'the bin' });
            expect(isValidCoffee(testCoffee)).toBe(false);
        });

        it('should return false when origin is not in allowed set', () => {
            const testCoffee = Object.assign({}, validCoffee, { origin: 'outer space' });
            expect(isValidCoffee(testCoffee)).toBe(false);
        });

        it('should return false when country is empty', () => {
            const testCoffee = Object.assign({}, validCoffee, { country: '' });
            expect(isValidCoffee(testCoffee)).toBe(false);
        });
    });
});