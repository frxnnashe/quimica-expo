// src/pages/QuizPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, appId } from '../firebase'; // Importa el appId correcto desde firebase.js
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, limit, writeBatch } from 'firebase/firestore';
import '../styles/quizPage.css'; // Estilos para la página del quiz, incluyendo los de admin

const QuizPage = () => {
    // Obtener el appId correcto del contexto de autenticación
    const { currentUser, isTeacher, appId: authAppId, logout } = useAuth();

    // Estados para el modo de estudiante (quiz)
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [optionsDisabled, setOptionsDisabled] = useState(false);
    const [loadingQuestions, setLoadingQuestions] = useState(true);
    const [userName, setUserName] = useState('');
    const [showNameInput, setShowNameInput] = useState(false);
    const [savingScore, setSavingScore] = useState(false);
    const [scoreSavedMessage, setScoreSavedMessage] = useState('');

    // Estados para el modo de profesora (admin)
    const [newQuestion, setNewQuestion] = useState({ question: '', options: ['', ''], correctAnswer: '' });
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const [adminMessage, setAdminMessage] = useState('');

    // Estados para el Top de Puntuaciones (visible para todos)
    const [topScores, setTopScores] = useState([]);
    const [loadingScores, setLoadingScores] = useState(false);
    const [topScoresMessage, setTopScoresMessage] = useState('');

    // Referencias a las colecciones de Firestore, usando authAppId para asegurar consistencia
    const quizQuestionsCollectionRef = collection(db, `artifacts/${authAppId}/quizzes/mainQuiz/questions`);
    const topScoresCollectionRef = collection(db, `artifacts/${authAppId}/topScores`);

    // --- Funciones para el modo de Estudiante (Quiz) ---

    // Cargar preguntas de Firestore al inicio
    useEffect(() => {
        const getQuestions = async () => {
            setLoadingQuestions(true);
            try {
                const q = query(quizQuestionsCollectionRef);
                const data = await getDocs(q);
                const fetchedQuestions = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setQuestions(fetchedQuestions);
                console.log("Preguntas cargadas:", fetchedQuestions.length); // LOG: Cuántas preguntas se cargaron
            } catch (error) {
                console.error("Error al cargar preguntas del quiz:", error);
                setFeedback('Error al cargar las preguntas del quiz. Intenta recargar la página.');
            } finally {
                setLoadingQuestions(false);
            }
        };

        getQuestions();
        getTopScores(); // Cargar el top de puntuaciones al inicio también
    }, [authAppId]); // Dependencia de authAppId para recargar si cambia (aunque no debería en una app real)

    // Reiniciar el quiz para el estudiante
    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizFinished(false);
        setSelectedOption(null);
        setFeedback('');
        setOptionsDisabled(false);
        setUserName('');
        setShowNameInput(false);
        setSavingScore(false);
        setScoreSavedMessage('');
    };

    // Maneja la selección de una opción
    const handleOptionSelect = (option) => {
        if (optionsDisabled) return;

        setSelectedOption(option);
        setOptionsDisabled(true);

        const currentQuestion = questions[currentQuestionIndex];
        if (option === currentQuestion.correctAnswer) {
            setScore(score + 1);
            setFeedback('¡Correcto!');
        } else {
            setFeedback(`Incorrecto. La respuesta correcta era: ${currentQuestion.correctAnswer}`);
        }
    };

    // Maneja el botón "Siguiente Pregunta" o "Ver Resultados"
    const handleNextQuestion = () => {
        setSelectedOption(null);
        setFeedback('');
        setOptionsDisabled(false);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
            setShowNameInput(true); // Mostrar campo para el nombre al finalizar
        }
    };

    // Guardar la puntuación en Firestore
    const saveScore = async () => {
        if (!userName.trim()) {
            setScoreSavedMessage('Por favor, ingresa tu nombre.');
            return;
        }
        
        // currentUser siempre debería ser un objeto de usuario válido aquí (incluso anónimo)
        // gracias a la lógica en AuthContext.jsx
        console.log("saveScore - currentUser:", currentUser); // LOG: Muestra el currentUser antes de guardar

        setSavingScore(true);
        try {
            console.log("Guardando puntuación para el usuario UID:", currentUser); // LOG: UID del usuario
            await addDoc(topScoresCollectionRef, {
                userName: userName.trim(),
                score: score,
                timestamp: new Date(),
                userId: currentUser// Usar currentUser.uid directamente
            });
            setScoreSavedMessage('¡Puntuación guardada con éxito!');
            setShowNameInput(false);
            getTopScores(); // Recargar el top después de guardar una nueva puntuación
        } catch (error) {
            console.error("Error al guardar la puntuación:", error);
            setScoreSavedMessage(`Error al guardar la puntuación: ${error.message}.`); // Muestra el mensaje de error de Firebase
        } finally {
            setSavingScore(false);
        }
    };

    // --- Funciones para el modo de Profesora (Admin) ---

    // Obtener preguntas para el editor
    const getQuestionsForEditor = async () => {
        setLoadingQuestions(true); // Usamos el mismo loading para preguntas
        try {
            const data = await getDocs(quizQuestionsCollectionRef);
            const fetchedQuestions = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setQuestions(fetchedQuestions); // Actualiza las preguntas también para el editor
            console.log("Preguntas cargadas para editor:", fetchedQuestions.length);
        } catch (error) {
            console.error("Error al obtener preguntas para editor:", error);
            setAdminMessage('Error al cargar las preguntas para edición.');
        } finally {
            setLoadingQuestions(false);
        }
    };

    // Maneja el cambio en los campos del formulario de edición
    const handleEditorChange = (e) => {
        const { name, value } = e.target;
        setNewQuestion((prev) => ({ ...prev, [name]: value }));
    };

    // Maneja el cambio en las opciones del formulario de edición
    const handleEditorOptionChange = (index, value) => {
        const updatedOptions = [...newQuestion.options];
        updatedOptions[index] = value;
        setNewQuestion((prev) => ({ ...prev, options: updatedOptions }));
    };

    // Añadir una nueva opción
    const addOption = () => {
        if (newQuestion.options.length < 6) { // Máximo 6 opciones
            setNewQuestion((prev) => ({ ...prev, options: [...prev.options, ''] }));
        }
    };

    // Eliminar una opción
    const removeOption = (index) => {
        if (newQuestion.options.length > 2) { // Mínimo 2 opciones
            const updatedOptions = newQuestion.options.filter((_, i) => i !== index);
            setNewQuestion((prev) => ({ 
                ...prev, 
                options: updatedOptions,
                // Si la respuesta correcta era la opción eliminada, limpiarla
                correctAnswer: prev.correctAnswer === prev.options[index] ? '' : prev.correctAnswer
            }));
        }
    };

    // Añadir o actualizar una pregunta
    const handleQuestionSubmit = async (e) => {
        e.preventDefault();
        setAdminMessage('');

        if (!newQuestion.question || newQuestion.options.some(opt => !opt.trim()) || !newQuestion.correctAnswer) {
            setAdminMessage('Por favor, completa todos los campos de la pregunta.');
            return;
        }
        if (!newQuestion.options.includes(newQuestion.correctAnswer)) {
            setAdminMessage('La respuesta correcta debe ser una de las opciones.');
            return;
        }

        try {
            if (editingQuestionId) {
                const questionDoc = doc(db, `artifacts/${authAppId}/quizzes/mainQuiz/questions`, editingQuestionId);
                await updateDoc(questionDoc, newQuestion);
                setAdminMessage('Pregunta actualizada con éxito.');
            } else {
                await addDoc(quizQuestionsCollectionRef, newQuestion);
                setAdminMessage('Pregunta añadida con éxito.');
            }
            setNewQuestion({ question: '', options: ['', ''], correctAnswer: '' });
            setEditingQuestionId(null);
            getQuestionsForEditor(); // Recargar preguntas para el editor
        } catch (error) {
            console.error("Error al guardar pregunta:", error);
            setAdminMessage(`Error al guardar la pregunta: ${error.message}.`);
        }
    };

    // Editar una pregunta (carga en el formulario)
    const handleEditQuestion = (question) => {
        setNewQuestion({
            question: question.question,
            options: question.options,
            correctAnswer: question.correctAnswer
        });
        setEditingQuestionId(question.id);
        setAdminMessage('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Eliminar una pregunta
    const handleDeleteQuestion = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta pregunta?')) {
            try {
                const questionDoc = doc(db, `artifacts/${authAppId}/quizzes/mainQuiz/questions`, id);
                await deleteDoc(questionDoc);
                setAdminMessage('Pregunta eliminada con éxito.');
                getQuestionsForEditor();
            } catch (error) {
                console.error("Error al eliminar pregunta:", error);
                setAdminMessage(`Error al eliminar la pregunta: ${error.message}.`);
            }
        }
    };

    // Obtener las puntuaciones del top (para todos los modos)
    const getTopScores = async () => {
        setLoadingScores(true);
        setTopScoresMessage('');
        console.log("getTopScores - Cargando top de puntuaciones..."); // LOG: Inicio de carga del top
        try {
            const q = query(topScoresCollectionRef, orderBy("score", "desc"), orderBy("timestamp", "asc"), limit(10));
            const data = await getDocs(q);
            const fetchedScores = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setTopScores(fetchedScores);
            console.log("getTopScores - Puntuaciones cargadas:", fetchedScores.length); // LOG: Cuántas puntuaciones se cargaron
        } catch (error) {
            console.error("Error al obtener top puntuaciones:", error);
            setTopScoresMessage(`Error al cargar el top de puntuaciones: ${error.message}.`);
        } finally {
            setLoadingScores(false);
        }
    };

    // Reiniciar todas las puntuaciones (solo para profesoras)
    const handleResetScores = async () => {
        if (window.confirm('¿Estás seguro de que quieres reiniciar TODAS las puntuaciones? Esta acción es irreversible.')) {
            setTopScoresMessage('Reiniciando puntuaciones...');
            try {
                const batch = writeBatch(db);
                const querySnapshot = await getDocs(topScoresCollectionRef);
                querySnapshot.forEach((docSnap) => {
                    batch.delete(docSnap.ref);
                });
                await batch.commit();
                setTopScoresMessage('Puntuaciones reiniciadas con éxito.');
                getTopScores(); // Recargar el top después de reiniciar
            } catch (error) {
                console.error("Error al reiniciar puntuaciones:", error);
                setTopScoresMessage(`Error al reiniciar las puntuaciones: ${error.message}.`);
            }
        }
    };

    // --- Renderizado Condicional ---

    // Contenido para el modo de profesora
    const renderAdminContent = () => {
        // Cargar preguntas al renderizar el admin por primera vez
        useEffect(() => {
            getQuestionsForEditor();
        }, []);

        return (
            <div className="admin-dashboard">
                <h1>Panel de Profesora</h1>
                {currentUser && <p className="welcome-message">Bienvenida, {currentUser.email}!</p>}

                <div className="admin-controls">
                    <button className="logout-button" onClick={() => { logout(); window.location.reload(); }}>Cerrar Sesión</button>
                </div>

                {adminMessage && <p className={`admin-message ${adminMessage.includes('Error') ? 'error' : 'success'}`}>{adminMessage}</p>}

                <div className="quiz-editor-section">
                    <div className="editor-form-card">
                        <h2>{editingQuestionId ? 'Editar Pregunta' : 'Añadir Nueva Pregunta'}</h2>
                        <form onSubmit={handleQuestionSubmit}>
                            <div className="form-group">
                                <label htmlFor="question">Pregunta:</label>
                                <textarea
                                    id="question"
                                    name="question"
                                    value={newQuestion.question}
                                    onChange={handleEditorChange}
                                    required
                                />
                            </div>
                            {newQuestion.options.map((option, index) => (
                                <div className="form-group option-group" key={index}>
                                    <label htmlFor={`option-${index}`}>Opción {index + 1}:</label>
                                    <div className="option-input-container">
                                        <input
                                            type="text"
                                            id={`option-${index}`}
                                            value={option}
                                            onChange={(e) => handleEditorOptionChange(index, e.target.value)}
                                            required
                                        />
                                        {newQuestion.options.length > 2 && (
                                            <button 
                                                type="button" 
                                                className="remove-option-button" 
                                                onClick={() => removeOption(index)}
                                                title="Eliminar opción"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {newQuestion.options.length < 6 && (
                                <button 
                                    type="button" 
                                    className="add-option-button" 
                                    onClick={addOption}
                                >
                                    + Añadir Opción
                                </button>
                            )}
                            <div className="form-group">
                                <label htmlFor="correctAnswer">Respuesta Correcta (debe coincidir con una opción):</label>
                                <input
                                    type="text"
                                    id="correctAnswer"
                                    name="correctAnswer"
                                    value={newQuestion.correctAnswer}
                                    onChange={handleEditorChange}
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="submit-button">
                                    {editingQuestionId ? 'Actualizar Pregunta' : 'Añadir Pregunta'}
                                </button>
                                {editingQuestionId && (
                                    <button type="button" className="cancel-button" onClick={() => {
                                        setEditingQuestionId(null);
                                        setNewQuestion({ question: '', options: ['', ''], correctAnswer: '' });
                                        setAdminMessage('');
                                    }}>
                                        Cancelar Edición
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="questions-list-card">
                        <h2>Preguntas Actuales</h2>
                        {loadingQuestions ? (
                             <div className="loading-spinner-small"></div>
                        ) : questions.length === 0 ? (
                            <p>No hay preguntas en la encuesta. ¡Añade algunas!</p>
                        ) : (
                            <ul className="questions-list">
                                {questions.map((q) => (
                                    <li key={q.id} className="question-item">
                                        <p className="question-text-display">{q.question}</p>
                                        <ul className="options-display">
                                            {q.options.map((opt, idx) => (
                                                <li key={idx} className={opt === q.correctAnswer ? 'correct-option' : ''}>
                                                    {opt} {opt === q.correctAnswer && '(Correcta)'}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="question-actions">
                                            <button className="edit-button" onClick={() => handleEditQuestion(q)}>Editar</button>
                                            <button className="delete-button" onClick={() => handleDeleteQuestion(q.id)}>Eliminar</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Sección de Top de Puntuaciones para administrador */}
                <div className="top-scores-admin-section">
                    <h2>Top 10 Puntuaciones</h2>
                    {topScoresMessage && <p className={`info-message ${topScoresMessage.includes('Error') ? 'error' : 'success'}`}>{topScoresMessage}</p>}

                    {loadingScores ? (
                        <div className="loading-spinner-small"></div>
                    ) : topScores.length === 0 ? (
                        <p>Aún no hay puntuaciones en el top.</p>
                    ) : (
                        <ul className="scores-list">
                            {topScores.map((scoreEntry, index) => (
                                <li key={scoreEntry.id} className="score-item">
                                    <span className="score-rank">#{index + 1}</span>
                                    <span className="score-name">{scoreEntry.userName}</span>
                                    <span className="score-value">{scoreEntry.score} puntos</span>
                                    <span className="score-date">
                                        {scoreEntry.timestamp?.toDate().toLocaleDateString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button className="reset-scores-button" onClick={handleResetScores}>
                        Reiniciar Todas las Puntuaciones
                    </button>
                </div>
            </div>
        );
    };

    // Contenido para el modo de estudiante
    const renderQuizContent = () => {
        if (loadingQuestions) {
            return (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Cargando preguntas del quiz...</p>
                </div>
            );
        }
        if (questions.length === 0) {
            return (
                <div className="quiz-page-container">
                    <h1>Encuesta de Química</h1>
                    <p>No hay preguntas disponibles en este momento. Por favor, inténtalo más tarde o contacta al administrador.</p>
                </div>
            );
        }

        const currentQuestion = questions[currentQuestionIndex];

        return (
            <div className="quiz-card">
                <p className="question-counter">Pregunta {currentQuestionIndex + 1} de {questions.length}</p>
                <h2 className="question-text">{currentQuestion.question}</h2>
                <div className="options-container">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            className={`option-button
                                ${selectedOption === option ? 'selected' : ''}
                                ${optionsDisabled && option === currentQuestion.correctAnswer ? 'correct' : ''}
                                ${optionsDisabled && selectedOption === option && option !== currentQuestion.correctAnswer ? 'incorrect' : ''}
                            `}
                            onClick={() => handleOptionSelect(option)}
                            disabled={optionsDisabled}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {feedback && (
                    <p className={`feedback-text ${feedback.includes('Correcto') ? 'feedback-correct' : 'feedback-incorrect'}`}>
                        {feedback}
                    </p>
                )}
                <button
                    className="next-button"
                    onClick={handleNextQuestion}
                    disabled={!optionsDisabled}
                >
                    {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                </button>
            </div>
        );
    };

    // Contenido para los resultados del quiz
    const renderQuizResults = () => {
        return (
            <div className="quiz-results">
                <h2>¡Quiz Terminado!</h2>
                <p className="final-score">Tu puntuación final es: {score} de {questions.length}</p>
                <div className="score-summary">
                    {score >= questions.length * 0.7 ? (
                        <p className="score-message success-message">¡Excelente trabajo! Tienes un gran conocimiento de química.</p>
                    ) : score >= questions.length * 0.4 ? (
                        <p className="score-message warning-message">¡Buen intento! Sigue practicando para mejorar.</p>
                    ) : (
                        <p className="score-message error-message">¡Sigue estudiando! Hay mucho más por aprender.</p>
                    )}
                </div>

                {showNameInput && (
                    <div className="name-input-section">
                        <input
                            type="text"
                            placeholder="Ingresa tu nombre para el ranking"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            disabled={savingScore || scoreSavedMessage.includes('éxito')}
                        />
                        <button onClick={saveScore} disabled={savingScore || scoreSavedMessage.includes('éxito')}>
                            {savingScore ? 'Guardando...' : 'Guardar Puntuación'}
                        </button>
                        {scoreSavedMessage && <p className="score-saved-message">{scoreSavedMessage}</p>}
                    </div>
                )}

                <button className="restart-button" onClick={resetQuiz}>
                    Reiniciar Quiz
                </button>
            </div>
        );
    };

    // Contenido para el Top de Puntuaciones (visible solo para estudiantes)
    const renderTopScoresSection = () => {
        return (
            <div className="top-scores-public-section">
                <h2>Top 10 Puntuaciones</h2>
                {topScoresMessage && <p className={`info-message ${topScoresMessage.includes('Error') ? 'error' : 'success'}`}>{topScoresMessage}</p>}

                {loadingScores ? (
                    <div className="loading-spinner-small"></div>
                ) : topScores.length === 0 ? (
                    <p>Aún no hay puntuaciones en el top. ¡Sé el primero en jugar!</p>
                ) : (
                    <ul className="scores-list">
                        {topScores.map((scoreEntry, index) => (
                            <li key={scoreEntry.id} className="score-item">
                                <span className="score-rank">#{index + 1}</span>
                                <span className="score-name">{scoreEntry.userName}</span>
                                <span className="score-value">{scoreEntry.score} puntos</span>
                                <span className="score-date">
                                    {scoreEntry.timestamp?.toDate().toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    return (
        <div className="quiz-page-container">
            {/* Si es profesor, mostrar solo el panel de administración */}
            {isTeacher ? (
                renderAdminContent()
            ) : (
                <>
                    {/* Si es estudiante, mostrar el quiz o resultados */}
                    {quizFinished ? renderQuizResults() : renderQuizContent()}
                    {/* El top de puntuaciones solo visible para estudiantes */}
                    {renderTopScoresSection()}
                </>
            )}
        </div>
    );
};

export default QuizPage;