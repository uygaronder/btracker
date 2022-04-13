import React, { useState } from "react";
import Select from "react-select";

import { Link, Routes, Route } from "react-router-dom";

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
import Team from "./console-pages/Team";
import NewTeam from "./console-pages/NewTeam";
import Bug from "./console-pages/Bug";
import NotFound from "./NotFound";
import Loading from "./Loading";

var apiUrl = process.env.REACT_APP_APIURL;

class Console extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "default",
            teamOptions: [["tOptHold", "phold"]],
            teamProjects: [["pName", "pIdHold"]],
            notifications: [["nTextHold", "phold"]],
            loading: true,
        };
    }

    notificationhandle = () => {
        const notBox = document.getElementById("notificationsBox");
        notBox.classList.contains("hidden")
            ? notBox.classList.remove("hidden")
            : notBox.classList.add("hidden");
    };

    darkmode = () => {
        console.log("darkmode");
    };

    fetchInfo = async () => {
        var response;
        await fetch(`${apiUrl}/getConsoleInfo`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => (response = data));

        console.log(response);
        this.setState({
            notifications: response.user.notifications,
            teamOptions: response.user.teams,
            loading: false,
            activeTeam: response.user.activeTeam,
            activeProject: "",
            team: response.team,
        });
    };

    componentDidMount() {
        this.fetchInfo();
        console.log(this.state);
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <div id="console">
                <nav>
                    <div>
                        <Link to="/">
                            <img src={bug} alt="Logo" />
                        </Link>
                        <ul>
                            <li>
                                <Link to="*">Home</Link>
                            </li>
                            <li>
                                <select name="project" id="currentProject">
                                    <option value="#">Current Project</option>
                                </select>
                            </li>
                            <li>
                                <select>
                                    {this.state.teamOptions.map((team) => {
                                        return (
                                            <option value={team[1]}>
                                                {team[0]}
                                            </option>
                                        );
                                    })}
                                </select>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <Link to="newTeam">Create Or Join Team</Link>
                            </li>
                            <li>
                                <Link to="team">Team</Link>
                            </li>
                            <li>
                                <button onClick={() => this.darkmode()}>
                                    Dark Mode
                                </button>
                            </li>
                            <li>
                                <Link to="*">Settings</Link>
                            </li>
                            <li>
                                <form
                                    action={`${apiUrl}/logout?_method=DELETE`}
                                    method="post"
                                >
                                    <button type="submit">Log Out</button>
                                </form>
                            </li>
                            <li id="notificationsItem">
                                <span
                                    id="notificationButton"
                                    onClick={this.notificationhandle}
                                >
                                    <img src={notification} />
                                    <span id="notification">
                                        {this.state.notifications.length}
                                    </span>
                                </span>

                                <div id="notificationsBox" className="hidden">
                                    {this.state.notifications.map((notif) => {
                                        return (
                                            <div className="notificationItem">
                                                <p>{notif[0]}</p>
                                                <p className="notifDate">
                                                    {notif[1]}
                                                </p>
                                            </div>
                                        );
                                    })}
                                    {/*
                                    <div className="notificationItem">
                                        <p>This is a test notification</p>
                                        <p className="notifDate">
                                            12:11 30/3/2022
                                        </p>
                                    </div>
                                    */}
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
                                <Link to="/console/dashboard">
                                    <img src={dashboard} alt="Home" />
                                    <p>Dashboard</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/console/bugs">
                                    <img src={bug} alt="Bugs" />
                                    <p>Bugs</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="*">
                                    <img src={calendar} alt="Home" />
                                    <p>Calendar</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="*">
                                    <img src={stopwatch} alt="Home" />
                                    <p>Timesheet</p>
                                </Link>
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
                        <Routes>
                            <Route
                                path=""
                                element={
                                    <Dashboard
                                        team={this.state}
                                        activeProject={this.state.activeProject}
                                    />
                                }
                            />
                            <Route
                                path="dashboard"
                                element={<Dashboard team={this.state.team} />}
                            />
                            <Route
                                path="bugs"
                                element={
                                    <Bugs activeTeam={this.state.activeTeam} />
                                }
                            />
                            <Route
                                path="team"
                                element={
                                    <Team activeTeam={this.state.activeTeam} />
                                }
                            />
                            <Route path="newTeam" element={<NewTeam />} />
                            <Route path="bug" element={<Bug />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
}

export default Console;
