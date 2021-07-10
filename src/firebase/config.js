import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCTkdFKFPlJRHZVYyOXdsM2_fRu7mmhixM",
  authDomain: "vue-vlog.firebaseapp.com",
  projectId: "vue-vlog",
  storageBucket: "vue-vlog.appspot.com",
  messagingSenderId: "206028587059",
  appId: "1:206028587059:web:2d7bb72a86853ef962e346"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {firestore,timestamp}
