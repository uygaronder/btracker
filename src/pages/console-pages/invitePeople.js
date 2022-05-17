import React from "react";
import "../../css/Invite.css";

import Search from "../../res/svg/search.svg";
import more from "../../res/svg/more.svg";
var apiUrl = process.env.REACT_APP_APIURL;
class InvitePeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
    }

    render() {
        return (
            <div id="invite">
                {!this.props.newUser && (
                    <div id="teamHeader">
                        <h3>{this.props.consoleState.team.name}</h3>
                    </div>
                )}

                <div id="searchUsers">
                    <form method="post" action={`${apiUrl}/searchUsers`}>
                        <input type="text" name="search" placeholder="Search for users..." />
                        <input type="submit" value="Search"></input>
                    </form>
                </div>
                <div id="searchResults" key={this.state.results}>
                    {this.state.results.map((result) => <div className="user">{result.name}</div>)}
                </div>
            </div>
        );
    }
}

export default InvitePeople;
