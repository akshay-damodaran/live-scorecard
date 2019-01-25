import React, { Component } from "react";

import '../styles/AdminScoreBoard.css';
import Popup from "./Popup";
import BatsmanSection from './BatsmanSection';
import OversSection from './OversSection';

let inningHistory = [];

class AdminScoreBoard extends Component {

      constructor(props) {
            super(props);
            const { team1, team2, team1Players, team2Players, totalOvers, tossResult, battingTeam, overArray, socket } = props;
            this.state = {

                  isInningStart: true,

                  // socket data
                  team1,
                  team2,
                  team1Players,
                  team2Players, totalOvers,
                  tossResult,
                  battingTeam,
                  overArray,
                  heading: '',
                  striker: {
                        id: 0,
                        name: '',
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0
                  },
                  nonStriker: {
                        id: 0,
                        name: '',
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0
                  },
                  bowler: {
                        id: 0,
                        name: '',
                        runsGiven: 0,
                        overs: 0.0,
                        maiden: 0,
                        wickets: 0
                  },
                  // overArray: Array(6).fill(0),

                  // tossResult: null,
                  // battingTeam: null,

                  // extra data needed
                  battingTeamPlayers: [],
                  bowlingTeamPlayers: [],

                  totalRuns: 0,
                  // totalOvers: 0,

                  wickets: 0,
                  isWicket: false,

                  inningEnd: false,
                  showPopup: false,

                  socket      
            }
      }

      componentDidMount() {

            const { team1, team1Players, team2Players } = this.props;

            // let battingTeamPlayers, bowlingTeamPlayers;
            // battingTeamPlayers = (battingTeam === 1) ? team1Players : team2Players;
            // bowlingTeamPlayers = (battingTeam !== 1) ? team1Players : team2Players;

            // let heading = (tossResult === 1) ?
            //       `${team1} won the toss and elected to do ${(battingTeam === 1) ? 'batting' : 'fielding'}.`
            //       :
            //       `${team2} won the toss and elected to do ${(battingTeam === 2) ? 'batting' : 'fielding'}.`;

            // let teamOne = {
            //       name: team1,
            //       logo: '',
            //       wonToss: (tossResult === 1),
            //       isBatting: (battingTeam === 1),
            //       runs: 0,
            //       wickets: 0,
            //       ballsFaced: 0
            // };
            // let teamTwo = {
            //       name: team2,
            //       logo: '',
            //       wonToss: (tossResult === 2),
            //       isBatting: (battingTeam === 2),
            //       runs: 0,
            //       wickets: 0,
            //       ballsFaced: 0
            // }
            // this.setState({ battingTeamPlayers, bowlingTeamPlayers, heading, team1: teamOne, team2: teamTwo, totalOvers, tossResult, battingTeam });

            // const { socket, totalOvers, scoreCardDisplay } = this.props;
            // socket.on('scoreCardDisplay', sbDetails => { // score board details
            //       console.log('Score board details: ', sbDetails);
            //       this.initializeScoreBoard(scoreCardDisplay);
            // });
            // this.setState({ socket, totalOvers });
            let { battingTeamPlayers, bowlingTeamPlayers } = this.state;
            if (team1.isBatting) {
                  battingTeamPlayers = team1Players;
                  bowlingTeamPlayers = team2Players;
            } else {
                  battingTeamPlayers = team2Players;
                  bowlingTeamPlayers = team1Players;
            }
            this.setState({ battingTeamPlayers, bowlingTeamPlayers });
      }

      initializeScoreBoard(sbDetails) {
            const { inningId, striker, nonStriker, heading, team1, team2, team1Players, team2Players } = sbDetails;
            let { battingTeamPlayers, bowlingTeamPlayers, tossResult, battingTeam } = this.state;

            tossResult = (team1.wonToss) ? 1 : 2;
            battingTeam = (team1.isBatting) ? 1 : 2;
            battingTeamPlayers = (battingTeam === 1) ? team1Players : team2Players;
            bowlingTeamPlayers = (battingTeam !== 1) ? team1Players : team2Players;

            this.setState({ inningId, battingTeamPlayers, bowlingTeamPlayers, heading, team1, team2, tossResult, battingTeam, striker, nonStriker });
      }

      setBatsmenDetails(striker, nonStriker) {
            this.setState({ striker, nonStriker });
      }

      setBowlerDetails(bowler) {
            this.setState({ bowler });
      }

      updateRuns(addRuns) {
            let { totalRuns, striker, nonStriker } = this.state;
            totalRuns = totalRuns + addRuns;
            striker.runs = striker.runs + addRuns;
            striker.balls = striker.balls + 1;
            if (addRuns % 2 !== 0) {
                  this.setState({ striker: nonStriker, nonStriker: striker, totalRuns });
            } else {
                  this.setState({ totalRuns, striker });
            }
      }

      setWicket(isWicket, wicketDetails) {
            this.setState({ isWicket });
            if (wicketDetails.page === 'batsmanSection') {
                  this.setState({
                        striker: wicketDetails.striker, nonStriker: wicketDetails.nonStriker
                  });

                  // Event - wicket ============================================================
                  const { socket } = this.state;
                  wicketDetails.teamId = this.state.battingTeam;
                  wicketDetails.bowlerId = this.state.bowler.id; // to be passed
                  wicketDetails.runScored = this.state.totalRuns; // is player runs for the current ball set in batsman section
                  socket.emit('wicket', wicketDetails);
                  console.log('WicketDetails: ', wicketDetails);
                  // ============================================================================
            }
            if (this.state.wickets === 10) {
                  this.setState({ inningEnd: true, showPopup: true }, () => {
                        this.initializeNextInning(wicketDetails);
                  });
            }
      }

      updateWickets(addWicket) {
            let { wickets } = this.state;
            wickets = wickets + addWicket;
            this.setState({ wickets });
      }

      initializeNextInning(inningDetails) {
            let { isInningStart, battingTeam, striker, nonStriker, bowler, inningId, totalRuns, wickets, battingTeamPlayers, bowlingTeamPlayers, isWicket, inningEnd, showPopup } = this.state;

            // update state values
            isInningStart = true;
            inningId = 2;
            striker = {
                  id: 0,
                  name: '',
                  runs: 0,
                  balls: 0,
                  fours: 0,
                  sixes: 0
            };
            nonStriker = {
                  id: 0,
                  name: '',
                  runs: 0,
                  balls: 0,
                  fours: 0,
                  sixes: 0
            };
            bowler = {
                  id: 0,
                  name: '',
                  runsGiven: 0,
                  overs: 0.0,
                  maiden: 0,
                  wickets: 0
            };
            let tempPlayers = battingTeamPlayers;
            battingTeamPlayers = bowlingTeamPlayers;
            bowlingTeamPlayers = tempPlayers;
            totalRuns = 0;
            wickets = 0;
            isWicket = false;
            inningEnd = false;
            showPopup = false;
            battingTeam = (battingTeam === 1) ? 2 : 1;

            this.setState({ isInningStart, inningId, battingTeam, striker, nonStriker, bowler, totalRuns, wickets, battingTeamPlayers, bowlingTeamPlayers, isWicket, inningEnd, showPopup });
      }

      setInningStart(isInningStart) {
            this.setState({ isInningStart });
      }

      setInningEnd(isInningEnd, inningDetails) {
            inningDetails.inningId = this.state.inningId;
            inningDetails.runs = this.state.totalRuns;
            inningDetails.wickets = this.state.wickets;
            inningHistory.push(inningDetails);

            let { inningId, team1, team2, totalRuns, wickets, battingTeam } = this.state;
            if (inningId === 1) {
                  if (battingTeam === 1) {
                        team1.runs = totalRuns;
                        team1.wickets = wickets;
                        team1.ballsFaced = inningDetails.totalBowls;
                        team1.isBatting = false;

                        team2.isBatting = true;
                  } else {
                        team2.runs = totalRuns;
                        team2.wickets = wickets;
                        team2.ballsFaced = inningDetails.totalBowls;
                        team2.isBatting = false;

                        team1.isBatting = true;
                  }
                  this.setState({ inningEnd: isInningEnd, showPopup: true, team1, team2 });
            } else if (inningId === 2) {
                  if (battingTeam === 1) {
                        team1.runs = totalRuns;
                        team1.wickets = wickets;
                        team1.ballsFaced = inningDetails.totalBowls;
                  } else {
                        team2.runs = totalRuns;
                        team2.wickets = wickets;
                        team2.ballsFaced = inningDetails.totalBowls;
                  }

                  this.setState({ team2, endGame: true, showPopup: true });
            }
            // Event - inningEnd
            const { socket } = this.state;
            socket.emit('inningEnd', {
                  teamId: (team1.isBatting) ? 1 : 2,
                  totalScore: this.state.totalRuns,
                  totalWicket: this.state.totalWicket
            });
      }

      render() {
            const { battingTeam, prevScreen } = this.props;
            const { team1, team2, battingTeamPlayers, bowlingTeamPlayers } = this.state;
            return (
                  <div className="admin-scoreboard">
                        <div className="scoreboard-header">
                              <div className="back-button" onClick={() => { prevScreen(); }}>
                                    <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>
                              </div>
                              <b>Admin Score Board</b>
                        </div>
                        <div className="admin-teams">
                              <div className="team" id="team-1" style={{ backgroundColor: '#66ccff' }}>
                                    {/* <div> */}
                                    <img src={(battingTeam === 1) ? require('../images/team1.png') : require('../images/team2.png')} width="50" height="50" className="team-logo" alt={team1} />
                                    {/* </div> */}
                                    <div className="team-data">
                                          <h4>&nbsp;&nbsp;&nbsp;{(battingTeam === 1) ? `${team1.name}` : `${team2.name}`}</h4>
                                          <h4>&nbsp;&nbsp;&nbsp;{`(${(battingTeam === 1) ? `${this.state.totalRuns} / ${this.state.wickets}` : `${team2.runs} / ${team2.wickets}`})`}</h4>
                                    </div>
                              </div>
                              <div className="team" id="team-2" style={{ backgroundColor: '#ccccff' }}>
                                    {/* <div> */}
                                    <img src={(battingTeam === 1) ? require('../images/team2.png') : require('../images/team1.png')} width="50" height="50" className="team-logo" alt={team2} />
                                    {/* </div> */}
                                    <div className="team-data">
                                          <h4>&nbsp;&nbsp;&nbsp;{(battingTeam !== 1) ? `${team1.name}` : `${team2.name}`}</h4>
                                          <h4>&nbsp;&nbsp;&nbsp;{`(${(battingTeam !== 1) ? `${this.state.totalRuns} / ${this.state.wickets}` : `${team1.runs} / ${team1.wickets}`})`}</h4>
                                    </div>
                              </div>
                        </div>
                        <div className="toss-win">
                              <span>{this.state.heading}</span>
                        </div>

                        {
                              (!this.state.endGame) ?
                                    <div className="scoreboard-body">
                                          <div className="scores-section">
                                                <div className="section-header">
                                                      <span>Scores Section</span>
                                                </div>
                                                <div className="section-body">
                                                      <div className="runs">
                                                            <span>Runs:&nbsp;&nbsp;&nbsp;</span>
                                                            <div className="score">{this.state.totalRuns}</div>
                                                      </div>
                                                      <div className="wickets">
                                                            <span>Wickets:&nbsp;&nbsp;&nbsp;</span>
                                                            <div className="score">{this.state.wickets}</div>
                                                      </div>
                                                </div>
                                          </div>
                                          <BatsmanSection
                                                inningId={this.state.inningId}
                                                isInningStart={this.state.isInningStart}
                                                setInningStart={this.setInningStart.bind(this)}
                                                striker={this.state.striker}
                                                nonStriker={this.state.nonStriker}
                                                // battingTeam={this.state.battingTeam}
                                                battingTeamPlayers={battingTeamPlayers}
                                                bowlingTeamPlayers={bowlingTeamPlayers}
                                                setBatsmenDetails={this.setBatsmenDetails.bind(this)}
                                                isWicket={this.state.isWicket}
                                                setWicket={this.setWicket.bind(this)}
                                                updateWickets={this.updateWickets.bind(this)}
                                                socket={this.state.socket}
                                          />
                                          <OversSection
                                                inningId={this.state.inningId}
                                                striker={this.state.striker}
                                                nonStriker={this.state.nonStriker}
                                                totalOvers={this.state.totalOvers}
                                                // battingTeam={this.state.battingTeam}
                                                bowlingTeamPlayers={bowlingTeamPlayers}
                                                setBowlerDetails={this.setBowlerDetails.bind(this)}
                                                updateRuns={this.updateRuns.bind(this)}
                                                setWicket={this.setWicket.bind(this)}
                                                setInningEnd={this.setInningEnd.bind(this)}
                                                socket={this.state.socket}
                                          />
                                          {
                                                (this.state.inningEnd) &&
                                                <Popup
                                                      children={
                                                            <div className="popup">
                                                                  <div id="popup-header">
                                                                        <span>{(this.state.inningId === 1) ? team1.name : team2.name} Inning End</span>
                                                                  </div>
                                                                  <div id="popup-body">
                                                                        <div className="dropdown-list">
                                                                              <div className="dd-list-half">{"Inning Runs: "}</div>
                                                                              <div className="dd-list-half">
                                                                                    {this.state.totalRuns}
                                                                              </div>
                                                                        </div>
                                                                        <div className="dropdown-list">
                                                                              <div className="dd-list-half">{"Inning Wickets: "}</div>
                                                                              <div className="dd-list-half">
                                                                                    {this.state.wickets}
                                                                              </div>
                                                                        </div>
                                                                        <div className="dropdown-list">
                                                                              <div className="dd-list-half">{"Total Bowls: "}</div>
                                                                              <div className="dd-list-half">
                                                                                    {
                                                                                          (this.state.battingTeam === 1) ?
                                                                                                this.state.team1.ballsFaced
                                                                                                :
                                                                                                this.state.team2.ballsFaced
                                                                                    }
                                                                              </div>
                                                                        </div>
                                                                        <button onClick={() => this.initializeNextInning()}>OK</button>
                                                                  </div>
                                                            </div>
                                                      }
                                                      showPopup={this.state.showPopup}
                                                      closePopup={() => this.initializeNextInning()}
                                                />
                                          }
                                    </div>
                                    :
                                    <Popup
                                          children={
                                                <div className="popup">
                                                      <div id="popup-header">
                                                            <span>Match Results</span>
                                                      </div>
                                                      <div id="popup-body">
                                                            <div className="dropdown-list">
                                                                  <div className="dd-list-half">{"Inning Runs: "}</div>
                                                                  <div className="dd-list-half">
                                                                        {this.state.totalRuns}
                                                                  </div>
                                                            </div>
                                                            <div className="dropdown-list">
                                                                  <div className="dd-list-half">{"Inning Wickets: "}</div>
                                                                  <div className="dd-list-half">
                                                                        {this.state.wickets}
                                                                  </div>
                                                            </div>
                                                            <div className="dropdown-list">
                                                                  <div className="dd-list-half">{"Winning Teams: "}</div>
                                                                  <div className="dd-list-half">
                                                                        {
                                                                              (this.state.team1.runs > this.state.team2.runs) ?
                                                                                    `${team1.name} won the match by ${team1.runs - team2.runs} runs`
                                                                                    :
                                                                                    `${team2.name} won the match by ${team2.runs - team1.runs} runs`
                                                                        }
                                                                  </div>
                                                            </div>
                                                            <button onClick={() => this.setState({ showPopup: false })}>OK</button>
                                                      </div>
                                                </div>
                                          }
                                          showPopup={this.state.showPopup}
                                          closePopup={() => this.setState({ showPopup: false })}
                                    />
                        }
                        {
                              // this.state.endGame && // - TO DO [to show who won tthe match]

                        }
                  </div>
            );
      }
}

export default AdminScoreBoard;