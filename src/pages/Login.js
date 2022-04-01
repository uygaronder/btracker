import React from "react";
import "../Login.css";

const { SignIn } = require("./login/SignIn");
const { Register } = require("./login/Register");

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
                    {this.props.register ? Register : SignIn}
                    <button>Google</button>
                </div>
            </span>
        );
    }
}

export default Login;
