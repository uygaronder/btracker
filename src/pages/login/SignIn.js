import React from "react";
import { Link } from "react-router-dom";

import at from "../../res/svg/at.svg";
import asterisk from "../../res/svg/asterisk.svg";
var apiUrl = process.env.REACT_APP_APIURL;

const sign = function () {
    document.title = `BTrack | Login`;

    function login() {
        fetch(`${apiUrl}/login/login`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: document.getElementById("signEmail").value,
                password: document.getElementById("signPassword").value,
            }),
        });
    }

    return (
        <div className="formDiv">
            <h1>Login</h1>
            <p>
                You can sign in below or{" "}
                <Link to="/login/register">register</Link> a new account
            </p>
            <form
                onSubmit={() => {
                    login();
                }}
            >
                <span className="formText">
                    <input
                        type={"text"}
                        id="signEmail"
                        name="email"
                        placeholder="E-Mail"
                        required
                    />
                    <label htmlFor="email">
                        <img src={at} alt="@" />
                    </label>
                </span>
                <span className="formText">
                    <input
                        id="signPassword"
                        type={"password"}
                        name="password"
                        placeholder="********"
                        required
                    />
                    <label htmlFor="password">
                        <img src={asterisk} alt="*" />
                    </label>
                </span>
                <span className="buttonSpan">
                    <button type="submit">Submit</button>
                    <div>
                        <p>or</p>
                        <Link to="/login/register">register</Link>
                    </div>
                </span>
            </form>
        </div>
    );
};

export default sign;
