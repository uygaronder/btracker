import React from "react";
import "../../css/NewTeam.css";

import Loading from "../Loading";

import Search from "../../res/svg/search.svg";
import Plus from "../../res/svg/plus.svg";
var apiUrl = process.env.REACT_APP_APIURL;

class NewTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            teamsLoading: false,
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

    join(teamId) {
        fetch(`${apiUrl}/joinTeam`, {
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
                console.log(data);
                this.setState({ teamsLoading: false, teams: data });
            });
    }

    render() {
        console.log(this.props);
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
                                                <button
                                                    id={team.teamId}
                                                    onClick={() => {
                                                        this.join(team.teamId);
                                                    }}
                                                >
                                                    Join
                                                </button>
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
                            <form method="post" action={`${apiUrl}/createTeam`}>
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
                            <div id="invitations">
                                <h3>Invitations</h3>
                                <p>
                                    You have{" "}
                                    {this.props.consoleState.invites
                                        ? this.props.consoleState.invites.length
                                        : 0}{" "}
                                    invitations
                                </p>
                                <table>
                                    {this.props.consoleState.invites.map(
                                        (invite) => {
                                            const date = new Date(invite.date);
                                            return (
                                                <td>
                                                    <td>{invite.team.name}</td>
                                                    <td>
                                                        {date.toLocaleString()}
                                                    </td>
                                                    <td></td>
                                                </td>
                                            );
                                        }
                                    )}
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default NewTeam;
