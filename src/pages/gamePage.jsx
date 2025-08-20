import React, { useState, useEffect } from "react";
import { elementosQuimicos } from "../data/elementosQuimicos";
import { compuestosQuimicos } from "../data/compuestosQuimicos";
import "../styles/gamePage.css"; // Estilos para la página del juego

const GamePage = () => {
  // Estado para almacenar los elementos seleccionados por el usuario
  const [selectedElements, setSelectedElements] = useState([]);
  // Estado para almacenar el compuesto formado o el mensaje de error
  const [formedCompound, setFormedCompound] = useState(null);
  // Estado para el mensaje de retroalimentación al usuario
  const [feedbackMessage, setFeedbackMessage] = useState("");
  // Estado para controlar la visibilidad del mensaje de retroalimentación
  const [showMessage, setShowMessage] = useState(false);

  // Función para añadir un elemento a la selección (permite duplicados)
  const addElementToSelection = (element) => {
    setFormedCompound(null); // Limpiar el compuesto anterior al seleccionar nuevos elementos
    setFeedbackMessage(""); // Limpiar el mensaje de retroalimentación
    setShowMessage(false);
    setSelectedElements([...selectedElements, element]);
  };

  // Función para eliminar un elemento de la selección por su índice
  const removeElementFromSelection = (indexToRemove) => {
    setFormedCompound(null); // Limpiar el compuesto anterior al modificar la selección
    setFeedbackMessage(""); // Limpiar el mensaje de retroalimentación
    setShowMessage(false);
    const newSelectedElements = selectedElements.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedElements(newSelectedElements);
  };

  // Función para intentar formar un compuesto
  const formCompound = () => {
    if (selectedElements.length === 0) {
      setFeedbackMessage(
        "Selecciona al menos un elemento para formar un compuesto."
      );
      setShowMessage(true);
      return;
    }

    // Contar la frecuencia de cada elemento seleccionado
    const selectedElementsCount = selectedElements.reduce((acc, el) => {
      acc[el.abreviacion] = (acc[el.abreviacion] || 0) + 1;
      return acc;
    }, {});

    let compoundFound = null;

    // Iterar sobre los compuestos conocidos para ver si hay una coincidencia
    for (const compound of compuestosQuimicos) {
      const requiredElements = compound.elementosNecesarios;

      // Verificar si la cantidad de tipos de elementos seleccionados coincide con la cantidad de tipos requeridos
      const numSelectedTypes = Object.keys(selectedElementsCount).length;
      const numRequiredTypes = Object.keys(requiredElements).length;

      // Si el número total de elementos seleccionados no coincide con el total requerido, no es una coincidencia
      const totalSelected = Object.values(selectedElementsCount).reduce(
        (sum, count) => sum + count,
        0
      );
      const totalRequired = Object.values(requiredElements).reduce(
        (sum, count) => sum + count,
        0
      );

      if (totalSelected !== totalRequired) {
        continue;
      }

      let match = true;
      for (const abbr in requiredElements) {
        // Si un elemento requerido no está en la selección o la cantidad no coincide
        if (selectedElementsCount[abbr] !== requiredElements[abbr]) {
          match = false;
          break;
        }
      }

      if (match) {
        compoundFound = compound;
        break;
      }
    }

    if (compoundFound) {
      setFormedCompound(compoundFound);
      setFeedbackMessage(
        `¡Felicidades! Has formado: ${compoundFound.nombre} (${compoundFound.formula})`
      );
      setShowMessage(true);
    } else {
      setFormedCompound(null);
      setFeedbackMessage(
        "No se pudo formar un compuesto conocido con los elementos seleccionados. ¡Intenta otra combinación!"
      );
      setShowMessage(true);
    }
    // Limpiar la selección después de intentar formar un compuesto
    setSelectedElements([]);
  };

  // Efecto para ocultar el mensaje de retroalimentación después de un tiempo
  useEffect(() => {
    let timer;
    if (showMessage) {
      timer = setTimeout(() => {
        setShowMessage(false);
        setFeedbackMessage("");
      }, 5000); // El mensaje desaparecerá después de 5 segundos
    }
    return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta o el mensaje cambia
  }, [showMessage]);

  // Función para renderizar la tabla periódica
  const renderPeriodicTable = () => {
    // Creamos una estructura de grid para la tabla periódica
    const tableGrid = [];
    // Las filas y columnas están predefinidas para simular la tabla periódica real
    const maxRows = 7; // Periodos
    const maxCols = 18; // Grupos

    // Inicializar un array 2D para la tabla periódica con nulls
    const periodicTableLayout = Array(maxRows)
      .fill(null)
      .map(() => Array(maxCols).fill(null));

    // Colocar los elementos en sus posiciones correctas en el layout
    elementosQuimicos.forEach((element) => {
      // Ajustar los índices para que coincidan con el array (0-indexed)
      const row = element.periodo - 1;
      const col = element.grupo - 1;

      // Para una tabla periódica visualmente precisa, se necesitaría un layout más complejo
      // para lantánidos y actínidos. Por ahora, los colocamos en su grupo/periodo.
      if (row < maxRows && col < maxCols) {
        periodicTableLayout[row][col] = element;
      }
    });

    // Renderizar el grid
    for (let r = 0; r < maxRows; r++) {
      for (let c = 0; c < maxCols; c++) {
        const element = periodicTableLayout[r][c];
        // Determinar si el elemento actual está en la lista de seleccionados para el estilo visual
        const isSelected = selectedElements.some(
          (el) => el.numeroAtomico === (element ? element.numeroAtomico : null)
        );

        if (element) {
          tableGrid.push(
            <div
              key={element.numeroAtomico}
              className={`element-tile ${isSelected ? "selected" : ""}`}
              style={{
                gridRow: element.periodo, // Usar directamente el periodo para la fila
                gridColumn: element.grupo, // Usar directamente el grupo para la columna
                backgroundColor: element.color || "#f0f0f0", // Usar el color del elemento
              }}
              onClick={() => addElementToSelection(element)} // Llama a la nueva función de añadir
            >
              <span className="atomic-number">{element.numeroAtomico}</span>
              <span className="abbreviation">{element.abreviacion}</span>
              <span className="element-name">{element.nombre}</span>
            </div>
          );
        } else {
          // Añadir celdas vacías para mantener la estructura del grid
          tableGrid.push(
            <div
              key={`empty-${r}-${c}`}
              className="empty-tile"
              style={{
                gridRow: r + 1,
                gridColumn: c + 1,
              }}
            ></div>
          );
        }
      }
    }
    return tableGrid;
  };

  return (
    <div className="game-page-container">
      <h1>¡Crea Compuestos Químicos!</h1>
      <p>
        Selecciona elementos de la tabla periódica (puedes seleccionar el mismo
        varias veces) y luego haz clic en "Formar Compuesto".
      </p>

      <div className="selected-elements-display">
        <h2>Elementos Seleccionados:</h2>
        <div className="selected-elements-list">
          {selectedElements.length > 0 ? (
            selectedElements.map(
              (
                el,
                index // Pasa el índice para la eliminación
              ) => (
                <div key={index} className="selected-element-tag">
                  {" "}
                  {/* Usa el índice como key temporal */}
                  {el.abreviacion}
                  <button
                    className="remove-element-button"
                    onClick={() => removeElementFromSelection(index)} // Llama a la nueva función de eliminar
                  >
                    &times;
                  </button>
                </div>
              )
            )
          ) : (
            <p>No has seleccionado ningún elemento.</p>
          )}
        </div>
        <button className="form-compound-button" onClick={formCompound}>
          Formar Compuesto
        </button>
      </div>

      {showMessage && (
        <div
          className={`feedback-message ${formedCompound ? "success" : "error"}`}
        >
          {feedbackMessage}
        </div>
      )}

      {formedCompound && (
        <div className="formed-compound-display">
          <h2>Compuesto Formado:</h2>
          <div className="compound-card">
            <span className="compound-formula">{formedCompound.formula}</span>
            <span className="compound-name">{formedCompound.nombre}</span>
            <span className="compound-bond-type">
              Tipo de Enlace: {formedCompound.tipoEnlace}
            </span>
            <span className="compound-bond-details">
              Detalles: {formedCompound.detallesEnlace}
            </span>
          </div>
        </div>
      )}

      <div className="periodic-table-scroll-wrapper">
        <div className="periodic-table-scroll-inner">
          <div className="periodic-table-grid">{renderPeriodicTable()}</div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
