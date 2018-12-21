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

      render() {
            return (
                  <div className="display-teams">
                        <div className="header">
                              <h3>Display Teams</h3>
                        </div>
                        <br />
                        <table className="team-list">
                              <thead className="table-heading">
                                    <tr>
                                          <th>{this.state.team1.teamName}</th>
                                          <th>{this.state.team2.teamName}</th>
                                    </tr>
                              </thead>
                              <tbody className="table-body">
                                    {
                                          this.state.team1.teamPlayers.map((item, i) =>
                                                <tr key={`table_row_${i}`} className="player-row">
                                                      <td>{item}</td>
                                                      <td>{this.state.team2.teamPlayers[i]}</td>
                                                </tr>
                                          )
                                    }
                              </tbody>
                        </table>
                        <button className="teamplayer-button" onClick={() => this.setTossPage()}>
                              Let's Toss
                        </button>
                        <br />
                  </div>
            );
      }
}

export default DisplayTeams;