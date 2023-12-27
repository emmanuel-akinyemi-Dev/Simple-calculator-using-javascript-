"use strict";
class Calculator{

    constructor(previousDisplay,currentDisplay) { 

    this.previousDisplay = previousDisplay;
    this.currentDisplay = currentDisplay;
    this.clear();


}
 
clear(){
    this.currentOperand= " ";
    this.previousOperand=" ";
    this.operation=undefined;
    this.done= 0;
    

}

delete(){
  
    this.currentOperand =  this.currentOperand.toString().slice(0, -1)  
 
 
}

  

compute (){
  let computation
  const previous=parseFloat(this.previousOperand)
  const current=parseFloat(this.currentOperand)
  if(isNaN(previous) || isNaN(current)) return
  switch( this.operation){
        case  '+' :
            computation = previous + current;
            break
        case  '*' :
            computation = previous *  current;
            break
         case  '/' :
            computation = previous / current;
            break
        case  '-' :
            computation = previous - current;
            break

 
        default:
            return;
  

  }
    
  this.currentOperand =computation;
  this.operation = undefined;
  this.previousOperand=" ";
  this.done=1; 
  
 

}

 negation(){
      
     this.currentOperand = parseFloat(this.currentOperand) * -1 
      

 }

apendNumber(number){
   if(number==='.' && this.currentOperand.includes('.')) return;
   if(this.done === 1  ){ 
    this.clear(); 
   this.currentOperand = this.currentOperand.toString()   +  number.toString()  ;
   }

   else{
    this.currentOperand = this.currentOperand.toString()   +  number.toString()  ;  
   }
   

}
chooseOperations(operation){ 
    
    if (this.done === 1){
     this.done=0;
     if(this.currentOperand ===' ') return;
     if(this.currentOperand !==' '){
      this.compute();

    } 

   }
   else{
    if(this.currentOperand ===' ') return;
    if(this.currentOperand !==' '){
     this.compute();
   }
}
if( operation==='+/-') {

}
  this.operation=operation; 
  this.previousOperand = this.currentOperand;
  this.currentOperand=' ';

}
getDisplay(number){
    const stringNumber= number.toString();
   const integerValue = parseFloat(stringNumber.split('.')[0]) ;
   const decimalDigit =   stringNumber.split('.')[1]  ;
   let integerDisplay;
  if (isNaN(integerValue)){
     integerDisplay= '';

   }
   else{
     integerDisplay= integerValue.toLocaleString('en', {maximumFractionDigits:0});
    }

    if(decimalDigit != null){
     return    integerDisplay +'.' + decimalDigit ;//`${integerDisplay}.${decimalDigit} `

    }
    else{
  return integerDisplay.toString();
    } 
}

updateDisplay(){
  
  this.currentDisplay.innerText = this.getDisplay(this.currentOperand);
  
  if (this.operation  != null ){
    this.previousDisplay.innerText =  this.getDisplay (this.previousOperand)   +  this.operation.toString()  ;
    console.log(this.previousDisplay.innerText );
  } //`${this.getDisplay (this.previousOperand)} ${ this.operation} `;
 else{
    this.previousDisplay.innerText = ' ';

 }  
}  
}

 
const numbers =document.querySelectorAll("[data-Number]");
const previousDisplay =document.querySelector ("[data-Previous-operand]" ) ;
const currentDisplay =document.querySelector ("[data-current-operand]" ) ;
const Del =document.querySelector ("[data-del]") ;
const clearScreen =document.querySelector ("[data-AC]") ;
const operators = document.querySelectorAll ("[data-Operation]") ;   
const equals =document.querySelector ("[data-equals]") ;
 const negation =document.querySelector ("[data-Negative]") ;



const calculator = new Calculator(previousDisplay,currentDisplay); 



operators.forEach(button => {
    button.addEventListener("click", () =>{
        calculator.chooseOperations(button.innerText ) 
        calculator.updateDisplay();
        })


    })


numbers.forEach(button => {
button.addEventListener("click", () =>{
   
        calculator.apendNumber(button.innerText )  
        calculator.updateDisplay(); 
   
})

})

equals.addEventListener("click", button => {
  
calculator.compute();
calculator.updateDisplay();
}) 

clearScreen.addEventListener("click", button => {
    calculator.clear();
    calculator.clear();
    calculator.updateDisplay();
    }) 

Del.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
    })

  negation.addEventListener("click", button => {
      calculator.negation();
     calculator.updateDisplay();
     }) 

    