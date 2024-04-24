
import * as firebase from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAIF6ig0x3S4ew9bOpG1Osmto0xRgNseH0",
    authDomain: "project-8268186441646603153.firebaseapp.com",
    projectId: "project-8268186441646603153",
    storageBucket: "project-8268186441646603153.appspot.com",
    messagingSenderId: "122414132117",
    appId: "1:122414132117:web:5b4d1c46fd00e59189e49c"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app);