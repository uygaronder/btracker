import React from "react";
import { Link } from "react-router-dom";

import at from "../../res/svg/at.svg";
import asterisk from "../../res/svg/asterisk.svg";
import letter from "../../res/svg/letter.svg";
const apiUrl = process.env.REACT_APP_APIURL;

const register = function () {
    return (
        <div className="formDiv">
            <h1>Register</h1>
            <p>
                You can register down below or if you already have an account{" "}
                <Link to="/login">sign in</Link>
            </p>
            <form method="post" action={`${apiUrl}/register`}>
                <span className="formText">
                    <input
                        type={"text"}
                        id="reqName"
                        name="name"
                        placeholder="Name"
                        required
                    />
                    <label htmlFor="name">
                        <img src={letter} alt="name" />
                    </label>
                </span>
                <span className="formText">
                    <input
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
                        <Link to="/login">login</Link>
                    </div>
                </span>
            </form>
        </div>
    );
};

export default register;
