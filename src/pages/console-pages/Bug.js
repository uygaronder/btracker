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

function renderComment(comment){
    return comment.map(comment => {
        return (<div className="comment">
            <div className="commentAuthorInfo">
                            <p className="author">{comment.author.authorName}</p>
                            <p className="postDate">{comment.date}</p>
                        </div>
                        <p className="commentText">
                            {comment.commentText}
                        </p>
                        <div className="commentOptions"></div>
                        <div className="comment">
                            {renderComment(comment.comments)}
                        </div>
        </div>)
    })
}

const Bug = ({consoleState}) => {

    const { bId } = useParams()
    const [data, setData] = useState()
    console.log(consoleState)
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
                        <p>Posted by {data.author.authorName} at {data.postDate}</p>
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
                    {data.assignedTo>0?<div id="assignedText">
                        <h4>Assigned To:</h4>
                        <div id="assignedUsers">
                            {data.assigned.map(person=>{
                                return <span>{person}</span>
                            })}
                        </div>
                    </div>:""}
                    
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

            <form id="addComment" method="post" action={`${apiUrl}/postComment`}>
                <textarea
                    id="commentBox"
                    name="comment"
                    placeholder="Type a comment"
                />
                <input type={"hidden"} name={"bugId"} value={data._id}/>
                <input type={"hidden"} name={"project"} value={consoleState.activeProject}/>
                <input type={"hidden"} name={"name"} value={consoleState.usrName}/>
                <button type={"submit"}>Post Comment</button>
            </form>

            <div id="comments">
                <h3>Comments</h3>
                <div id="commentsDiv">
                    {data.comments.length>0 ? renderComment(data.comments):<p>No comments yet</p>}
                </div>
            </div>
        </div>
    );
}
    

export default Bug;
