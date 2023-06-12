const $display = document.querySelector('.display')
const $buttons = document.querySelector('.buttons')

const operations = ['-','+','^2','*', '/'];

let currentDisplay = "";
let operation = null;
let reset = false;



$buttons.addEventListener('click', async (e) => {
    
    var nextAction = '';

    if(e.target.name !== undefined){
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

        reset = true;
        return renderDisplay(result);
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

function renderDisplay(chars) {
  
    currentDisplay = chars;
    $display.value = chars;
    
}


