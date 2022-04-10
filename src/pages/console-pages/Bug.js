import React from "react";
import "../../Bug.css";

import Search from "../../res/svg/search.svg";
var apiUrl = process.env.REACT_APP_APIURL;

class Bug extends React.Component {
    render() {
        return (
            <div id="bug">
                <div id="bugTexts">
                    <div id="bugUpper">
                        <div id="bugInfo">
                            <p>Posted by (Posted user) at (post date)</p>
                        </div>
                        <div id="bugTitleStuff">
                            <div id="bugTitleDiv">
                                <h2 id="bugTitle">Fix testing text</h2>
                                <span className="high">High</span>
                            </div>
                            <div id="bugButtons">
                                <button id="complete">Mark As Complete</button>
                            </div>
                        </div>
                        
                    </div>
                    <div id="bugDescDiv">
                    <p id="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                    </div>
                </div>

                <div id="addComment">
                    <textarea id="commentBox" placeholder="Type a comment">

                    </textarea>
                    <button>Post Comment</button>
                </div>

                <div id="comments">
                    <h3>Comments</h3>
                </div>
            </div>
        );
    }
}

export default Bug;
