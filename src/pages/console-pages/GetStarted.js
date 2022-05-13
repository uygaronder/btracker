import React from "react";

import "../../css/GetStarted.css";
import "../../css/root.css";

import Loading from "../Loading";
import NewTeam from "../console-pages/NewTeam";

var apiUrl = process.env.REACT_APP_APIURL;
class GettingStarted extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    componentDidMount() {

    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        return <div id="getStarted">
            <div>
                <h1>GettingStarted</h1>
                <p>To Get Started You must first join or create a Team</p>
            </div>
            <div class="newTeamDiv">
                <NewTeam newUser={true} />
            </div>
        </div>
    }
}

export default GettingStarted;
