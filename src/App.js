import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Github from "./pages/Github";
import React from "react";
import './App.css'
import Navbar from "./components/navbar";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Navbar />
                    <h1 className={"App-title"}>kritjo.com - Kristian Tjelta Johansen</h1>
                    <Routes>
                    <Route path={'/'} element={
                        <Home />
                    } />
                    <Route path={'/github'} element={
                        <Github />
                    } />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;
