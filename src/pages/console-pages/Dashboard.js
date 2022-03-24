import React from "react";
import "../../Dashboard.css";


import Search from "../../res/svg/search.svg"

class Dashboard extends React.Component{
    render(){
        return(
            <div id="dashboard">
                <div id="dashboardInfo">
                    <h2>Dashboard</h2>
                    <span id="dashboardSearch">
                        <input
                            type={"text"}
                            id="bugSearch"
                            name="search"
                            placeholder="Search Bugs"
                        />
                        <label htmlFor="search"><img src={Search}/></label>
                    </span>
                </div>
            </div>
        )
    }
}


export default Dashboard;