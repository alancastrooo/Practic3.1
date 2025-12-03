// Import the functions you need from the SDK
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARH03uKACz-entcP8tH_MKDDOAxxLUq70",
  authDomain: "fir-realtime-react-nativ-b6941.firebaseapp.com",
  databaseURL: "https://fir-realtime-react-nativ-b6941-default-rtdb.firebaseio.com",
  projectId: "fir-realtime-react-nativ-b6941",
  storageBucket: "fir-realtime-react-nativ-b6941.firebasestorage.app",
  messagingSenderId: "142073554174",
  appId: "1:142073554174:web:eb341ed2440dde6d61b1af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)