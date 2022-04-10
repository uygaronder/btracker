import React from "react";
import "../../SubmitBug.css";

class Submit extends React.Component {
    closeSubmit = () => {
        document.getElementById("submitBugPopup").classList.add("submitClosed");
    };
    openSubmit = () => {
        document
            .getElementById("submitBugPopup")
            .classList.remove("submitClosed");
    };
    render() {
        return (
            <div id="submitBug">
                <div id="newBug">
                    <h3>New Bug</h3>
                    <div
                        id="submitClose"
                        onClick={() => {
                            this.closeSubmit();
                        }}
                    >
                        &#10005;
                    </div>
                </div>
                <form method="post" action="*" autoComplete="off">
                    <select name="project" id="">
                        <option value="p1">Current Project</option>
                    </select>
                    <input type="text" name="bug" id="bug" placeholder="Bug" />

                    <textarea
                        name="description"
                        id="description"
                        placeholder="Description..."
                        cols="30"
                        rows="10"
                    ></textarea>
                    <input type={"text"} placeholder="Labels (usage:label1,label2)"/>
                    <span>
                        <span>
                            <label htmlFor="priority">Priority:</label>
                            <select name="priority" id="priority">
                                <option value={"low"}>Low</option>
                                <option value={"medium"}>Medium</option>
                                <option value={"high"}>High</option>
                            </select>
                        </span>
                        <span>
                            <label htmlFor="due">Due:</label>
                            <input type={"date"} />
                        </span>
                    </span>
                    <input type={"submit"} value="Submit Bug" />
                </form>
            </div>
        );
    }
}

export default Submit;
