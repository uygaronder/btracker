import React from "react";
import "../../css/Team.css";

import { Link } from "react-router-dom";

import Search from "../../res/svg/search.svg";
import more from "../../res/svg/more.svg";
var apiUrl = process.env.REACT_APP_APIURL;
console.log(apiUrl);
class Team extends React.Component {
    componentDidMount() {
        document.addEventListener("mouseup", function (e) {
            if(document.getElementById("morePrompt")){
                const prompt = document.getElementById("morePrompt")
                if (!prompt.contains(e.target)) {
                    prompt.remove()
                }
            }
        });
    }

    sendAction(action, data) {
        fetch(`${apiUrl}/${action}`, function(){
            
        })
    }

    userPrompt(e ,item) {
        const prompt = document.createElement("div");
        prompt.id="morePrompt";
        const userRole = document.createElement("p");
        userRole.innerText = "Change user role";
        userRole.onclick = function(){
            console.log("Change user role")
        }
        prompt.appendChild(userRole);
        e.target.parentNode.appendChild(prompt);
        console.log(prompt);
    }

    projectPrompt(e ,item) {
        const prompt = document.createElement("div");
        prompt.id="morePrompt";
        const userRole = document.createElement("p");
        userRole.innerText = "Switch to Project";
        userRole.onclick = function(){
            console.log("Switch to Project")
        }
        prompt.appendChild(userRole);
        e.target.parentNode.appendChild(prompt);
        console.log(prompt);
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
                                                <th>
                                                    <img onClick={(e)=> this.userPrompt(e, user)} src={more} />
                                                </th>
                                            </tr>
                                        );
                                    }
                                )}
                                <Link to="invite"><button>Invite New People</button></Link>
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
                                <th></th>
                            </tr>
                            {this.props.consoleState.team.projects.map(
                                (project) => {
                                    return (
                                        <tr>
                                            <th>{project[0]}</th>
                                            <th><img onClick={(e)=> this.projectPrompt(e)} src={more}></img></th>
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
