import React from "react";

import at from "../../res/svg/at.svg";
import asterisk from "../../res/svg/asterisk.svg";
var apiUrl = process.env.REACT_APP_APIURL;

const sign = function () {
    return (
        <div className="formDiv">
            <h1>Login</h1>
            <p>
                You can sign in below or <a href="./register">register</a> a new
                account
            </p>
            <form method="POST" action={`${apiUrl}/login`}>
                <span className="formText">
                    <input
                        type={"text"}
                        id="signEmail"
                        name="email"
                        placeholder="E-Mail"
                        value="test"
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
                        value="test"
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
                        <a href="/register">register</a>
                    </div>
                </span>
            </form>
        </div>
    );
};

export default sign;
