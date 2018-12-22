import React, { Component } from "react";

import '../styles/AdminScoreBoard.css';
import Popup from "./Popup";

class AdminScoreBoard extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  runs: 0,
                  wickets: 0,
                  totalOvers: 20,
                  // overs: 0,
                  bowls: [1, 2, 3, 4, 5, 6, '+'],
                  // showPopup: false,
                  // popupChildren: [],
                  bowler: '',
                  batsman1: {
                        name: 'Virat Kohli',
                        runs: 9,
                        balls: 6,
                        fours: 2,
                        sixes: 0
                  },
                  batsman2: {
                        name: 'Mahendra Dhoni',
                        runs: 9,
                        balls: 6,
                        fours: 2,
                        sixes: 0
                  },
                  striker: '',
                  bowlingStatus: [],
                  currentBowl: 0,
                  team1Players: [],
                  team2Players: [],
                  newOver: false,
                  matchStart: false,
                  isWicket: false,
                  outBatsman: ''
            }
      }

      componentDidMount() {
            const team1Players = ['Virat', 'Dhoni', 'Jadeja', 'Singh'];
            const team2Players = ['Kohli', 'Mahendra', 'Ravindra', 'Harbhjan'];
            let { currentBowl, newOver, matchStart } = this.state;
            currentBowl = currentBowl + 1;
            newOver = (currentBowl % 6 === 1) ? true : false;
            matchStart = (currentBowl === 1) ? true : false;
            this.setState({ currentBowl, team1Players, team2Players, newOver, matchStart });
      }

      setBowler(elementName) {
            const bowler = document.getElementsByName(elementName)[0].value;
            this.setState({ bowler });
      }

      setStriker() {
            const striker = document.getElementsByName("striker")[0].value;
            this.setState({ striker });
      }

      setNonStriker() {
            const nonStriker = document.getElementsByName("nonStriker")[0].value;
            this.setState({ nonStriker });
      }

      setBoardDisplay() {
            this.setState({ newOver: true, matchStart: false });
      }

      setOverDetails() {
            // const bowler = document.getElementsByName("bowler-over-start")[0].value;
            this.setState({ newOver: false });
      }

      setWicketDetails() {
            this.setState({  });
      }

      setOver(ballNo, i) {
            switch (ballNo) {
                  case '+': {
                        this.setState({ newOver: true, bowls: [1, 2, 3, 4, 5, 6, '+'] });
                        break;
                  }
                  default: {
                        document.getElementById(`bowl_${i}`).style.backgroundColor = '#ba124c';
                        const bowlStatus = ['WD', 'WK', 'NB', 'B', 'LB', 'R'];
                        const bowlingStatus = <div className="over-count">
                              {
                                    bowlStatus.map((item, j) =>
                                          <div
                                                key={`bowledStatus_${j}`}
                                                className="bowl"
                                                onClick={() => {
                                                      const bowls = this.state.bowls;
                                                      bowls[i] = item;
                                                      this.setState({ bowls, bowlingStatus: [], isWicket: (item === 'WK') });
                                                }
                                                }>
                                                {item}
                                          </div>
                                    )
                              }
                        </div>;
                        const currentBowl = (document.getElementById(`bowl_${i}`).style.backgroundColor !== '#ba124c') ? (this.state.currentBowl !== 1) ? this.state.currentBowl + 1 : this.state.currentBowl : this.state.currentBowl;
                        this.setState({ bowlingStatus, currentBowl });
                        break;
                  }
            }
      }

      render() {
            const { team1, team2, tossResult, battingTeam } = this.props;
            const { runs, wickets, overs, bowls, batsman1, batsman2, team1Players, team2Players } = this.state;
            return (
                  <div className="admin-scoreboard">
                        <div className="scoreboard-header">
                              Admin Score Board
                        </div>
                        <div className="admin-teams">
                              <div className="team" style={{ backgroundColor: '#66ccff' }}>
                                    <img src={require('../images/team1.png')} width="50" height="50" className="team-logo" alt={team1} />
                                    <h4>&nbsp;{team1}</h4>
                              </div>
                              <div className="team" style={{ backgroundColor: '#ccccff' }}>
                                    <img src={require('../images/team2.png')} width="50" height="50" className="team-logo" alt={team2} />
                                    <h4>&nbsp;{team2}</h4>
                              </div>
                        </div>
                        <div className="toss-win">
                              {
                                    (tossResult === 1) ?
                                          <span>{`${team1} won the toss and elected to do ${(battingTeam === 1) ? 'batting' : 'fielding'}.`}</span>
                                          :
                                          <span>{`${team2} won the toss and elected to do ${(battingTeam === 2) ? 'batting' : 'fielding'}.`}</span>
                              }
                        </div>
                        {
                              (this.state.newOver) ?
                                    (this.state.matchStart) ?
                                          <div className="scoreboard-body-match-start">
                                                <div>
                                                      <div className="section-header">
                                                            <span>{`Match Start Details`}</span>
                                                      </div>
                                                      <div className="match-start-section">
                                                            <div className="dropdown-list">
                                                                  <div className="dd-list-half">{"Striker"}</div>
                                                                  <div className="dd-list-half">
                                                                        {
                                                                              (battingTeam === 1) ?
                                                                                    <select id="strikerNames" name="striker" onChange={() => this.setStriker()}>
                                                                                          <option value="selected">{"Select Striker"}</option>
                                                                                          {
                                                                                                team1Players.map((item, i) =>
                                                                                                      <option key={i} value={item}>{item}</option>
                                                                                                )
                                                                                          }
                                                                                    </select>
                                                                                    :
                                                                                    <select id="strikerNames" name="striker" onChange={() => this.setStriker()}>
                                                                                          <option value="selected">{"Select Striker"}</option>
                                                                                          {
                                                                                                team2Players.map((item, i) =>
                                                                                                      <option key={i} value={item}>{item}</option>
                                                                                                )
                                                                                          }
                                                                                    </select>
                                                                        }
                                                                  </div>
                                                            </div>
                                                            <div className="dropdown-list">
                                                                  <div className="dd-list-half">{"Non-Striker"}</div>
                                                                  <div className="dd-list-half">
                                                                        {
                                                                              (battingTeam === 1) ?
                                                                                    <select id="nonStrikerNames" name="nonStriker" onChange={() => this.setNonStriker()}>
                                                                                          <option value="selected">{"Select Non-Striker"}</option>
                                                                                          {
                                                                                                team1Players.map((item, i) =>
                                                                                                      <option key={i} value={item}>{item}</option>
                                                                                                )
                                                                                          }
                                                                                    </select>
                                                                                    :
                                                                                    <select id="nonStrikerNames" name="nonStriker" onChange={() => this.setNonStriker()}>
                                                                                          <option value="selected">{"Select Non-Striker"}</option>
                                                                                          {
                                                                                                team2Players.map((item, i) =>
                                                                                                      <option key={i} value={item}>{item}</option>
                                                                                                )
                                                                                          }
                                                                                    </select>
                                                                        }
                                                                  </div>
                                                            </div>
                                                            <div className="">
                                                                  <input
                                                                        className="sb-input"
                                                                        value={this.state.totalOvers}
                                                                        placeholder="Enter total overs"
                                                                        min="20"
                                                                        max="50"
                                                                        onChange={(e) => this.setState({ totalOvers: e.target.value })}
                                                                  />
                                                            </div>
                                                            <button className="scoreboard-button" onClick={() => this.setBoardDisplay()}>OK</button>
                                                      </div>
                                                </div>

                                          </div>
                                          :
                                          <div className="scoreboard-body">
                                                <div>
                                                      <div className="section-header">
                                                            <span>{`Over Start Details`}</span>
                                                      </div>
                                                      <div className="match-start-section">
                                                            <div className="dropdown-list">
                                                                  <div className="dd-list-half">{"Bowler"}</div>
                                                                  <div className="dd-list-half">
                                                                        {
                                                                              (battingTeam === 1) ?
                                                                                    <select id="bowlerNames-over" name="bowler-over-start" onChange={() => this.setBowler("bowler-over-start")}>
                                                                                          <option value="selected">{"Select Bowler"}</option>
                                                                                          {
                                                                                                team2Players.map((item, i) =>
                                                                                                      <option key={i} value={item}>{item}</option>
                                                                                                )
                                                                                          }
                                                                                    </select>
                                                                                    :
                                                                                    <select id="bowlerNames-over" name="bowler-over-start" onChange={() => this.setBowler("bowler-over-start")}>
                                                                                          <option value="selected">{"Select Bowler"}</option>
                                                                                          {
                                                                                                team1Players.map((item, i) =>
                                                                                                      <option key={i} value={item}>{item}</option>
                                                                                                )
                                                                                          }
                                                                                    </select>
                                                                        }
                                                                  </div>
                                                            </div>
                                                            <button className="scoreboard-button" onClick={() => this.setOverDetails()}>OK</button>
                                                      </div>
                                                </div>
                                          </div>
                                    :
                                    (this.state.isWicket) ?
                                          <div className="scoreboard-body">
                                                <div>
                                                      <div className="section-header">
                                                            <span>{`Who's out`}</span>
                                                      </div>
                                                      <div className="section-body">
                                                            <button className="scoreboard-button">{this.state.striker}</button>
                                                            <button className="scoreboard-button">{this.state.nonStriker}</button>
                                                      </div>
                                                </div>
                                                <div>
                                                      <div className="section-header">
                                                            <span>{`Reason for out`}</span>
                                                      </div>
                                                      <div className="section-body">
                                                            <button className="scoreboard-button">{`Catch Out`}</button>
                                                            <button className="scoreboard-button">{`Run Out`}</button>
                                                            <button className="scoreboard-button">{`Bold`}</button>
                                                      </div>
                                                </div>
                                                <div>
                                                      <div className="section-header">
                                                            <span>{`Next Striker`}</span>
                                                      </div>
                                                      <div className="dropdown-list">
                                                            <div className="dd-list-half">{"Striker"}</div>
                                                            <div className="dd-list-half">
                                                                  {
                                                                        (battingTeam === 1) ?
                                                                              <select id="strikerNames" name="striker" onChange={() => this.setStriker()}>
                                                                                    <option value="selected">{"Select Striker"}</option>
                                                                                    {
                                                                                          team1Players.map((item, i) =>
                                                                                                <option key={i} value={item}>{item}</option>
                                                                                          )
                                                                                    }
                                                                              </select>
                                                                              :
                                                                              <select id="strikerNames" name="striker" onChange={() => this.setStriker()}>
                                                                                    <option value="selected">{"Select Striker"}</option>
                                                                                    {
                                                                                          team2Players.map((item, i) =>
                                                                                                <option key={i} value={item}>{item}</option>
                                                                                          )
                                                                                    }
                                                                              </select>
                                                                  }
                                                            </div>
                                                      </div>
                                                </div>
                                                <button className="scoreboard-button" onClick={() => this.setWicketDetails()}>OK</button>
                                          </div>
                                          :
                                          <div className="scoreboard-body">
                                                <div className="match-section">
                                                      <div className="section-header">
                                                            <span>Striker / Non-Striker</span>
                                                      </div>
                                                      <div className="section-body">
                                                            <div className="striker-headings">
                                                                  <div className="batsman">Striker</div>
                                                                  <div className="batsman">Runs</div>
                                                                  <div className="batsman">Balls</div>
                                                                  <div className="batsman">Fours</div>
                                                                  <div className="batsman">Sixes</div>
                                                            </div>
                                                            <div className="striker">
                                                                  {
                                                                        Object.keys(batsman1).map((item, i) =>
                                                                              <div key={`batsman1_${item}`} className="batsman">{batsman1[item]}</div>
                                                                        )
                                                                  }
                                                            </div>
                                                            <div className="striker">
                                                                  {
                                                                        Object.keys(batsman2).map((item, i) =>
                                                                              <div key={`batsman2_${item}`} className="batsman">{batsman2[item]}</div>
                                                                        )
                                                                  }
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="bowler-section">
                                                      <div className="section-header">
                                                            <span>Bowler Section</span>
                                                      </div>
                                                      <div className="section-body">
                                                            <span>{this.state.bowler}</span>
                                                      </div>
                                                </div>
                                                <div className="scores-section">
                                                      <div className="section-header">
                                                            <span>Scores Section</span>
                                                      </div>
                                                      <div className="section-body">
                                                            <div className="runs">
                                                                  <span>Runs</span>
                                                                  <div className="score-minus" onClick={() => this.setState({ runs: (runs === 0) ? 0 : runs - 1 })}><span>{'-'}</span></div>
                                                                  <div className="score">{runs}</div>
                                                                  <div className="score-add" onClick={() => this.setState({ runs: runs + 1 })}><span>{'+'}</span></div>
                                                            </div>
                                                            <div className="wickets">
                                                                  <span>Wickets</span>
                                                                  <div className="score-minus" onClick={() => this.setState({ wickets: (wickets === 0) ? 0 : wickets - 1 })}><span>{'-'}</span></div>
                                                                  <div className="score">{wickets}</div>
                                                                  <div className="score-add" onClick={() => this.setState({ wickets: wickets + 1, isWicket: true })}><span>{'+'}</span></div>
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="overs-section">
                                                      <div className="section-header">
                                                            <span>Overs Section</span>
                                                      </div>
                                                      <div className="overs-section-body">
                                                            <div className="overs-status">
                                                                  <span className="overs">Total: {this.state.totalOvers}</span>
                                                                  <span className="overs">Current: {`${Math.floor((this.state.currentBowl + 1) / 6)}.${(this.state.currentBowl + 1) % 6}`}</span>
                                                                  {/* <span className="overs">Remaining: {this.state.totalOvers - this.state.currentOvers}</span> */}
                                                            </div>
                                                            <div className="overs">
                                                                  <div className="over-count">
                                                                        <span>Overs:</span>
                                                                        {
                                                                              bowls.map((item, i) =>
                                                                                    <div id={`bowl_${i}`} className="bowl" onClick={() => this.setOver(item, i)}>{item}</div>
                                                                              )
                                                                        }
                                                                  </div>
                                                                  {this.state.bowlingStatus}
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                        }
                  </div>
            );
      }
}

export default AdminScoreBoard;