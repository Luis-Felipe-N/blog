import firebase from "firebase/app";

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // firebase.initializeApp({});
}

const auth = firebase.auth()
const db = firebase.database()
const db_firestore = firebase.firestore()

export { auth, db_firestore, db }