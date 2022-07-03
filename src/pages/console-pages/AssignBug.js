import React from "react";
import "../../css/AssignBug.css";
var apiUrl = process.env.REACT_APP_APIURL;
class Assign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    fetchUsers() {
        fetch(`${apiUrl}/bug/fetchUsers`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                teamId: this.props.consoleState.activeTeam,
            }),
        })
            .then((res) => res.json())
            .then((data) => this.setState({ users: data.users }));
    }

    componentWillMount() {
        this.fetchUsers();
    }

    userQuery(e) {
        console.log(e.target.value);
        console.log(this.state.users);
    }

    assignUser(user) {}

    render() {
        console.log(this.props.bug);
        return (
            <div id="assignBug">
                <div>
                    <input
                        type="text"
                        name="userSearch"
                        onChange={(e) => this.userQuery(e)}
                    />

                    <div>
                        {this.state.users.map((user) => {
                            return (
                                <div className="assignUser">
                                    <p>{user[2]}</p>
                                    <button
                                        className={
                                            !this.props.bug.assigned.includes(
                                                user[0]
                                            )
                                                ? "assign"
                                                : "unassign"
                                        }
                                        onClick={() => {
                                            this.assignUser(user[0]);
                                        }}
                                    >
                                        {!this.props.bug.assigned.includes(
                                            user[0]
                                        )
                                            ? "Assign"
                                            : "Unassign"}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Assign;
