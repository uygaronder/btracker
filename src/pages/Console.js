import React from "react";

import { Link, Routes, Route } from "react-router-dom";

import "../css/console.css";
import bug from "../res/svg/bug.svg";
import dashboard from "../res/svg/dashboard.svg";
import archive from "../res/svg/archive.svg";
import stopwatch from "../res/svg/stopwatch.svg";
import cog from "../res/svg/cog.svg";
import feed from "../res/svg/feed.svg";
import notification from "../res/svg/notification.svg";
import chevron from "../res/svg/chevron-up.svg";

import Archive from "./console-pages/Archive";
import Dashboard from "./console-pages/Dashboard";
import Bugs from "./console-pages/Bugs";
import Team from "./console-pages/Team";
import NewTeam from "./console-pages/NewTeam";
import Bug from "./console-pages/Bug";
import NotFound from "./NotFound";
import Loading from "./Loading";
import Settings from "./Settings";
import Feed from "./console-pages/Feed";

var apiUrl = process.env.REACT_APP_APIURL;

class Console extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "default",
            teamOptions: [["tOptHold", "phold"]],
            notifications: [["nTextHold", "phold"]],
            loading: true,
        };
    }

    notificationhandle = () => {
        const notBox = document.getElementById("notificationsBox");
        notBox.style.display == "none"
            ? (notBox.style.display = "block")
            : (notBox.style.display = "none");
    };

    darkmodeApi = () => {
        const darkCheck = document.getElementById("darkCheck");
        fetch(`${apiUrl}/darkmode`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                darkTheme: darkCheck.checked,
            }),
        });
        this.darkTheme();
    };

    darkTheme = () => {
        const consoleDiv = this.consoleDiv;

        this.darkCheck.checked
            ? consoleDiv.classList.add("dark")
            : consoleDiv.classList.remove("dark");
    };

    handleConsoleDropdown = () => {
        const consoleDropdown = document.getElementById("dropdownDiv");
        consoleDropdown.style.display == "none"
            ? (consoleDropdown.style.display = "block")
            : (consoleDropdown.style.display = "none");
    };

    fetchInfo = async () => {
        var response;
        await fetch(`${apiUrl}/getConsoleInfo`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => (response = data));

        var activeProject = response.team.projects.filter(
            (project) => project[0][1] == response.user.activeProject
        )[0];
        if (activeProject == undefined) {
            activeProject = response.team.projects[0][1];
        }

        this.setState({
            usrName: response.user.name,
            notifications: response.user.notifications,
            teamOptions: response.user.teams,
            loading: false,
            activeTeam: response.user.activeTeam,
            activeProject: activeProject,
            team: response.team,
            usrId: response.user._id,
            settings: response.user.settings,
            avatar: response.user.avatarURL,
        });
        document.getElementById("darkCheck").checked =
            this.state.settings.darkTheme;
        document.getElementById("darkCheck").addEventListener("change", () => {
            this.darkmodeApi();
        });
        if (this.state.settings.darkTheme) {
            this.darkTheme();
        }
    };

    componentDidMount() {
        document.addEventListener("mouseup", function (e) {
            const consoleDropdown = document.getElementById("dropdownDiv");
            if (!consoleDropdown.contains(e.target)) {
                consoleDropdown.style.display = "none";
            }
        });
        document.addEventListener("mouseup", function (e) {
            const notBox = document.getElementById("notificationsBox");
            if (!notBox.contains(e.target)) {
                notBox.style.display = "none";
            }
        });
        this.fetchInfo();

        document.title = "Console";
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <div id="console" ref={(div) => (this.consoleDiv = div)}>
                <nav>
                    <div>
                        <Link to="/">
                            <img src={bug} alt="Logo" />
                        </Link>
                        <ul>
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
                            <li>
                                <select name="project" id="currentProject">
                                    {this.state.team.projects.map((project) => {
                                        return (
                                            <option value={project[1]}>
                                                {project[0]}
                                            </option>
                                        );
                                    })}
                                </select>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
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

                                <div
                                    id="notificationsBox"
                                    style={{ display: "none" }}
                                >
                                    {this.state.notifications.length != 0 ? (
                                        this.state.notifications.map(
                                            (notif) => {
                                                return (
                                                    <div className="notificationItem">
                                                        <p>{notif[0]}</p>
                                                        <p className="notifDate">
                                                            {notif[1]}
                                                        </p>
                                                    </div>
                                                );
                                            }
                                        )
                                    ) : (
                                        <p id="notBoxEmpty">
                                            You have no new notifications
                                        </p>
                                    )}
                                </div>
                            </li>
                            <li id="user">
                                <button
                                    onClick={() => {
                                        this.handleConsoleDropdown();
                                    }}
                                >
                                    <span className="avatar">{this.state.avatar && <img src={this.state.avatar} key={this.state.avatar}/>}</span>
                                    <span>
                                        <img src={chevron} alt="" />
                                    </span>
                                </button>
                                <div
                                    id="dropdownDiv"
                                    style={{ display: "none" }}
                                >
                                    <ul>
                                        <li>
                                            <p>
                                                You are signed in as
                                                <strong>
                                                    {` ${this.state.usrName}`}
                                                </strong>
                                            </p>
                                        </li>
                                        <li>
                                            <Link to="newTeam">
                                                Create Or Join Team
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="team">Team</Link>
                                        </li>
                                        <li>
                                            <div id="darkmodeDiv">
                                                <p>Dark Mode</p>
                                                <label className="switch">
                                                    <input
                                                        id="darkCheck"
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        type="checkbox"
                                                        ref={(input) =>
                                                            (this.darkCheck =
                                                                input)
                                                        }
                                                    />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <form
                                                action={`${apiUrl}/logout?_method=DELETE`}
                                                method="post"
                                            >
                                                <button type="submit">
                                                    Log Out
                                                </button>
                                            </form>
                                        </li>
                                    </ul>
                                </div>
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
                                <Link to="/console/archive">
                                    <img src={archive} alt="Archive" />
                                    <p>Archive</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="*">
                                    <img src={stopwatch} alt="Home" />
                                    <p>Timesheet</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="feed">
                                    <img src={feed} alt="Feed" />
                                    <p>Feed</p>
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Link to="settings">
                                    <img src={cog} />
                                    <p>Settings</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div id="consoleScreen">
                        <Routes>
                            <Route
                                path=""
                                element={
                                    <Dashboard consoleState={this.state} />
                                }
                            />
                            <Route
                                path="dashboard"
                                element={
                                    <Dashboard consoleState={this.state} />
                                }
                            />
                            <Route
                                path="bugs"
                                element={<Bugs consoleState={this.state} />}
                            />
                            <Route
                                path="archive"
                                element={<Archive consoleState={this.state} />}
                            />
                            <Route
                                path="feed"
                                element={<Feed consoleState={this.state} />}
                            />
                            <Route
                                path="team"
                                element={<Team consoleState={this.state} />}
                            />
                            <Route path="newTeam" element={<NewTeam />} />
                            <Route
                                path="bug/:bId"
                                element={<Bug consoleState={this.state} archive={false}/>}
                            />
                            <Route
                                path="bug/archive/:bId"
                                element={<Bug consoleState={this.state} archive={true}/>}
                            />
                            <Route
                                path="settings"
                                element={<Settings consoleState={this.state} />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
}

export default Console;
