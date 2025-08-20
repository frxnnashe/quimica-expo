import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import GamePage from './pages/gamePage';
import AboutPage from './pages/aboutPage';
import QuizPage from './pages/QuizPage'; // Esta página ahora maneja todo lo del quiz y admin
import LoginPage from './pages/LoginPage';

import { AuthProvider } from './context/AuthContext'; // Solo necesitamos el AuthProvider
import StyledNavBar from './components/StyledNavbar';
import GlobalStyles from './GlobalStyles';
import './styles/reset.css';
import './styles/app.css';

const App = () => {
    return (
        <Router>
            <GlobalStyles />
            <AuthProvider> {/* Envuelve toda la aplicación con el AuthProvider */}
                <div className="app-container">
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/game" element={<GamePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/quiz" element={<QuizPage />} /> {/* La página central del quiz */}
                            <Route path="/login" element={<LoginPage />} /> {/* Página de login para profesoras */}
                            {/* Las rutas /quiz-editor y /top-scores ya no son necesarias como rutas separadas */}
                        </Routes>
                    </div>
                    <StyledNavBar />
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;
