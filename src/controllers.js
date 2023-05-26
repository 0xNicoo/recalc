import express from 'express';
import core from './core.js';

import { createHistoryEntry } from './models.js'

const router = express.Router();

router.get("/sub/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send('Uno de los parámetros no es un número');
    } else {
        const result = core.sub(a, b);

        await createHistoryEntry({ firstArg: a,secondArg:b, operationName: "SUB" })
        return res.send({ result });
    }
});
router.get("/multi/:a/:b",async function(req,res){
    const params =  req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if(isNaN(a) || isNaN(b)){
        res.status(400).send("Uno de los parametros no es un numero")
    }else{
        const result = core.mul(a,b);
        return res.send({result})
    }
})

router.get("/add/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send('Uno de los parámetros no es un número');

        await createHistoryEntry({firstArg: a, secondArg: b, operationName: "ADD", error: "no de los parámetros no es un número"})
    } else {
        const result = core.add(a, b);

        await createHistoryEntry({firstArg: a, secondArg: b, operationName: "ADD" , result: result})
        return res.send({ result });
    }
});

router.get("/pow/:a", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);

    if (isNaN(a)) {
        return res.status(400).send('El parámetro no es un número');
    } else {
        const result = core.pow(a);
        await createHistoryEntry({firstArg:a,secondArg:null,operationName:'POW',error:null})
        return res.send({ result });
    }
});

router.get("/div/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send('Uno de los parámetros no es un número');
    } else {
        if (b == 0) {
            return res.status(400).send('Error: Division por cero');
        }
        const result = core.div(a, b);
        await createHistoryEntry({ firstArg: a, secondArg: b, operationName: "DIV", error: null})
        return res.send({ result });
    }
});

export default router;