import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { evaluate } from "https://esm.sh/mathjs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
      operators: ["+", "-", "*", "/"],
      decimal_point: "."
    };
  }
  
  handleBackSpace = () => {
    this.setState(prevState => ({
      display: prevState.display.slice(0, prevState.display.length - 1)
    }));
  };
  
  changeHandler = (event) => {
    this.setState({
      display: event.target.value
    });
  };
  
  handleClear = () => {
    this.setState({
      display: "0"
    });
  };

  clickHandler = datum => {
    const operatorPattern = /[+\-*/]/;
    if(this.state.display == "0"){
      this.handleBackSpace();
    }
    if(datum === "."){
      const parts = this.state.display.split(operatorPattern);
      if (parts[parts.length - 1].includes(".")){
        return;
      }
    }
    this.setState(prevState => ({ display: prevState.display + datum }));
  };
  
  calculate = () => {
    const { display } = this.state;
    let result;
    try {
      result = evaluate(display);
    } catch (error) {
      result = 'Error';
    }
    this.setState({
      display: result.toString()
    });
  };
  
  
  render() {
    return (
      <div id="calc">
        <h2>Calculator</h2>
        <div id="display" onChange={event => this.changeHandler} > {this.state.display}
        </div>
        <div id="nums">
          <button id="seven" onClick={() => this.clickHandler("7")}>7</button>
          <button id="eight" onClick={() => this.clickHandler("8")}>8</button>
          <button id="nine" onClick={() => this.clickHandler("9")}>9</button>
          <br />
          <button id="four" onClick={() => this.clickHandler("4")}>4</button>
          <button id="five" onClick={() => this.clickHandler("5")}>5</button>
          <button id="six" onClick={() => this.clickHandler("6")}>6</button>
          <br />
          <button id="one" onClick={() => this.clickHandler("1")}>1</button>
          <button id="two" onClick={() => this.clickHandler("2")}>2</button>
          <button id="three" onClick={() => this.clickHandler("3")}>3</button>
          <button id="backspace" onClick={this.handleBackSpace}>←</button>
          <br />
          <button id="zero" onClick={() => this.clickHandler("0")}>0</button>
          <button id="decimal" onClick={() => this.clickHandler(".")}>.</button>
          <button id="clear" onClick={this.handleClear}>C</button>
          <button id="equals" onClick={this.calculate}>=</button>
        </div>
        <div id="operator">
          <button id="add" onClick={() => this.clickHandler("+")}>+</button>
          <button id="subtract" onClick={() => this.clickHandler("-")}>-</button>
          <button id="multiply" onClick={() => this.clickHandler("*")}>*</button>
          <button id="divide" onClick={() => this.clickHandler("/")}>/</button>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));