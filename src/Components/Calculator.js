import React, { useState } from 'react';
import axios from 'axios';

function Calculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleClick = async (label) => {
        if (label === '=') {
            try {
                const [operator] = input.match(/[\+\-\*\/]/) || [''];
                const operands = input.split(/[\+\-\*\/]/).map(op => op.trim()).filter(op => op !== '');
                let response;
                switch (operator) {
                    case '+':
                        response = await axios.post('http://localhost:8080/api/calculadora/sumar', { operands });
                        break;
                    case '-':
                        response = await axios.post('http://localhost:8080/api/calculadora/restar', { operands });
                        break;
                    case '*':
                        response = await axios.post('http://localhost:8080/api/calculadora/multiplicar', { operands });
                        break;
                    case '/':
                        response = await axios.post('http://localhost:8080/api/calculadora/dividir', { operands });
                        break;
                    default:
                        setResult('Error');
                        return;
                }
                setResult(response.data.result);
            } catch (error) {
                setResult('Error');
            }
        } else if (label === 'C') {
            setInput('');
            setResult('');
        } else {
            setInput(prevInput => prevInput + label);
        }
    };

    const buttons = [
        '1', '2', '3', '+',
        '4', '5', '6', '-',
        '7', '8', '9', '*',
        'C', '0', '=', '/'
    ];

    return (
        <div className="calculator">
            <div className="display">{result || input || '0'}</div>
            <div className="buttons">
                {buttons.map(label => (
                    <button
                        key={label}
                        onClick={() => handleClick(label)}
                        className={label === 'C' ? 'special' : label === '=' ? 'equals' : ''}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Calculator;
