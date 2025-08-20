// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeFirebase, auth, db, appId } from '../firebase'; // Importa el appId correcto
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, signInAnonymously as firebaseSignInAnonymously } from 'firebase/auth'; // Renombrado para evitar conflicto
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isTeacher, setIsTeacher] = useState(false);
    const [loading, setLoading] = useState(true); // Inicialmente en true

    useEffect(() => {
        let unsubscribeAuth = () => {}; // Para limpiar el listener

        const initAuth = async () => {
            try {
                // Paso 1: Asegura que Firebase esté inicializado y obtén las instancias
                // Esto es crucial para que 'auth' y 'db' estén definidos.
                const { auth: firebaseAuthInstance, db: firestoreDbInstance } = await initializeFirebase();

                // Paso 2: Suscribirse a los cambios de estado de autenticación
                unsubscribeAuth = onAuthStateChanged(firebaseAuthInstance, async (user) => {
                    console.log("onAuthStateChanged - User:", user ? user.uid : 'null'); // LOG: Muestra el UID o 'null'
                    setCurrentUser(user);

                    if (user) {
                        // Si hay un usuario (logueado o anónimo), verifica si es profesora
                        const teacherDocRef = doc(firestoreDbInstance, `artifacts/${appId}/teachers`, user.uid);
                        try {
                            const teacherDoc = await getDoc(teacherDocRef);
                            setIsTeacher(teacherDoc.exists());
                            console.log("onAuthStateChanged - Es profesora:", teacherDoc.exists());
                        } catch (error) {
                            console.error("Error al verificar rol de profesora:", error);
                            setIsTeacher(false);
                        }
                    } else {
                        // Si no hay ningún usuario (ni siquiera anónimo), intenta iniciar sesión anónimamente
                        console.log("onAuthStateChanged - No hay usuario, intentando signInAnonymously...");
                        try {
                            await firebaseSignInAnonymously(firebaseAuthInstance);
                            console.log("onAuthStateChanged - signInAnonymously exitoso.");
                            // El onAuthStateChanged se disparará de nuevo con el usuario anónimo
                        } catch (anonError) {
                            console.error("onAuthStateChanged - Error al iniciar sesión anónimamente:", anonError);
                            // Si falla la autenticación anónima, la aplicación no podrá interactuar con Firestore.
                            // Podrías mostrar un mensaje de error persistente al usuario.
                        }
                        setIsTeacher(false); // No es profesora si no hay usuario o es anónimo
                    }
                    setLoading(false); // La carga inicial ha terminado una vez que el estado de auth se ha resuelto
                });

            } catch (error) {
                console.error("Error crítico al inicializar Firebase o configurar listener:", error);
                setLoading(false); // Asegura que la aplicación no se quede en estado de carga infinito
            }
        };

        initAuth();

        // Función de limpieza para el useEffect
        return () => {
            unsubscribeAuth();
        };
    }, []); // Se ejecuta solo una vez al montar el componente

    const loginTeacher = async (email, password) => {
        setLoading(true); // Inicia carga para la operación de login
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const teacherDocRef = doc(db, `artifacts/${appId}/teachers`, user.uid);
            const teacherDoc = await getDoc(teacherDocRef);

            if (teacherDoc.exists()) {
                console.log("Profesora logueada con éxito.");
                return { success: true };
            } else {
                // Si no es una profesora, desloguear inmediatamente
                await signOut(auth);
                console.log("Intento de login fallido: El usuario no es una profesora.");
                return { success: false, error: "Credenciales no válidas para el acceso de profesora." };
            }
        } catch (error) {
            console.error("Error al iniciar sesión como profesora:", error);
            let errorMessage = "Error al iniciar sesión. Por favor, verifica tus credenciales.";
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = "Correo o contraseña incorrectos.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Formato de correo electrónico inválido.";
            }
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false); // Termina carga después de la operación de login
        }
    };

    const logout = async () => {
        setLoading(true); // Inicia carga para la operación de logout
        try {
            await signOut(auth);
            console.log("Sesión cerrada.");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            setLoading(false); // Termina carga después de la operación de logout
        }
    };

    const value = {
        currentUser,
        isTeacher,
        loading,
        loginTeacher,
        logout,
        appId
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Solo renderiza los hijos cuando la autenticación ha terminado de cargar */}
            {!loading && children}
            {/* Muestra un overlay de carga mientras se inicializa la autenticación */}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Cargando...</p>
                </div>
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
