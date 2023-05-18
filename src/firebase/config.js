import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD3bDV08SFD0ChXhAlzDdDQxXLOdZxkPjw",
  authDomain: "cooking-ninja-site-94d5c.firebaseapp.com",
  projectId: "cooking-ninja-site-94d5c",
  storageBucket: "cooking-ninja-site-94d5c.appspot.com",
  messagingSenderId: "1645478400",
  appId: "1:1645478400:web:9b986dd74c2d53730d8ee5"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
