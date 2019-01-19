import React, { Component } from 'react';

let overDetails = [];

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
                  inningId: this.props.inningId,
                  // battingTeam: this.props.battingTeam,
                  // inningEnd: false,

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
                  changeBowler: false,

                  socket: this.props.socket
            }
      }

      componentWillReceiveProps(nextProps) {
            this.setState({
                  striker: nextProps.striker,
                  nonStriker: nextProps.nonStriker,
                  totalOvers: nextProps.totalOvers,
                  inningId: nextProps.inningId
            });
      }

      setOverStartDetails() {
            this.setState({ isOverStart: false });

            // Event - overStart
            const { socket } = this.state;
            socket.emit('overStart', {
                  bowlerId: this.state.bowler.id,
                  strikerId: this.state.striker.id,
                  nonStrikerId: this.state.nonStriker.id,
            });
      }

      renderOverBowls() {
            let { bowls, currentBowlNo } = this.state;
            return (
                  <div id="over-bowls" className="over-count">
                        <span>Overs:</span>
                        {
                              bowls.map((item, i) =>
                                    <div
                                          key={`bowl_${i}`}
                                          id={`bowl_${currentBowlNo}`}
                                          className="bowl"
                                          style={{
                                                backgroundColor: (item.isLocked === true) ? '#333333' : '#ffff00',
                                                color: (item.isLocked === true) ? '#ffffff' : '#000000'
                                          }}
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

            if (bowls[currentOverBowlNo].isLocked) {
                  // revert case - TO DO
                  // totalRuns = (totalRuns - bowls[currentOverBowlNo].bowlRuns) + runs;
                  // bowls[currentOverBowlNo].bowlRuns = runs;
                  // bowls[currentOverBowlNo].isLocked = true;
                  // console.log(bowls[currentOverBowlNo], totalRuns);
                  // this.setState({ totalRuns, bowls });
            } else {
                  // fresh update
                  if (currentBowlNo < 6) {
                        bowls[currentOverBowlNo].isLocked = true;
                        if (bowls[currentOverBowlNo].bowlStatus === 'WD' || bowls[currentOverBowlNo].bowlStatus === 'NB') {
                              // extra case
                              currentOverBowlNo++;
                              totalBowlNo++;
                              bowls.push({
                                    id: totalBowlNo,
                                    bowlNo: currentBowlNo,
                                    bowlStatus: null,
                                    bowlRuns: 0,
                                    currentOver: parseInt(currentOvers),
                                    isLocked: false
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
                                    currentOver: parseInt(currentOvers),
                                    isLocked: false
                              });
                        }
                        bowls[currentOverBowlNo].bowlRuns = runs;
                        this.props.updateRuns(runs);
                        totalRuns = totalRuns + runs;

                        this.setState({ bowls, currentBowlNo, totalBowlNo, currentOverBowlNo, currentOvers, totalRuns });
                  } else {
                        // new over start

                        bowls[currentOverBowlNo].bowlRuns = runs;
                        bowls[currentOverBowlNo].isLocked = true;
                        this.props.updateRuns(runs);
                        totalRuns = totalRuns + runs;

                        currentOvers = parseInt(currentOvers) + 1;
                        if (currentOvers < parseInt(totalOvers)) {
                              // update overDetails (global) history;
                              overDetails.push(bowls);

                              currentOverBowlNo = 0;
                              currentBowlNo = 1;
                              bowls = [{
                                    id: totalBowlNo,
                                    bowlNo: 1,
                                    bowlStatus: null,
                                    bowlRuns: 0,
                                    currentOver: parseInt(currentOvers),
                                    isLocked: false
                              }];
                              this.setState({ isOverStart: true, bowls, currentBowlNo, currentOverBowlNo, currentOvers, totalRuns });
                        } else if (currentOvers === parseInt(totalOvers)) {
                              let inningDetails = {
                                    inningId: this.state.inningId,
                                    inningRuns: this.state.inningRuns,
                                    inningWickets: 0,
                                    totalBowls: totalBowlNo,
                                    overDetails,
                              };
                              this.setState({ bowls, totalRuns }, () => {
                                    this.props.setInningEnd(true, inningDetails);
                                    let { isOverStart, currentOvers, totalBowlNo, currentBowlNo, currentOverBowlNo, bowler, bowls, runs, totalRuns, changeBowler } = this.state;
                                    isOverStart = true;
                                    currentOvers = 0;
                                    totalBowlNo = 1;
                                    currentBowlNo = 1;
                                    currentOverBowlNo = 0;
                                    bowler = {
                                          name: 'Select Bowler'
                                    };
                                    bowls = [{
                                          id: 1,
                                          bowlNo: 1,
                                          bowlStatus: null,
                                          bowlRuns: 0,
                                          currentOver: 1
                                    }];
                                    runs = 0;
                                    totalRuns = 0;
                                    changeBowler = false;
                                    this.setState({ isOverStart, currentOvers, totalBowlNo, currentBowlNo, currentOverBowlNo, bowler, bowls, runs, totalRuns, changeBowler });
                              });
                        }

                  }
            }

      }

      setBowlStatus(bowlStatus) {
            let { currentOverBowlNo, bowls, totalBowlNo, bowler } = this.state;
            bowls[currentOverBowlNo].bowlStatus = bowlStatus;
            if (bowlStatus === 'WK') {
                  this.props.setWicket(true, {
                        page: 'oversSection',
                        totalBowls: totalBowlNo,
                        bowler
                  });
            }
            this.setState({ bowls });
      }

      renderOver() {
            const { bowls, currentOverBowlNo, runs } = this.state;
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
                                                style={{
                                                      backgroundColor: (bowls[currentOverBowlNo].bowlStatus === item) ? '#ba124c' : '#ffffff',
                                                      color: (bowls[currentOverBowlNo].bowlStatus === item) ? '#ffffff' : '#000000'
                                                }}
                                          >
                                                {item}
                                          </div>
                                    )
                              }
                        </div>
                        {
                              // (this.state.showRunsInput) &&
                              <div id="runs-scored" className="over-count">
                                    <div className="dropdown-list">
                                          <div className="dd-list-half">{"Runs Scored: "}</div>
                                          <div className="dd-list-half">
                                                {
                                                      this.state.overRuns.map((item, i) =>
                                                            <div
                                                                  id={`runsscores_${item}`}
                                                                  key={`runsscores_${i}`}
                                                                  className="bowl"
                                                                  onClick={() => {
                                                                        let { runs } = this.state;
                                                                        runs = parseInt(item);
                                                                        this.setState({ runs });
                                                                  }}
                                                                  style={{
                                                                        backgroundColor: (runs === item) ? '#73e600' : '#ffffff',
                                                                        // color: (runs === item) ? '#ffffff' : '#000000'
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
            let bowlerSelected = JSON.parse(e.target.value);
            bowler.id = bowlerSelected.id;
            bowler.name = bowlerSelected.name;
            document.getElementById(`overBowler`).text = bowlerSelected.name;
            this.setState({ bowler }, () => {
                  this.props.setBowlerDetails(this.state.bowler);
            });
      }

      renderBowlingTeamDropDown() {
            const { bowlingTeamPlayers } = this.props;
            return (
                  <select className="team-dropdown" value={this.state.bowler.name} onChange={(e) => this.setBowler(e)}>
                        <option id={`overBowler`}>{"Select Bowler"}</option>
                        {
                              bowlingTeamPlayers.map((item, i) =>
                                    <option key={i} value={JSON.stringify(item)}>{item.name}</option>
                              )
                        }
                  </select>
            )
      }

      render() {
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