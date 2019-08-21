import React from 'react';
//import Calculator from './Calculator.js'

class Button extends React.Component{
    render(){
      if( this.props.className ){
        return(
          <li onClick={ () => this.props.onClick(this.props.text) } className={ this.props.className } ref={ this.props.text }>{ this.props.text }</li>
        )
      }else{
        return(
          <li onClick={ () => this.props.onClick(this.props.text) } ref={ this.props.text }>{ this.props.text }</li>
        )
      }
    }
}

class Buttons extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = props.handleClick.bind(this);
    }

    renderButton(text,className){
        return <Button text={text} className={className} onClick={ () => this.handleClick({text},this.state) } />
    }

    shouldComponentUpdate(){
        return false;
    }

    render(){
        //console.log('render in Buttons');  
        return (
            <>
            <div className="calculator">
                <ul>
                    {this.renderButton('AC', 'function')}
                    {this.renderButton('+/-', 'function')}
                    {this.renderButton('%', 'function')}
                    {this.renderButton('/', 'function')}
                </ul>
                <ul>
                    {this.renderButton('7')}
                    {this.renderButton('8')}
                    {this.renderButton('9')}
                    {this.renderButton('*', 'function')}
                </ul>
                <ul>
                    {this.renderButton('4')}
                    {this.renderButton('5')}
                    {this.renderButton('6')}
                    {this.renderButton('-', 'function')}
                </ul>
                <ul>
                    {this.renderButton('1')}
                    {this.renderButton('2')}
                    {this.renderButton('3')}
                    {this.renderButton('+', 'function')}
                </ul>
                <ul>
                    {this.renderButton('0', 'col-6')}
                    {this.renderButton('.')}
                    {this.renderButton('=', 'function')}
                </ul>
            </div>
            </>
        )
    }
  }
export default Buttons;