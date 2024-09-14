import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import axios from 'axios';

function Calculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleClick = async (label) => {
        if (label === '=') {
            try {
                const response = await axios.post('http://localhost:8080/calculate', { expression: input });
                setResult(response.data.result);
            } catch (error) {
                setResult('Error');
            }
        } else if (label === 'C') {
            setInput('');
            setResult('');
        } else {
            setInput(input + label);
        }
    };

    const buttons = ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', 'C', '0', '=', '/'];

    return (
        <div className="calculator">
            <Display value={result || input} />
            <div className="buttons">
                {buttons.map(label => (
                    <Button key={label} label={label} onClick={handleClick} />
                ))}
            </div>
        </div>
    );
}

export default Calculator;