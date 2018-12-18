import React, { Component } from 'react';

class TeamPlayers extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  teamNo: this.props.teamNo,
                  teamName: this.props.teamName,
                  mainPlayers: ['', '', '', '', '', '', '', '', '', '', ''],
                  extraPlayers: ['', '', '', '']
            }
      }

      render() {
            return (
                  <div className="teamplayers">
                        <div>
                              <h2>{`Team ${this.state.teamNo + 1}: ${this.state.teamName}`}</h2>
                              {
                                    (this.state.teamNo === 0) ?

                              }
                              <button className="teamplayer-button" onClick={() => this.setPage()}>
                                    {
                                          (this.state.teamNo === 0) ?
                                                `Let's Build Team 2`
                                                :
                                                `Done with Teams`
                                    }
                              </button>
                        </div>
                  </div>
            )
      }
}

export default TeamPlayers;