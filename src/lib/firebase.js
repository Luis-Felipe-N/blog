import firebase from "firebase/app";

import 'firebase/auth'

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

export { auth }