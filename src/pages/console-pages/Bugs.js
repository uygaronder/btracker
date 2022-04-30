import React from "react";
import "../../css/Bugs.css";

import plus from "../../res/svg/plus.svg";
import edit from "../../res/svg/edit.svg";
import complete from "../../res/svg/complete.svg";

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
            .then((data) => this.setState({ project: data, loading: false }));
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

    render() {
        if (this.state.loading) return <Loading />;
        return (
            <div id="bugs">
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
            </div>
        );
    }
}

export default Bugs;
