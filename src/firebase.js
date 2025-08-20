// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Credenciales de Firebase proporcionadas directamente
const firebaseConfig = {
    apiKey: "AIzaSyDdJPwsehu5SCh-ToqBkd0orY4g5v5Nc5M",
    authDomain: "quimicaapp-ca916.firebaseapp.com",
    projectId: "quimicaapp-ca916", // Este es el ID del proyecto de Firebase
    storageBucket: "quimicaapp-ca916.firebasestorage.app",
    messagingSenderId: "230969995356",
    appId: "1:230969995356:web:d373f15e36938b5f613699", // Este es el ID de la web app de Firebase
    measurementId: "G-EPCQK79C25"
};

// Usamos firebaseConfig.projectId para la variable appId que construye las rutas de Firestore.
// Esto DEBE coincidir con el $(appId) utilizado en las reglas de seguridad de Firestore.
const firestoreAppId = firebaseConfig.projectId;

// La variable __app_id del entorno de Canvas es generalmente para uso interno de Canvas,
// no para construir rutas de Firestore vinculadas al ID del proyecto de Firebase.
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;


console.log("Firebase Config utilizada:", firebaseConfig);
console.log("Firestore App ID (Project ID) utilizada:", firestoreAppId);
console.log("Initial Auth Token utilizada:", initialAuthToken);


let appInstance; // Renombrado para evitar conflicto con la exportación
let authInstance; // Renombrado
let dbInstance; // Renombrado

// Función para inicializar Firebase
const initializeFirebase = async () => {
    if (!appInstance) { // Usar appInstance
        try {
            appInstance = initializeApp(firebaseConfig);
            authInstance = getAuth(appInstance);
            dbInstance = getFirestore(appInstance);
            console.log("Firebase: Instancias de App, Auth, Firestore inicializadas.");
        } catch (error) {
            console.error("Error al inicializar Firebase:", error);
            // No intentar signInAnonymously aquí, AuthContext lo manejará.
        }
    }
    // Retornar las instancias para que AuthContext las use
    return { app: appInstance, auth: authInstance, db: dbInstance, appId: firestoreAppId };
};

// Exportar las instancias para usarlas en otros lugares
// Asegúrate de que estas exportaciones siempre devuelvan las instancias ya inicializadas.
// Si son accedidas antes de initializeFirebase() se completó, serán undefined.
// AuthContext se encargará de esperar por initializeFirebase().
export { initializeFirebase, authInstance as auth, dbInstance as db, firestoreAppId as appId };
