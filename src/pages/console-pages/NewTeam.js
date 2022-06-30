import React from "react";
import "../../css/NewTeam.css";

import Loading from "../Loading";

import Search from "../../res/svg/search.svg";
import Plus from "../../res/svg/plus.svg";
var apiUrl = process.env.REACT_APP_APIURL;
var APP_URL = process.env.REACT_APP_APPURL;

class NewTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            teamsLoading: false,
            invites: this.props.consoleState.invites,
        };
    }
    searchTeams(query) {
        if (query == "") return;
        this.setState({ teamsLoading: true });

        fetch(`${apiUrl}/searchTeams`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: query,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ teams: data.team, teamsLoading: false });
            });
    }

    join(teamId, e) {
        fetch(`${apiUrl}/team/joinTeam`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                team: teamId,
            }),
        })
            .then((res) => res.text())
            .then((data) => {
                if (data == "success") {
                    e.target.innerText = "Sent";
                }
            });
    }

    acceptInvite(teamId) {
        fetch(`${apiUrl}/team/acceptTeamInvite`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                teamId: teamId,
            }),
        }).then(() => {
            window.location.href = `${APP_URL}/console`;
        });
    }

    ignoreTeamInvite(teamId) {
        fetch(`${apiUrl}/team/ignoreTeamInvite`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                team: teamId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ invites: data.data });
            });
    }

    render() {
        return (
            <div id="newTeam">
                <div id="teamOpt">
                    <div id="findTeam">
                        <h2>Find Team</h2>
                        <div className="textSearch">
                            <input
                                className="CustomInput"
                                placeholder="Name"
                                type="text"
                                id="teamSearch"
                            />
                            <button
                                id="findSearch"
                                onClick={() => {
                                    this.searchTeams(
                                        document.getElementById("teamSearch")
                                            .value
                                    );
                                }}
                            >
                                <img src={Search} />
                            </button>
                        </div>
                        <div id="teamFound" key={this.state.teams}>
                            {this.state.teamsLoading ? (
                                <Loading />
                            ) : (
                                <div className="FoundTeamsList">
                                    {this.state.teams.map((team) => {
                                        return (
                                            <div className="team" key={team.id}>
                                                <h3>{team.team}</h3>
                                                {this.props.consoleState.teamOptions.filter(
                                                    (inTeam) => {
                                                        return (
                                                            inTeam[1] ==
                                                            team.teamId
                                                        );
                                                    }
                                                ).length == 0 && (
                                                    <button
                                                        id={team.teamId}
                                                        onClick={(e) => {
                                                            this.join(
                                                                team.teamId,
                                                                e
                                                            );
                                                        }}
                                                    >
                                                        Join
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    <div id="createAndInvitations">
                        <div id="createTeam">
                            <h2>Create Team</h2>
                            <form
                                method="post"
                                action={`${apiUrl}/team/createTeam`}
                            >
                                <div className="formField">
                                    <input
                                        className="CustomInput"
                                        type="text"
                                        name="teamName"
                                        placeholder="Team Name"
                                        required
                                    />
                                </div>
                                <button type="submit">
                                    Create Team <img src={Plus} />
                                </button>
                            </form>
                        </div>
                        {!this.props.newUser && (
                            <div id="invitations" key={this.state.invites}>
                                <h3>Invitations</h3>
                                <p>
                                    You have{" "}
                                    {this.props.consoleState.invites
                                        ? this.state.invites.length
                                        : 0}{" "}
                                    invitations
                                </p>
                                <div id="invites">
                                    {this.state.invites.map((invite) => {
                                        const date = new Date(invite.date);
                                        return (
                                            <div
                                                className="invite"
                                                id={invite.team.id}
                                            >
                                                <div>
                                                    <h3>{invite.team.name}</h3>
                                                    <p>
                                                        {date.toLocaleDateString()}
                                                    </p>
                                                </div>

                                                <td>
                                                    <div className="inviteButtons">
                                                        <button
                                                            onClick={() =>
                                                                this.acceptInvite(
                                                                    invite.team
                                                                        .id
                                                                )
                                                            }
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                this.ignoreTeamInvite(
                                                                    invite.team
                                                                        .id
                                                                )
                                                            }
                                                        >
                                                            Ignore
                                                        </button>
                                                    </div>
                                                </td>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default NewTeam;
