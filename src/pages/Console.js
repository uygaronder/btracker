import React from "react";

import { Link, Routes, Route } from "react-router-dom";

import "../css/console.css";
import logo from "../res/anteater.png";
import bug from "../res/svg/bug.svg";
import dashboard from "../res/svg/dashboard.svg";
import archive from "../res/svg/archive.svg";
import stopwatch from "../res/svg/stopwatch.svg";
import cog from "../res/svg/cog.svg";
import feed from "../res/svg/feed.svg";
import notification from "../res/svg/notification.svg";
import chevron from "../res/svg/chevron-up.svg";
import paper from "../res/svg/paper.svg";

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
import GettingStarted from "./console-pages/GetStarted";
import AddProject from "./console-pages/AddProject";
import Invite from "./console-pages/invitePeople";
import InReview from "./console-pages/InReview";
import { act } from "react-dom/test-utils";

const apiUrl = process.env.REACT_APP_APIURL;
const APP_URL = process.env.REACT_APP_APPURL;
class Console extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamOptions: [],
            notifications: [],
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
        fetch(`${apiUrl}/console/darkmode`, {
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
        this.darkCheck.checked
            ? consoleDiv.classList.remove("light")
            : consoleDiv.classList.add("light");
    };

    handleConsoleDropdown = () => {
        const consoleDropdown = document.getElementById("dropdownDiv");
        consoleDropdown.style.display == "none"
            ? (consoleDropdown.style.display = "block")
            : (consoleDropdown.style.display = "none");
    };

    handleTeamChange = () => {
        console.log(this.state);
        switch (document.getElementById("teamSelect").value) {
            case "new":
                window.location.href = `${APP_URL}/console/newTeam`;
                break;
            default:
                fetch(`${apiUrl}/console/changeTeam`, {
                    method: "post",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        teamId: document.getElementById("teamSelect").value,
                    }),
                })
                    .then((res) => res.text())
                    .then((data) => {
                        if (data == "success") {
                            window.location.reload();
                        }
                    });
                break;
        }
    };

    handleHamburgerMenu(){
        const hamburgerMenu = document.getElementById("hamburgerMenu");
        const sideNavMobile = document.getElementById("sideNavMobile");
        hamburgerMenu.classList.toggle("hamburgerActive");
        sideNavMobile.classList.toggle("sideNavMobileActive");
    }

    closeHamburgerMenu(){
        const hamburgerMenu = document.getElementById("hamburgerMenu");
        const sideNavMobile = document.getElementById("sideNavMobile");
        hamburgerMenu.classList.remove("hamburgerActive");
        sideNavMobile.classList.remove("sideNavMobileActive");
    }

    clearNotifications() {
        fetch(`${apiUrl}/clearNotifs`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(this.setState({ notifications: [] }));
    }

    handleProjectChange = () => {
        switch (document.getElementById("projectSelect").value) {
            case "new":
                window.location.href = `${APP_URL}/console/team`;
                break;
            default:
                fetch(`${apiUrl}/console/changeProject`, {
                    method: "post",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        projectId:
                            document.getElementById("projectSelect").value,
                    }),
                })
                    .then((res) => res.text())
                    .then((data) => {
                        if (data == "success") {
                            window.location.reload();
                        }
                    });
                break;
        }
    };

    fetchInfo = async () => {
        let response;
        await fetch(`${apiUrl}/console/getConsoleInfo`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => (response = data));

        let activeProject;
        let activeTeam;
        console.log(response);
        if (response.team == null) {
            activeProject = null;
            activeTeam = null;
        } else {
            let res = response.team.projects.filter(
                (project) => project[1] == response.user.activeProject
            );
            if (res.length > 0) {
                activeProject = res[0][1];
            }
        }
        
        if (
            activeProject == null &&
            response.team != null &&
            response.team.projects.length > 0
        ) {
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
            invites: response.user.invites,
        });
        document.getElementById("darkCheck").checked =
            this.state.settings.darkTheme;
        document.getElementById("darkCheck").addEventListener("change", () => {
            this.darkmodeApi();
        });
        if (this.state.settings.darkTheme) {
            this.darkTheme();
        }
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
    };

    componentDidMount() {
        this.fetchInfo();
        document.title = "Console";
        const intervalId = setInterval(() => {
            fetch(`${apiUrl}/console/checkNotifs`, {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (response.status != 200) {
                        window.location.reload();
                    } else {
                        response.json();
                    }
                })
                .then((data) => this.setState({ notifs: data.notifications }));
        }, 30000);
        this.setState({ intervalId });
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        console.log(this.state);
        return (
            <div id="console" ref={(div) => (this.consoleDiv = div)}>
                <nav>
                    <div>
                        <Link to="/">
                            <img id="navLogo" src={logo} alt="Logo" />
                        </Link>
                        <ul>
                            <li id="hamburgerMenu" onClick={() => this.handleHamburgerMenu()} className="hamburgerMenuButton showMobile">
                                <span />
                                <span />
                                <span />
                            </li>
                            <li className="hideMobile">
                                <select
                                    id="teamSelect"
                                    onChange={() => this.handleTeamChange()}
                                    defaultValue={this.state.activeTeam}
                                >
                                    {this.state.teamOptions.map((team) => {
                                        return (
                                            <option value={team[1]}>
                                                {team[0]}
                                            </option>
                                        );
                                    })}
                                    <option value="new">New Team</option>
                                </select>
                            </li>
                            <li className="hideMobile">
                                <select
                                    name="project"
                                    id="projectSelect"
                                    onChange={() => this.handleProjectChange()}
                                    defaultValue={this.state.activeProject}
                                >
                                    {this.state.team &&
                                        this.state.team.projects.map(
                                            (project) => {
                                                return (
                                                    <option value={project[1]}>
                                                        {project[0]}
                                                    </option>
                                                );
                                            }
                                        )}
                                    <option value="new">New Project</option>
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
                                    <span
                                        id="notification"
                                        key={this.state.notifications}
                                    >
                                        {this.state.notifications.length}
                                    </span>
                                </span>

                                <div
                                    id="notificationsBox"
                                    style={{ display: "none" }}
                                    key={this.state.notifications}
                                >
                                    {this.state.notifications.length != 0 ? (
                                        <div className="clearDiv">
                                            <button
                                                onClick={() =>
                                                    this.clearNotifications()
                                                }
                                            >
                                                Clear Notifications
                                            </button>
                                        </div>
                                    ) : (
                                        <div />
                                    )}
                                    {this.state.notifications.length != 0 ? (
                                        this.state.notifications.map(
                                            (notif) => {
                                                console.log(notif);
                                                return (
                                                    <div className="notificationItem">
                                                        <p className="notifSource">
                                                            {notif.team.name}/
                                                            {notif.project.name}
                                                        </p>
                                                        <p>{notif.text}</p>
                                                        <p className="notifDate">
                                                            {new Date(
                                                                notif.date
                                                            ).toLocaleString()}
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
                                    <span className="avatar">
                                        {this.state.avatar && (
                                            <img
                                                src={this.state.avatar}
                                                key={this.state.avatar}
                                            />
                                        )}
                                    </span>
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
                                                action={`${apiUrl}/login/logout?_method=DELETE`}
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
                    <div id="sideNavMobile">
                        <li>
                            <select
                                id="teamSelectMobile"
                                onChange={() => this.handleTeamChange()}
                                defaultValue={this.state.activeTeam}
                            >
                                {this.state.teamOptions.map((team) => {
                                    return (
                                        <option value={team[1]}>
                                            {team[0]}
                                        </option>
                                    );
                                })}
                                <option value="new">New Team</option>
                            </select>
                        </li>
                        <li>
                            <select
                                name="project"
                                id="projectSelectMobile"
                                onChange={() => this.handleProjectChange()}
                                defaultValue={this.state.activeProject}
                            >
                                {this.state.team &&
                                    this.state.team.projects.map(
                                        (project) => {
                                            return (
                                                <option value={project[1]}>
                                                    {project[0]}
                                                </option>
                                            );
                                        }
                                    )}
                                <option value="new">New Project</option>
                            </select>
                        </li>
                        <li onClick={() => this.closeHamburgerMenu()}>
                            <Link className="link" to="/console/dashboard">
                                <span>
                                    <img src={dashboard} alt="Home" />
                                    <p>Dashboard</p>
                                </span>
                            </Link>
                        </li>
                        <li onClick={() => this.closeHamburgerMenu()}>
                            <Link className="link" to="/console/bugs">
                                <span>
                                    <img src={bug} alt="Bugs" />
                                    <p>Bugs</p>
                                </span>
                            </Link>
                        </li>
                        <li onClick={() => this.closeHamburgerMenu()}>
                            <Link className="link" to="/console/archive">
                                <span>
                                    <img src={archive} alt="Archive" />
                                    <p>Archive</p>
                                </span>
                            </Link>
                        </li>
                        <li onClick={() => this.closeHamburgerMenu()}>
                            <Link className="link" to="feed">
                                <span>
                                    <img src={feed} alt="Feed" />
                                    <p>Feed</p>
                                </span>
                            </Link>
                        </li>
                        {this.state.team && this.state.team.users.filter(
                            (user) => user[0] == this.state.usrId
                        )[0][1] == "lead" && (
                            <li onClick={() => this.closeHamburgerMenu()}>
                                <Link className="link" to="/console/inReview">
                                <span>
                                    <img src={paper} alt="Paper" />
                                    <p>Review</p>
                                </span>
                                </Link>
                            </li>
                            
                        )}
                        <li onClick={() => this.closeHamburgerMenu()}>
                            <Link className="link" to="settings">
                                <span>
                                    <img src={cog} />
                                    <p>Settings</p>
                                </span>
                            </Link>
                        </li>
                    </div>
                    <div id="sideNav">
                        <ul>
                            <Link className="link" to="/console/dashboard">
                                <span>
                                    <img src={dashboard} alt="Home" />
                                    <p>Dashboard</p>
                                </span>
                            </Link>

                            <Link className="link" to="/console/bugs">
                                <span>
                                    <img src={bug} alt="Bugs" />
                                    <p>Bugs</p>
                                </span>
                            </Link>

                            <Link className="link" to="/console/archive">
                                <span>
                                    <img src={archive} alt="Archive" />
                                    <p>Archive</p>
                                </span>
                            </Link>
                            {/* 
                            <Link className="link" to="*">
                                <span>
                                    <img src={stopwatch} alt="Home" />
                                    <p>Timesheet</p>
                                </span>
                            </Link>
                            */}

                            <Link className="link" to="feed">
                                <span>
                                    <img src={feed} alt="Feed" />
                                    <p>Feed</p>
                                </span>
                            </Link>
                            {this.state.team && this.state.team.users.filter(
                                (user) => user[0] == this.state.usrId
                            )[0][1] == "lead" && (
                                <Link className="link" to="/console/inReview">
                                    <span>
                                        <img src={paper} alt="Paper" />
                                        <p>Review</p>
                                    </span>
                                </Link>
                            )}
                        </ul>
                        <ul>
                            <Link className="link" to="settings">
                                <span>
                                    <img src={cog} />
                                    <p>Settings</p>
                                </span>
                            </Link>
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
                                path="team/invite"
                                element={
                                    <Invite
                                        consoleState={this.state}
                                        archive={true}
                                    />
                                }
                            />
                            <Route
                                path="team"
                                element={<Team consoleState={this.state} />}
                            />
                            <Route
                                path="newTeam"
                                element={<NewTeam consoleState={this.state} />}
                            />
                            <Route
                                path="bug/:bId"
                                element={
                                    <Bug
                                        consoleState={this.state}
                                        archive={false}
                                    />
                                }
                            />
                            <Route
                                path="archive/:bId"
                                element={
                                    <Bug
                                        consoleState={this.state}
                                        archive={true}
                                    />
                                }
                            />
                            <Route
                                path="settings"
                                element={<Settings consoleState={this.state} />}
                            />
                            <Route
                                path="gettingStarted"
                                element={
                                    <GettingStarted
                                        consoleState={this.state}
                                        archive={true}
                                    />
                                }
                            />
                            <Route
                                path="addProject"
                                element={
                                    <AddProject
                                        consoleState={this.state}
                                        archive={true}
                                    />
                                }
                            />
                            <Route
                                path="inReview"
                                element={
                                    <InReview
                                        consoleState={this.state}
                                        archive={true}
                                    />
                                }
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
