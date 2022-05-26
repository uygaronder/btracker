import React from "react";
import "../../css/Feed.css";

import Post from "../../res/svg/post.svg";

var apiUrl = process.env.REACT_APP_APIURL;
var APP_URL = process.env.REACT_APP_APPURL;
class Feed extends React.Component {
    constructor(props) {
        super(props);
    }

    returnAvatar(item) {}

    postToFeed() {
        fetch(`${apiUrl}/postToFeed`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                feed: document.getElementById("feedInput").value,
                team: this.props.consoleState.activeTeam,
            }),
        }).then((window.location.href = `${APP_URL}/console/feed`));
    }

    render() {
        return (
            <div id="feed">
                <div>
                    <form>
                        <textarea
                            id="feedInput"
                            name="feedInput"
                            placeholder="Share your thoughts"
                            required
                        ></textarea>
                        <button type="button" onClick={() => this.postToFeed()}>
                            <img src={Post} alt="Post" />
                        </button>
                    </form>
                    <div id="feedDiv">
                        {this.props.consoleState.team.feed.map((item) => {
                            const dateObj = new Date(item.date);
                            const date = dateObj.toLocaleDateString();
                            const time = `${dateObj.getHours()}:${dateObj.getMinutes()}`;
                            return (
                                <div className="feedItem">
                                    <div className={`feedAvatarBack`}>
                                        <div
                                            className={`feedAvatar ${item.feedType}`}
                                        ></div>
                                        {item.type
                                            ? this.returnAvatar(item)
                                            : ""}
                                    </div>
                                    <div className="feedText">
                                        <div>
                                            <h4>{item.source.sourceString}</h4>
                                            <span className="updateTime">
                                                {`${time} ${date}`}
                                            </span>
                                        </div>
                                        <p>{item.feedText}</p>
                                        <div className="feedButtons"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Feed;
