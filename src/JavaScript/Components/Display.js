import React from 'react';
import '../../CSS/Calculator.css'

class Display extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return(
      <div className="calculator col-12 display right">{this.props.text}</div>
    )
  }
}
export default Display;