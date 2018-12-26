import React, { Component } from 'react';

class OversSection extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  // inning details
                  inningNo: this.props.inningNo,
                  battingTeam: this.props.battingTeam,
                  inningEnd: false,

                  // player details
                  striker: this.props.striker,
                  nonStriker: this.props.nonStriker,

                  // current over details
                  isOverStart: true,
                  totalOvers: 20,
                  currentOvers: 0,
                  remainingOvers: 0,
                  currentOverBowls: 6,
                  overRuns: [1, 2, 3, 4, 5, 6],

                  // current bowl details
                  totalBowls: 0, // total bowls for the inning (not sure if needed - maybe in extra balls cases)
                  currentBowl: 0, // ball number of the current over
                  bowler: {
                        name: 'Select Bowler'
                  },
                  bowls: [{
                        bowlNo: 1,
                        bowlStatus: null,
                        bowlRuns: 0,
                        isLocked: false
                  }],

                  runs: 0,
                  showBowlStatus: false,
                  changeBowler: false,

                  socket: this.props.socket
            }
      }

      componentWillReceiveProps(nextProps) {
            this.setState({
                  striker: nextProps.striker,
                  nonStriker: nextProps.nonStriker,
                  totalOvers: nextProps.totalOvers
            });
      }

      lockBowl() {
            let { currentBowl, currentOvers, runs, totalBowls, bowls, currentOverBowls, striker, battingTeam } = this.state;
            if (!bowls[currentBowl - 1].isLocked) {
                  if (bowls[currentBowl - 1].bowlStatus === 'WD' && bowls[currentBowl - 1].bowlStatus === 'NB') {
                        currentOverBowls = currentOverBowls + 1;
                        totalBowls = totalBowls + 1;

                        // Event - extra
                        // socket.emit('extra', {
                        //    score: runs,
                        //    teamId: battingTeam,
                        //    type: bowls[currentBowl - 1].bowlStatus
                        // });
                  }
                  totalBowls = totalBowls + 1;
                  currentOvers = (parseInt(currentOvers) + ((currentBowl) * 0.1)).toFixed(1);
                  document.getElementById(`bowl_${currentBowl - 1}`).style.backgroundColor = '#333333';
                  document.getElementById(`bowl_${currentBowl - 1}`).style.color = '#ffffff';
                  this.props.updateRuns(runs);

                  // Event - eachBallUpdate
                  // socket.emit('eachBallUpdate', {
                  //       runScored: runs,
                  //       teamId: battingTeam
                  //       strikerId: striker.id,
                  //       bowlerId: bowler.id,
                  // });

                  if (bowls.length <= currentOverBowls && !bowls[currentBowl - 1].isLocked) {
                        bowls.push({
                              bowlNo: currentBowl,
                              bowlStatus: null,
                              bowlRuns: 0,
                              isLocked: false,
                              striker: {}
                        });
                        bowls[currentBowl - 1].isLocked = true;
                        bowls[currentBowl - 1].striker = striker;
                        this.setState({ totalBowls, currentOvers, showBowlStatus: false, bowls });

                        // if (bowls.length === totalBowls) {
                              
                              // this.setState({ inningEnd: true });
                              // this.props.setInningEnd(true); // or set the above event in AdminScoreBoard page
                        // }
                  } else {
                        this.setState({ isOverStart: true });
                  }
            } else {
                  console.log('yahpe aaya', bowls[currentBowl - 1]);
                  let prevRuns = bowls[currentBowl - 1].bowlRuns;
                  this.props.updateRuns(runs - prevRuns);
                  bowls[currentBowl - 1].bowlRuns = runs;
                  bowls[currentBowl - 1].striker.runs = bowls[currentBowl - 1].striker.runs - bowls[currentBowl - 1].bowlRuns + runs;
                  console.log('yahpe aaya 2', bowls[currentBowl - 1]);
            }

      }

      setBowlStatus(ballNo, i) {
            document.getElementById(`bowl_${i}`).style.backgroundColor = '#ffff00';
            this.setState({ currentBowl: i + 1, runs: 0, showBowlStatus: true });
      }

      setOverStartDetails() {
            this.setState({ isOverStart: false });

            // Event - overStart
            // socket.emit('overStart', {
            //       bowlerId: this.state.bowler.id,
            //       strikerId: this.state.striker.id,
            //       nonStrikerId: this.state.nonStriker.id,
            // });
      }

      setBowler(e) {
            const { bowler } = this.state;
            bowler.name = e.target.value;
            this.setState({ bowler });
      }

      renderOverBowls() {
            const { bowls } = this.state;
            return (
                  <div className="over-count">
                        <span>Overs:</span>
                        {
                              bowls.map((item, i) =>
                                    <div
                                          key={`bowl_${i}`}
                                          id={`bowl_${i}`}
                                          className="bowl"
                                          onClick={() => { this.setBowlStatus(item, i) }}
                                    >
                                          {(item.bowlStatus === null) ? item.bowlNo : item.bowlStatus}
                                    </div>
                              )
                        }
                  </div>
            );
      }

      renderOver() {
            const bowlStatus = ['WD', 'WK', 'NB', 'B', 'LB'];
            return (
                  <div>
                        <div className="over-count">
                              {/* <span>Select status:</span> */}
                              {
                                    bowlStatus.map((item, j) =>
                                          <div
                                                id={`status_${item}`}
                                                key={`bowledStatus_${j}`}
                                                className="bowl"
                                                onClick={() => {
                                                      let { currentBowl, bowls } = this.state;
                                                      bowls[currentBowl - 1].bowlStatus = item;
                                                      if (item === 'WK') {
                                                            this.props.setWicket(true, {});
                                                      }
                                                      this.setState({ bowls, changeBowler: (item === 'CB') });
                                                }}
                                          >
                                                {item}
                                          </div>
                                    )
                              }
                        </div>
                        <div className="dropdown-list">
                              <div className="dd-list-half">{"Runs Scored: "}</div>
                              <div className="dd-list-half">
                                    {
                                          this.state.overRuns.map((item, i) =>
                                                <div
                                                      id={`status_${item}`}
                                                      key={`runsscores_${i}`}
                                                      className="bowl"
                                                      onClick={() => {
                                                            let { runs } = this.state;
                                                            runs = parseInt(item);
                                                            this.setState({ runs });
                                                      }}
                                                >
                                                      {item}
                                                </div>
                                          )
                                    }
                              </div>
                        </div>
                        <input
                              value={this.state.runs}
                              placeholder="Enter runs scored"
                              type="number"
                              min="0"
                              max="10"
                              step="1"
                              onChange={(e) => {
                                    let { runs } = this.state;
                                    runs = parseInt(e.target.value);
                                    this.setState({ runs });
                              }}
                              onBlur={(e) => {
                                    let { runs } = this.state;
                                    runs = parseInt(e.target.value);
                                    this.setState({ runs });
                              }}
                        />
                        <button id="lock-bowl" onClick={() => this.lockBowl()}>OK</button>
                  </div>
            );
      }

      renderBowlingTeamDropDown() {
            const { bowlingTeamPlayers } = this.props;
            return (
                  <select className="team-dropdown" value={this.state.bowler.name} onChange={(e) => this.setBowler(e)}>
                        <option>{"Select Bowler"}</option>
                        {
                              bowlingTeamPlayers.map((item, i) =>
                                    <option key={i} value={item.name}>{item.name}</option>
                              )
                        }
                  </select>
            )
      }

      render() {
            const { bowls } = this.state;
            return (
                  <div className="overs-section">
                        <div className="section-header">
                              <span>Overs Section</span>
                        </div>
                        <div className="overs-section-body">
                              {
                                    (this.state.isOverStart) ?
                                          <div>
                                                <div className="scoreboard-body">
                                                      <div>
                                                            {/* <div className="section-header">
                                                                  <span>{`Over Start Details`}</span>
                                                            </div> */}
                                                            <div className="match-start-section">
                                                                  <div className="dropdown-list">
                                                                        <div className="dd-list-half">{"Bowler for the over: "}</div>
                                                                        <div className="dd-list-half">
                                                                              {
                                                                                    this.renderBowlingTeamDropDown()
                                                                              }
                                                                        </div>
                                                                  </div>
                                                                  <button onClick={() => this.setOverStartDetails()}>OK</button>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                          :
                                          (!this.state.changeBowler) ?
                                                <div className="">
                                                      <div className="overs-header">
                                                            <div className="dd-list-half">{`Bowler: ${this.state.bowler.name}`}</div>
                                                            <div className="dd-list-half" onClick={() => this.setState({ changeBowler: true })}>Change Bowler</div>
                                                      </div>
                                                      <div className="overs-status">
                                                            <span className="overs">Total: {this.state.totalOvers}</span>
                                                            <span className="overs">Current: {this.state.currentOvers}</span>
                                                            {/* <span className="overs">Remaining: {this.state.totalOvers - this.state.currentOvers}</span> */}
                                                      </div>
                                                      <div className="overs">
                                                            {
                                                                  this.renderOverBowls()
                                                            }
                                                            {
                                                                  (this.state.showBowlStatus) &&
                                                                  this.renderOver()
                                                            }
                                                      </div>
                                                </div>
                                                :
                                                <div className="">
                                                      <div className="dropdown-list">
                                                            <div className="dd-list-half">{"Bowler for the over: "}</div>
                                                            <div className="dd-list-half">
                                                                  {
                                                                        this.renderBowlingTeamDropDown()
                                                                  }
                                                            </div>
                                                      </div>
                                                      <button onClick={() => this.setState({ changeBowler: false })}>OK</button>
                                                </div>
                              }
                        </div>
                  </div>
            );
      }
}

export default OversSection;