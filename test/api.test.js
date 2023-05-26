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

describe ("API multi",()=>{

    function isFloat(num){
        return num % 1 !== 0
    }

    test("Deberia responder con un 200 ok", async () => {
        const app = await api.build()
        const a = 5.5
        const b = 2.4


        const res = await request(app).get(`/api/v1/multi/${a}/${b}`)
        expect(res.status).toBe(200)
        
        expect(isFloat(res.body.result)).toBe(true)
    })

    
})