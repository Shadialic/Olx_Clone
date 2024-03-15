import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXFsM87nI0vTFOZbcBXUvzSJbVtFAIl5A",
  authDomain: "olx-clone-f5313.firebaseapp.com",
  projectId: "olx-clone-f5313",
  storageBucket: "olx-clone-f5313.appspot.com",
  messagingSenderId: "994287457934",
  appId: "1:994287457934:web:c853b920a8a0f027f3dbdf",
  measurementId: "G-3KYTQQH7TN"
};

export default firebase.initializeApp(firebaseConfig)

