import React from "react";
import "../../Dashboard.css";

import Search from "../../res/svg/search.svg";
import plus from "../../res/svg/plus.svg";

import Submit from "./SubmitBug";
import Loading from "../Loading";
var apiUrl = process.env.REACT_APP_APIURL;
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            open: 0,
            closed: 0,
            overdue: 0,
            dueDay: 0,
            dueWeek: 0,
        };
    }

    openSubmit = () => {
        if (
            !document
                .getElementById("submitBugPopup")
                .classList.contains("submitClosed")
        ) {
            document
                .getElementById("submitBugPopup")
                .classList.add("submitClosed");
        } else {
            document
                .getElementById("submitBugPopup")
                .classList.remove("submitClosed");
        }
    };

    setData = () => {
        console.log(this.props.consoleState);
        const projectId =
            this.props.consoleState.activeProject != undefined
                ? this.props.consoleState.activeProject
                : "";
        fetch(`${apiUrl}/getProjectInfo`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: `${projectId}`,
                activeTeam: this.props.consoleState.activeTeam,
            }),
        })
            .then((res) => res.json())
            .then((data) => this.setState({ project: data, loading: false }));
    };

    componentDidMount() {
        this.setData();
    }

    handleClick(bId) {
        window.location.href = `/console/bug/${bId}`;
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <div id="dashboard">
                <div id="dashboardInfo">
                    <div id="dashboardTitle">
                        <h2>Dashboard</h2>
                        <h4>{this.state.name}</h4>
                    </div>

                    <span id="dashboardSearch">
                        <input
                            type={"text"}
                            id="bugSearch"
                            name="search"
                            placeholder="Search Bugs"
                        />
                        <label htmlFor="search">
                            <img src={Search} />
                        </label>
                    </span>
                </div>
                <div id="dashboardBugs">
                    <table>
                        <tr>
                            <td id="bId">#</td>
                            <td>Bug</td>
                            <td>Priority</td>
                            <td>Status</td>
                            <td>Due</td>
                        </tr>
                        {this.state.project.bugs.map((bug) => {
                            let due = new Date(bug.due).toLocaleDateString();
                            console.log(bug);
                            if (bug.status == "open") {
                                this.state.open++;
                            } else if (bug.status == "closed") {
                                this.state.closed++;
                            }
                            if (bug.status != "closed") {
                                if (Date.parse(bug.due) < Date.now()) {
                                    this.state.overdue++;
                                } else if (
                                    Date.parse(bug.due) <
                                    Date.now() + 1000 * 60 * 60 * 24 * 1
                                ) {
                                    this.state.dueDay++;
                                } else if (
                                    Date.parse(bug.due) <
                                    Date.now() + 1000 * 60 * 60 * 24 * 7
                                ) {
                                    this.state.dueWeek++;
                                }
                            }

                            return (
                                <tr
                                    onClick={() => this.handleClick(bug._id)}
                                    className={`${bug.priority} ${bug.status}`}
                                >
                                    <td className="bId">{bug.bugId}</td>
                                    <td>{bug.bugTitle}</td>
                                    <td>
                                        <span className="priority">
                                            {bug.priority}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="status">
                                            {bug.status}
                                        </span>
                                    </td>
                                    <td>{due}</td>
                                </tr>
                            );
                        })}
                        {/*
                        <tr className="ongoing high">
                            <td id="bId">TP-101</td>
                            <td>This is a test bug text to fill space</td>
                            <td>
                                <span className="priority">High</span>
                            </td>
                            <td>
                                <span className="status">ongoing</span>
                            </td>
                            <td>27 Mar 2022</td>
                        </tr>
                        
                        */}
                    </table>
                    <button
                        id="submitBug"
                        onClick={() => {
                            this.openSubmit();
                        }}
                    >
                        <img src={plus} alt="+" /> <p>Submit a Bug</p>
                    </button>
                    <span id="submitBugPopup" className="submitClosed">
                        <Submit consoleState={this.props.consoleState} />
                    </span>
                </div>
                <div id="dashboardStats">
                    <h2>Bug Status</h2>
                    <ul id="dashboardStatus">
                        <li id="openStatus">
                            <h2>{this.state.open}</h2>
                            <p>Open Bugs</p>
                        </li>
                        <li id="closeStatus">
                            <h2>{this.state.closed}</h2>
                            <p>Closed Bugs</p>
                        </li>
                        <li id="overStatus">
                            <h2>{this.state.overdue}</h2>
                            <p>Overdue</p>
                        </li>
                        <li id="dayStatus">
                            <h2>{this.state.dueDay}</h2>
                            <p>Due Today</p>
                        </li>
                        <li id="weekStatus">
                            <h2>{this.state.dueWeek}</h2>
                            <p>Due This Week</p>
                        </li>
                    </ul>
                </div>
                <div id="dashboardFeed">
                    <h2>Feed</h2>
                    <div id="dashboardFeedText">
                        <div className="feedItem">
                            <div>
                                <h4>Update Source</h4>
                                <span className="updateTime">
                                    7:12 PM 25/3/2022
                                </span>
                            </div>
                            <p>This is a placeholder update to take up space</p>
                        </div>
                        <div className="feedItem">
                            <div>
                                <h4>Update Source</h4>
                                <span className="updateTime">
                                    7:12 PM 25/3/2022
                                </span>
                            </div>
                            <p>
                                This is a placeholder update to take up space
                                just like the upper one except longer
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
