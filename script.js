// declare input variables
var input1 = "";
var input2 = "";
var num = [];
var currentOperator = "";
var solution = 0;
var counter = 0;
var dis = "";
var carryOver = false; 
const regex = /\d/;
let key = "";



const display = document.querySelector("#display");
const subDisplay = document.querySelector("#sub-display");
const numBtn = document.querySelectorAll(".number");
const oprBtn = document.querySelectorAll(".operator");
const operateButton = document.querySelector("#operate");
const clrBtn = document.querySelector("#clear");
const delBtn = document.querySelector("#backsp");
const decBtn = document.querySelector(".decimal");

const button = document.querySelector("button")

//prevent the enter key from pressing the last clicked button
button.addEventListener("keydown", function(event) {
    event.preventDefault()
});

//keybindings
document.addEventListener('keyup', (event) => {
    key = event.key;

    if (regex.test(key)){
        numberPress(parseInt(key));
    } else {
        switch (key) {
            case "Backspace":
            backspace();
            break;

            case ".":
            decimal();
            break;

            case "-":
            operatorFunc("subtract");
            break;

            case "+":
            operatorFunc("add");
            break;

            case "/":
            operatorFunc("divide");
            break;

            case "*":
            operatorFunc("multiply");
            break;

            case "Enter":
            operateFunc();
            break;

            default:
            break;
        }
    }


})

//add each number button click to an array
numBtn.forEach((button) => {
    button.addEventListener('click', function () {
        
        if (carryOver == true){
            num.pop();
            carryOver = false;
        }
         if (num.length < 11) {
        num.push(button.id);
        subDisplay.textContent = dis += num[counter];
        counter++;
        console.log(num);
        }
    })
});

function numberPress(button){

    if (carryOver == true){
        num.pop();
        carryOver = false;
    }
     if (num.length < 11) {
    num.push(button);
    subDisplay.textContent = dis += num[counter];
    counter++;
    console.log(num);
    }
}

//decimal button
decBtn.addEventListener('click',function(){
 decimal();
})

function decimal() {
    decBtn.disabled = true;
    num.push(".");
    subDisplay.textContent = dis += num[counter];
    counter++;
}

//backspace button function
function backspace() {
   
    if (counter > 0) {
        if (num.pop() == ".") {
            dis=dis.slice(0,-1)
            subDisplay.textContent = dis
            counter--;
            decBtn.disabled = false; }
        
        else {
            dis=dis.slice(0,-1)
            subDisplay.textContent = dis
            counter--;
            
            }
    } 
    if (counter == 0 ) {
        subDisplay.textContent = 0;
      
    }
}

delBtn.addEventListener('click', function () {
    backspace();
});

//operator button click will convert arrays to numbers and store in proper input variables
oprBtn.forEach((button) => {
    button.addEventListener('click', function () {
    key = button.id;
    operatorFunc(key);
   
});
});

//operator function
function operatorFunc(button) {

    if (input1 >0) {
        input2 = parseFloat(num.splice(0,num.length) .join(""));
        // input2 = parseInt(num.splice(0,num.length) .join(""),10);
        input1 = operate(currentOperator,input1,input2);
        currentOperator = button;
        dis = input1 + displayOperator(currentOperator);
        subDisplay.textContent = dis;
        display.textContent = input1;
        currentOperator = button;

    } else {
        input1 = parseFloat(num.splice(0,num.length) .join(""));
        currentOperator = button;
        dis = input1 + displayOperator(currentOperator);
        subDisplay.textContent = dis;
        
    }

    counter = 0;
    decBtn.disabled = false;
 
}

//Equals button
operateButton.addEventListener('click', function() {
    operateFunc();
});

function operateFunc() {
     //convert the array into the second input number
    input2 = parseFloat(num.splice(0,num.length) .join(""));
    console.log(input1)
    console.log(currentOperator)
    console.log(input2)
    solution = operate(currentOperator,input1,input2);

    display.textContent = roundSolution(solution);
    console.log(operate(currentOperator,input1,input2))
    num.push(solution);
    input1 = "";
    input2 = "";
    dis="";
    counter = 0;
    decBtn.disabled = false;
    carryOver=true;
}

//returns a rounded solution or error message 
function roundSolution(solution){
    if (!Number.isFinite(solution)){
        return "Error"
    } else if (solution > 99999999999) {
        return "Error"
    } else {
        return Math.round(solution * 10000) / 10000;
        }
    }

function displayOperator(id){
switch(id){
    case "add":
    return " + "
    break;

    case "subtract":
    return " - ";
    break;

    case "multiply":
    return " x ";
    break;

    case "divide":
    return " / ";
    break;
}
}

//Clear-all button
clrBtn.addEventListener('click', function() {
clear();
display.textContent = " ";
subDisplay.textContent = " ";
});

//clear variables function
function clear() {
    input1 = "";
    input2 = "";
    num=[];
   currentOperator="";
    dis="";
    counter = 0;
    decBtn.disabled = false;
    carryOver=false;
    key="";
}

//Operator functions
function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(operator,a,b){

    switch (operator) {
        case "add":
            return add(a,b);
            break;
        case "subtract":
            return subtract(a,b);
            break;
        case "multiply":
            return multiply(a,b);
            break;
        case "divide":
            return divide(a,b);
            break;
    }
}

function numPress(num){
input = num;
display.textContent = num;
}