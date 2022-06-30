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
            key: 0,
            loading: true,
            thumbnail: true,
        };
    }

    setData = () => {
        const projectId =
            this.props.consoleState.activeProject != undefined
                ? this.props.consoleState.activeProject
                : "";
        fetch(`${apiUrl}/console/getProjectInfo`, {
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
        //for bugsDiv rerender
        this.setState({ key: Math.random() });
        //--------------------
        this.state.changes = [];
        this.commitConfirmation();
    }

    commitConfirmation() {
        const commitBox = document.getElementById("commitChanges");
        this.state.changes.length > 0
            ? commitBox.classList.remove("commitHidden")
            : commitBox.classList.add("commitHidden");
    }

    commit(changes, project, state) {
        fetch(`${apiUrl}/bug/commit`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                changes: changes,
                projectId: project,
                state: state,
            }),
        })
            .then((res) => res.text())
            .then((data) => {
                if (data == "success") {
                    window.location.reload();
                }
            });
    }

    drop(e) {
        e.preventDefault();
        let data = e.dataTransfer.getData("bugDiv");

        const divs = ["openBugs", "ongoingBugs", "closeBugs", "inReview"];
        let bugsDiv = e.target;
        console.log(!e.target.id);
        if (e.target.id && divs.includes(e.target.id)) {
            bugsDiv = document
                .getElementById(e.target.id)
                .getElementsByClassName("bugsDiv")[0];
        } else {
            while (!bugsDiv.classList.contains("bugsDiv")) {
                bugsDiv = bugsDiv.parentNode;
            }
        }

        this.state.changes = this.state.changes.filter(
            (change) => change[0] != data
        );
        this.state.changes.push([data, e.target.id]);
        this.commitConfirmation();
        switch (bugsDiv.parentNode.id) {
            case "openBugs":
            case "ongoingBugs":
                bugsDiv.appendChild(document.getElementById(data));
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

    renderBugs(array, state) {
        return array.map((bug) => {
            let due = new Date(bug.due).toLocaleDateString();
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
                                        backgroundColor:
                                            state.team.labels[label],
                                    }}
                                >
                                    {label}
                                </span>
                            );
                        })}
                    </div>
                    {bug.pictures &&
                        bug.pictures.length > 0 &&
                        this.state.thumbnail && (
                            <img
                                className="thumbnail"
                                src={bug.pictures[0]}
                                draggable="false"
                            />
                        )}
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
                        <button
                            onClick={() => {
                                this.commit(
                                    this.state.changes,
                                    this.props.consoleState.activeProject,
                                    this.props.consoleState
                                );
                            }}
                        >
                            Accept
                        </button>
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
                        <div className="bugsDiv" key={this.state.key}>
                            {this.renderBugs(
                                this.state.open,
                                this.props.consoleState
                            )}
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
                        <div className="bugsDiv" key={this.state.key}>
                            {this.renderBugs(
                                this.state.ongoing,
                                this.props.consoleState
                            )}
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
                        <div className="inReview bugsDiv">
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
                                className="inReviewHidden"
                                id="inReviewBugs"
                                key={this.state.key}
                            >
                                {this.renderBugs(
                                    this.state.inReview,
                                    this.props.consoleState
                                )}
                            </div>
                        </div>
                        <div className="bugsDivUpper">
                            <h3>Closed Bugs</h3>
                            <p>Last Closed</p>
                        </div>
                        <div className="bugsDiv" key={this.state.key}>
                            {this.renderBugs(
                                this.state.closed,
                                this.props.consoleState
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bugs;
