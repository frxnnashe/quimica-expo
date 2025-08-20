// src/components/PeriodicTable.jsx
import React from 'react';
import ElementCard from './ElementCard';
import { elementosQuimicos } from '../data/elementosQuimicos'; // Importa los datos
import '../styles/periodicTable.css';

const PeriodicTable = ({ onElementClick }) => {
    // La tabla periódica tiene 18 columnas y 7 filas principales + 2 para lantánidos/actínidos
    const numColumns = 18;
    const numRows = 7; // Filas principales

    // Creamos un mapa para acceder rápidamente a los elementos por su número atómico
    const elementosMap = new Map(elementosQuimicos.map(el => [el.numeroAtomico, el]));

    // Generamos una matriz para la disposición de la tabla periódica
    const tableLayout = [];
    for (let r = 1; r <= numRows; r++) {
        const row = [];
        for (let c = 1; c <= numColumns; c++) {
            let element = null;
            // Lógica para posicionar los elementos correctamente
            // Esto es una simplificación y puede requerir ajustes finos para la disposición exacta
            if (r === 1 && c === 1) element = elementosMap.get(1); // Hidrógeno
            else if (r === 1 && c === 18) element = elementosMap.get(2); // Helio
            else if (r === 2 && c >= 1 && c <= 18) element = elementosMap.get(c + 2); // Periodo 2 (Li a Ne)
            else if (r === 3 && c >= 1 && c <= 18) element = elementosMap.get(c + 10); // Periodo 3 (Na a Ar)
            else if (r === 4 && c >= 1 && c <= 18) element = elementosMap.get(c + 18); // Periodo 4 (K a Kr)
            else if (r === 5 && c >= 1 && c <= 18) element = elementosMap.get(c + 36); // Periodo 5 (Rb a Xe)
            else if (r === 6) {
                if (c === 1) element = elementosMap.get(55); // Cesio
                else if (c === 2) element = elementosMap.get(56); // Bario
                else if (c === 3) element = null; // Espacio para lantánidos
                else if (c >= 4 && c <= 18) element = elementosMap.get(c + 68); // Resto del periodo 6 (Hf a Rn)
            }
            else if (r === 7) {
                if (c === 1) element = elementosMap.get(87); // Francio
                else if (c === 2) element = elementosMap.get(88); // Radio
                else if (c === 3) element = null; // Espacio para actínidos
                else if (c >= 4 && c <= 18) element = elementosMap.get(c + 98); // Resto del periodo 7 (Rf a Og)
            }
            row.push(element);
        }
        tableLayout.push(row);
    }

    // Añadir Lantánidos y Actínidos por separado (debajo de la tabla principal)
    const lantanidos = elementosQuimicos.filter(el => el.tipo === "Lantánido");
    const actinidos = elementosQuimicos.filter(el => el.tipo === "Actínido");

    return (
        <div className="periodic-table-container">
            <div className="periodic-table">
                {/* Cabeceras de grupo */}
                <div className="group-numbers">
                    {[...Array(numColumns)].map((_, i) => (
                        <div key={`group-${i + 1}`} className="group-number-header">{i + 1}</div>
                    ))}
                </div>
                {/* Fila vacía para alinear el 1 con el H */}
                <div className="period-number-header empty"></div>
                {/* Renderizar la tabla principal */}
                {tableLayout.map((row, rowIndex) => (
                    <React.Fragment key={`row-${rowIndex}`}>
                        <div className="period-number-header">{rowIndex + 1}</div> {/* Número de periodo */}
                        {row.map((element, colIndex) => (
                            <ElementCard 
                                key={`${rowIndex}-${colIndex}-${element ? element.numeroAtomico : 'empty'}`} 
                                element={element} 
                                onClick={onElementClick} 
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>

            {/* Lantánidos y Actínidos (generalmente se muestran abajo) */}
            <div className="lanthanide-actinide-block">
                <div className="block-label">Lantánidos</div>
                <div className="lanthanides-row">
                    {lantanidos.map(element => (
                        <ElementCard key={element.numeroAtomico} element={element} onClick={onElementClick} />
                    ))}
                </div>
                <div className="block-label">Actínidos</div>
                <div className="actinides-row">
                    {actinidos.map(element => (
                        <ElementCard key={element.numeroAtomico} element={element} onClick={onElementClick} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PeriodicTable;