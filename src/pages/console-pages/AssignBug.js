import React from "react";
import "../../css/AssignBug.css";
var apiUrl = process.env.REACT_APP_APIURL;
class Assign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            usersFb: [],
        };
    }

    fetchUsers(refetch) {
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
            .then((data) => {
                !refetch
                    ? this.setState({ users: data.users, usersFb: data.users })
                    : this.setState({ usersFb: data.users });
            });
    }

    componentWillMount() {
        this.fetchUsers(false);
    }

    userQuery(e) {
        let filteredUsers = this.state.usersFb.filter((user) =>
            user[2].toLowerCase().includes(e.target.value.toLowerCase())
        );
        this.setState({ users: filteredUsers });
    }

    assignUser(user, e) {
        e.target.onClick = "";
        if (!this.props.bug.assigned.includes(user)) {
            fetch(`${apiUrl}/bug/assign`, {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bugId: `${this.props.bug._id}`,
                    projectId: this.props.consoleState.activeProject,
                    teamId: this.props.consoleState.activeTeam,
                    user: user,
                    assignedBy: this.props.consoleState.usrName,
                }),
            })
                .then((res) => res.text())
                .then((data) => {
                    if (data == "success") {
                        e.target.classList.remove("assign");
                        e.target.classList.add("unassign");
                        e.target.innerText = "Unassign";
                    }
                });
        } else {
        }

        this.fetchUsers(true);
    }

    render() {
        return (
            <div id="assignBug">
                <div>
                    <input
                        type="text"
                        name="userSearch"
                        id="userSearch"
                        placeholder="Filter Users"
                        onChange={(e) => this.userQuery(e)}
                    />

                    <div key={this.state.users}>
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
                                        onClick={(e) => {
                                            this.assignUser(user, e);
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
