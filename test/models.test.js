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
        expect(histories[0].result).toEqual(0)
        expect(histories[0].Operation.name).toEqual("SUB")
    })
})

describe("Deberia obtener todo el historial",()=>{
    test("Deberia traer todos los datos del la tabla history al llamar la funcion allHistory",async()=>{
        
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
        
    

        const history = await allHistory({})

        expect(history.length).toBe(1)
    })
    
})
        await deleteHistory({})

        const histories = await History.findAll({})

        expect(histories.length).toEqual(0)
    })
})
