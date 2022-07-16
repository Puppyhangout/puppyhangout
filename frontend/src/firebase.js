import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue,set} from "firebase/database";
//https://modularfirebase.web.app/common-use-cases/database/
const firebaseConfig = {
  apiKey: "AIzaSyCpwcq-RMwS6sYhep2xjGG4WVTdg4X0H1I",
  authDomain: "puppyhangout-9cde0.firebaseapp.com",
  databaseURL: "https://puppyhangout-9cde0-default-rtdb.firebaseio.com",
  projectId: "puppyhangout-9cde0",
  storageBucket: "puppyhangout-9cde0.appspot.com",
  messagingSenderId: "738849121261",
  appId: "1:738849121261:web:68b62993abc12b1fa8fde4",
  measurementId: "G-MTT32V7L74"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();

const database = getDatabase(firebaseApp);
// if (location.hostname === "localhost") {
//   // Point to the RTDB emulator running on localhost.
//   useDatabaseEmulator(database, "localhost", 3001);
// } 

//i deleted 'default'
// export default firebaseApp;
// export default database;
export {database, auth,ref,set,createUserWithEmailAndPassword,firebaseApp,onAuthStateChanged};