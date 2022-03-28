import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./root.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Console from "./pages/Console.js";
import "./root.css";

//const dotenv = require("dotenv");
//dotenv.config();
//console.log(process.env)

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Login register={true} />} />
                <Route path="/signin" element={<Login register={false} />} />
                <Route path="/console/*" element={<Console />} />
                <Route
                    path="/console/dashboard"
                    element={<Console page={"dashboard"} />}
                />
                <Route
                    path="/console/bugs"
                    element={<Console page={"bugs"} />}
                />
                <Route path="/console/*" element={<Console />} />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
