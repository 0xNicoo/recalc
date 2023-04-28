import { createInterface } from "node:readline/promises";
import core from "./core.js"

const readlineFunction = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const ALL_FNS_NAMES = Object.keys(core);

const AVAILABLE_FNS= [...ALL_FNS_NAMES, 'exit'].join(', ')

function isNumber(num){
    if(isNaN(num))
        throw new Error("El valor ingresado no es un numero")
    return num;
}

async function loop(readline, allFnsNames, logFunction = console.log) {
    const fnName = await readline.question(`Ingrese función (${AVAILABLE_FNS}): `)
    let firstNum;
    let secondNum;

    if (fnName === "exit") {
        logFunction("👋👋👋");
        return readline.close();
    }

    if(!allFnsNames.includes(fnName)){
        logFunction("Funcion invalida, intente nuevamente");
        return loop(readline, allFnsNames);
    }

    const fn = core[fnName];

    try{
        firstNum = isNumber(await readline.question("Ingrese el primer número: ")) 
        secondNum = fnName ==="pow" ? null : isNumber(await readline.question("Ingrese el segundo número: "))
   
    }catch(error){
        logFunction(error.messagegit)
        return loop(readline, allFnsNames);
    } 

    const result = fnName === "pow"? fn(Number(firstNum)) : fn(Number(firstNum), Number(secondNum));

    logFunction(result);
    return loop(readline, allFnsNames);
}

loop(readlineFunction, ALL_FNS_NAMES);


export default {
                loop:loop, 
                isNumber:isNumber
            }