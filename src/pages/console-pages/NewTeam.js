import React from "react";
import "../../css/NewTeam.css";

import Search from "../../res/svg/search.svg";
import Plus from "../../res/svg/plus.svg";
var apiUrl = process.env.REACT_APP_APIURL;

class NewTeam extends React.Component {
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
                            />
                            <button id="findSearch">
                                <img src={Search} />
                            </button>
                        </div>
                        <div id="teamFound">
                            <div className="FoundTeamsList">
                                <div className="team">
                                    <h3>Placeholder Team</h3>
                                    <button>Join</button>
                                </div>
                            </div>
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
                                    />
                                </div>
                                <button type="submit">
                                    Create Team <img src={Plus} />
                                </button>
                            </form>
                        </div>
                        <div id="invitations">
                            <h3>Invitations</h3>
                            <p>You have 0 invitations</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewTeam;
