import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCltd_Oz2YFRtKIoLRLpTD-FBtgQYG8B70",
    authDomain: "crown-clothing-react-aa239.firebaseapp.com",
    databaseURL: "https://crown-clothing-react-aa239.firebaseio.com",
    projectId: "crown-clothing-react-aa239",
    storageBucket: "crown-clothing-react-aa239.appspot.com",
    messagingSenderId: "516525167183",
    appId: "1:516525167183:web:49de6f26adb39e928c503a"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error during creation', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
