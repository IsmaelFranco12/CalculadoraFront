import React, { useState } from 'react';
import axios from 'axios';

function Calculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleClick = async (label) => {
        if (label === '=') {
            try {
                const [operator] = input.match(/[\+\-\*\/]/) || [''];
                const [num1, num2] = input.split(operator).map(num => num.trim());

                if (!num1 || !num2) {
                    setResult('Error');
                    return;
                }

                let response;
                switch (operator) {
                    case '+':
                        response = await axios.get('http://localhost:8080/api/calculadora/sumar', { params: { num1, num2 } });
                        break;
                    case '-':
                        response = await axios.get('http://localhost:8080/api/calculadora/restar', { params: { num1, num2 } });
                        break;
                    case '*':
                        response = await axios.get('http://localhost:8080/api/calculadora/multiplicar', { params: { num1, num2 } });
                        break;
                    case '/':
                        response = await axios.get('http://localhost:8080/api/calculadora/dividir', { params: { num1, num2 } });
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
