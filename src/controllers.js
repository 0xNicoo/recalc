import express from 'express';
import core from './core.js';

const router = express.Router();

router.get("/sub/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send('Uno de los parámetros no es un número');
    } else {
        const result = core.sub(a, b);
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
    } else {
        const result = core.add(a, b);
        return res.send({ result });
    }
});

router.get("/pow/:a", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);

    if (isNaN(a)) {
        res.status(400).send('El parámetro no es un número');
    } else {
        const result = core.pow(a);
        return res.send({ result });
    }
});

export default router;