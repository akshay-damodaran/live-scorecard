import React, { Component } from "react";

import '../styles/AdminScoreBoard.css';
// import Popup from "./Popup";
import BatsmanSection from '../components/BatsmanSection';
import OversSection from '../components/OversSection';

class AdminScoreBoard extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  batsman1: {
                        name: '',
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0,
                        isStriker: true
                  },
                  batsman2: {
                        name: '',
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0,
                        isStriker: false
                  },
                  battingTeamPlayers: [],
                  bowlingTeamPlayers: [],
                  runs: 0,
                  isWicket: false
            }
      }

      componentDidMount() {
            const { battingTeam, team1Players, team2Players } = this.props;
            let battingTeamPlayers, bowlingTeamPlayers;
            if (battingTeam === 1) {
                  battingTeamPlayers = team1Players;
                  bowlingTeamPlayers = team2Players;
            } else {
                  battingTeamPlayers = team2Players;
                  bowlingTeamPlayers = team1Players;
            }
            this.setState({ battingTeamPlayers, bowlingTeamPlayers });
      }

      setBatsmenDetails(batsman1, batsman2) {
            this.setState({ batsman1, batsman2 });
      }

      updateRuns(addRuns) {
            let { runs } = this.state;
            runs = runs + addRuns;
            this.setState({ runs });
      }

      setWicket() {
            this.setState({ isWicket: true });
      }

      render() {
            const { team1, team2, tossResult, battingTeam } = this.props;
            const { battingTeamPlayers, bowlingTeamPlayers } = this.state;
            return (
                  <div className="admin-scoreboard">
                        <div className="scoreboard-header">
                              <b>Admin Score Board</b>
                        </div>
                        <div className="admin-teams">
                              <div className="team" id="team-1" style={{ backgroundColor: '#66ccff' }}>
                                    <img src={(battingTeam === 1) ? require('../images/team1.png') : require('../images/team2.png')} width="50" height="50" className="team-logo" alt={team1} />
                                    <h4>&nbsp;&nbsp;&nbsp;{team1}</h4>
                              </div>
                              <div className="team" id="team-2" style={{ backgroundColor: '#ccccff' }}>
                                    <img src={(battingTeam !== 1) ? require('../images/team1.png') : require('../images/team2.png')} width="50" height="50" className="team-logo" alt={team2} />
                                    <h4>&nbsp;&nbsp;&nbsp;{team2}</h4>
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
                        <div className="scoreboard-body">
                              <div className="scores-section">
                                    <div className="section-header">
                                          <span>Scores Section</span>
                                    </div>
                                    <div className="section-body">
                                          <div className="runs">
                                                <span>Runs:&nbsp;&nbsp;&nbsp;</span>
                                                <div className="score">{this.state.runs}</div>
                                          </div>
                                    </div>
                              </div>
                              <BatsmanSection
                                    battingTeamPlayers={battingTeamPlayers}
                                    setBatsmenDetails={this.setBatsmenDetails.bind(this)}
                                    isWicket={this.state.isWicket}
                              />
                              <OversSection
                                    bowlingTeamPlayers={bowlingTeamPlayers}
                                    updateRuns={this.updateRuns.bind(this)}
                                    setWicket={this.setWicket.bind(this)}
                              />

                        </div>
                  </div>
            );
      }
}

export default AdminScoreBoard;