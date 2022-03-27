import React from "react";
import "../../SubmitBug.css"

class Submit extends React.Component{
    closeSubmit=()=>{
        document.getElementById("submitBugPopup").classList.add("submitClosed")
    }
    openSubmit=()=>{
        document.getElementById("submitBugPopup").classList.remove("submitClosed")
    }
    render(){
        return(
            <div id="submitBug">
                <div id="newBug">
                    <h3>Submit a New Bug</h3>
                    <div id="submitClose" onClick={()=>{this.closeSubmit()}}>&#10005;</div>
                </div>
                <form method="post" action="*" autocomplete="off">
                    <span>
                        <label htmlFor="bug">Bug:</label>
                        <input type="text" name="bug" id="bug"/>
                    </span>
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
                        <input type={"date"}/>
                    </span>
                    <input type={"submit"} />
                </form>
            </div>
        )
    }
}

export default Submit;