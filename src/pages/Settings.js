import React from "react";

import "../css/Settings.css";

var apiUrl = process.env.REACT_APP_APIURL;
var appURL = process.env.REACT_APP_APPURL;
class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: this.props.consoleState.avatarURL,
            resetLabels: Math.random(),
            colorChangeUpdate: Math.random(),
            resetDelete: Math.random(),
            labelDeleteUpdate: Math.random(),
            labelColorChanges: {},
            deleteOrders: [],
        };
    }

    handleAvatarChange(e) {
        const submitButton = document.getElementById("avatarSubmit");
        submitButton.style.display =
            e.target.files.length != 0 ? "block" : "none";
        if (e.target.files.length == 0) {
            this.setState({ avatar: false });
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({ avatar: reader.result });
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    async handleAvatarSubmit() {
        try {
            await fetch(`${apiUrl}/changeAvatar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: this.props.consoleState.usrId,
                    data: this.state.avatar,
                }),
            }).then(
                () => (window.location.href = `${appURL}/console/settings`)
            );
        } catch (error) {
            console.error(error);
        }
    }

    labelColorChanged(e, key) {
        const id = e.target.id + "Label";
        const label = document.getElementById(id);
        label.style.backgroundColor = e.target.value;
        this.state.labelColorChanges[key] = e.target.value;
        this.setState({ colorChangeUpdate: Math.random() });
        console.log(this.state.labelColorChanges);
    }

    resetLabels() {
        this.setState({ labelColorChanges: {}, resetLabels: Math.random() });
    }

    toDelete(e, key) {
        if (this.state.deleteOrders.filter((item) => item == key).length == 0) {
            this.state.deleteOrders.push(key);
            e.target.classList.add("selectedToDel");
            this.setState({ labelDeleteUpdate: Math.random() });
        }
    }

    resetDelete() {
        const elements = document.getElementsByClassName("selectedToDel");

        for (var i = 0; i < elements.length; i++) {
            elements[0].classList.remove("selectedToDel");
        }

        this.setState({ deleteOrders: [], labelDeleteUpdate: Math.random() });
    }

    render() {
        return (
            <div id="settings">
                <div className="settingClass">
                    <h3>Profile Settings</h3>
                    <div className="settingsContainer">
                        <div className="setting">
                            <h4>Change Avatar</h4>
                            <form
                                className="changeAvatar"
                                onSubmit={() => {
                                    this.handleAvatarSubmit();
                                }}
                            >
                                <label htmlFor="avatar">
                                    <div
                                        className="avatar"
                                        key={this.state.avatar}
                                    >
                                        {<img src={this.state.avatar} />}
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => this.handleAvatarChange(e)}
                                    accept="image/jpeg, image/png"
                                    id="avatar"
                                />
                                <input
                                    type="submit"
                                    id="avatarSubmit"
                                    value="Change Avatar"
                                    style={{ display: "none" }}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="settingClass">
                    <h3>Team Settings</h3>
                    <div className="settingsContainer">
                        {/* Change Label Colors */}
                        <div className="setting">
                            <h4>Change Label Colors</h4>
                            <div
                                className="labels"
                                key={this.state.resetLabels}
                            >
                                {Object.keys(
                                    this.props.consoleState.team.labels
                                ).map((key) => {
                                    const color =
                                        this.props.consoleState.team.labels[
                                            key
                                        ];
                                    return (
                                        <div>
                                            <label
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                                className="label"
                                                htmlFor={`change${key}`}
                                                id={`change${key}Label`}
                                            >
                                                {key}
                                            </label>
                                            <input
                                                type="color"
                                                id={`change${key}`}
                                                defaultValue={color}
                                                onChange={(e) =>
                                                    this.labelColorChanged(
                                                        e,
                                                        key
                                                    )
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div key={this.state.colorChangeUpdate}>
                                {Object.keys(this.state.labelColorChanges)
                                    .length > 0 && (
                                    <div className="buttons">
                                        <button>Save Changes</button>
                                        <button
                                            onClick={() => {
                                                this.resetLabels();
                                            }}
                                        >
                                            Reset Changes
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="setting">
                            <h4>Delete Labels</h4>
                            {this.state.deleteOrders.length > 0 && (
                                <p>
                                    {this.state.deleteOrders.length}{" "}
                                    {this.state.deleteOrders.length == 1
                                        ? "bug"
                                        : "bugs"}{" "}
                                    marked for deletion
                                </p>
                            )}

                            <div
                                className="labels"
                                key={this.state.resetLabels}
                                id="labelsToDelete"
                            >
                                {Object.keys(
                                    this.props.consoleState.team.labels
                                ).map((key) => {
                                    const color =
                                        this.props.consoleState.team.labels[
                                            key
                                        ];
                                    return (
                                        <div>
                                            <div
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                                className="label"
                                                onClick={(e) =>
                                                    this.toDelete(e, key)
                                                }
                                            >
                                                {key}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div key={this.state.labelDeleteUpdate}>
                                {this.state.deleteOrders.length > 0 && (
                                    <div className="buttons">
                                        <button>Delete Selected </button>
                                        <button
                                            onClick={() => {
                                                this.resetDelete();
                                            }}
                                        >
                                            Reset Changes
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;
