import React, { Component } from 'react';

// id: 1, // totalBowlNo: current bowl no in total boels for inning
// bowlNo: 1, // currentBowlNo: current over - bowl no
// currentOverNo: 1, // current over no
// bowlStatus: null, // ['WD', 'WK', 'NB', 'B', 'LB']
// bowlRuns: 0, // number of runs for the bowl
// isLocked: false, // if the bowl status was already set
// isExtra: false // if the bowl is extra ['WD', 'NB']

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
                  // remainingOvers: 0,
                  overRuns: [1, 2, 3, 4, 5, 6],

                  // current bowl details
                  totalBowlNo: 1, // total bowls for the inning (not sure if needed - maybe in extra balls cases)
                  currentBowlNo: 1, // ball number of the current over
                  currentOverBowlNo: 0,
                  bowler: {
                        name: 'Select Bowler'
                  },
                  bowls: [{
                        id: 1,
                        bowlNo: 1,
                        bowlStatus: null,
                        bowlRuns: 0,
                        currentOver: 1
                  }],
                  showRunsInput: false,

                  runs: 0,
                  totalRuns: 0,
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

      setOverStartDetails() {
            this.setState({ isOverStart: false });

            // Event - overStart
            // socket.emit('overStart', {
            //       bowlerId: this.state.bowler.id,
            //       strikerId: this.state.striker.id,
            //       nonStrikerId: this.state.nonStriker.id,
            // });
      }

      renderOverBowls() {
            let { bowls, totalBowlNo } = this.state;
            return (
                  <div id="over-bowls" className="over-count">
                        <span>Overs:</span>
                        {
                              bowls.map((item, i) =>
                                    <div
                                          id={`bowl_${totalBowlNo}`}
                                          className="bowl"
                                    >
                                          {/* {item.bowlNo} */}
                                          {(item.bowlStatus !== null) ? item.bowlStatus : item.bowlNo}
                                    </div>
                              )
                        }
                  </div>
            );
      }

      lockBowl() {
            let { bowls, currentBowlNo, totalBowlNo, currentOverBowlNo, currentOvers, totalOvers, runs, totalRuns } = this.state;

            if (currentBowlNo < 6) {
                  if (bowls[currentOverBowlNo].bowlStatus === 'WD' || bowls[currentOverBowlNo].bowlStatus === 'NB') {
                        // extra case
                        currentOverBowlNo++;
                        totalBowlNo++;
                        bowls.push({
                              id: totalBowlNo,
                              bowlNo: currentBowlNo,
                              bowlStatus: null,
                              bowlRuns: 0,
                              currentOver: parseInt(currentOvers)
                        });
                  } else {
                        // normal update
                        currentOvers = (parseInt(currentOvers) + ((currentBowlNo) * 0.1)).toFixed(1);
                        currentOverBowlNo++;
                        currentBowlNo++;
                        totalBowlNo++;
                        bowls.push({
                              id: totalBowlNo,
                              bowlNo: currentBowlNo,
                              bowlStatus: null,
                              bowlRuns: 0,
                              currentOver: parseInt(currentOvers)
                        });
                  }
                  bowls[currentOverBowlNo].bowlRuns = runs;
                  this.props.updateRuns(runs);
                  totalRuns = totalRuns + runs;
                  this.setState({ bowls, currentBowlNo, totalBowlNo, currentOverBowlNo, currentOvers, totalRuns });
            } else {
                  // new over start
                  currentOvers = parseInt(currentOvers) + 1;
                  if (currentOvers < parseInt(totalOvers)) {
                        currentOverBowlNo = 0;
                        currentBowlNo = 1;
                        bowls = [{
                              id: totalBowlNo,
                              bowlNo: 1,
                              bowlStatus: null,
                              bowlRuns: 0,
                              currentOver: parseInt(currentOvers)
                        }];
                        this.setState({ isOverStart: true, bowls, currentBowlNo, currentOverBowlNo, currentOvers });
                  } else if (currentOvers == totalOvers) {
                        this.setState({ inningEnd: true });
                        this.props.setInningEnd(true);
                  }

            }

            // if (bowls[currentBowlNo - 1].isLocked) {
            //       // revert case
            // } else {
            //       // fresh update
            // }
      }

      setBowlStatus(bowlStatus) {
            let { currentOverBowlNo, bowls } = this.state;
            bowls[currentOverBowlNo].bowlStatus = bowlStatus;
            if (bowlStatus === 'WK') {
                  this.props.setWicket(true, {});
            }
            this.setState({ bowls });
      }

      renderOver() {
            const bowlStatus = ['WD', 'WK', 'NB', 'B', 'LB'];
            return (
                  <div>
                        <div id="select-bowl-status" className="over-count">
                              <span>Bowl Status:</span>
                              {
                                    bowlStatus.map((item, j) =>
                                          <div
                                                id={`status_${item}`}
                                                key={`bowledStatus_${j}`}
                                                className="bowl"
                                                onClick={() => this.setBowlStatus(item)}
                                          >
                                                {item}
                                          </div>
                                    )
                              }
                        </div>
                        {
                              // (this.state.showRunsInput) &&
                              <div id="runs-scored" className="overs-count">
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
                              </div>
                        }
                        <button id="lock-bowl" onClick={() => this.lockBowl()}>OK</button>
                  </div>
            );
      }

      setBowler(e) {
            const { bowler } = this.state;
            bowler.name = e.target.value;
            this.setState({ bowler });
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
                                                            {this.renderOverBowls()}
                                                            {this.renderOver()}
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