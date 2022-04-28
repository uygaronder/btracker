import React from "react";
import "../../css/Team.css";

import Search from "../../res/svg/search.svg";
import more from "../../res/svg/more.svg";
var apiUrl = process.env.REACT_APP_APIURL;
console.log(apiUrl);
class Team extends React.Component {
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        return (
            <div id="team">
                <div id="teamHeader">
                    <h3>{this.props.consoleState.team.name}</h3>
                    <div><button>Invite New People</button></div>
                </div>
                <div id="teamTabs">
                    <div id="teamUsers">

                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Bug #</th>
                                <th></th>
                            </tr>
                            {this.props.consoleState.team.users.map(user => {
                                return (<tr>
                                    <th>{user[2]}</th>
                                    <th>{user[1]}</th>
                                    <th>0</th>
                                </tr>)
                                
                            })}
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
                            {this.props.consoleState.team.projects.map(project => {
                                return (<tr>
                                    <th>{project[0]}</th>
                                    <th>ph</th>
                                </tr>)
                                
                            })}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Team;
