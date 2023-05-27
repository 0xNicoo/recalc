const { seed } = require('../src/seed.js')
const {
    createHistoryEntry,
    deleteHistory,
    History,
    Operation,
    allHistory
} = require('../src/models.js')

beforeEach(async () => {
    await seed()
})

describe("History", () => {
    test("Deberia poder crear una resta en el history", async () => {
        await createHistoryEntry({
            firstArg: 2,
            secondArg: 2,
            result: 0,
            operationName: "SUB"
        })

        const histories = await History.findAll({
            include: [Operation]
        })

        expect(histories.length).toEqual(1)
        expect(histories[0].firstArg).toEqual(2)
        expect(histories[0].secondArg).toEqual(2)
        expect(histories[0].result).toEqual(0)
        expect(histories[0].Operation.name).toEqual("SUB")
    })
})

describe("Deberia obtener todo el historial",()=>{
    test("Deberia traer todos los datos del la tabla history al llamar la funcion allHistory",async()=>{
        
        
        const history = await allHistory()

        expect(history.length).toBe(0)

    })
})

describe("createHistoryEntry", () => {
    test("Deberia poder crear una resta en el history", async () => {
        const cHistory = await createHistoryEntry({
            firstArg: 4,
            secondArg: 2,
            result: 2,
            operationName: "SUB"
        })

        expect(cHistory.get().secondArg).not.toBeUndefined()
    })
})


describe("Borrar toda la tabla History", () => {
    test("Deberia borrar todos los registros de la tabla History al llamar a la funcion deleteHistory", async () => {
        await deleteHistory({})
        const histories = await History.findAll({})
        expect(histories.length).toEqual(0)
    })

    test("Deberia luego de guardar un registro en History, borrar todos los registros de la tabla History al llamar a la funcion deleteHistory", async () => {

        await createHistoryEntry({
            firstArg: 2,
            secondArg: 2,
            result: 0,
            operationName: "SUB"
        })
        
        await deleteHistory({})
        const histories = await History.findAll({})

        expect(histories.length).toBe(0)
    })
    
})

describe("Guardar el atributo 'error' en el historial", () => {
    test('El atributo "error" se guarda correctamente en la base de datos', async () => {
        const mensajeError = 'Mensaje de error';

        const nuevoHistorial = await History.create({
            firstArg: 1,
            secondArg: 2,
            result: 4,
            operationName: "ADD",
            error: mensajeError
        })

        const historialGuardado = await History.findByPk(nuevoHistorial.id);
        expect(historialGuardado.error).toBe(mensajeError);
    })
})