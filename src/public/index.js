const $display = document.querySelector('.display')
const $hisotriesDisplay = document.querySelector('.histories-display')
const $buttons = document.querySelector('.buttons')
const $hisotries = document.querySelector('.hisotries')

const operations = ['-','+','^2','*', '/','bin','sqrt'];

const operationsMap = new Map([    
[1,'+'],
[2,'-'],    
[3,'*'],
[4,'/'],
[5,'**'],
[6,'sqrt'],
[7,'bin']
]);

let currentDisplay = "";
let operation = null;
let reset = false;

var $toggle = document.getElementById('container')
var $body = document.querySelector('body')

$toggle.onclick= function(){
    $toggle.classList.toggle('active');
    $body.classList.toggle('active');
}

$hisotries.addEventListener('click', async (e) => {
    let result;

    const nextAction = e.target.name
    if(nextAction === "getAllHistory"){
        result = await getAllHistory()
    }

    if(nextAction === "deleteAllHistory"){
        const confirmResult = confirm("¿Seguro que quiere borrar el historial?")
        if(confirmResult){
            result = await deleteAllHistory()
            result = ""
        }else{
            return;
        }
    }

    if(nextAction === "clearScreen"){
        result = "";
    }

    return renderHistoriesDisplay(result)
})


document.addEventListener('keydown', async (e) => {
    const key = e.key;
    const buttonId = getButtonIdForKey(key);
    if (buttonId) {
      const button = document.getElementById(buttonId);
      if (button) {
        button.click();
      }
    }
  });

$buttons.addEventListener('click', async (e) => {
    var nextAction = "";

    if (e.target.name !== "c" && e.target.name !== undefined){
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

        if(result !== undefined){
            reset = true;
            return renderDisplay(result);
        }
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

        if(nextAction !== "=") {
            let chars = currentDisplay + nextAction
            if( !isNaN(chars[0])){
                renderDisplay(currentDisplay + nextAction);
            }
        }

    }
})

async function calculateSub(firstArg, secondArg) {
    const resp = await fetch(`/api/v1/sub/${firstArg}/${secondArg}`)
    const { result } = await resp.json();

    return result;
}

async function calculateMult(firstArg,secondArg) {
    const resp = await fetch(`/api/v1/multi/${firstArg}/${secondArg}`)
    const {result} = await resp.json();

    return result;
}

async function calculatePow(firstArg){
    if(firstArg > 100000){
            return "Error: Numero mayor a 100000"
    }
    const resp = await fetch(`/api/v1/pow/${firstArg}`)
    const {result} = await resp.json();
    
    return result;
}

async function calculateAdd(firstArg, secondArg){
    const resp = await fetch(`/api/v1/add/${firstArg}/${secondArg}`)
    const { result } = await resp.json();

    return result;
}

async function calculateDiv(firstArg, secondArg){
    const resp = await fetch(`/api/v1/div/${firstArg}/${secondArg}`);
    if(resp.status === 200){
        const { result } = await resp.json();
        return result;
    }
    if(resp.status === 400){
        const result  = await resp.json();
        return "Error: " + result.error;
    }
}

async function getAllHistory(){
    const resp = await fetch(`/api/v1/histories`)
    const result = await resp.json();
    return result.allHistories;
}

async function deleteAllHistory(){
    const resp = await fetch(`/api/v1/delete/all`)
    const result = await resp.json();
    return result;
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


function getButtonIdForKey(key) {
    const keyMap = {
      '0': 'button-0',
      '1': 'button-1',
      '2': 'button-2',
      '3': 'button-3',
      '4': 'button-4',
      '5': 'button-5',
      '6': 'button-6',
      '7': 'button-7',
      '8': 'button-8',
      '9': 'button-9',
      '.': 'button-.',
      '+': 'button-+',
      '-': 'button--',
      '*': 'button-*',
      '/': 'button-/',
      'Enter': 'button-=',
      'Backspace': 'button-c',
      'b': 'button-bin',
      's': 'button-sqrt',
      'p': 'button-^2'
    };
  
    return keyMap[key] || '';
  }

function renderDisplay(chars) {
    currentDisplay = chars;
    $display.value = chars;
    
}


function renderHistoriesDisplay(histories){
    $hisotriesDisplay.value = ""
    if(histories === ""){
        return;
    }
    histories.forEach(history => {
        $hisotriesDisplay.value += history.firstArg + " " + operationsMap.get(history.OperationId) + " " + history.secondArg + " = " + history.result + "\n"
    });
   
}

