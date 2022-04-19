import React, { useState,useEffect } from "react";
import "../../Bug.css";

import { useParams } from "react-router-dom";
import Loading from "../Loading";

import Search from "../../res/svg/search.svg";
import assign from "../../res/svg/assign.svg";
import chevronUp from "../../res/svg/chevron-up.svg";
import bell from "../../res/svg/bell.svg";
import bellOn from "../../res/svg/notification.svg";
import del from "../../res/svg/delete.svg";
var apiUrl = process.env.REACT_APP_APIURL;


const Bug = ({consoleState}) => {

    const { bId } = useParams()
    const [data, setData] = useState()
    useEffect(()=>{
        fetch(`${apiUrl}/getBug`, {
            
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bugId: `${bId}`,
                projectId: consoleState.activeProject,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            });
    },[])
    
    if(!data) return <Loading />
    return (
        <div id="bug">
            <div id="bugTexts">
                <div id="bugUpper">
                    <div id="bugInfo">
                        <p>Posted by {data.author} at (post date)</p>
                        <span>|</span>
                        <span id="due">due in 5 days</span>
                    </div>
                    <div id="bugTitleStuff">
                        <div id="bugTitleDiv">
                            <h2 id="bugTitle">{data.bugTitle}</h2>
                            <div id="identifiers">
                                {<span className={`label ${data.status}`}>{data.status}</span>}
                                {<span className={`label ${data.priority}`}>{data.priority}</span>}
                                {data.labels.map(label=>{
                                    return <span className="label">{label}</span>
                                })}
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
                        {data.description}
                    </p>
                </div>
                <div id="assigned">
                    <div id="assignedText">
                        <h4>Assigned To:</h4>
                        <div id="assignedUsers">
                            {data.assigned.map(person=>{
                                return <span>{person}</span>
                            })}
                        </div>
                    </div>
                    <div id="assignedButtons">
                        <button>
                            <img src={assign} /> Assign This Bug
                        </button>
                        <button>
                            <img className="down" src={chevronUp} /> Self Assign
                            This Bug
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
    

export default Bug;
