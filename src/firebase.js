import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBu-vxVdYQvPB2GWm_wcgGRbpKZUUGlyTs",
  authDomain: "septron-909d2.firebaseapp.com",
  projectId: "septron-909d2",
  storageBucket: "septron-909d2.appspot.com",
  messagingSenderId: "630191267920",
  appId: "1:630191267920:web:266c668d66dd6ad3c97155"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);