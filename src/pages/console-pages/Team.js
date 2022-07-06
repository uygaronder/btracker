import React from "react";
import "../../css/Team.css";

import { Link } from "react-router-dom";

import Search from "../../res/svg/search.svg";
import more from "../../res/svg/more.svg";
var apiUrl = process.env.REACT_APP_APIURL;
var appUrl = process.env.REACT_APP_APPURL;
class Team extends React.Component {
    componentDidMount() {
        document.addEventListener("mouseup", function (e) {
            if (document.getElementById("morePrompt")) {
                const prompt = document.getElementById("morePrompt");
                if (!prompt.contains(e.target)) {
                    prompt.remove();
                }
            }
        });
    }

    confirmationBox(action, id, state, team, user, relFunction) {
        console.log(action, id, state, team, user);
        document.getElementById("confirmationBoxDiv").style.display = "flex";
        //const userInfo = state.team.users.filter((user) => user[0] == id)[0];
        switch (action) {
            case "leaveTeam":
                document.getElementById("confirmationP").innerText =
                    "Are you sure you want to Leave this team?";
                document.getElementById("confirmButton").onclick = () => {
                    this.leaveTeam();
                };
                break;
            case "changeRole":
                document.getElementById(
                    "confirmationP"
                ).innerText = `Changing user ${id[2]} role to ${
                    id[1] == "member" ? "Lead" : "Member"
                }?`;
                document.getElementById("confirmButton").onclick = () => {
                    relFunction("changeRole", id, team);
                };
                break;
            case "removeUser":
                document.getElementById(
                    "confirmationP"
                ).innerText = `Removing user ${id[2]} from ${state.team.name}?`;
                document.getElementById("confirmButton").onclick = () => {
                    relFunction(id, team, state);
                };
                break;
        }
    }

    contactServer(action, id, team) {
        //add are you sure prompt to delete
        fetch(`${apiUrl}/${action}`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: `${id}`,
                activeTeam: team,
            }),
        });
    }

    removeUser(id, team, state) {
        console.log(state, id, team);
        if ((id = state._id)) {
            return;
        }
        /*fetch(`${apiUrl}/team/removeUser`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: `${id[0]}`,
                activeTeam: team,
            }),
        })
            .then((res) => res.text())
            .then((data) => {
                if (data == "success") {
                    document.getElementById("user" + id).remove();
                }
            });*/
    }

    userPrompt(e, item, contactServer, state, confirmationBox, removeUser) {
        const team = this.props.consoleState.activeTeam;
        const prompt = document.createElement("div");

        prompt.id = "morePrompt";
        const userRole = document.createElement("p");
        userRole.innerText = "Change user role";
        userRole.onclick = function () {
            confirmationBox("changeRole", item, state, team);
            //contactServer("changeRole", item, team);
        };
        prompt.appendChild(userRole);

        const userRemove = document.createElement("p");
        userRemove.innerText = "Remove User";
        userRemove.onclick = function () {
            confirmationBox("removeUser", item, state, team, "", removeUser);
        };

        if (this.props.consoleState.usrId != item[0])
            prompt.appendChild(userRemove);

        e.target.parentNode.appendChild(prompt);
    }

    projectPrompt(e, item, contactServer, confirmationBox) {
        const team = this.props.consoleState.activeTeam;
        const prompt = document.createElement("div");
        prompt.id = "morePrompt";

        const userRole = document.createElement("p");
        userRole.innerText = "Delete Project";
        userRole.onclick = function () {
            contactServer("deleteProject", item, team);
        };
        prompt.appendChild(userRole);

        e.target.parentNode.appendChild(prompt);
    }

    ignoreUserRequest(id, e) {
        fetch(`${apiUrl}/team/ignoreUserRequest`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: `${id}`,
                activeTeam: this.props.consoleState.activeTeam,
            }),
        })
            .then((res) => res.text())
            .then((data) => {
                if (data == "success") {
                    document.getElementById(id + "divId").remove();
                }
            });
    }

    acceptUserRequest(id, e) {
        fetch(`${apiUrl}/team/acceptUserRequest`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: `${id}`,
                activeTeam: this.props.consoleState.activeTeam,
            }),
        })
            .then((res) => res.text())
            .then((data) => {
                if (data == "success") {
                    window.location.reload();
                }
            });
    }

    leaveTeam() {
        fetch(`${apiUrl}/team/leaveTeam`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                team: this.props.consoleState.activeTeam,
            }),
        })
            .then((res) => res.text())
            .then((data) => {
                if (data == "success") {
                    window.location.href = `${appUrl}/console`;
                }
            });
    }

    render() {
        return (
            <div id="team">
                {!this.props.newUser && (
                    <div id="teamHeader">
                        <h3>{this.props.consoleState.team.name}</h3>
                        <button
                            onClick={() => this.confirmationBox("leaveTeam")}
                        >
                            Leave Team
                        </button>
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
                                            <tr
                                                className="user"
                                                id={"user" + user[0]}
                                            >
                                                <th>
                                                    {/* avatar is not stored in the user array this is a bug */}
                                                    <div className="avatar">
                                                        {user.avatar && (
                                                            <img
                                                                src={
                                                                    user.avatar
                                                                }
                                                            ></img>
                                                        )}
                                                    </div>
                                                    {/* ------------------------- */}
                                                </th>
                                                <th>{user[2]}</th>
                                                <th>{user[1]}</th>
                                                <th>
                                                    <img
                                                        onClick={(e) =>
                                                            this.userPrompt(
                                                                e,
                                                                user,
                                                                this
                                                                    .contactServer,
                                                                this.props
                                                                    .consoleState,
                                                                this
                                                                    .confirmationBox,
                                                                this.removeUser
                                                            )
                                                        }
                                                        src={more}
                                                    />
                                                </th>
                                            </tr>
                                        );
                                    }
                                )}
                                <div id="inviteButton">
                                    <Link to="invite">
                                        <button>Invite New People</button>
                                    </Link>
                                </div>

                                {this.props.consoleState.team.invites &&
                                    this.props.consoleState.team.invites.map(
                                        (invite) => {
                                            let id = invite.id + "divId";
                                            return (
                                                <tr className="invite" id={id}>
                                                    <th>
                                                        <div className="avatar">
                                                            {invite.avatar && (
                                                                <img
                                                                    src={
                                                                        invite.avatar
                                                                    }
                                                                ></img>
                                                            )}
                                                        </div>
                                                    </th>
                                                    <th>{invite.name}</th>
                                                    <th className="buttons">
                                                        <button
                                                            onClick={(e) =>
                                                                this.acceptUserRequest(
                                                                    invite.id,
                                                                    e
                                                                )
                                                            }
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={(e) =>
                                                                this.ignoreUserRequest(
                                                                    invite.id,
                                                                    e
                                                                )
                                                            }
                                                        >
                                                            Ignore
                                                        </button>
                                                    </th>
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
                                action={`${apiUrl}/team/createProject`}
                            >
                                <input
                                    type="text"
                                    name="newProjectName"
                                    id="projectNameInput"
                                    placeholder="New Project Name"
                                    required
                                />
                                <button id="newProjectButton">
                                    New Project
                                </button>
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
                                            <th></th>
                                            <th>
                                                <img
                                                    onClick={(e) =>
                                                        this.projectPrompt(
                                                            e,
                                                            1,
                                                            this.contactServer
                                                        )
                                                    }
                                                    src={more}
                                                ></img>
                                            </th>
                                        </tr>
                                    );
                                }
                            )}
                        </table>
                    </div>
                </div>
                <div id="confirmationBoxDiv" style={{ display: "none" }}>
                    <div id="confirmationBox">
                        <div id="confirmationInfo">
                            <p id="confirmationP"></p>
                        </div>
                        <div className="confirmationButtons">
                            <button id="confirmButton">Accept</button>
                            <button
                                type="button"
                                onClick={() => {
                                    document.getElementById(
                                        "confirmationBoxDiv"
                                    ).style.display = "none";
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Team;
