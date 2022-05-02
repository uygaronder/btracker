import React from "react";
import "../../css/Bugs.css";

import plus from "../../res/svg/plus.svg";
import edit from "../../res/svg/edit.svg";
import complete from "../../res/svg/complete.svg";
import chevronUp from "../../res/svg/chevron-up.svg";

import Submit from "./SubmitBug";
import Loading from "../Loading";

const apiUrl = process.env.REACT_APP_APIURL;

class Bugs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    setData = () => {
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
            .then((data) => {
                let open = [];
                let ongoing = [];
                let inReview = [];
                let closed = [];
                for (let bug of data.bugs) {
                    switch (bug.status) {
                        case "open":
                            open.push(bug);
                            break;
                        case "ongoing":
                            ongoing.push(bug);
                            break;
                        case "inReview":
                            inReview.push(bug);
                            break;
                        case "closed":
                            closed.push(bug);
                            break;
                    }
                }
                this.setState({
                    changes: [],
                    open: open,
                    ongoing: ongoing,
                    inReview: inReview,
                    closed: closed,
                    project: data,
                    loading: false,
                });
            });
    };

    componentDidMount() {
        this.setData();
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

    handleClick(bId) {
        window.location.href = `/console/bug/${bId}`;
    }

    allowDrop(e) {
        e.preventDefault();
    }

    drag(e) {
        e.dataTransfer.setData("bugDiv", e.target.id);
    }

    resetCommit() {
        function getBugDiv(parentName) {
            return document
                .getElementById(parentName)
                .getElementsByClassName("bugsDiv")[0];
        }
        console.log(getBugDiv("openBugs"));
        console.log(this.renderBugs(this.state.open));
        getBugDiv("openBugs").innerHTML = this.renderBugs(this.state.open);

        console.log(getBugDiv("openBugs").innerHTML);

        this.state.changes = [];
        this.commitConfirmation();
    }

    commitConfirmation() {
        const commitBox = document.getElementById("commitChanges");
        this.state.changes.length > 0
            ? commitBox.classList.remove("commitHidden")
            : commitBox.classList.add("commitHidden");
    }

    drop(e) {
        e.preventDefault();
        let data = e.dataTransfer.getData("bugDiv");
        const target = document
            .getElementById(e.target.id)
            .getElementsByClassName("bugsDiv")[0];
        console.log(e.target.id);

        this.state.changes = this.state.changes.filter(
            (change) => change[0] != data
        );
        this.state.changes.push([data, e.target.id]);
        this.commitConfirmation();
        switch (e.target.id) {
            case "openBugs":
            case "ongoingBugs":
                target.appendChild(document.getElementById(data));
                break;
            case "closeBugs":
                const inReview = document
                    .getElementById(e.target.id)
                    .getElementsByClassName("bugsDiv")[0];
                true
                    ? document
                          .getElementById(e.target.id)
                          .getElementsByClassName("bugsDiv")[1]
                          .appendChild(document.getElementById(data))
                    : inReview.appendChild(document.getElementById(data));

                break;
        }
    }

    renderBugs(array) {
        return array.map((bug) => {
            let due = new Date(bug.due).toLocaleDateString();
            console.log(bug.labels);
            return (
                <div
                    id={bug._id}
                    className="bug"
                    draggable="true"
                    onDragStart={(e) => this.drag(e)}
                    onClick={() => this.handleClick(bug._id)}
                >
                    <div className="bugUpperInfo">
                        <span>{bug.bugTitle}</span>
                        <span>{bug.author.authorName}</span>
                    </div>
                    <div className="labels">
                        {
                            <span className={`label ${bug.priority}`}>
                                {bug.priority}
                            </span>
                        }
                        {bug.labels.map((label) => {
                            return (
                                <span
                                    className="label"
                                    style={{
                                        backgroundColor: label[1],
                                    }}
                                >
                                    {label[0]}
                                </span>
                            );
                        })}
                    </div>
                    <div className="bugDescription">
                        <p>{bug.description}</p>
                    </div>

                    <div className="bugBottomInfo">
                        <div>{due}</div>
                        <div>{bug.bugId}</div>
                    </div>
                </div>
            );
        });
    }

    toggleInReview() {
        const button = document.getElementById("inReviewExtendButton");
        const div = document.getElementById("inReviewBugs");

        if (div.classList.contains("inReviewHidden")) {
            div.classList.remove("inReviewHidden");
            button.classList.add("inReviewButtonActive");
        } else {
            div.classList.add("inReviewHidden");
            button.classList.remove("inReviewButtonActive");
        }
    }

    render() {
        if (this.state.loading) return <Loading />;
        return (
            <div id="bugs">
                <div id="bugsUpper">
                    <div id="bugsButton">
                        <button
                            onClick={() => {
                                this.openSubmit();
                            }}
                        >
                            <img src={plus} alt="+" /> Submit a bug
                        </button>
                        <span id="submitBugPopup" className="submitClosed">
                            <Submit consoleState={this.props.consoleState} />
                        </span>
                    </div>
                    <div id="commitChanges" className="commitHidden">
                        <p>Are you sure You want to commit these changes?</p>
                        <button>Accept</button>
                        <button
                            onClick={() => {
                                this.resetCommit();
                            }}
                        >
                            Reset
                        </button>
                    </div>
                    <form action="">
                        <input type="text" placeholder="Filter" />
                    </form>
                </div>
                <div id="bugDivContainer">
                    <div
                        id="openBugs"
                        onDrop={(e) => {
                            this.drop(e);
                        }}
                        onDragOver={(e) => {
                            this.allowDrop(e);
                        }}
                    >
                        <div className="bugsDivUpper">
                            <h3>Open Bugs</h3>
                            <p>{this.state.open.length} available</p>
                        </div>
                        <div className="bugsDiv">
                            {this.renderBugs(this.state.open)}
                        </div>
                    </div>
                    <div
                        id="ongoingBugs"
                        onDrop={(e) => {
                            this.drop(e);
                        }}
                        onDragOver={(e) => {
                            this.allowDrop(e);
                        }}
                    >
                        <div className="bugsDivUpper">
                            <h3>Ongoing Bugs</h3>
                            <p>{this.state.ongoing.length} available</p>
                        </div>
                        <div className="bugsDiv">
                            {this.renderBugs(this.state.ongoing)}
                        </div>
                    </div>
                    <div
                        id="closeBugs"
                        onDrop={(e) => {
                            this.drop(e);
                        }}
                        onDragOver={(e) => {
                            this.allowDrop(e);
                        }}
                    >
                        <div className="inReview">
                            <div className="bugsDivUpper">
                                <h3>In Review</h3>
                                <div className="inReviewInfo">
                                    <p>
                                        {this.state.inReview.length} available
                                    </p>
                                    <button
                                        id="inReviewExtendButton"
                                        onClick={() => {
                                            this.toggleInReview();
                                        }}
                                    >
                                        <img src={chevronUp} alt="extend" />
                                    </button>
                                </div>
                            </div>
                            <div
                                className="bugsDiv inReviewHidden"
                                id="inReviewBugs"
                            >
                                {this.renderBugs(this.state.inReview)}
                            </div>
                        </div>
                        <div className="bugsDivUpper">
                            <h3>Closed Bugs</h3>
                            <p>{this.state.closed.length} available</p>
                        </div>
                        <div className="bugsDiv">
                            {this.renderBugs(this.state.closed)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bugs;

/*

<div id="bugsUp">
                    <div id="bugsInfo">
                        <h3>{this.state.project.name}</h3>
                        <span />
                        <h4>Total Bugs: {this.state.project.bugs.length}</h4>
                    </div>
                    <div id="bugsFilter">
                        <input
                            id="filter"
                            placeholder="Filter labels,ids,etc"
                        />
                    </div>
                    <div id="bugsButton">
                        <h4>(Bug select option)</h4>
                        <button
                            onClick={() => {
                                this.openSubmit();
                            }}
                        >
                            <img src={plus} alt="+" /> Submit a bug
                        </button>
                        <span id="submitBugPopup" className="submitClosed">
                            <Submit consoleState={this.props.consoleState} />
                        </span>
                    </div>
                </div>
                <table>
                    <tr>
                        <td id="bId">#</td>
                        <td>Bug</td>
                        <td>Labels</td>
                        <td>Comments</td>
                        <td>Priority</td>
                        <td>Status</td>
                        <td>Due</td>
                    </tr>
                    {this.state.project.bugs.map((bug) => {
                        let due = new Date(bug.due).toLocaleDateString();
                        return (
                            <tr
                                onClick={() => this.handleClick(bug._id)}
                                className={`${bug.priority} ${bug.status}`}
                            >
                                <td className="bId">{bug.bugId}</td>
                                <td>{bug.bugTitle}</td>
                                <td className="bugsLabel">
                                    {bug.labels.map((label) => {
                                        return (
                                            <span
                                                className="label"
                                                style={{
                                                    backgroundColor: label[1],
                                                }}
                                            >
                                                {label[0]}
                                            </span>
                                        );
                                    })}
                                </td>
                                <td>
                                    {bug.assigned.map((assigned) => {
                                        return (
                                            <span className="assigned">
                                                {assigned}
                                            </span>
                                        );
                                    })}
                                </td>
                                <td>
                                    <span className="priority">
                                        {bug.priority}
                                    </span>
                                </td>
                                <td>
                                    <span className="status">{bug.status}</span>
                                </td>
                                <td>{due}</td>
                            </tr>
                        );
                    })}
                </table>

*/
