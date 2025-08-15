// Import Firebase modules (make sure to include firebase-app, auth, and firestore in your HTML or via npm)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbV6vnlooP3BxLQzfbMqpnq5j_Z6ZyNUU",
  authDomain: "budget-tracker-bf969.firebaseapp.com",
  projectId: "budget-tracker-bf969",
  storageBucket: "budget-tracker-bf969.appspot.com",
  messagingSenderId: "481757422735",
  appId: "1:481757422735:web:fc24f0326c4fb99116bcfa",
  measurementId: "G-8HHFE0RGQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ========================
   REGISTER FUNCTIONALITY
======================== */
if (document.getElementById('registerForm')) {
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Create user with email & password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional info in Firestore
      await setDoc(doc(db, "users", email), {
        username: username,
        email: email,
        createdAt: new Date()
      });

      alert("Registration successful! You can now log in.");
      registerForm.reset();
      window.location.href = "login.html";

    } catch (error) {
      console.error("Error registering:", error);
      alert(error.message);
    }
  });
}

/* ========================
   LOGIN FUNCTIONALITY
======================== */
if (document.getElementById('loginForm')) {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      loginForm.reset();
      window.location.href = "home.html"; // redirect after login

    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid email or password.");
    }
  });
}
