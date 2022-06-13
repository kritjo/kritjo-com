import './App.css';
import React from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDeoFGQhzJw5J0_VMgo9wl_akz6gz8IR8k",
    authDomain: "kritjo-web.firebaseapp.com",
    projectId: "kritjo-web",
    storageBucket: "kritjo-web.appspot.com",
    messagingSenderId: "271239765696",
    appId: "1:271239765696:web:2bd8da8c5c7b7b907e9725",
    measurementId: "G-B7PY3F8K9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1 className={"App-title"}>kritjo.com - Kristian Tjelta Johansen</h1>
          <p>Hei!</p>
          <a className="App-link" href={"https://github.com/kritjo"}>Github</a>
          <a className="App-link" href={"https://www.linkedin.com/in/tjeltajohansen/"}>LinkedIn</a>
          <a className="App-link" href={"mailto:hello@kritjo.com"}>hello@kritjo.com</a>
      </header>
    </div>
  );
}

export default App;
