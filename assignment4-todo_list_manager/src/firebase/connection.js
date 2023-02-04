// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACAg0IU-laXhVuFQaI-bcjQER8MdUtrkw",
    authDomain: "mytodoapp-98c4e.firebaseapp.com",
    projectId: "mytodoapp-98c4e",
    storageBucket: "mytodoapp-98c4e.appspot.com",
    messagingSenderId: "518526987629",
    appId: "1:518526987629:web:d9c286bda65e8698d97e64",
    databaseURL: "https://mytodoapp-98c4e-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const firestore = getFirestore(app);
export default app;
