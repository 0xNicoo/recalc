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

describe("API div", () => {
    test("Deberia responder con un 400 y si su segundo parametro es 0 devuelva mensaje de error", async () => {
        const app = await api.build();
        const mensajeError="Error: Division por cero";

        const res = await request(app).get("/api/v1/div/1/0")
        expect(res.error.text).toBe(mensajeError);
        expect(res.status).toBe(400);
    })
})