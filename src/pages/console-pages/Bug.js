import React from "react";
import "../../Bug.css";

import Search from "../../res/svg/search.svg";
import assign from "../../res/svg/assign.svg";
import chevronUp from "../../res/svg/chevron-up.svg";
import bell from "../../res/svg/bell.svg";
import bellOn from "../../res/svg/notification.svg";
import del from "../../res/svg/delete.svg";
var apiUrl = process.env.REACT_APP_APIURL;

class Bug extends React.Component {
    render() {
        return (
            <div id="bug">
                <div id="bugTexts">
                    <div id="bugUpper">
                        <div id="bugInfo">
                            <p>Posted by (author) at (post date)</p>
                            <span>|</span>
                            <span id="due">due in 5 days</span>
                        </div>
                        <div id="bugTitleStuff">
                            <div id="bugTitleDiv">
                                <h2 id="bugTitle">Fix testing text</h2>
                                <div id="identifiers">
                                    <span className="label high">High</span>
                                    <span className="label">Label</span>
                                </div>
                            </div>
                            <div id="bugButtons">
                                <span id="notify">{<img src={bell} />}</span>
                                <button id="complete">Mark As Complete</button>
                            </div>
                        </div>
                    </div>
                    <div id="bugDescDiv">
                        <p id="description">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.{" "}
                        </p>
                    </div>
                    <div id="assigned">
                        <div id="assignedText">
                            <h4>Assigned To:</h4>
                            <div id="assignedUsers">
                                <span>(username), </span>
                                <span>(username), </span>
                            </div>
                        </div>
                        <div id="assignedButtons">
                            <button>
                                <img src={assign} /> Assign This Bug
                            </button>
                            <button>
                                <img className="down" src={chevronUp} /> Self
                                Assign This Bug
                            </button>
                            <button>
                                <img src={del} />
                                Delete This Bug
                            </button>
                        </div>
                    </div>
                </div>

                <div id="addComment">
                    <textarea
                        id="commentBox"
                        placeholder="Type a comment"
                    ></textarea>
                    <button>Post Comment</button>
                </div>

                <div id="comments">
                    <h3>Comments</h3>
                    <div id="commentsDiv">
                        <div className="comment">
                            <div className="commentAuthorInfo">
                                <p className="author">Author</p>
                                <p className="postDate">posted date</p>
                            </div>
                            <p className="commentText">
                                Lorem ipsum doler sit amet dis is a comment
                            </p>
                            <div className="commentOptions"></div>
                            <div className="comment">
                                <div className="commentAuthorInfo">
                                    <p className="author">Author</p>
                                    <p className="postDate">posted date</p>
                                </div>
                                <p className="commentText">this is a reply</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bug;
