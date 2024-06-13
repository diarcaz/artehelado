import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD2bIF0SCK97-KPdWnltA1wPajkcp6NWPo",
    authDomain: "artehelado-35050.firebaseapp.com",
    databaseURL: "https://artehelado-35050-default-rtdb.firebaseio.com",
    projectId: "artehelado-35050",
    storageBucket: "artehelado-35050.appspot.com",
    messagingSenderId: "720717054880",
    appId: "1:720717054880:web:43b928f69cd81b5f459ac5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
