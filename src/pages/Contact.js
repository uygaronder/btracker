import React from "react";
import "../css/contact.css";

import { Link } from "react-router-dom";
import logo from "../res/anteater.png";
class Home extends React.Component {
    componentDidMount() {
        document.title = "Bugsnack";
    }
    render() {
        return (
            <div id="contact">
                <nav>
                    <Link to="/">
                        <h2 id="logo">
                            <img src={logo} alt="" /> Bugsnack
                        </h2>
                    </Link>
                    <ul id="anchors">
                        <li>
                            <Link to="/">
                                <a href="#features">Features</a>
                            </Link>
                        </li>
                        <li>
                            <a
                                href="https://github.com/under4/btracker"
                                target="_blank"
                            >
                                See The Code
                            </a>
                        </li>
                        <li>
                            <a href="contact">Contact Us</a>
                        </li>
                    </ul>
                    <ul id="navButtons">
                        <li>
                            <Link to="/login">Sign In</Link>
                        </li>
                        <li>
                            <Link to="/login/register">
                                <button>Get Started</button>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <section>
                    <span>
                        <h2>Contact</h2>
                        <p>
                            If You have found a bug or would like to contact me
                            please feel free to use the form down below and I'll
                            get back to you as soon as I can!
                        </p>
                    </span>
                    <form action="">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            required
                        />
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            required
                        />
                        <textarea
                            rows="5"
                            name="text"
                            id="text"
                            required
                        ></textarea>
                        <button>Submit</button>
                    </form>
                </section>
            </div>
        );
    }
}

export default Home;
