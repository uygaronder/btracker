import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./root.css";
import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";

import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Console from "./pages/Console.js";
import "./root.css";

const apiUrl = process.env.REACT_APP_APIURL;

var authed;

async function checkAuth(){
    const promise = await fetch(`${apiUrl}/auth`,{credentials: "include"}).then((res) => res.json());
    authed = promise.then((res) => res.err) === 0 ? true : false;
    console.log(authed)

    
}
checkAuth()


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/*" element={<Login />} />
                <Route path="/console/*" element={
                    authed ? <Console />: <Navigate to="/login"/>
                } />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);