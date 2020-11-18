import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

let firebaseConfig = {
  apiKey: 'AIzaSyCKliMjRqa5T6BVoQnohHU8jfFX0nb-eQI',
  authDomain: 'inventario-espectro.firebaseapp.com',
  databaseURL: 'https://inventario-espectro.firebaseio.com',
  projectId: 'inventario-espectro',
  storageBucket: 'inventario-espectro.appspot.com',
  messagingSenderId: '96811200450',
  appId: '1:96811200450:web:ca63133bf0c450c4bc705b',
  measurementId: 'G-L4G8BGQQ2T',
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
// Initialize analytics
firebase.analytics();
// Initialize firestore
export const firestore = fb.firestore();
// Initialize auth
export const admin = fb.auth();

// export default firestore;
