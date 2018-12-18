import React, { Component } from 'react';
import '../styles/DisplayTeams.css';

class DisplayTeams extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  team1: this.props.team1,
                  team2: this.props.team2
            }
      }

      setTossPage() {
            // set Teams data again
            this.props.setTossPage();
      }

      renderTeamPlayers() {
            let players = [];
            for (let i = 0; i < 16; i++) {
                  players[2 * i] = this.state.team1.teamPlayers[i];
                  players[2 * i + 1] = this.state.team2.teamPlayers[i];
            }
            console.log(players);
            return (
                  <tbody>
                        {
                              players.map
                        }
                  </tbody>
            )
      }

      render() {
            return (
                  <div className="display-teams">
                        <h2>Display Teams</h2>
                        <table className="team-list">
                              <thead>
                                    <tr>
                                          <th>{this.state.team1.teamName}</th>
                                          <th>{this.state.team2.teamName}</th>
                                    </tr>
                              </thead>
                              {/* {this.renderTeamPlayers()} */}
                              <tbody>
                                    {
                                          this.state.team1.teamPlayers.map((item, i) =>
                                                <tr className="player-row">
                                                      <td>{item}</td>
                                                      <td>{this.state.team2.teamPlayers[i]}</td>
                                                </tr>
                                          )
                                    }
                                    <tr>
                                          <td><button onClick={() => { }}>Edit</button></td>
                                          <td><button onClick={() => { }}>Edit</button></td>
                                    </tr>
                              </tbody>
                        </table>
                        <button className="teamplayer-button" onClick={() => this.setTossPage()}>
                                    Let's Toss
                        </button>
                  </div>
            );
      }
}

export default DisplayTeams;