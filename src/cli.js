import { createInterface } from "node:readline/promises";
import core from "./core.js"

const readlineFunction = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const allFnsNames = Object.keys(core);

const AVAILABLE_FNS= [...allFnsNames, 'exit'].join(', ')

async function loop(readline, logFunction = console.log) {
    const fnName = await readline.question(`Ingrese función (${AVAILABLE_FNS}): `)

    if (fnName === "exit") {
        logFunction("👋👋👋");
        return readline.close();
    }

    if(!allFnsNames.includes(fnName)){
        logFunction("Funcion invalida, intente nuevamente");
        loop(readline);
    }

    const fn = core[fnName];

    const firstNum = await readline.question("Ingrese el primer número: ")
    const secondNum = fnName ==="pow" ? null : await readline.question("Ingrese el segundo número: ")

    const result = fnName === "pow"? fn(Number(firstNum)) : fn(Number(firstNum), Number(secondNum));

    logFunction(result);
    loop(readline);
}

loop(readlineFunction);


export default loop