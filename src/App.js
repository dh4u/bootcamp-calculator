import React from 'react';
//import logo from './logo.svg';
import './App.css';
import './CSS/Calculator.css'
import Calculator from './JavaScript/Components/Calculator.js';

function App() {
  return(
    <div className="App">
          <div className="calculator container">
                <div className="calculator row" style={{alignItems:'center'}}>
                    <Calculator />
                </div>
          </div>
    </div>
  )
}
export default App;