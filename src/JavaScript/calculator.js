var lastButton;
var temp;

export function buttonPush(button){
    //console.log('buttonPush ' + button);
    switch(button){
        case 'AC':
            setCurrentDisplayValue('0');
        break;

        case '+/-':
            // inverse what is currently displayed in the result div (only if there isn't an operator)
            temp = getCurrentDisplayValue();

            if( isNumeric(temp) ){
               setCurrentDisplayValue(-1 * getCurrentDisplayValue());
            }
        break;

        case '%':
        case '/':
        case '*':
        case '-':
        case '+':
            if ( isNumeric(lastButton) ){
                calculateTotal();
            }

            temp = getCurrentDisplayValue();
            if( temp != 0 ){
                temp += " " + button + " ";   
            }

            setCurrentDisplayValue(temp);
        break;

        case '=':
            calculateTotal();
        break;

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
            temp = getCurrentDisplayValue();
            if( temp != 0 ){
                temp += button;
            }else{
                temp = button;
            }

            setCurrentDisplayValue(temp);
        break;


    }
    lastButton = button;
}

export function calculateTotal(){
    var displayValue = getCurrentDisplayValue();
    //console.log(displayValue);
    if( hasCalculation(displayValue) ){
        //console.log('should calculate');
        setCurrentDisplayValue(eval(displayValue));
    }
}

export function getCurrentDisplayValue(){
    return document.getElementById('calculated').innerHTML.toString().replace(/(<([^>]+)>)/ig,"");
}

export function hasCalculation(value){
    if( value.search('%') != -1
      || value.search('[/]') != -1
      || value.search('[*]') != -1
      || value.search('[-]') != -1
      || value.search('[+]') != -1){
        return true;   
    }else{
        return false;   
    }
}

export function isNumeric(value){
    return ! isNaN(parseInt(value)) ? true : false;
}

export function setCurrentDisplayValue(value){
    document.getElementById('calculated').innerHTML = value.toString().bold();
} 