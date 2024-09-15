import React from 'react';
import './Display.css'; // Asegúrate de crear un archivo CSS para este componente.

const Display = ({ value }) => {
    return (
        <div className="calculator-screen">
            {value}
        </div>
    );
};

export default Display;