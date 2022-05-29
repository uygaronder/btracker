import React from "react";
import "../css/Home.css";
import bugSvg from "../res/svg/bugPic.svg";

import { Link } from "react-router-dom";
import logo from "../res/anteater.png";
import appPreview from "../res/app-preview.png";

import chevron from "../res/svg/chevron-up.svg";
import bug from "../res/svg/bug.svg";
import team from "../res/svg/team.svg";
import clock from "../res/svg/clock.svg";
import label from "../res/svg/label.svg";
class Home extends React.Component {
    componentDidMount() {
        document.title = "Bugsnack";
    }
    render() {
        return (
            <div id="home">
                <nav>
                    <Link to="/">
                        <h2 id="logo">
                            <img src={logo} alt="" /> Bugsnack
                        </h2>
                    </Link>
                    <ul id="anchors">
                        <li>
                            <a href="#features">Features</a>
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
                            <a href="*">Contact Us</a>
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
                    <div id="heroCTA">
                        <h2>Ship great products with Bugsnack</h2>
                        <p>
                            Bugsnack is an open source bug tracking tool
                            designed with teams in mind. Users can get started
                            in minutes.
                        </p>
                        <div>
                            <Link to="login/register">
                                <button>Get Started for free</button>
                            </Link>
                        </div>
                    </div>
                    <div id="heroImage">
                        <img src={appPreview} alt="svg" class="animated" />
                    </div>
                    <a href="#features">
                        <img id="chevron" src={chevron} alt="" />
                    </a>
                </section>
                {/* Features Section */}
                <section id="features">
                    <div class="featureHero">
                        <h2>Bug Tracking Made Easy</h2>
                        <p>
                            Add, Edit, Remove and easily track bugs in our free
                            and open source bug tracker
                        </p>
                    </div>
                    <div class="featuresContainer">
                        <div>
                            <img src={bug} alt="" />
                            <div>
                                <h3>Bug/Issue Management</h3>
                                <p>
                                    Record and Track bugs based on your
                                    criteria, so you can focus on the issues
                                    that matter the most. See how many bugs you
                                    have and which ones have been solved
                                </p>
                            </div>
                        </div>
                        <div>
                            <img src={team} alt="" />
                            <div>
                                <h3>Teams</h3>
                                <p>
                                    Create teams and assign bugs and see what
                                    everyone is working on, discuss the issues
                                    on the comments
                                </p>
                            </div>
                        </div>
                        <div>
                            <img src={clock} alt="" />
                            <div>
                                <h3>Time Tracking</h3>
                                <p>
                                    Bugsnack automatically logs the time so you
                                    know where you can improve the process
                                </p>
                            </div>
                        </div>
                        <div>
                            <img src={label} alt="" />
                            <div>
                                <h3>Labeling</h3>
                                <p>
                                    Create custom labels for your bugs so you
                                    can find the exact bug you are looking for
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="footerCTA">
                    <h2>Try Bugsnack for free</h2>
                    <Link to="/login/register">
                        <button>Get Started</button>
                    </Link>
                </section>
            </div>
        );
    }
}

export default Home;
