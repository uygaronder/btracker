import React from "react";
import "../../css/Invite.css";

import Search from "../../res/svg/search.svg";
import more from "../../res/svg/more.svg";
var apiUrl = process.env.REACT_APP_APIURL;
class InvitePeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        };
    }

    fetchUsers() {
        console.log(this.props.consoleState);
        const query = document.getElementById("userSearch");
        !query.value
            ? (query.placeholder = "This space is required")
            : fetch(`${apiUrl}/searchUsers`, {
                  method: "post",
                  credentials: "include",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                      query: query.value,
                  }),
              })
                  .then((res) => res.json())
                  .then((data) => this.setState({ results: data.users }));
    }

    inviteUser(e, id) {
        if (!e.target.classList.contains("sent")) {
            fetch(`${apiUrl}/team/inviteUser`, {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    team: {
                        id: this.props.consoleState.team._id,
                        name: this.props.consoleState.team.name,
                    },
                    id: id,
                }),
            })
                .then((res) => res.json())
                .then((data) => this.setState({ results: data.users }));
        }
        e.target.classList.add = "sent";
        e.target.innerHTML = "Sent";
    }

    render() {
        return (
            <div id="invite">
                {!this.props.newUser && (
                    <div id="teamHeader">
                        <h3>Invite to {this.props.consoleState.team.name}</h3>
                    </div>
                )}

                <div id="searchUsers">
                    <form>
                        <input
                            type="text"
                            name="query"
                            placeholder="Search for users..."
                            id="userSearch"
                        />
                        <input
                            type="button"
                            onClick={() => this.fetchUsers()}
                            value="Search"
                        ></input>
                    </form>
                </div>
                <div id="searchResults" key={this.state.results}>
                    <table>
                        {this.state.results.map((result) => (
                            <tr className="user">
                                <div className="info">
                                    <td className="avatar">
                                        {result.avatar && (
                                            <img src={result.avatar} />
                                        )}
                                    </td>
                                    <td className="username">{result.user}</td>
                                </div>
                                <td>
                                    {this.props.consoleState.team.users.filter(
                                        (user) => user[0] == result.userId
                                    ).length == 0 && (
                                        <button
                                            onClick={(e) =>
                                                this.inviteUser(
                                                    e,
                                                    result.userId
                                                )
                                            }
                                        >
                                            Invite
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        );
    }
}

export default InvitePeople;
