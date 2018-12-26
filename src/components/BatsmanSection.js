import React, { Component } from 'react';

import '../styles/BatsmanSection.css';

class BatsmanSection extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  isMatchStart: true,
                  striker: {},
                  nonStriker: {},
                  battingTeam: this.props.battingTeam,

                  changePlayer: this.props.changePlayer,
                  isWicket: this.props.isWicket,
                  currentOutPlayer: '',
                  nextPlayer: {
                        name: 'Select Next Player',
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0,
                        isStriker: false
                  },
                  wicketDetails: {
                        batsman: '',
                        isCatchOut: false,
                        isRunOut: false,
                        isBold: false,
                        catchedByWhom: ''
                  },
                  wicketReason: '',
                  wicketBy: '',
                  wicketReasons: ['Catch Out', 'Run Out', 'Bold']
            }
      }

      componentDidMount() {
            let { striker, nonStriker } = this.props;
            this.setState({ striker, nonStriker });
      }

      componentWillReceiveProps(nextProps) {
            this.setState({
                  striker: nextProps.striker,
                  nonStriker: nextProps.nonStriker,
                  isWicket: nextProps.isWicket,
                  changePlayer: nextProps.changePlayer
            });
      }

      setPlayer(e, type) {
            let player = {
                  name: e.target.value,
                  runs: 0,
                  balls: 0,
                  fours: 0,
                  sixes: 0
            }
            switch (type) {
                  case 'striker': {
                        this.setState({ striker: player });
                        break;
                  }
                  case 'nonStriker': {
                        this.setState({ nonStriker: player });
                        break;
                  }
                  case 'nextPlayer': {
                        switch (this.state.currentOutPlayer) {
                              case 'striker': {
                                    player.isStriker = true;
                                    this.setState({ nextPlayer: player });
                                    break
                              }
                              case 'nonStriker': {
                                    player.isStriker = false;
                                    this.setState({ nextPlayer: player });
                                    break;
                              }
                              default: break;
                        }
                        break;
                  }
                  default: {
                        break;
                  }
            }
      }

      setMatchStartDetails(e) {
            e.preventDefault();
            const { striker, nonStriker } = this.state;
            this.props.setBatsmenDetails(striker, nonStriker);
            this.setState({ isMatchStart: false });

            // Event - inningStart
            // socket.emit('inningStart', {
            //       inningId,
            //       strikerId: striker.id,
            //       nonStrikerId: nonStriker.id,
            // });
      }

      renderBattingTeamDropDown(team) {
            const { battingTeamPlayers } = this.props;
            return (
                  <select
                        id={team}
                        className="team-dropdown"
                        value={this.state[team].name}
                        onChange={(e) => this.setPlayer(e, team)}
                        autoFocus={(team === 'striker')}
                        required={true}
                  >
                        <option value="">{`Select player`}</option>
                        {
                              battingTeamPlayers.map((item, i) =>
                                    <option key={i} value={item.name}>{item.name}</option>
                              )
                        }
                  </select>
            );
      }

      switchStriker() {
            const { striker, nonStriker } = this.state;
            this.setState({
                  striker: nonStriker,
                  nonStriker: striker
            });
            // this.props.setBatsmenDetails(nonStriker, striker);
      }

      setNextPlayerDetails(isStriker) {
            let { nextPlayer } = this.state;
            nextPlayer.isStriker = isStriker;
            this.setState({ nextPlayer });
            switch (isStriker) {
                  case true: {
                        document.getElementById('nextplayer-striker').style.backgroundColor = '#ba124c';
                        document.getElementById('nextplayer-nonStriker').style.backgroundColor = '#e6e6e6';
                        break;
                  }
                  case false: {
                        document.getElementById('nextplayer-striker').style.backgroundColor = '#e6e6e6';
                        document.getElementById('nextplayer-nonStriker').style.backgroundColor = '#ba124c';
                        break;
                  }
                  default: break;
            }
      }

      setWicketDetails(e) {
            // e.preventDefault();
            let { currentOutPlayer, nextPlayer, wicketBy, wicketReason, striker, nonStriker } = this.state;

            switch (currentOutPlayer) {
                  case 'striker': {
                        switch (nextPlayer.isStriker) {
                              case true: {
                                    delete nextPlayer['isStriker'];
                                    this.setState({ striker: nextPlayer, isWicket: false, changePlayer: false });
                                    break;
                              }
                              case false: {
                                    this.switchStriker();
                                    delete nextPlayer['isStriker'];
                                    this.setState({ nonStriker: nextPlayer, isWicket: false, changePlayer: false });
                                    break;
                              }
                              default: break;
                        }
                        break;
                  }
                  case 'nonStriker': {
                        switch (nextPlayer.isStriker) {
                              case true: {
                                    this.switchStriker();
                                    delete nextPlayer['isStriker'];
                                    this.setState({ striker: nextPlayer, isWicket: false, changePlayer: false });
                                    break;
                              }
                              case false: {
                                    delete nextPlayer['isStriker'];
                                    this.setState({ nonStriker: nextPlayer, isWicket: false, changePlayer: false });
                                    break;
                              }
                              default: break;
                        }
                        break;
                  }
                  default: break;
            }
            this.props.updateWickets(1);
            this.props.setWicket(false, {
                  wicketBy: wicketBy, // input to be taken
                  wicketType: wicketReason,
                  playerId: (currentOutPlayer === 'striker') ? striker.id : nonStriker.id,
                  newPlayerId: nextPlayer.id, 
                  newPlayerName: nextPlayer.name,
                  strikerId: striker.id,
                  striker: (nextPlayer.isStriker) ? nextPlayer : striker,
                  nonStriker: (nextPlayer.isStriker) ? nonStriker : nextPlayer,
            });
      }

      handleWicketReason(item) {
            this.state.wicketReasons.map((item) => {
                  document.getElementById(`wicketReason_${item}`).style.backgroundColor = '#e6e6e6';
                  return null;
            })
            document.getElementById(`wicketReason_${item}`).style.backgroundColor = '#ba124c';
            this.setState({ wicketReason: item });
      }

      handleWicketPlayer(player) {
            let currentOutPlayer;
            switch (player) {
                  case 'striker': {
                        document.getElementById('striker-out').style.backgroundColor = '#ba124c';
                        document.getElementById('nonStriker-out').style.backgroundColor = '#e6e6e6';
                        currentOutPlayer = 'striker';
                        break;
                  }
                  case 'nonStriker': {
                        document.getElementById('striker-out').style.backgroundColor = '#e6e6e6';
                        document.getElementById('nonStriker-out').style.backgroundColor = '#ba124c';
                        currentOutPlayer = 'nonStriker';
                        break;
                  }
                  default: {
                        break;
                  }
            }
            this.setState({ currentOutPlayer });
      }

      renderPlayer(player) {
            return (
                  <div className="striker">
                        {
                              Object.keys(player).map((item, i) =>
                                    <div
                                          key={`batsman_${item}`}
                                          className="batsman"
                                    >
                                          {(item === 'id') ? null : player[item]}
                                    </div>
                              )
                        }
                  </div>
            );
      }

      renderPlayerChange(reason = '') { // reason = wicket | playerChange
            const { striker, nonStriker } = this.state;
            return (
                  <div className="match-section">
                        <div className="wicket-section">
                              <div className="overs-header">{`Who's out?`}</div>
                              <div className="player-out">
                                    <button id="striker-out" onClick={() => this.handleWicketPlayer('striker')}>{striker.name}</button>
                                    <button id="nonStriker-out" onClick={() => this.handleWicketPlayer('nonStriker')}>{nonStriker.name}</button>
                              </div>

                              {
                                    (reason === 'wicket') &&
                                    <div>
                                          <div className="overs-header">{`Wicket Reason?`}</div>
                                          <div className="player-out">
                                                {
                                                      this.state.wicketReasons.map((item, i) =>
                                                            <button key={`wicket_reason_${i}`} className="wicket-reason" id={`wicketReason_${item}`} onClick={() => this.handleWicketReason(item)}>{item}</button>
                                                      )
                                                }
                                          </div>
                                          <div className="overs-header">{`Wicket By?`}</div>
                                          <div className="player-out">
                                                <input
                                                      type="text"
                                                      value={this.state.wicketBy}
                                                      onChange={(e) => this.setState({ wicketBy: e.target.value })}
                                                 />
                                                 {/* future: to render bowling team */}
                                          </div>
                                    </div>      
                              }
                              <div className="overs-header">{`Next batsman?`}</div>
                              <div className="dropdown-list">
                                    <div className="dd-list-half">{"Select next player:"}</div>
                                    <div className="dd-list-half">
                                          {
                                                this.renderBattingTeamDropDown('nextPlayer')
                                          }
                                    </div>
                              </div>
                              <div className="overs-header">{`As Striker?`}</div>
                              <div className="player-out">
                                    <button id="nextplayer-striker" onClick={() => this.setNextPlayerDetails(true)}>{`Yes`}</button>
                                    <button id="nextplayer-nonStriker" onClick={() => this.setNextPlayerDetails(false)}>{'No'}</button>
                              </div>
                              <div className="player-out">
                                    <input type="submit" value="OK" onClick={() => this.setWicketDetails()} />
                                    <input type="submit" value="CANCEL" onClick={() => this.setState({ isWicket: false, changePlayer: false })} />
                              </div>
                        </div>
                  </div>
            )
      }

      render() {
            const { striker, nonStriker } = this.state;
            return (
                  <div className="match-section">
                        <div className="section-header">
                              <span>Striker / Non-Striker</span>
                        </div>
                        <div className="section-body">
                              {
                                    (this.state.isMatchStart) ?
                                          <div className="scoreboard-body-match-start">
                                                <form onSubmit={(e) => this.setMatchStartDetails(e)}>
                                                      <div className="match-start-section">
                                                            <div className="dropdown-list">
                                                                  <div className="dd-list-half">{"Striker"}</div>
                                                                  <div className="dd-list-half">
                                                                        {
                                                                              this.renderBattingTeamDropDown('striker')
                                                                        }
                                                                  </div>
                                                            </div>
                                                            <div className="dropdown-list">
                                                                  <div className="dd-list-half">{"Non-Striker"}</div>
                                                                  <div className="dd-list-half">
                                                                        {
                                                                              this.renderBattingTeamDropDown('nonStriker')
                                                                        }
                                                                  </div>
                                                            </div>
                                                            <input type="submit" value="OK" />
                                                      </div>
                                                </form>
                                          </div>
                                          :
                                          (this.state.isWicket) ?
                                                this.renderPlayerChange('wicket')
                                                :
                                                (this.state.changePlayer) ?
                                                      this.renderPlayerChange('batsman')
                                                      :
                                                      <div className="match-section">
                                                            <div className="player-out">
                                                                  <button id="change-batsman" onClick={() => this.setState({ changePlayer: true })}>{`Change Batsman`}</button>
                                                                  <button id="swap-striker" onClick={() => this.switchStriker()}>{'Swap Striker'}</button>
                                                            </div>
                                                            <div className="section-body">
                                                                  <div className="striker-headings">
                                                                        <div className="batsman">Name</div>
                                                                        <div className="batsman">Runs</div>
                                                                        <div className="batsman">Balls</div>
                                                                        <div className="batsman">Fours</div>
                                                                        <div className="batsman">Sixes</div>
                                                                  </div>
                                                                  {this.renderPlayer(this.state.striker)}
                                                                  {this.renderPlayer(this.state.nonStriker)}
                                                            </div>
                                                      </div>
                              }
                        </div>
                  </div>
            );
      }
}

export default BatsmanSection;