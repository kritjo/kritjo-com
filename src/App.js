import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import React, {useState} from "react";
import './App.css'
import Navbar from "./components/navbar";
import { inject } from '@vercel/analytics';

inject();

function App() {
    const [title, setTitle] = useState("kritjo.com - Kristian Tjelta Johansen")
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Navbar />
                    <h1 className={"App-title"}>{title}</h1>
                    <Routes>
                        <Route path={'/'} element={
                            <Home set_page_title={setTitle} />
                        } />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;
