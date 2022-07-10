import React from "react";

import "../../css/Archive.css";

import Loading from "../Loading";

var apiUrl = process.env.REACT_APP_APIURL;
class Archive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    fetchArchive() {
        fetch(`${apiUrl}/bug/getArchivedBugs`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                project: this.props.consoleState.activeProject,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    loading: false,
                    bugs: data.bugs,
                    fBugs: data.bugs,
                });
            });
    }

    filterBugs(e) {
        this.state.fBugs = this.state.bugs;
        const filtered = this.state.bugs.filter((bug) => {
            return bug.bugTitle
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
        });
        this.setState({ fBugs: filtered });
    }

    componentDidMount() {
        this.fetchArchive();
    }

    handleClick(bId) {
        window.location.href = `/console/archive/${bId}`;
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <div id="archive">
                <div id="bugsUp">
                    <div id="bugsInfo">
                        <h4>Archived Bugs: {this.state.bugs.length}</h4>
                    </div>
                    <div id="bugsFilter">
                        <input
                            id="filter"
                            placeholder="Filter labels,ids,etc"
                            onChange={(e) => this.filterBugs(e)}
                        />
                    </div>
                </div>
                <table>
                    <tr>
                        <td id="bId">#</td>
                        <td>Bug</td>
                        <td>Closed By</td>
                        <td>Author</td>
                        <td>Close Date</td>
                    </tr>
                    {this.state.fBugs
                        .slice(0)
                        .reverse()
                        .map((bug) => {
                            const closeDate = new Date(
                                bug.closeDate
                            ).toLocaleDateString();
                            const closedByName = !bug.closedBy
                                ? "Not Set"
                                : bug.closedBy.name;
                            return (
                                <tr onClick={() => this.handleClick(bug._id)}>
                                    <td>{bug.bugId}</td>
                                    <td>{bug.bugTitle}</td>
                                    <td>{closedByName}</td>
                                    <td>{bug.author.authorName}</td>
                                    <td>{closeDate}</td>
                                </tr>
                            );
                        })}
                </table>
            </div>
        );
    }
}

export default Archive;
