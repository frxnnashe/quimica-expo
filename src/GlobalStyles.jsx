import { createGlobalStyle } from 'styled-components';

// Importa la fuente Inter de Google Fonts
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

  html {
    background-color: #1a1a1a; /* Asegura que el fondo de todo el documento sea oscuro */
    margin: 0 !important; /* ¡Fuerza la eliminación del margen predeterminado del navegador! */
    padding: 0 !important; /* ¡Fuerza la eliminación del padding predeterminado del navegador! */
    height: 100%;
    box-sizing: border-box; /* Incluye padding y borde en el tamaño total del elemento */
  }

  body {
    margin: 0 !important; /* ¡Fuerza la eliminación del margen predeterminado del navegador! */
    padding: 0 !important; /* ¡Fuerza la eliminación del padding predeterminado del navegador! */
    height: 100%;
    font-family: 'Inter', sans-serif; /* Aplica la fuente Inter */
    background-color: #1a1a1a; /* Fondo oscuro principal */
    color: #f0f0f0; /* Color de texto principal claro */
    overflow-x: hidden; /* Evita el desplazamiento horizontal */
    box-sizing: border-box; /* Incluye padding y borde en el tamaño total del elemento */
  }

  #root {
    height: 100%; /* Asegura que el div root ocupe toda la altura */
  }
`;

export default GlobalStyles;
