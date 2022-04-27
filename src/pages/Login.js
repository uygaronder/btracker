import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import "../css/Login.css";

import register from "../pages/login/Register";
import sign from "../pages/login/SignIn";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            register: this.props.register,
        };
    }
    render() {
        return (
            <span id="login">
                <div id="loginHero"></div>
                <div id="loginForm">
                    <Routes>
                        <Route path="signin" element={sign()} />
                        <Route path="register" element={register()} />
                        <Route path="" element={<Navigate to={"signin"} />} />
                    </Routes>
                    <button>Google</button>
                </div>
            </span>
        );
    }
}

export default Login;
