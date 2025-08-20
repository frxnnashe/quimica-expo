// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/loginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginTeacher, isTeacher, loading } = useAuth();
    const navigate = useNavigate();

    // Redirigir si ya está logueado y es profesora
    useEffect(() => {
        if (!loading && isTeacher) {
            navigate('/quiz'); // Redirige a la página del quiz (donde ahora está el editor)
        }
    }, [isTeacher, loading, navigate]); // Dependencias para que se ejecute cuando cambien

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await loginTeacher(email, password);
        if (!result.success) {
            setError(result.error);
        }
        // La redirección después del login exitoso ahora es manejada por el useEffect
    };

    return (
        <div className="login-page-container">
            <h1>Iniciar Sesión (Profesora)</h1>
            <div className="login-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="profesora@ejemplo.com"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="********"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
