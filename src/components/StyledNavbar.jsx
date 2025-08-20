import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navBar.css'; // Importa el archivo CSS para el navbar

const StyledNavBar = () => {
  return (
    <div className="navbar-container"> {/* Contenedor principal para los estilos */}
      <div className="button-container">
        {/* Enlace a la página de inicio (icono de casa) */}
        <Link to="/" className="button">
          <svg className="icon" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
          </svg>
        </Link>
        {/* Enlace a la página del juego (icono de joystick) */}
        <Link to="/game" className="button">
          <svg className="icon" stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2m8 0h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2m-4 6H8a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2m8 0h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2m-4-4h4V8h-4v4Z"/>
          </svg>
        </Link>
        {/* Enlace a la página de la Encuesta (icono de pregunta) */}
        <Link to="/quiz" className="button">
          <svg className="icon" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 15.5V16c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2v-.5c0-.85.34-1.66 1.05-2.26L12 10.5c.59-.52.95-1.28.95-2.09 0-1.39-1.11-2.5-2.5-2.5-1.39 0-2.5 1.11-2.5 2.5H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.82 3.08-2.05 3.94L13 14.24V15.5h2zm-3 6.5c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
        </Link>
        {/* Enlace para el inicio de sesión de profesora (icono de persona) */}
        <Link to="/login" className="button">
          <svg className="icon" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </Link>
        {/* Enlace a la página "Acerca de" (icono de información) */}
        <Link to="/about" className="button">
          <svg className="icon" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default StyledNavBar;
