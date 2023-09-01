import React from "react";
import { Link } from "react-router-dom";

import at from "../../res/svg/at.svg";
import asterisk from "../../res/svg/asterisk.svg";
var apiUrl = process.env.REACT_APP_APIURL;
document.title = `BTrack | Login`;

const sign = function () {
    /*
    function login() {
        fetch(`${apiUrl}/login/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            },
            body: JSON.stringify({
                email: document.getElementById("signEmail").value,
                password: document.getElementById("signPassword").value,
            }),
        })
            .then((res) => res.text())
            .then((data) => {
                console.log(data);
            });

            
    }
    */
    /* onSubmit={() => login()} */
    /* method="post" action={`${apiUrl}/login/login`} */
    return (
        <div className="formDiv">
            <h1>Login</h1>
            <p>
                You can sign in below or{" "}
                <Link to="/login/register">register</Link> a new account
            </p>
            
            <form method="post" action={`${apiUrl}/login/login`}>
                <span className="formText">
                    <input
                        type={"text"}
                        id="signEmail"
                        name="email"
                        placeholder="E-Mail"
                        value="demoaccount"
                        required
                    />
                    <label htmlFor="signEmail">
                        <img src={at} alt="@" />
                    </label>
                </span>
                <span className="formText">
                    <input
                        id="signPassword"
                        type={"password"}
                        name="password"
                        placeholder="********"
                        value="demoaccount"
                        required
                    />
                    <label htmlFor="signPassword">
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
