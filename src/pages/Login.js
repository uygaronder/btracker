import React from "react";
import "../Login.css";

import register from "../pages/login/register";
import signin from "../pages/login/signin";

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
                    {/*<h3>Welcome</h3>*/}
                    {this.props.register ? register() : signin()}
                    <button>Google</button>
                </div>
            </span>
        );
    }
}

export default Login;
