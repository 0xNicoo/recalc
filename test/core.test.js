import core from '../src/core.js'
import cli from '../src/cli.js'

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
    
        const a = 6;
        const b = 2;

        const result = core.div(a, b);

        expect(result).toBe(3);
    })

    test('No deberia 10 / 2 = 4', () => {

        const a = 10;
        const b = 2;

        const result = core.div(a, b)

        expect(result).not.toBe(4)
    })

    //Opcional

    test('Deberia 10 / 0 = Error: Division por cero', () => {

        const a = 10;
        const b = 0;

        const result = () => {return core.div(a, b)}

        expect(result).toThrow(new Error("Division por cero."));
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

    test('Deberia -4 ^ 2 = 16', () => {
        
        const a=-4;
        
        const result = core.pow (a);
        expect(result).toBe(16); 
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

    test('Deberia -4 * 3 = -12', ()=>{
        const a = -4;
        const b = 3;
    
        const result = core.mul(a,b);
    
        expect(result).toBe(-12);
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
    })
})

describe('decimalToBinary', () => {
    test('Deberia convertir 10 a 1010', () => {
        const a = 10;

        const result = core.bin(a);
        expect(result).toBe('1010');
    })

    test('Deberia convertir 42 a 101010', () => {
        const a = 42;

        const result = core.bin(a);
        expect(result).toBe('101010');
    })

    test('N debería convertir 20 a 11011', () => {
        const a = 20;

        const result = core.bin(a);
        expect(result).not.toBe('11011');
    })
})


describe('cli loop func test', () => {
    
    test('Deberia retornar 👋👋👋 si se ingresa exit', async () =>{
        //Given
        const mockLogFunction = jest.fn()
        const mockReadLine = {
            question: jest.fn(),
            close: jest.fn()
        }
        mockReadLine.question.mockReturnValueOnce('exit')

        //When
        const result = await cli.loop(mockReadLine, Object.keys(core), mockLogFunction)

        //Then
        expect(mockLogFunction).toHaveBeenCalledWith("👋👋👋")
    })
    
    test('Deberia retornar "Funcion invalida, intente nuevamente" si se ingresa una funcion no valida', async () => {
        //Given
        const mockLogFunction = jest.fn()
        const mockReadLine = {
            question: jest.fn().mockReturnValueOnce("funcionInvalida").mockReturnValueOnce("exit"),
            close: jest.fn()
        }

        //When
        await cli.loop(mockReadLine, Object.keys(core), mockLogFunction);
      
        //Then
        expect(mockLogFunction).toHaveBeenCalledWith("Funcion invalida, intente nuevamente");
    })
})


describe('test: 2do parametro mayor que el primero',()=>{
    test('Deberia 1 - 2 = -1', () => {
    
        const a=1;
        const b=2;
        
        const result = core.sub(a, b);
        expect(result).toBe(-1);
    
    
    })    
})


describe('cli throw func test',()=>{
    test('Deberia retornar un error en caso de no ser un numero ',()=>{
        
        function isNum(){
            cli.isNumber("a");
        }

        expect(isNum).toThrow(new Error("El valor ingresado no es un numero"));

    })
})



