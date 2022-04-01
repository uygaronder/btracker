import React from "react";

import at from "../../res/svg/at.svg";
import asterisk from "../../res/svg/asterisk.svg";
const apiUrl = process.env.REACT_APP_APIURL;

const register = function () {
    return (
        <div className="formDiv">
            <h1>Register</h1>
            <p>
                You can register down below or if you already have an account{" "}
                <a href="./signin">sign in</a>
            </p>
            <form method="post" action={`${apiUrl}/register`}>
                <span className="formText">
                    <input
                        value="test"
                        type={"text"}
                        id="regEmail"
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
                        value="test"
                        id="regPassword"
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
                    <button>Submit</button>
                    <div>
                        <p>or</p>
                        <a href="/signin">login</a>
                    </div>
                </span>
            </form>
        </div>
    );
};

export default register;
