import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBgZFT_29ns9kM8yzSGss-V0OX1rbrf0Vg",
    authDomain: "fidelizcliedemo.firebaseapp.com",
    projectId: "fidelizcliedemo",
    storageBucket: "fidelizcliedemo.appspot.com",
    messagingSenderId: "834994961776",
    appId: "1:834994961776:web:cfb94842949a0a565323b5"
};

if (!firebase.apps.length) {
    // const app = initializeApp(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
}

export default firebase;


