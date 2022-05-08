import React from "react";

import "../../css/Archive.css"

import Loading from "../Loading"

var apiUrl = process.env.REACT_APP_APIURL;
class Archive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    fetchArchive(){
        console.log("Fetching archive...")
    }
    
    componentDidMount() {
        console.log(this.props)
        this.fetchArchive()
    }

    render() {
        return (
            <div id="archive">
                <div id="bugsUp">
                    <div id="bugsInfo">
                        <h3>fdsa</h3>
                        <span />
                        <h4>Total Bugs: {"1"}</h4>
                    </div>
                    <div id="bugsFilter">
                        <input
                            id="filter"
                            placeholder="Filter labels,ids,etc"
                        />
                    </div>
                </div>
                <table>
                    <tr>
                        <td id="bId">#</td>
                        <td>Bug</td>
                        <td>Labels</td>
                        <td>Comments</td>
                        <td>Priority</td>
                        <td>Status</td>
                        <td>Due</td>
                    </tr>
                    
                </table>

            </div>
        );
    }
}

export default Archive;
