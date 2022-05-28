import React from "react";

import "../css/Settings.css";

var apiUrl = process.env.REACT_APP_APIURL;
var appURL = process.env.REACT_APP_APPURL;
class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: this.props.consoleState.avatarURL,
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

    labelColorChanged(e) {
        console.log(e.target.value);
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
                        <div className="setting">
                            <h4>Change Label Colors</h4>
                            <div id="labels">
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
                                            >
                                                {key}
                                            </label>
                                            <input
                                                type="color"
                                                id={`change${key}`}
                                                defaultValue={color}
                                                onChange={(e) =>
                                                    this.labelColorChanged(e)
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="buttons">
                                <button>Save Changes</button>
                                <button>Reset Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;
