import React from "react";
import "../../css/Team.css";

import Search from "../../res/svg/search.svg";
import more from "../../res/svg/more.svg";
var apiUrl = process.env.REACT_APP_APIURL;
console.log(apiUrl);
class Team extends React.Component {
    componentDidMount() {
        console.log(this.props.consoleState);
    }
    render() {
        return (
            <div id="team">
                {!this.props.newUser && (
                    <div id="teamHeader">
                        <h3>{this.props.consoleState.team.name}</h3>
                    </div>
                )}

                <div id="teamTabs">
                    {!this.props.newUser && (
                        <div id="teamUsers">
                            <table>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Bug #</th>
                                    <th></th>
                                </tr>

                                {this.props.consoleState.team.users.map(
                                    (user) => {
                                        return (
                                            <tr>
                                                <th>
                                                    <div className="avatar">
                                                        {user.avatar && (
                                                            <img
                                                                src={
                                                                    user.avatar
                                                                }
                                                            ></img>
                                                        )}
                                                    </div>
                                                </th>
                                                <th>{user[2]}</th>
                                                <th>{user[1]}</th>
                                                <th>0</th>
                                                <th>
                                                    <img src={more} />
                                                </th>
                                            </tr>
                                        );
                                    }
                                )}
                                <button>Invite New People</button>
                                {this.props.consoleState.team.invites &&
                                    this.props.consoleState.team.invites.map(
                                        (invite) => {
                                            return (
                                                <tr>
                                                    <th>{invite.name}</th>
                                                    <th>buttons</th>
                                                </tr>
                                            );
                                        }
                                    )}
                            </table>
                        </div>
                    )}

                    <div id="teamProjects">
                        <div className="teamTabDiv">
                            {this.props.newUser && (
                                <div id="teamHeader" className="teamTabName">
                                    <h3>{this.props.consoleState.team.name}</h3>
                                </div>
                            )}
                            <form
                                method="post"
                                action={`${apiUrl}/createProject`}
                            >
                                <input
                                    type="text"
                                    name="newProjectName"
                                    id="projectNameInput"
                                    placeholder="New Project Name"
                                    required
                                />
                                <button>New Project</button>
                            </form>
                        </div>

                        <table>
                            <tr>
                                <th>Project Name</th>
                                <th>Open Bugs</th>
                                <th>In Review</th>
                                <th></th>
                            </tr>
                            {this.props.consoleState.team.projects.map(
                                (project) => {
                                    return (
                                        <tr>
                                            <th>{project[0]}</th>
                                            <th></th>
                                        </tr>
                                    );
                                }
                            )}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Team;
