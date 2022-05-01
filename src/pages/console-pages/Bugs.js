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

    renderBugs(array) {
        return array.map((bug) => {
            let due = new Date(bug.due).toLocaleDateString();
            return (
                <div
                    className="bug"
                    draggable="true"
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
                <div id="bugDivContainer">
                    <div id="openBugs">
                        <div className="bugsDivUpper">
                            <h3>Open Bugs</h3>
                            <p>{this.state.open.length} available</p>
                        </div>
                        <div className="bugsDiv">
                            {this.renderBugs(this.state.open)}
                        </div>
                    </div>
                    <div id="ongoingBugs">
                        <div className="bugsDivUpper">
                            <h3>Ongoing Bugs</h3>
                            <p>{this.state.ongoing.length} available</p>
                        </div>
                        <div className="bugsDiv">
                            {this.renderBugs(this.state.ongoing)}
                        </div>
                    </div>
                    <div id="closeBugs">
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
