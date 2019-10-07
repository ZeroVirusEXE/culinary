import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC197b4iyot9tCu7RZx_ewJLjZmWtY5blc",
    authDomain: "pursuit-showcase.firebaseapp.com",
    databaseURL: "https://pursuit-showcase.firebaseio.com",
    projectId: "pursuit-showcase",
    storageBucket: "pursuit-showcase.appspot.com",
    messagingSenderId: "562909400816",
    appId: "1:562909400816:web:00c57dd9907f2b3848bc35",
    measurementId: "G-6TMXJHXK2Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

/*

Login:
    id
    username - *Unique
    password

Category:
    id
    category_name

Recipe:
    id
    title
    ingredients
    directions
    image
    username
    category

Comments
    id
    body
    username
    recipe

****************************************

Recipe
    title           String
    ingredients     String
    directions      String
    image           Blob
    username        String
    category        String
    Comments        { username, body }

*/