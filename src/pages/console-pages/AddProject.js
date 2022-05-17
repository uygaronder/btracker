import React from "react";

import "../../css/GetStarted.css";
import "../../css/root.css";

import Loading from "../Loading";
import Team from "./Team";

var apiUrl = process.env.REACT_APP_APIURL;
class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <div id="getStarted">
                <div id="upper">
                    <h1>Add a Project</h1>
                    <p>Create a new project to start adding bugs</p>
                </div>
                <div class="newTeamDiv">
                    <Team
                        consoleState={this.props.consoleState}
                        newUser={true}
                    />
                </div>
            </div>
        );
    }
}

export default AddProject;
