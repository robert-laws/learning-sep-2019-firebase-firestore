import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAX2yomnyo67YqFlh-sBdUeElMVTuPTFyY",
  authDomain: "sep-2019-firebase-firestore.firebaseapp.com",
  databaseURL: "https://sep-2019-firebase-firestore.firebaseio.com",
  projectId: "sep-2019-firebase-firestore",
  storageBucket: "sep-2019-firebase-firestore.appspot.com",
  messagingSenderId: "761834369558",
  appId: "1:761834369558:web:c3b759253fc684c8603b37"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
