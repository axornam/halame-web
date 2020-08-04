//Register web app with firebase tokens and API KEYSs

var firebaseConfig = {
    apiKey: "Add Your Firebase Project Details OverHere",
    authDomain: "Add Your Firebase Project Details OverHere",
    databaseURL: "Add Your Firebase Project Details OverHere",
    projectId: "Add Your Firebase Project Details OverHere",
    storageBucket: "Add Your Firebase Project Details OverHere",
    messagingSenderId: "Add Your Firebase Project Details OverHere",
    appId: "Add Your Firebase Project Details OverHere"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("firebase is initializing ", firebase);