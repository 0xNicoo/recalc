import core from '../src/core.js'

describe('Subtract', () => {
    test('Deberia 2 - 2 = 0', () => {
        expect(core.sub(2, 2)).toBe(0); 
    })

    test('Deberia 6 - 4 = 2', () => {
        expect(core.sub(6, 4)).toBe(2); 
    })
})


describe('Pow', () => {
    test('Deberia 5 ^ 2 = 25', () => {
        
        const a=5;
        
        const result = core.pow (a);
        expect(result).toBe(25); 
    })

    test('No Deberia 2 ^ 2 = 10', () => {
        
        const a=2;

        const result = core.pow (a);
        expect(result).not.toBe(10); 
    })
})