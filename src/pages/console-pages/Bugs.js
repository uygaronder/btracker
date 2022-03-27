import React from "react";
import "../../Bugs.css";

import plus from "../../res/svg/plus.svg";
import Submit from "./SubmitBug";

class Bugs extends React.Component {
    openSubmit=()=>{
        document.getElementById("submitBugPopup").classList.remove("submitClosed")
    }
    render() {
        return (
            <div id="bugs">
                <div id="bugsUp">
                    <div id="bugsInfo">
                        <h3>Project Name</h3>
                        <span />
                        <h4>Total Bugs: 11</h4>
                    </div>
                    <div id="bugsButton">
                        <h4>(Bug select option)</h4>
                        <button onClick={()=>{this.openSubmit()}}>
                            <img src={plus} alt="+" /> Submit a bug
                        </button>
                        <span id="submitBugPopup" className="submitClosed">
                            <Submit />
                        </span>
                    </div>
                </div>
                <table>
                    <tr>
                        <td id="bId">#</td>
                        <td>Bug</td>
                        <td>Priority</td>
                        <td>Status</td>
                        <td>Due</td>
                    </tr>
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
                    <tr className="complete high">
                        <td id="bId">TP-102</td>
                        <td>
                            This is a test bug text to fill space this is even
                            longer to make it double rows
                        </td>
                        <td>
                            <span className="priority">High</span>
                        </td>
                        <td>
                            <span className="status">Complete</span>
                        </td>
                        <td>27 Mar 2022</td>
                    </tr>
                    <tr className="overdue low">
                        <td id="bId">TP-104</td>
                        <td>This is a test bug text to fill space</td>
                        <td>
                            <span className="priority">Low</span>
                        </td>
                        <td>
                            <span className="status">overdue</span>
                        </td>
                        <td>27 Mar 2022</td>
                    </tr>
                    <tr className="pending med">
                        <td id="bId">TP-111</td>
                        <td>This is a test bug text to fill space</td>
                        <td>
                            <span className="priority">med</span>
                        </td>
                        <td>
                            <span className="status">pending</span>
                        </td>
                        <td>27 Mar 2022</td>
                    </tr>
                    <tr className="new low">
                        <td id="bId">TP-111</td>
                        <td>This is a test bug text to fill space</td>
                        <td>
                            <span className="priority">Low</span>
                        </td>
                        <td>
                            <span className="status">new</span>
                        </td>
                        <td>27 Mar 2022</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Bugs;
