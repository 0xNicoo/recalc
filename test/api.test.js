const request = require('supertest');
const api = require('../src/api.js');
const { seed } = require('../src/seed.js')
const { History } = require('../src/models.js')

beforeEach(async () => {
    await seed()
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

describe("API sum decimal",()=>{

    test("Debería responder 0.3 al sumar 0.1+0.2",async()=>{
        const app = await api.build()

        const res = await request(app).get('/api/v1/add/0.1/0.2')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")

        expect(isNaN(res.body.result)).toEqual(false)
        expect(res.error.text).toBe(undefined)
        expect(res.status).toBe(200)
        expect(parseFloat(res.body.result.toFixed(1))).toEqual(0.3)
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

describe("API historial", () => {
    test('Debería responder con un 200 ok y verificar si la entrada del historial si existe', async () => {
        const app = await api.build();
        //Agrego una entrada al historial para asegurarme que siempre haya al menos una con id 1
        await request(app).get('/api/v1/add/2/2');
        const response = await request(app).get(`/api/v1/historial/1`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data.id).toBe(1);
    });

    test('Deberia devolver un error si la entrada del historial no existe', async () => {
        const app = await api.build();
        const response = await request(app).get('/api/v1/historial/-1');

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Entrada del historial no encontrada')
    })
})
