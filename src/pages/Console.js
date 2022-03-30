import React from "react";

//import { BrowserRouter as Link } from "react-router-dom";

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
import Bugs from "./console-pages/Bugs";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { page: this.props.page ? this.props.page : "dashboard" };
    }
    changePage(page) {
        this.setState({ page: page });
    }
    serveComponent = () => {
        switch (this.state.page) {
            case "dashboard":
                return <Dashboard />;
            case "bugs":
                return <Bugs />;
            default:
                return <Dashboard />;
        }
    };
    notificationhandle = () => {
        const notBox = document.getElementById("notificationsBox");
        notBox.classList.contains("hidden")
            ? notBox.classList.remove("hidden")
            : notBox.classList.add("hidden");
    };
    render() {
        return (
            <div id="console">
                <nav>
                    <div>
                        <a href="/">
                            <img src={bug} alt="Logo" />
                        </a>
                        <ul>
                            <li>
                                <a href="*">Home</a>
                            </li>
                            <li>
                                <select name="project" id="currentProject">
                                    <option value="#">Current Project</option>
                                </select>
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
                                <span
                                    id="notificationButton"
                                    onClick={this.notificationhandle}
                                >
                                    <img src={notification} />
                                    <span id="notification">
                                        <p>3</p>
                                    </span>
                                </span>

                                <div id="notificationsBox" className="hidden">
                                    <div className="notificationItem">
                                        <p>This is a test notification</p>
                                        <p className="notifDate">
                                            12:11 30/3/2022
                                        </p>
                                    </div>
                                    <div className="notificationItem">
                                        <p>
                                            This is a test notification and this
                                            is a longer notification as well to
                                            see how it handles longer
                                            notifications
                                        </p>
                                        <p className="notifDate">
                                            12:11 30/3/2022
                                        </p>
                                    </div>
                                    <div className="notificationItem">
                                        <p>This is a test notification</p>
                                        <p className="notifDate">
                                            12:11 30/3/2022
                                        </p>
                                    </div>
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
                                <a href="/console/dashboard">
                                    <img src={dashboard} alt="Home" />
                                    <p>Dashboard</p>
                                </a>
                            </li>
                            <li>
                                <a href="/console/bugs">
                                    <img src={bug} alt="Bugs" />
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
                                    <img src={cog} />
                                    <p>Settings</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div id="consoleScreen">
                        {/*<Dashboard />*/}
                        {this.serveComponent()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
