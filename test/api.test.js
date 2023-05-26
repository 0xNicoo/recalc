const request = require('supertest');
const api = require('../src/api.js');
const { seed } = require('../src/seed.js')

beforeEach(async () => {
    await seed()
})


describe("API pow",()=>{
    test("Deberia responder con un error:400", async()=>{
        const app = await api.build();

        const res = await request(app).get('/api/v1/pow/y')
            .expect(400)
            

        expect(isNaN(res.body.result)).toEqual(true)
        expect(res.error.text).toBe("El parámetro no es un número")
        expect(res.status).toBe(400)
    
    })
    test("Deberia responder con un error:400", async()=>{

        const app = await api.build();

        const res = await request(app).get('/api/v1/pow/XC')
            .expect(400)
            

        expect(isNaN(res.body.result)).toEqual(true)
        expect(res.error.text).toBe("El parámetro no es un número")
        expect(res.status).toBe(400)
    
    })
    
})

describe("API add", () => {
    test("Deberia responder con un 200 ok y su respuesta ser menor al primer parametro", async () => {
        const app = await api.build()
        const a = 4
        const b = -10

        const res = await request(app).get(`/api/v1/add/${a}/${b}`)


        expect(res.body.result).toBeLessThan(a)
        expect(res.headers['content-type']).toBe("application/json; charset=utf-8")
        expect(res.status).toBe(200)
    })

    test("Deberia responder con un 200 ok y su respuesta ser menor al primer parametro", async () => {
        const app = await api.build()
        const a = 0
        const b = -100000

        const res = await request(app).get(`/api/v1/add/${a}/${b}`)


        expect(res.body.result).toBeLessThan(a)
        expect(res.headers['content-type']).toBe("application/json; charset=utf-8")
        expect(res.status).toBe(200)
    })
})