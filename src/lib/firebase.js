import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyBfH3QVNkEyNN8ToU3zhWp0upH6W5Pz0hM',
  authDomain: 'instagram-d2a35.firebaseapp.com',
  projectId: 'instagram-d2a35',
  storageBucket: 'instagram-d2a35.appspot.com',
  messagingSenderId: '1021943621135',
  appId: '1:1021943621135:web:b90f7b335bfba35a31257a',
};

const app = firebase.initializeApp(config);
const { FieldValue } = firebase.firestore;

// seeding the db(firestore) with initial data
// seedDatabase(firebase);

export { app, FieldValue };
