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

function checkAuth() {
    const promise = fetch(`${apiUrl}/auth`).then((res) => res.json());
    console.log(promise.then(res=> console.log(res)))
    return promise.then((res) => res.err) !== 0 ? true : false;
}

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Login register={true} />} />
                <Route path="/signin" element={<Login register={false} />} />
                <Route
                    path="/console/*"
                    >
                        checkAuth() ? (
                            <Routes>
                                <Route
                                    path="/console"
                                    element={<Console page={"dashboard"} />}
                                />
                                <Route
                                    path="/console/dashboard"
                                    element={<Console page={"dashboard"} />}
                                />
                                <Route
                                    path="/console/bugs"
                                    element={<Console page={"bugs"} />}
                                />
                            </Routes>
                        ) : (
                            <Navigate to="signin" />
                        )
                </Route>
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
