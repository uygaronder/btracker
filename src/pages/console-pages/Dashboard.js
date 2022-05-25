import React from "react";
import "../../css/Dashboard.css";

import Search from "../../res/svg/search.svg";
import plus from "../../res/svg/plus.svg";

import Submit from "./SubmitBug";
import Loading from "../Loading";
const apiUrl = process.env.REACT_APP_APIURL;
const APP_URL = process.env.REACT_APP_APPURL;
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            open: 0,
            ongoing: 0,
            inReview: 0,
            closed: 0,
            overdue: 0,
            dueDay: 0,
            dueWeek: 0,
            low: 0,
            med: 0,
            high: 0,
            filters: [],
            activeFilters: [],
            key: Math.random(),
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
        const projectId =
            this.props.consoleState.activeProject != undefined
                ? this.props.consoleState.activeProject
                : "";
        console.log(this.props.consoleState);
        if (!this.props.consoleState.team) {
            window.location.href = `${APP_URL}/console/gettingStarted`;
        } else if (this.props.consoleState.team.projects.length == 0) {
            console.log(APP_URL);
            window.location.href = `${APP_URL}/console/addProject`;
        }

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
            .then((data) => {
                for (let bug of data.bugs) {
                    switch (bug.status) {
                        case "open":
                            this.state.open++;
                            break;
                        case "closed":
                            this.state.closed++;
                            break;
                        case "ongoing":
                            this.state.ongoing++;
                            break;
                        case "inReview":
                            this.state.inReview++;
                            break;
                    }
                    if (bug.status != "closed") {
                        switch (bug.priority) {
                            case "low":
                                this.state.low++;
                                break;
                            case "med":
                                this.state.med++;
                                break;
                            case "high":
                                this.state.high++;
                        }
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
                    for (let label of bug.labels) {
                        let includes = false;
                        for (let filter of this.state.filters) {
                            if (filter[0] == label) {
                                filter[1]++;
                                includes = true;
                            }
                        }
                        if (!includes) {
                            this.state.filters.push([label, 1]);
                        }
                    }
                }
                this.setState({
                    project: data,
                    loading: false,
                    bugs: data.bugs,
                });
            });
    };

    componentDidMount() {
        this.setData();
    }

    handleClick(bId) {
        window.location.href = `/console/bug/${bId}`;
    }

    toggleTeamFilterContainer() {
        const container = document.getElementById("teamFiltersContainer");

        container.classList.contains("teamFiltersActive")
            ? container.classList.remove("teamFiltersActive")
            : container.classList.add("teamFiltersActive");
    }

    returnAvatar(item) {
        console.log(item);
    }

    filterBugs(e) {
        console.log(e.target.value);
        this.state.bugs = this.state.project.bugs;
        const filtered = this.state.bugs.filter((bug) => {
            return bug.bugTitle
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
        });
        this.setState({ bugs: filtered });
    }

    applyFilter(id, filterName, filterBy) {
        this.state.bugs = this.state.project.bugs;
        const div = document.getElementById(id);
        if (div.classList.contains("toggled")) {
            div.classList.remove("toggled");
            this.state.activeFilters = this.state.activeFilters.filter(
                (filter) => filter[0] != filterName
            );
        } else {
            div.classList.add("toggled");
            this.state.activeFilters.push([filterName, filterBy]);
        }
        for (let activeFilter of this.state.activeFilters) {
            switch (activeFilter[1]) {
                case "priority":
                case "status":
                    for (let filter of this.state.activeFilters) {
                        this.state.bugs = this.state.bugs.filter(
                            (bug) => bug[filter[1]] == filter[0]
                        );
                    }
                    break;
                case "labels":
                    for (let filter of this.state.activeFilters) {
                        this.state.bugs = this.state.bugs.filter((bug) =>
                            bug[filter[1]].includes(filter[0])
                        );
                    }
                    break;
                //broken
                case "date":
                    switch (activeFilter[0]) {
                        case "overdue":
                            this.state.bugs = this.state.bugs.filter(
                                (bug) => Date.parse(bug.due) < Date.now()
                            );
                            break;
                        case "day":
                            this.state.bugs = this.state.bugs.filter(
                                (bug) =>
                                    Date.parse(bug.due) <
                                        Date.now() + 1000 * 60 * 60 * 24 * 1 &&
                                    Date.parse(bug.due) > Date.now()
                            );
                            break;

                            break;
                    }
                    break;
            }
        }
        this.setState({
            key: Math.random(),
        });
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
                            onChange={(e) => this.filterBugs(e)}
                        />
                        <label htmlFor="search">
                            <img src={Search} />
                        </label>
                    </span>
                </div>
                <div id="dashboardBugs" key={this.state.key}>
                    <table>
                        <tr>
                            <td id="bId">#</td>
                            <td>Bug</td>
                            <td>Priority</td>
                            <td>Status</td>
                            <td>Due</td>
                        </tr>
                        {this.state.bugs.map((bug) => {
                            const dateObj = new Date(bug.due);
                            let due = dateObj.toLocaleDateString();
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
                    </table>
                </div>
                <div id="buttonPlacementDiv">
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
                <div id="side">
                    <div id="dashboardStats">
                        <h2>Bug Status</h2>
                        <div id="bugFilters">
                            <span
                                className="filter openFilter"
                                id="openFB"
                                onClick={() =>
                                    this.applyFilter("openFB", "open", "status")
                                }
                            >
                                <p>
                                    <strong>{this.state.open}</strong> Open
                                </p>
                            </span>
                            <span
                                className="filter ongoingFilter"
                                id="ongoingFB"
                                onClick={() =>
                                    this.applyFilter(
                                        "ongoingFB",
                                        "ongoing",
                                        "status"
                                    )
                                }
                            >
                                <p>
                                    <strong>{this.state.ongoing}</strong>{" "}
                                    Ongoing
                                </p>
                            </span>
                            {/* <span
                                className="filter closeFilter"
                                id="closedFB"
                                onClick={() =>
                                    this.applyFilter(
                                        "closedFB",
                                        "closed",
                                        "status"
                                    )
                                }
                            >
                                <p>
                                    <strong>{this.state.closed}</strong> Closed
                                </p>
                            </span> */}
                            <span
                                className="filter inReviewFilter"
                                id="inReviewFB"
                                onClick={() =>
                                    this.applyFilter(
                                        "inReviewFB",
                                        "inReview",
                                        "status"
                                    )
                                }
                            >
                                <p>
                                    <strong>{this.state.inReview}</strong> In
                                    Review
                                </p>
                            </span>
                            <span
                                className="filter lowFilter"
                                id="lowFB"
                                onClick={() =>
                                    this.applyFilter("lowFB", "low", "priority")
                                }
                            >
                                <p>
                                    <strong>{this.state.low}</strong> Low
                                    Priority
                                </p>
                            </span>
                            <span
                                className="filter medFilter"
                                id="medFB"
                                onClick={() =>
                                    this.applyFilter("medFB", "med", "priority")
                                }
                            >
                                <p>
                                    <strong>{this.state.med}</strong> Medium
                                    Priority
                                </p>
                            </span>
                            <span
                                className="filter highFilter"
                                id="highFB"
                                onClick={() =>
                                    this.applyFilter(
                                        "highFB",
                                        "high",
                                        "priority"
                                    )
                                }
                            >
                                <p>
                                    <strong>{this.state.high}</strong> High
                                    Priority
                                </p>
                            </span>
                            <span
                                className="filter dayFilter"
                                id="dayFB"
                                onClick={() =>
                                    this.applyFilter("dayFB", "day", "date")
                                }
                            >
                                <p>
                                    <strong>{this.state.dueDay}</strong> due
                                    Today
                                </p>
                            </span>
                            <span
                                className="filter weekFilter"
                                id="weekFB"
                                onClick={() =>
                                    this.applyFilter("weekFB", "week", "date")
                                }
                            >
                                <p>
                                    <strong>{this.state.dueWeek}</strong> due
                                    this Week
                                </p>
                            </span>
                            <span
                                className="filter overdueFilter"
                                id="overdueFB"
                                onClick={() =>
                                    this.applyFilter(
                                        "overdueFB",
                                        "overdue",
                                        "date"
                                    )
                                }
                            >
                                <p>
                                    <strong>{this.state.overdue}</strong>{" "}
                                    overdue
                                </p>
                            </span>
                            <div id="teamFilters">
                                <span id="teamFiltersContainer">
                                    {this.state.filters.length == 0 && (
                                        <p id="emptyFiltersPrompt">
                                            There are no Team filters
                                        </p>
                                    )}
                                    {this.state.filters.map((filter) => {
                                        return (
                                            <span
                                                id={`${filter[0]}FB`}
                                                onClick={() =>
                                                    this.applyFilter(
                                                        `${filter[0]}FB`,
                                                        filter[0],
                                                        "labels"
                                                    )
                                                }
                                                className="filter teamFilter"
                                                style={{
                                                    "background-color":
                                                        this.props.consoleState
                                                            .team.labels[
                                                            filter[0]
                                                        ],
                                                    "border-color":
                                                        this.props.consoleState
                                                            .team.labels[
                                                            filter[0]
                                                        ],
                                                }}
                                            >
                                                <p>
                                                    <strong>{filter[1]}</strong>
                                                    {` ${filter[0]}`}
                                                </p>
                                            </span>
                                        );
                                    })}
                                </span>
                                <button
                                    className="filter"
                                    onClick={() =>
                                        this.toggleTeamFilterContainer()
                                    }
                                >
                                    Team Filters
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="dashboardFeed">
                        <h2>Feed</h2>
                        <div id="feedDiv">
                            {this.props.consoleState.team.feed
                                .slice(0, 20)
                                .map((item) => {
                                    const dateObj = new Date(item.date);
                                    const date = dateObj.toLocaleDateString();
                                    const time = dateObj.toLocaleTimeString(
                                        [],
                                        {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }
                                    );
                                    return (
                                        <div className="feedItem">
                                            <div className={`feedAvatarBack`}>
                                                <div
                                                    className={`feedAvatar ${item.feedType}`}
                                                ></div>
                                                {item.type
                                                    ? this.returnAvatar(item)
                                                    : ""}
                                            </div>
                                            <div className="feedText">
                                                <div>
                                                    <h4>
                                                        {
                                                            item.source
                                                                .sourceString
                                                        }
                                                    </h4>
                                                    <span className="updateTime">
                                                        {`${time} ${date}`}
                                                    </span>
                                                </div>
                                                <p>{item.feedText}</p>
                                                <div className="feedButtons"></div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
