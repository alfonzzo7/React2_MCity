import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: 'AIzaSyAAOSqIp80RLSqDwIM8Kt5H94Zl-psgEdE',
    authDomain: 'manchestercity-cfb2d.firebaseapp.com',
    databaseURL: 'https://manchestercity-cfb2d.firebaseio.com',
    projectId: 'manchestercity-cfb2d',
    storageBucket: 'manchestercity-cfb2d.appspot.com',
    messagingSenderId: '217941795184'
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');

export {
    firebase,
    firebaseMatches,
}