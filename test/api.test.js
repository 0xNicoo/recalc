const request = require('supertest');
const api = require('../src/api.js');
const { seed } = require('../src/seed.js')

beforeEach(async () => {
    await seed()
})

describe("API substract", () => {
    test("Deberia responder con un 200 ok", async () => {
        const app = await api.build()

        const res = await request(app).get('/api/v1/sub/2/1')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")

        expect(res.body.result).toEqual(1)
    })
})

describe("API pow",()=>{
    test("Deberia responder con un error:400", async()=>{
        const app = await api.build();

        const res = await request(app).get('/api/v1/pow/y')
            .expect(400)
            

        expect(isNaN(res.body.result)).toEqual(true)
        expect(res.body.result).toEqual(undefined)
        expect(res.status).toBe(400)
    
    })
    test("Deberia responder con un error:400", async()=>{
        const app = await api.build();

        const res = await request(app).get('/api/v1/pow/XC')
            .expect(400)
            

        expect(isNaN(res.body.result)).toEqual(true)
        expect(res.body.result).toEqual(undefined)
        expect(res.status).toBe(400)
    
    })
    
})
