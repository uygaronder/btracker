import React from "react";
import "../../Team.css";

import Search from "../../res/svg/search.svg";
import more from "../../res/svg/more.svg";
var apiUrl = process.env.REACT_APP_APIURL;
console.log(apiUrl);
class Team extends React.Component {
    render() {
        return (
            <div id="team">
                <div id="teamHeader">
                    <h3>Team Name Placeholder</h3>
                </div>
                <div id="teamTabs">
                    <div id="teamUsers">
                        <form action="post">
                            <input
                                type="text"
                                name="inviteUsernameInput"
                                id="inviteUsernameInput"
                                placeholder="Username"
                            />
                            <button type="submit">Invite</button>
                        </form>
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Bug #</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>Test Person</th>
                                <th>Dev</th>
                                <th>0</th>
                                <th>
                                    <img src={more} alt="..." />
                                </th>
                            </tr>
                        </table>
                    </div>

                    <div id="teamProjects">
                        <form method="post" action={`${apiUrl}/createProject`}>
                            <input
                                type="text"
                                name="newProjectName"
                                id="projectNameInput"
                                placeholder="New Project Name"
                                required
                            />
                            <button>New Project</button>
                        </form>
                        <table>
                            <tr>
                                <th>Project Name</th>
                                <th>Open Bugs</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Team;
