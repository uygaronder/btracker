import React, { useState, useEffect } from "react";
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

function renderComment(comments, state, data) {
    return comments.map((comment) => {
        return (
            <div className="comment">
                <div className="commentAuthorInfo">
                    <p className="author">{comment.author.authorName}</p>
                    <p className="postDate">
                        {new Date(comment.date).toLocaleDateString()}
                    </p>
                </div>
                <p className="commentText">{comment.commentText}</p>
                <div className="commentOptions">
                    <button
                        onClick={() => {
                            handleReplyDiv(comment._id);
                        }}
                    >
                        Reply
                    </button>
                    <div
                        className="comment reply"
                        id={comment._id}
                        style={{ display: "none" }}
                    >
                        <form
                            className={`replyTextbox`}
                            action={`${apiUrl}/postReply`}
                            method="post"
                        >
                            <textarea
                                name="comment"
                                id={`${comment._id}:tarea`}
                                cols="30"
                                rows="5"
                                placeholder="What do you think?"
                            ></textarea>
                            <input
                                type="hidden"
                                name="commentId"
                                value={comment._id}
                            />
                            <input
                                type={"hidden"}
                                name={"bugId"}
                                value={data._id}
                            />
                            <input
                                type={"hidden"}
                                name={"project"}
                                value={state.activeProject}
                            />
                            <input
                                type={"hidden"}
                                name={"name"}
                                value={state.usrName}
                            />
                            <div className="replyButtons">
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleReplyDiv(comment._id);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button type="submit">Reply</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div>
                    {comment.comments.length > 0
                        ? renderComment(comment.comments, state, data)
                        : []}
                </div>
            </div>
        );
    });
}

function handleReplyDiv(id) {
    switch (document.getElementById(id).style.display) {
        case "block":
            document.getElementById(id).style.display = "none";
            break;
        case "none":
            document.getElementById(id).style.display = "block";
            break;
    }
    document.getElementById(`${id}:tarea`).value = "";
}

function confirmationBox(action, id, state) {
    console.log(action);
    document.getElementById("confirmationBoxDiv").style.display = "flex";
    switch (action) {
        case "deleteBug":
            document.getElementById("confirmationP").innerText =
                "Are you sure you want to delete this bug?";
            break;
    }
}

function confirmedAction(action, id, state) {
    fetch(`${apiUrl}/${action}`, {
        method: "post",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bugId: `${id}`,
            projectId: state.activeProject,
        }),
    });
}

const Bug = ({ consoleState }) => {
    const { bId } = useParams();
    const [data, setData] = useState();
    useEffect(() => {
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
                setData(data);
            });
    }, []);

    if (!data) return <Loading />;
    return (
        <div id="bug">
            <div id="bugTexts">
                <div id="bugUpper">
                    <div id="bugInfo">
                        <p>
                            Posted by {data.author.authorName} at{" "}
                            {new Date(data.postDate).toLocaleDateString()}
                        </p>
                        <span>|</span>
                        <span id="due">due in 5 days</span>
                    </div>
                    <div id="bugTitleStuff">
                        <div id="bugTitleDiv">
                            <h2 id="bugTitle">{data.bugTitle}</h2>
                            <div id="identifiers">
                                {
                                    <span className={`label ${data.status}`}>
                                        {data.status}
                                    </span>
                                }
                                {
                                    <span className={`label ${data.priority}`}>
                                        {data.priority}
                                    </span>
                                }
                                {data.labels.map((label) => {
                                    return (
                                        <span className="label">{label}</span>
                                    );
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
                    <p id="description">{data.description}</p>
                </div>
                <div id="assigned">
                    {data.assignedTo > 0 ? (
                        <div id="assignedText">
                            <h4>Assigned To:</h4>
                            <div id="assignedUsers">
                                {data.assigned.map((person) => {
                                    return <span>{person}</span>;
                                })}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

                    <div id="assignedButtons">
                        <button>
                            <img src={assign} /> Assign This Bug
                        </button>
                        <button>
                            <img className="down" src={chevronUp} /> Self Assign
                            This Bug
                        </button>
                        <button
                            onClick={() => {
                                confirmationBox("deleteBug", data.id);
                            }}
                        >
                            <img src={del} />
                            Delete This Bug
                        </button>
                    </div>
                </div>
            </div>

            <form
                id="addComment"
                method="post"
                action={`${apiUrl}/postComment`}
            >
                <textarea
                    id="commentBox"
                    name="comment"
                    placeholder="Type a comment"
                />
                <input type={"hidden"} name={"bugId"} value={data._id} />
                <input
                    type={"hidden"}
                    name={"project"}
                    value={consoleState.activeProject}
                />
                <input
                    type={"hidden"}
                    name={"name"}
                    value={consoleState.usrName}
                />
                <button type={"submit"}>Post Comment</button>
            </form>

            <div id="comments">
                <h3>Comments</h3>
                <div id="commentsDiv">
                    {data.comments.length > 0 ? (
                        renderComment(data.comments, consoleState, data)
                    ) : (
                        <p>No comments yet</p>
                    )}
                </div>
            </div>
            <div id="confirmationBoxDiv" style={{ display: "flex" }}>
                <div id="confirmationBox">
                    <div id="confirmationInfo">
                        <p id="confirmationP"></p>
                    </div>
                    <div className="confirmationButtons">
                        <button>Accept</button>
                        <button
                            type="button"
                            onClick={() => {
                                document.getElementById(
                                    "confirmationBoxDiv"
                                ).style.display = "none";
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bug;
