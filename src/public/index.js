const $display = document.querySelector('.display')
const $buttons = document.querySelector('.buttons')

const operations = ['-','+','^2','*', '/','bin','sqrt'];

let currentDisplay = "";
let operation = null;
let reset = false;

document.addEventListener('keydown', async (e) => {
    const key = e.key;
    const [firstArg, secondArg] = currentDisplay.split(operation)
    let buttonId = '';

    switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            buttonId = `button-${key}`;
            break;
        case 'Enter':
            buttonId = 'button-=';
            break;
        case 'Backspace':
            buttonId = 'button-c';
            break;
        //Para usar la función decimal a binario se utiliza la letra b
        case 'b':
            buttonId = 'button-bin';
            break;
        //Para usar la función de raiz cuadrada se utiliza la letra s
        case 's':
            buttonId = 'button-sqrt';
            break;
        //Para usar la función potencia de dos se utiliza la letra p
        case 'p':
            buttonId = 'button-^2';
            break
    }

    if (buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
          button.click();
        }
      }
});

$buttons.addEventListener('click', async (e) => {
    var nextAction = "";

    if (e.target.name !== "c" ){
        nextAction = e.target.name
    }
    
    
    if (nextAction === "=") {
        const [firstArg, secondArg] = currentDisplay.split(operation)

        let result;

        if (operation === "-") {
            result = await calculateSub(firstArg, secondArg)
        }

        if (operation === "+") {
            result = await calculateAdd(firstArg, secondArg)
        }
        
        if (operation === "*"){
            result = await calculateMult (firstArg, secondArg)
        }
        if (operation === "^2"){
            result =  await calculatePow(firstArg)
        }

        if (operation === "/") {
            result = await calculateDiv(firstArg, secondArg)
        }

        if (operation === "bin"){
            result =  await calculateBin(firstArg)
        }
        if (operation === "sqrt"){
            result = await calculateSqrt(firstArg)
        }

        reset = true;
        return renderDisplay(result);
    }

    if (e.target.name === "c"){
        renderDisplay("")
    }

    if (operations.includes(nextAction)) {
        operation = nextAction;
    }

    if (reset) {
        reset = false;
        operation = null;
        renderDisplay(nextAction);
    } else {
        renderDisplay(currentDisplay + nextAction);
    }
})

async function calculateSub(firstArg, secondArg) {
    const resp = await fetch(`/api/v1/sub/${firstArg}/${secondArg}`)
    const { result } = await resp.json();

    return result;
}

async function calculateMult (firstArg,secondArg) {
    const resp = await fetch(`/api/v1/multi/${firstArg}/${secondArg}`)
    const {result} = await resp.json();

    return result;
}

async function calculatePow(firstArg){
    const resp = await fetch(`/api/v1/pow/${firstArg}`)
    const {result} = await resp.json();
    
    return result;
}

async function calculateAdd(firstArg, secondArg){
    const resp = await fetch(`/api/v1/add/${firstArg}/${secondArg}`)
    const { result } = await resp.json();

    return result;
}

async function calculateDiv(firstArg, secondArg) {
    const error = "Error: División por cero";
    if (secondArg !== "0") {
        const resp = await fetch(`/api/v1/div/${firstArg}/${secondArg}`);
        const { result } = await resp.json();
        return result;
    }
    return error;
}

async function calculateBin(firstArg){
    const resp = await fetch(`/api/v1/bin/${firstArg}`)
    const {result} = await resp.json();
    
    return result;
}

async function calculateSqrt(firstArg){
    const resp = await fetch (`/api/v1/sqrt/${firstArg}`)
    const {result} = await resp.json();

    return result;
}

function renderDisplay(chars) {
    currentDisplay = chars;
    $display.value = chars;
}

