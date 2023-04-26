import core from '../src/core.js'

describe('Subtract', () => {
    test('Deberia 2 - 2 = 0', () => {
        expect(core.sub(2, 2)).toBe(0); 
    })

    test('Deberia 6 - 4 = 2', () => {
        expect(core.sub(6, 4)).toBe(2); 
    })
})


describe('Divide', () => {
    test('Deberia 6 / 2 = 3', () => {
        //Given
        const a = 6;
        const b = 2;

        //When
        const result = core.div(a, b);

        //Then
        expect(result).toBe(3);
    })

    test('No deberia 10 / 2 = 4', () => {
        //Given
        const a = 10;
        const b = 2;

        //When
        const result = core.div(a, b)

        //Then
        expect(result).not.toBe(4)
    })

    //Opcional

    test('Deberia 10 / 0 = Error: Division por cero', () => {
        //Given
        const a = 10;
        const b = 0;

        //When
        const result = core.div(a, b)

        //Then
        expect(result).toBe('Error: Division por cero');
    })

})