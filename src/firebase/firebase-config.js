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

export const createUserProfileDocument = async (user, additionalData) => {
  if(!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if(!snapshot.exists) {
    const { displayName, email} = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user', error.message)
    }
  }
  return getUserDocument(user.uid);
}

export const getUserDocument = async uid => {
  if(!uid) return null;

  try {
    return firestore.collection('users').doc(uid);
  } catch(error) {
    console.log('Error fetching user', error.message)
  }
}

export default firebase;
