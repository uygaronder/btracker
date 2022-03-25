import React from "react";
import "../console.css";
import bug from "../res/svg/bug.svg";
import dashboard from "../res/svg/dashboard.svg";
import calendar from "../res/svg/calendar.svg";
import stopwatch from "../res/svg/stopwatch.svg";
import cog from "../res/svg/cog.svg";
import feed from "../res/svg/feed.svg";
//import home from "../res/svg/home.svg";
import notification from "../res/svg/notification.svg";

import Dashboard from "./console-pages/Dashboard";

class Login extends React.Component {
    render() {
        return (
            <div id="console">
                <nav>
                    <div>
                        <a href="/"><img src={bug} alt="Logo" /></a>
                        <ul>
                            <li>
                                <a href="*">Home</a>
                            </li>
                            <li>
                                <a href="*">Projects</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <a href="*">Team</a>
                            </li>
                            <li>
                                <a href="*">Settings</a>
                            </li>
                            <li id="notificationsItem">
                                <img src={notification}/>
                                <span id="notification">
                                    <p>3</p>
                                </span>
                                <div id="notificationsBox">

                                </div>
                            </li>
                            <li id="user">
                                <a href="*">
                                    <span className="avatar"></span>
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
                                    <img src={dashboard} alt="Home" />
                                    <p>Dashboard</p>
                                </a>
                            </li>
                            <li>
                                <a href="*">
                                    <img src={bug} alt="Home" />
                                    <p>Bugs</p>
                                </a>
                            </li>
                            <li>
                                <a href="*">
                                    <img src={calendar} alt="Home" />
                                    <p>Calendar</p>
                                </a>
                            </li>
                            <li>
                                <a href="*">
                                    <img src={stopwatch} alt="Home" />
                                    <p>Timesheet</p>
                                </a>
                            </li>
                            <li>
                                <a href="*">
                                    <img src={feed} alt="Home" />
                                    <p>Feed</p>
                                </a>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <a href="*">
                                    <img src={cog}/>
                                    <p>Settings</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div id="consoleScreen">
                        <Dashboard />
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
