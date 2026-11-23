// Add your Firebase Web App configuration below.
// Never place Firebase service-account private keys in browser code.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};
export const isConfigured = Object.values(firebaseConfig).every(v => typeof v === "string" && v.length && !v.startsWith("YOUR_"));
let app = null, auth = null, db = null, storage = null;
if (isConfigured) { app = initializeApp(firebaseConfig); auth = getAuth(app); db = getFirestore(app); storage = getStorage(app); }
export { app, auth, db, storage };