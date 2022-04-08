import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./root.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Console from "./pages/Console.js";
import Loading from "./pages/Loading.js";

const apiUrl = process.env.REACT_APP_APIURL;

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/*" element={<Login />} />
                <Route
                    path="/console/*"
                    element={
                        <ProtectedRoute>
                            <Console />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

function ProtectedRoute({ children }) {
    const [isAuthenticated, setAuth] = useState(null);
    const [fetched, setFetch] = useState(false);
    useEffect(() => {
        const auth = async () => {
            try {
                const promise = await fetch(`${apiUrl}/auth`, {
                    credentials: "include",
                }).then((res) => res.json());
                setAuth(promise.err === 0 ? true : false);
                setFetch(true);
            } catch (e) {
                return e;
            }
        };

        auth();
    }, []);
    return fetched ? (
        isAuthenticated ? (
            <Console />
        ) : (
            <Navigate to={"/login"} />
        )
    ) : (
        <Loading />
    );
}
