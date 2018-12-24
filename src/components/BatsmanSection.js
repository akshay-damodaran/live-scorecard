import React, { Component } from 'react';

import '../styles/BatsmanSection.css';

class BatsmanSection extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  isMatchStart: true,
                  striker: {
                        name: 'Select Striker',
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0,
                        isStriker: true
                  },
                  nonStriker: {
                        name: 'Select Non Striker',
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0,
                        isStriker: false
                  },
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
                  wicketReasons: ['Catch Out', 'Run Out', 'Bold']
            }
      }

      componentWillReceiveProps(nextProps) {
            this.setState({ isWicket: nextProps.isWicket, changePlayer: nextProps.changePlayer });
      }

      setPlayer(e, type) {
            let player = {
                  name: e.target.value,
                  runs: 0,
                  balls: 0,
                  fours: 0,
                  sixes: 0,
                  isStriker: false
            }
            switch (type) {
                  case 'striker': {
                        player.isStriker = true;
                        this.setState({ striker: player });
                        break;
                  }
                  case 'nonStriker': {
                        player.isStriker = false;
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
                        }
                        break;
                  }
                  default: {
                        break;
                  }
            }
      }

      setMatchStartDetails() {
            const { striker, nonStriker } = this.state;
            this.props.setBatsmenDetails(striker, nonStriker);
            this.setState({ isMatchStart: false });
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
                  >
                        <option>{`Select player`}</option>
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
            striker.isStriker = false;
            nonStriker.isStriker = true;
            this.setState({
                  striker: nonStriker,
                  nonStriker: striker
            });
      }

      setWicketDetails() {
            (this.state.nextPlayer.isStriker) ?
                  this.setState({ striker: this.state.nextPlayer, isWicket: false })
                  :
                  this.setState({ nonStriker: this.state.nextPlayer, isWicket: false });
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
                                                <div>
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
                                                            <button onClick={() => this.setMatchStartDetails()}>OK</button>
                                                      </div>
                                                </div>
                                          </div>
                                          :
                                          (this.state.isWicket) ?
                                                <div className="match-section">
                                                      <div className="wicket-section">
                                                            <div className="overs-header">{`Who's out?`}</div>
                                                            <div className="player-out">
                                                                  <button id="striker-out" onClick={() => this.handleWicketPlayer('striker')}>{striker.name}</button>
                                                                  <button id="nonStriker-out" onClick={() => this.handleWicketPlayer('nonStriker')}>{nonStriker.name}</button>
                                                            </div>
                                                            <div className="overs-header">{`Wicket Reason?`}</div>
                                                            <div className="player-out">
                                                                  {/* <span>{`\nWicket Reason?`}</span> */}
                                                                  {
                                                                        this.state.wicketReasons.map((item, i) =>
                                                                              <button className="wicket-reason" id={`wicketReason_${item}`} onClick={() => this.handleWicketReason(item)}>{item}</button>
                                                                        )
                                                                  }
                                                            </div>
                                                            <span>{`\nNext batsman?`}</span>
                                                            <div className="dropdown-list">
                                                                  <div className="dd-list-half">{"Select next player:"}</div>
                                                                  <div className="dd-list-half">
                                                                        {
                                                                              this.renderBattingTeamDropDown('nextPlayer')
                                                                        }
                                                                  </div>
                                                            </div>
                                                            <button id="wicket-details-button" onClick={() => this.setWicketDetails()}>OK</button>
                                                      </div>
                                                </div>
                                                :
                                                (this.state.changePlayer) ?
                                                      <div className="match-section">
                                                            <div className="wicket-section">
                                                                  <div className="overs-header">{`Change Player?`}</div>
                                                                  <div className="player-out">
                                                                        <button id="striker-out" onClick={() => this.handleWicketPlayer('striker')}>{striker.name}</button>
                                                                        <button id="nonStriker-out" onClick={() => this.handleWicketPlayer('nonStriker')}>{nonStriker.name}</button>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                      :
                                                      <div className="match-section">
                                                            <div className="section-body">
                                                                  <div className="striker-headings">
                                                                        <div className="batsman">Name</div>
                                                                        <div className="batsman">Runs</div>
                                                                        <div className="batsman">Balls</div>
                                                                        <div className="batsman">Fours</div>
                                                                        <div className="batsman">Sixes</div>
                                                                        <div className="batsman">Striker</div>
                                                                  </div>
                                                                  <div className="striker">
                                                                        {
                                                                              Object.keys(striker).map((item, i) =>
                                                                                    <div
                                                                                          key={`batsman1_${item}`}
                                                                                          className="batsman"
                                                                                    // onClick={() => this.switchStriker()}
                                                                                    >
                                                                                          {(item === 'isStriker') ? (striker[item]) ? 'Yes' : 'No' : striker[item]}
                                                                                    </div>
                                                                              )
                                                                        }
                                                                  </div>
                                                                  <div className="striker">
                                                                        {
                                                                              Object.keys(nonStriker).map((item, i) =>
                                                                                    <div
                                                                                          key={`batsman2_${item}`}
                                                                                          className="batsman"
                                                                                          onClick={() => this.switchStriker()}
                                                                                    >
                                                                                          {(item === 'isStriker') ? (nonStriker[item]) ? 'Yes' : 'No' : nonStriker[item]}
                                                                                    </div>
                                                                              )
                                                                        }
                                                                  </div>
                                                            </div>
                                                      </div>
                              }
                        </div>
                  </div>
            );
      }
}

export default BatsmanSection;