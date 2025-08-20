import React from 'react';
import '../styles/homePage.css'; // Mantener el CSS puro para esta página

const HomePage = () => {
    // URL base y parámetros para el modelo de Sketchfab
    const sketchfabEmbedUrl = "https://sketchfab.com/models/648df9d0f53d4e9db5149e6a7b0fada6/embed";
    const cleanEmbedParams = "?autostart=1&controls=0&ui_infos=0&ui_fadeout=1&ui_hint=0&transparent=1";

    return (
        <div className="home-page">
            {/* Título con animación de aparición */}
            <h1 className="fade-in-up">Bienvenido al Juego de Química</h1>
            {/* Párrafo con animación de aparición y un pequeño retraso */}
            <p className="fade-in-up delay-1">¡Explora los elementos y aprende sobre los enlaces químicos!</p>

            {/* Contenedor 3D con animación de escala */}
            <div className="atom-3d-container scale-in">
                <div className="sketchfab-embed-wrapper">
                    <iframe
                        title="Stylized atom"
                        frameBorder="0"
                        allowFullScreen
                        mozallowfullscreen="true"
                        webkitallowfullscreen="true"
                        allow="autoplay; fullscreen; xr-spatial-tracking"
                        xr-spatial-tracking
                        execution-while-out-of-viewport
                        execution-while-not-rendered
                        web-share
                        src={`${sketchfabEmbedUrl}${cleanEmbedParams}`}
                    >
                    </iframe>
                </div>
            </div>

            {/* Botón con animación de pulsación */}
            <button className="start-game-button pulse-animation" >Comenzar Juego</button>
        </div>
    );
};

export default HomePage;
