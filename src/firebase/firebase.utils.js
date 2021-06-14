import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCNMY23IxPOsfFyoCx3GP0_qV4g8SfrG0Y",
  authDomain: "crwn-db-7e12e.firebaseapp.com",
  projectId: "crwn-db-7e12e",
  storageBucket: "crwn-db-7e12e.appspot.com",
  messagingSenderId: "596217130206",
  appId: "1:596217130206:web:b3395dcaf3299297d0a64f",
  measurementId: "G-89C3K9DSST",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;