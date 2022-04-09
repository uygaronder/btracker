import React from "react";
import "../../Team.css";

import Search from "../../res/svg/search.svg";
var apiUrl = process.env.REACT_APP_APIURL;

class Team extends React.Component {
    render() {
        return (
            <div id="team">
                <div>
                    <h3>Team Name Placeholder</h3>
                    <button>Invite</button>
                </div>

                <table>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Assigned Bug #</th>
                    </tr>
                    <tr>
                        <th>Test Person</th>
                        <th>Submit</th>
                        <th>4</th>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Team;
