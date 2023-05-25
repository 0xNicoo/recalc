const { seed } = require('../src/seed.js')
const {
    createHistoryEntry,
    History,
    Operation
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


describe("createHistory",()=>{ 

    test("El segundo argumento deberia exitir al crear un history",async()=>{ 
    
        //CREAMOS UNA INSTANCIA PARA GUARDAR 
        
        const cHistory = await createHistoryEntry({ 
        
            firstArg: 2, 
            
            secondArg: 1, 
            
            result: 1, 
            
            operationName:"SUB" 
        
        }) 

        // VERIFICAMOS SI TIENE EL SUGUNDO PARAMETRO PARA GUARDAR EN EL RETURN 
        expect(cHistory.get().hasOwnProperty("secondArg")).toBe(true) 
    
    }) 
    
}) 