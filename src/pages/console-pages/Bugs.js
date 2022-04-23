import React from "react";
import "../../Bugs.css";

import plus from "../../res/svg/plus.svg";
import Submit from "./SubmitBug";
import edit from "../../res/svg/edit.svg";
import complete from "../../res/svg/complete.svg";

class Bugs extends React.Component {
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
    edit = (bugId) => {
        console.log(bugId);
    };
    complete = () => {
        console.log("complete");
    };
    render() {
        return (
            <div id="bugs">
                <div id="bugsUp">
                    <div id="bugsInfo">
                        <h3>Project Name</h3>
                        <span />
                        <h4>Total Bugs: 11</h4>
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
                        <td>Assigned</td>
                        <td>Priority</td>
                        <td>Status</td>
                        <td>Due</td>
                    </tr>
                    <tr className="ongoing high">
                        <td id="bId">TP-101</td>
                        <td>This is a test bug text to fill space</td>
                        <td>
                            <span className="label">front-end</span>
                        </td>
                        <td>Usera</td>
                        <td>
                            <span className="priority">High</span>
                        </td>
                        <td>
                            <span className="status">ongoing</span>
                        </td>
                        <td>27 Mar 2022</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Bugs;
