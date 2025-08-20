// src/components/ElementCard.jsx
import React from 'react';
import '../styles/periodicTable.css'; // Importa los estilos CSS

const ElementCard = ({ element, onClick }) => {
    if (!element) {
        // Renderiza un espacio vacío si no hay elemento (para los huecos de la tabla)
        return <div className="element-card empty"></div>;
    }

    const { numeroAtomico, abreviacion, nombre, masaAtomica, tipo, color } = element;

    const cardStyle = {
        backgroundColor: color || '#f0f0f0', // Usa el color del elemento o un gris por defecto
    };

    return (
        <div 
            className={`element-card ${tipo.toLowerCase().replace(/\s/g, '-')}`} 
            style={cardStyle}
            onClick={() => onClick(element)}
        >
            <div className="atomic-number">{numeroAtomico}</div>
            <div className="abbreviation">{abreviacion}</div>
            <div className="name">{nombre}</div>
            {masaAtomica && <div className="mass">{masaAtomica.toFixed(2)}</div>}
        </div>
    );
};

export default ElementCard;