import React from "react";

import "../../css/GetStarted.css";
import "../../css/root.css";

import Loading from "../Loading";
import Team from "../console-pages/Team";

var apiUrl = process.env.REACT_APP_APIURL;
class GettingStarted extends React.Component {
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
        return <div id="getStarted">
            <div>
                <h1>Add a Project</h1>
                <p>Create a new project</p>
            </div>
            <div class="newTeamDiv">
                <Team newUser={true} />
            </div>
        </div>
    }
}

export default GettingStarted;
