import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import './Calculator.css'; // Asegúrate de crear un archivo CSS para el componente Calculator.

const Calculator = () => {
    const [currentInput, setCurrentInput] = useState('0');
    const [previousInput, setPreviousInput] = useState('');
    const [operation, setOperation] = useState(null);

    const appendNumber = (number) => {
        setCurrentInput(currentInput === '0' ? number : currentInput + number);
    };

    const handleOperation = (op) => {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        setOperation(op);
        setPreviousInput(currentInput);
        setCurrentInput('');
    };

    const calculate = () => {
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(curr)) return;

        switch (operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default:
                return;
        }
        setCurrentInput(result.toString());
        setOperation(null);
        setPreviousInput('');
    };

    const clearScreen = () => {
        setCurrentInput('0');
        setPreviousInput('');
        setOperation(null);
    };

    return (
        <div className="calculator">
            <Display value={currentInput} />
            <div className="calculator-buttons">
                {['7', '8', '9', '/'].map((val) => (
                    <Button key={val} value={val} onClick={val === '/' ? handleOperation : appendNumber} className={val === '/' ? 'operation' : ''} />
                ))}
                {['4', '5', '6', '*'].map((val) => (
                    <Button key={val} value={val} onClick={val === '*' ? handleOperation : appendNumber} className={val === '*' ? 'operation' : ''} />
                ))}
                {['1', '2', '3', '-'].map((val) => (
                    <Button key={val} value={val} onClick={val === '-' ? handleOperation : appendNumber} className={val === '-' ? 'operation' : ''} />
                ))}
                <Button value="C" onClick={clearScreen} />
                <Button value="0" onClick={appendNumber} />
                <Button value="=" onClick={calculate} className="equal" />
                <Button value="+" onClick={() => handleOperation('+')} className="operation" />
            </div>
        </div>
    );
};

export default Calculator;