import React from "react";
import "../Home.css";
import bugSvg from "../res/svg/bugPic.svg";

import { Link } from "react-router-dom";

class Home extends React.Component {
    componentDidMount() {
        document.title = "BTrack";
    }
    render() {
        return (
            <div id="home">
                <nav>
                    <Link to="/">
                        <h2>
                            <i className="fas fa-bug"></i> BTrack
                        </h2>
                    </Link>
                    <ul id="anchors">
                        <li>
                            <a href="*">Features</a>
                        </li>
                        <li>
                            <a href="*">For Team</a>
                        </li>
                        <li>
                            <a href="*">Resources</a>
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
                {/* Hero Section */}
                <section id="hero">
                    <div>
                        <h2>Track Bugs with BTrack</h2>
                        <p>
                            BTrack is a bug tracking application built for
                            teams. Lorem ipsum dolor, sit amet. Lorem ipsum
                            dolor, sit amet
                        </p>
                        <div>
                            <Link to="login/register">
                                <button>Get Started</button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <img src={bugSvg} alt="svg" />
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;
