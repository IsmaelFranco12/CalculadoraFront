import React from 'react';
import './Button.css'; // Asegúrate de crear un archivo CSS para este componente.

const Button = ({ value, onClick, className }) => {
    return (
        <button className={`calculator-button ${className}`} onClick={() => onClick(value)}>
            {value}
        </button>
    );
};

export default Button;