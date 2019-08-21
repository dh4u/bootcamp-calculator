import React from 'react';
import {buttonPush} from '../calculator.js';
import Buttons from './Buttons.js';
import Display from './Display.js';

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state ={
            value: 0
            ,lastButton: ""
            ,
        }
    }

    // evaluate the string for the total
    calculateTotal(){
        //console.log("calculateTotal:currentDisplayValue:" + this.state.value);
        if( this.state.value && this.hasCalculation(this.state.value) ){
            console.log('should calculate: ' + this.state.value);
            return eval(this.state.value);
        }
    }

    // tells us if the display has a calculation in it
    hasCalculation(value){
        if (value){
            if( value.search('%') != -1
            || value.search('[/]') != -1
            || value.search('[*]') != -1
            || value.search('[-]') != -1
            || value.search('[+]') != -1){
                return true;   
            }else{
                return false;   
            }
        }else{
            return false;
        }
    }
    
    // this is only good for the lastButton value in state because '9 + ' returns true
    isNumeric(value){
        return ! isNaN(parseInt(value)) ? true : false;
    }

    // the display will either have values like "a", "b + ", or "c + d". This will return "a", "b", or the sum of c + d;
    reduceToNumeric(value){
        if(!this.hasCalculation(value)){
            return value;
        }
        return value.split(" ")[0];
    }

    handleClick(button){

        const buttomText = button['text'];
        const currentDisplayValue = this.state.value;
        const lastButton = this.state.lastButton;
        let newDisplayValue;
        let temp;
        //console.log("handleClick:this.state.value: " + this.state.value);
        //console.log("handleClick:currentDisplayValue: " + currentDisplayValue);
        //console.log(this.calculateTotal(15));
        //console.log("this.state.value:" + this.state.value);
        //console.log("lastButton:" + lastButton);
        //console.log("button:" + button['text']);

        switch(button['text']){
            // clear button
            case 'AC': 
                newDisplayValue = 0;
            break;
            
            // positive / negative
            case '+/-':
                temp = currentDisplayValue;
                // cannot just inverse temp if there is a calculation in the display
                if(this.hasCalculation(currentDisplayValue)){
                    temp = this.reduceToNumeric(currentDisplayValue);
                }
                // inverse what is currently displayed in the result div
                newDisplayValue = (-1 * Number(temp)).toString();
            break;
    
            case '%':
            case '/':
            case '*':
            case '-':
            case '+':
                // for times when you have "3 + 3" and then hit another calculation button. do the first calculation and then add the button to the display
                if ( this.isNumeric(lastButton) && this.hasCalculation(currentDisplayValue) ){
                    newDisplayValue = this.calculateTotal(currentDisplayValue) + " " + buttomText + " ";
                // otherwise add the button to the display
                }else{
                    newDisplayValue = currentDisplayValue + " " + buttomText + " ";
                }
            break;
    
            case '=':
                // if the last button isn't a number strip it from the display
                if (this.isNumeric(lastButton)){
                    newDisplayValue = this.calculateTotal(currentDisplayValue);
                // otherwise assume that it has already been calculated and just return the number
                }else{
                    newDisplayValue = this.reduceToNumeric(currentDisplayValue);
                }
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
                // if the display is not "0" add the number to the end of the display
                if( currentDisplayValue != 0 ){
                    newDisplayValue = currentDisplayValue + buttomText;
                }else{
                    newDisplayValue = buttomText;
                }
            break;

            default:
                console.log("we don't want the fucking default!")
                newDisplayValue = currentDisplayValue;
            break;
        }
        
        // update the state
        this.setState((prevState, props) => ({
                //value: state.value = state.value + buttonText,
                value: newDisplayValue
                ,lastButton: button["text"]
                ,
            })
        )
        //console.log("newDisplayValue:" + newDisplayValue);
        //console.log(this.state);
    }

    render(){
        console.log('render');
        return (
            <>
            <Display text={this.state.value} />
            <Buttons handleClick={this.handleClick} />
            </>
        )
    }
  }
export default Calculator;