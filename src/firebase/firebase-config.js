import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAX2yomnyo67YqFlh-sBdUeElMVTuPTFyY",
  authDomain: "sep-2019-firebase-firestore.firebaseapp.com",
  databaseURL: "https://sep-2019-firebase-firestore.firebaseio.com",
  projectId: "sep-2019-firebase-firestore",
  storageBucket: "sep-2019-firebase-firestore.appspot.com",
  messagingSenderId: "761834369558",
  appId: "1:761834369558:web:c3b759253fc684c8603b37"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName, email, createdAt, ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;