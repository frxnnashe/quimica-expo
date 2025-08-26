import React from 'react';
import '../styles/aboutPage.css'; // Asegúrate de importar tu archivo CSS

const AboutPage = () => {
    return (
        <div className="about-page">
            <div className="logo-container">
                <img src="/img/logo_informatica.png" alt="Logo del juego" className="about-logo" />
            </div>
            <h1>Acerca de este Juego</h1>
            <p>Este es un juego de química interactivo diseñado para hacer el aprendizaje divertido y atractivo.</p>
            <p>Explora el mundo de los elementos, los enlaces químicos y las reacciones de una manera única, pudiendo ver la tabla periodica y seleccionar los elementos para formar los enlaces y brindandonos una descripcion del tipo de enlace que forma.</p>
            <div className="credits">
                <h3>Créditos</h3>
                <p><strong>Desarrollado con React, Vite y JavaScript por el alumno Francisco Rocchia junto al profesor Luciano Lugani y la profesora Darly Villalobos con mucho amor por la ciencia.</strong></p>
            </div>
        </div>
    );
};

export default AboutPage;