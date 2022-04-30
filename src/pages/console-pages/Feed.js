import React from "react";
import "../../css/Feed.css";

import Post from "../../res/svg/post.svg";

var apiUrl = process.env.REACT_APP_APIURL;
class Feed extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="feed">
                <div>
                    <form action={`${apiUrl}/postToFeed`} method="post">
                        <textarea
                            name="feedInput"
                            placeholder="Share your thoughts"
                        ></textarea>
                        <button type="submit">
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
                                    <div>
                                        <h4>{item.source.sourceString}</h4>
                                        <span className="updateTime">
                                            {`${time} ${date}`}
                                        </span>
                                    </div>
                                    <p>{item.feedText}</p>
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