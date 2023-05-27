import express from 'express';
import core from './core.js';

import { createHistoryEntry, findByID, allHistory,deleteRows } from './models.js'

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
        await createHistoryEntry({ firstArg: a,secondArg: b, operationName: "MUL" ,result:result})
        return res.send({ result });
    
    }
})

router.get("/add/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send('Uno de los parámetros no es un número');

        await createHistoryEntry({firstArg: a, secondArg: b, operationName: "ADD", error: "Uno de los parámetros no es un número"})
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

router.get("/bin/:a", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);

    if (isNaN(a)) {
        return res.status(400).send('El parámetro no es un número');
    } else {
        const result = core.bin(a);
        return res.send({ result });
    }
});

router.get('/historial/:id', async (req, res) => {
    const historyId = req.params.id;
    const historia = await findByID(historyId);

    if (historia) {
        res.status(200).json({ data: historia });
    } else {
        res.status(404).json({ error: 'Entrada del historial no encontrada'});
    }
})

router.get("/histories", async function (req, res) {
    const allHistories = await allHistory(req.query.operation, req.query.page, req.query.size)
    return res.send({allHistories}) 
});

router.get("/delete/all", async function(req,res){
    await deleteRows()
    return res.status(200).json({message: "Se borraron todas las historias de la tabla"})
})

export default router;