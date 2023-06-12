function add(a, b) {
    return a+b
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a*b
}

function divide(a, b) {
    if ( b !== 0 ){
        return a/b;
    } 

    throw new Error("Division por cero.")
}

function pow(a) {
    return Math.pow(a,2)
}
function sqrt(a){
    return Math.sqrt(a)
}

function decimalToBinary(a) {
    return a.toString(2);
}

export default {
    add: add,
    sub: subtract,
    mul: multiply,
    div: divide,
    pow: pow,
    sqrt: sqrt,
    bin: decimalToBinary
}
