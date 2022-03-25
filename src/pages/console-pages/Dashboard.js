import React from "react";
import "../../Dashboard.css";

import Search from "../../res/svg/search.svg";
import plus from "../../res/svg/plus.svg";

class Dashboard extends React.Component {
    render() {
        return (
            <div id="dashboard">
                <div id="dashboardInfo">
                    <div id="dashboardTitle">
                        <h2>Dashboard</h2>
                        <h4>Test Project</h4>
                    </div>

                    <span id="dashboardSearch">
                        <input
                            type={"text"}
                            id="bugSearch"
                            name="search"
                            placeholder="Search Bugs"
                        />
                        <label htmlFor="search">
                            <img src={Search} />
                        </label>
                    </span>
                </div>
                <div id="dashboardBugs">
                    <table>
                        <tr>
                            <td id="bId">#</td>
                            <td>Bug</td>
                            <td>Priority</td>
                            <td>Status</td>
                            <td>Due</td>
                        </tr>
                        <tr className="ongoing high">
                            <td id="bId">TP-101</td>
                            <td>This is a test bug text to fill space</td>
                            <td>
                                <span className="priority">High</span>
                            </td>
                            <td>
                                <span className="status">ongoing</span>
                            </td>
                            <td>27 Mar 2022</td>
                        </tr>
                        <tr className="complete high">
                            <td id="bId">TP-102</td>
                            <td>
                                This is a test bug text to fill space this is
                                even longer to make it double rows
                            </td>
                            <td>
                                <span className="priority">High</span>
                            </td>
                            <td>
                                <span className="status">Complete</span>
                            </td>
                            <td>27 Mar 2022</td>
                        </tr>
                        <tr className="overdue low">
                            <td id="bId">TP-104</td>
                            <td>This is a test bug text to fill space</td>
                            <td>
                                <span className="priority">Low</span>
                            </td>
                            <td>
                                <span className="status">overdue</span>
                            </td>
                            <td>27 Mar 2022</td>
                        </tr>
                        <tr className="pending med">
                            <td id="bId">TP-111</td>
                            <td>This is a test bug text to fill space</td>
                            <td>
                                <span className="priority">med</span>
                            </td>
                            <td>
                                <span className="status">pending</span>
                            </td>
                            <td>27 Mar 2022</td>
                        </tr>
                        <tr className="new low">
                            <td id="bId">TP-111</td>
                            <td>This is a test bug text to fill space</td>
                            <td>
                                <span className="priority">Low</span>
                            </td>
                            <td>
                                <span className="status">new</span>
                            </td>
                            <td>27 Mar 2022</td>
                        </tr>
                    </table>
                    <button id="submitBug">
                        <img src={plus} alt="+" /> Submit a Bug
                    </button>
                </div>
                <div id="dashboardStats">
                    <h2>Bug Status</h2>
                    <ul id="dashboardStatus">
                        <li id="openStatus">
                            <h2>12</h2>
                            <p>Open Bugs</p>
                        </li>
                        <li id="closeStatus">
                            <h2>5</h2>
                            <p>Closed Bugs</p>
                        </li>
                        <li id="overStatus">
                            <h2>3</h2>
                            <p>Overdue</p>
                        </li>
                        <li id="dayStatus">
                            <h2>2</h2>
                            <p>Due Today</p>
                        </li>
                        <li id="weekStatus">
                            <h2>6</h2>
                            <p>Due This Week</p>
                        </li>
                    </ul>
                </div>
                <div id="dashboardFeed">
                    <h2>Feed</h2>
                    <div id="dashboardFeedText">
                        <div className="feedItem">
                            <div>
                                <h4>Update Source</h4>
                                <span className="updateTime">
                                    7:12 PM 25/3/2022
                                </span>
                            </div>
                            <p>This is a placeholder update to take up space</p>
                        </div>
                        <div className="feedItem">
                            <div>
                                <h4>Update Source</h4>
                                <span className="updateTime">
                                    7:12 PM 25/3/2022
                                </span>
                            </div>
                            <p>
                                This is a placeholder update to take up space
                                just like the upper one except longer
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
