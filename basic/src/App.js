import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


function Button(props) {
    //const [currentStateValue, functionToSetNewValue] = useState(initialStateValue);
    //const handleClick = () => setCounter(counter + counter);
    function handleClickIncrement() {
        return props.triggerIncrementFunction(props.incrementValue)
    }
    return (
        <button onClick={handleClickIncrement}>
            +{props.incrementValue}
        </button>

    );
}

function Display(props) {
    return (
        <div>{props.message}</div>
    )
}

function App() {
    const [counter, setCounter] = useState(0);
    const incrementCounter = (_incrementValue)=>setCounter(counter+_incrementValue);
    return (
        <div className="App">
                <header className="App-header">
                <React.Fragment>
                    <Button triggerIncrementFunction = {incrementCounter} incrementValue = {1}/>
                    <Button triggerIncrementFunction = {incrementCounter} incrementValue = {5}/>
                    <Button triggerIncrementFunction = {incrementCounter} incrementValue = {10}/>
                    <Button triggerIncrementFunction = {incrementCounter} incrementValue = {20}/>
                    <Button triggerIncrementFunction = {incrementCounter} incrementValue = {30}/>

                    <Display message = {counter}/>
                </React.Fragment>
            </header>
        </div>
    )
}

export default App;
