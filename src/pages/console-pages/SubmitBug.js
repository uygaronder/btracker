import React,  {useState} from "react";
import "../../css/SubmitBug.css";
var apiUrl = process.env.REACT_APP_APIURL;
class Submit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labelsString: !this.props.bug
                ? ""
                : this.props.bug.labels.map((label) => label).join(","),
            images: []
        };
        
    }
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
                    <h3>{!this.props.bug ? "New Bug" : "Edit Bug"} </h3>
                    {!this.props.bug ? (
                        <div
                            id="submitClose"
                            onClick={() => {
                                this.closeSubmit();
                            }}
                        >
                            &#10005;
                        </div>
                    ) : (
                        <div />
                    )}
                </div>
                <form
                    method="post"
                    action={`${apiUrl}/${
                        this.props.bug ? "editBug" : "postBug"
                    }`}
                    autoComplete="off"
                >
                    <input
                        type="text"
                        name="bug"
                        id="bugTitle"
                        placeholder="Bug"
                        defaultValue={
                            this.props.bug ? this.props.bug.bugTitle : ""
                        }
                        required
                    />

                    <textarea
                        name="description"
                        id="description"
                        placeholder="Description..."
                        cols="30"
                        rows="10"
                        defaultValue={
                            this.props.bug ? this.props.bug.description : ""
                        }
                    ></textarea>
                    <input
                        name="labels"
                        type={"text"}
                        placeholder="Labels (usage example:bug, front-end)"
                        defaultValue={this.state.labelsString}
                    />
                    <span>
                        <span>
                            <label htmlFor="priority">Priority:</label>
                            <select
                                name="priority"
                                id="priority"
                                defaultValue={
                                    this.props.bug
                                        ? this.props.bug.priority
                                        : "low"
                                }
                            >
                                <option value={"low"}>Low</option>
                                <option value={"med"}>Medium</option>
                                <option value={"high"}>High</option>
                            </select>
                        </span>
                        <span>
                            <label htmlFor="due">Due:</label>
                            <input name="due" type={"date"} />
                        </span>
                    </span>
                    <input
                        type="hidden"
                        name="project"
                        value={this.props.consoleState.activeProject}
                    />
                    <input
                        type="hidden"
                        name="name"
                        value={this.props.consoleState.usrName}
                    />
                    {this.props.bug ? (
                        <input
                            type={"hidden"}
                            name="bugId"
                            value={this.props.bug._id}
                        />
                    ) : (
                        <input type={"hidden"} />
                    )}
                    <input type={"submit"} value="Submit Bug" onClick={()=>this.checkAndSendImages()}/>
                </form>
            </div>
        );
    }
}

export default Submit;
