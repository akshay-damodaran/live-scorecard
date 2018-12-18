import React, { Component } from 'react';
import '../styles/Teams.css';


class Teams extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  team1: '',
                  team2: ''
            }
      }

      setTeams() {
            this.props.setTeams([this.state.team1, this.state.team2]);
      }

      render() {

            return (
                  <div className="teams">
                        <h2>Start a match</h2>
                        <br />
                        <input
                              className="team-input"
                              id="teams-input-1"
                              placeholder="Enter Team 1 Name"
                              value={this.state.team1}
                              onChange={(e) => this.setState({ team1: e.target.value })}
                              // onFocus={() => this.setState({ team1: '' })}
                              required
                        />
                        <br />
                        <br />
                        <input
                              className="team-input"
                              id="teams-input-2"
                              placeholder="Enter Team 2 Name"
                              value={this.state.team2}
                              onChange={(e) => this.setState({ team2: e.target.value })}
                              // onFocus={() => this.setState({ team2: '' })}
                              required
                        />
                        <br />
                        <br />
                        <button className="team-button" onClick={() => this.setTeams()}>
                              Let's Build Teams
                              </button>
                  </div>
            );
      }
}

export default Teams;