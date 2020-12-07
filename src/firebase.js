// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyAR8qaU_YaUNQt5rPduUVYh26B2uylLpqs",
    authDomain: "whatsapp-clone-by-jayanth.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-by-jayanth.firebaseio.com",
    projectId: "whatsapp-clone-by-jayanth",
    storageBucket: "whatsapp-clone-by-jayanth.appspot.com",
    messagingSenderId: "251280842316",
    appId: "1:251280842316:web:4835bb9c8549ffe79bdee9",
    measurementId: "G-DBZCMHJQB4"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;