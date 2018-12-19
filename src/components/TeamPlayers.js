import React, { Component } from 'react';
import '../styles/TeamPlayers.css';

class TeamPlayers extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  teamNo: this.props.teamNo,
                  teamName: this.props.teamName,
                  mainPlayers: ['', '', '', '', '', '', '', '', '', '', ''],
                  extraPlayers: ['', '', '', '', '']
            }
      }

      componentWillReceiveProps(nextProps, nextState) {
            this.setState({
                  teamNo: nextProps.teamNo,
                  teamName: nextProps.teamName,
                  mainPlayers: ['', '', '', '', '', '', '', '', '', '', ''],
                  extraPlayers: ['', '', '', '', '']
            })
      }

      setTeamPlayers() {
            let players = this.state.mainPlayers.concat(this.state.extraPlayers);
            this.props.setTeamPlayers(this.state.teamNo, players);
      }

      setPlayer(playerName, i, playerType) {
            switch (playerType) {
                  case 'main': {
                        let mainPlayers = this.state.mainPlayers;
                        mainPlayers[i] = playerName;
                        this.setState({ mainPlayers });
                        break;
                  }
                  case 'extra': {
                        let extraPlayers = this.state.extraPlayers;
                        extraPlayers[i] = playerName;
                        this.setState({ extraPlayers });
                        break;
                  }
                  default: {
                        break;
                  }
            }
      }

      render() {
            return (
                  <div className="teamplayers">
                        <div className="header">
                              <h3>{`Team ${this.state.teamNo}: ${this.state.teamName}`}</h3>
                        </div>
                        <div className="teamplayers-body">
                              <h4>Main Players</h4>
                              {
                                    this.state.mainPlayers.map((item, i) =>
                                          <input
                                                className="teamplayer-input"
                                                key={`mainplayer_${i}`}
                                                placeholder={(i === 0) ? `Captain name` : `Player ${i + 1} name`}
                                                value={this.state.mainPlayers[i]}
                                                onChange={(e) => this.setPlayer(e.target.value, i, 'main')}
                                                type="text"
                                                required
                                          />
                                    )
                              }
                              <h4>Extra Players</h4>
                              {
                                    this.state.extraPlayers.map((item, i) =>
                                          <input
                                                className="teamplayer-input"
                                                key={`extraplayer_${i}`}
                                                placeholder={`Player ${i + 12} name`}
                                                value={this.state.extraPlayers[i]}
                                                onChange={(e) => this.setPlayer(e.target.value, i, 'extra')}
                                                type="text"
                                                required
                                          />
                                    )
                              }
                              <br />
                              <button className="teamplayer-button" onClick={() => this.setTeamPlayers()}>
                                    {
                                          (this.state.teamNo === 1) ?
                                                `Let's Build Team 2`
                                                :
                                                `Done with Teams`
                                    }
                              </button>
                              <br />
                        </div>
                  </div>
            )
      }
}

export default TeamPlayers;