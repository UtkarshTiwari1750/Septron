// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {getAuth} = require("firebase/auth")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5QTjv0maNw_6ElGwmE1PvPmbv4PQHqgg",
  authDomain: "septron-daaae.firebaseapp.com",
  projectId: "septron-daaae",
  storageBucket: "septron-daaae.appspot.com",
  messagingSenderId: "237387599492",
  appId: "1:237387599492:web:b4409088bbb726e230bcd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = auth;