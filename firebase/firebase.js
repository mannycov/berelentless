// Fireabase products
const Fireabase = require("firebase/app");
const firebaseKeys = require('../config/firebase_config');

// Initialize
const firebaseConfig = firebaseKeys;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
