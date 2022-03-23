import React from "react";
import "../console.css";
import bug from "../res/svg/bug.svg";
import home from "../res/svg/home.svg";

class Login extends React.Component {
    render() {
        return (
            <div id="console">
                <nav>
                    <div>
                        <img src={bug} alt="Logo" />
                        <ul>
                            <li>
                                <a href="*">Projects</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <a href="*">test</a>
                            </li>
                            <li>
                                <a href="*">test</a>
                            </li>
                            <li>
                                <a href="*">Settings</a>
                            </li>
                            <li id="user">
                                <a href="*">
                                    <span id="avatar"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div id="screen">
                    <div id="sideNav">
                        <ul>
                            <li>
                                <a href="*">
                                    <div>
                                        <img src={home} alt="Home" />
                                        <p>Home</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="*">#</a>
                            </li>
                            <li>
                                <a href="*">#</a>
                            </li>
                            <li>
                                <a href="*">#</a>
                            </li>
                        </ul>
                    </div>
                    <div id="consoleScreen">
                        <p>info screen</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
