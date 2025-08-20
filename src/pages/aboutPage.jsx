import React from 'react';
import styled from 'styled-components';


const AboutPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Ajusta la altura para dejar espacio a la navbar */
  min-height: calc(100vh - 80px);
  padding: 20px;
  text-align: center;
  background-color: #1a1a1a; /* Fondo oscuro */
  color: #f0f0f0; /* Color de texto claro */
  font-family: 'Inter', sans-serif;

  h1 {
    font-size: 3em;
    color: #64b5f6; /* Azul claro para el título */
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2em;
    color: #cccccc; /* Gris claro para el párrafo */
    max-width: 600px;
  }
`;

const AboutPage = () => {
    return (
        <AboutPageContainer>
            <h1>Acerca de este Juego</h1>
            <p>Este es un juego de química interactivo diseñado para hacer el aprendizaje divertido y atractivo.</p>
            <p>Explora el mundo de los elementos, los enlaces químicos y las reacciones de una manera única, pudiendo ver la tabla periodica y seleccionar los elementos para formar los enlaces y brindandonos una descripcion del tipo de enlace que forma .</p>
            <p>Desarrollado con React, Vite y JavaScript por los alumnos de 6toC con mucho amor por la ciencia.</p>
        </AboutPageContainer>
    );
};

export default AboutPage;
