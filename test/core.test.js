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
describe('Multiply',()=>{
    test('Deberia 3 * 3 = 9', ()=>{
        const a = 3;
        const b = 3;

        const result = core.mul(a,b);

        expect(result).toBe(9);
    })
    test('No deberia 3 * 2 = 12',()=>{
        const a = 3;
        const b = 2;

        const result = core.mul(a,b);

        expect(result).not.toBe(12);
    })
})

describe('Add', () => {
    test('Deberia 2 + 2 = 4', () => {
        //Given
        const a = 2
        const b = 2

        //When
        const result = core.add(a, b)

        //Then
        expect(result).toBe(4)
    })

    test('No deberia 1 + 2 = 4', () => {
        //Given
        const a = 1
        const b = 2

        //When
        const result = core.add(a, b)

        //Then
        expect(result).not.toBe(4)
    })

})
