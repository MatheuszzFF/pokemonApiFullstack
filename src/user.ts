// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";




const auth = getAuth();
function createUser(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
}
export function initFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyBBmCiFNlDm5x2y4QRM9r1iXsXj430YEtU",
        authDomain: "pokemonfullstack.firebaseapp.com",
        projectId: "pokemonfullstack",
        storageBucket: "pokemonfullstack.appspot.com",
        messagingSenderId: "503211643879",
        appId: "1:503211643879:web:c108ade179e11f272be342",
        measurementId: "G-9BGMHLYB63"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      console.log(auth)
}