import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

export const firebaseConfig = {
    apiKey: "AIzaSyCkjHQyt2FcLmIzUcQnQukRPlknmkNlcPE",
    authDomain: "etecbarueripw3-livraria.firebaseapp.com",
    projectId: "etecbarueripw3-livraria",
    storageBucket: "etecbarueripw3-livraria.appspot.com",
    messagingSenderId: "288797682953",
    appId: "1:288797682953:web:4bcae70c533fe2167337d8"
};

export const firebaseApp = initializeApp(firebaseConfig)
export const storage = getStorage(firebaseApp)