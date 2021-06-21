import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAVDJvfCwKh93rKI9jcSJD6plzRLhvWU-w",
  authDomain: "sistema-sii.firebaseapp.com",
  projectId: "sistema-sii",
  storageBucket: "sistema-sii.appspot.com",
  messagingSenderId: "629438710727",
  appId: "1:629438710727:web:b214e603f2ac8825d40fe2"
};

const fb = firebase.initializeApp(firebaseConfig);

export const fbAuth = fb.auth();

export const db = fb.firestore();