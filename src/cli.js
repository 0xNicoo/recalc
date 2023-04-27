import { createInterface } from "node:readline/promises";
import core from "./core.js"

const readlineFunction = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const ALL_FNS_NAMES = Object.keys(core);

const AVAILABLE_FNS= [...ALL_FNS_NAMES, 'exit'].join(', ')

async function loop(readline, allFnsNames, logFunction = console.log) {
    const fnName = await readline.question(`Ingrese función (${AVAILABLE_FNS}): `)

    if (fnName === "exit") {
        logFunction("👋👋👋");
        return readline.close();
    }

    if(!allFnsNames.includes(fnName)){
        logFunction("Funcion invalida, intente nuevamente");
        return loop(readline, allFnsNames);
    }

    const fn = core[fnName];

    const firstNum = await readline.question("Ingrese el primer número: ")
    const secondNum = fnName ==="pow" ? null : await readline.question("Ingrese el segundo número: ")

    const result = fnName === "pow"? fn(Number(firstNum)) : fn(Number(firstNum), Number(secondNum));

    logFunction(result);
    return loop(readline, allFnsNames);
}

loop(readlineFunction, ALL_FNS_NAMES);


export default loop