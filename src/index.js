import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./root.css";
import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";

import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Console from "./pages/Console.js";
import "./root.css";

const apiUrl = process.env.REACT_APP_APIURL;

const checkAuth = () => {
    const promise = fetch(`${apiUrl}/auth`).then((res) => res.json());
    console.log(promise.then(res=> console.log(res)))
    return promise.then((res) => res.err) !== 0 ? true : false;
}

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/*" element={<Login />} />
                <Route path="/console/*" element={checkAuth() ? <Console />:<Navigate to={"/login/signin"}/>} />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
