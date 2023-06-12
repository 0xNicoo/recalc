import express from 'express';
import core from './core.js';

import { createHistoryEntry, findByID, allHistory, deleteHistory } from './models.js'

const router = express.Router();

router.get("/sub/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if(isNaN(a) || isNaN(b)) {
        await createHistoryEntry({firstArg: isNaN(a) ? null : a, secondArg: isNaN(b) ? null : b, operationName: "SUB", error: "Uno de los parámetros no es un número"})
        return res.status(400).json({error: 'Uno de los parámetros no es un número'});
    } 

    const result = core.sub(a, b);
    await createHistoryEntry({ firstArg: a,secondArg:b, result: result, operationName: "SUB" })
    return res.send({ result });
});

router.get("/multi/:a/:b",async function(req,res){
    const params =  req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if(isNaN(a) || isNaN(b)){
        await createHistoryEntry({firstArg: isNaN(a) ? null : a, secondArg: isNaN(b) ? null : b, operationName: "MUL", error: "Uno de los parámetros no es un número"})
        return res.status(400).json({error: "Uno de los parametros no es un numero"})
    }

    const result = core.mul(a,b);
    await createHistoryEntry({ firstArg: a,secondArg: b, operationName: "MUL" ,result:result})
    return res.send({ result });
})

router.get("/add/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if(isNaN(a) || isNaN(b)){
        await createHistoryEntry({firstArg: isNaN(a) ? null : a, secondArg: isNaN(b) ? null : b, operationName: "ADD", error: "Uno de los parámetros no es un número"})
        return res.status(400).json({error: 'Uno de los parámetros no es un número'});
       
    }

    const result = core.add(a, b);
    await createHistoryEntry({firstArg: a, secondArg: b, operationName: "ADD" , result: result})
    return res.send({ result });
});

router.get("/pow/:a", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);

    if(isNaN(a)){
        await createHistoryEntry({operationName: "POW", error: "El parámetro no es un número"})
        return res.status(400).json({error: 'El parámetro no es un número'});
    }
    
    const result = core.pow(a);
    await createHistoryEntry({firstArg:a,secondArg:null,operationName:'POW',result:result})
    return res.send({ result });
});

router.get("/sqrt/:a", async function(req,res){
    const params = req.params;
    const a = Number(params.a)

    if(isNaN(a)){
        await createHistoryEntry({operationName: "SQRT", error: "El parámetro no es un número"})
        return res.status(400).json({error: "El parametro no es un numero"})
       
    }

    const result = core.sqrt(a);
    await createHistoryEntry({firstArg:a,secondArg:null,operationName:'SQRT',result:result})
    return res.send({result})
})

router.get("/div/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        await createHistoryEntry({firstArg: isNaN(a) ? null : a, secondArg: isNaN(b) ? null : b, operationName: "DIV", error: "Uno de los parámetros no es un número"})
        return res.status(400).json({error: 'Uno de los parámetros no es un número'});
    } 

    try{
        const result = core.div(a, b);
        await createHistoryEntry({ firstArg: a, secondArg: b, operationName: "DIV", error: null, result: result})
        return res.send({ result });
    }catch(error){
        await createHistoryEntry({ firstArg: a, secondArg: b, operationName: "DIV", error: error.message, result: null})
        return res.status(400).json({error: error.message});
    }
});

router.get("/bin/:a", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);

    if(isNaN(a)){
        await createHistoryEntry({operationName: "SQRT", error: "El parámetro no es un número"})
        return res.status(400).json({error: 'El parámetro no es un número'});
    }

    const result = core.bin(a);
    return res.send({ result });
});

router.get('/history/:id', async (req, res) => {
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
    await deleteHistory(req.query.operation, req.query.page, req.query.size)
    return res.status(200).json({message: "Se borraron todas las historias de la tabla"})
})

export default router;