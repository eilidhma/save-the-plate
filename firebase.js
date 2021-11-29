import * as firebase from "firebase";
import "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA6WZ_rlulhSrphE3Z9ue1WJJSnHr2jy8",
  authDomain: "savetheplate-b3a0f.firebaseapp.com",
  projectId: "savetheplate-b3a0f",
  storageBucket: "savetheplate-b3a0f.appspot.com",
  messagingSenderId: "606410475769",
  appId: "1:606410475769:web:bf8677dfc208ec93c33a28",
  measurementId: "G-0NYZE82XSN"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

//const auth = firebase.auth()
export const storage = app.storage()
export const fireDB = app.firestore();
export const auth = app.auth();
export default app;