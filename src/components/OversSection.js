import React, { Component } from 'react';

class OversSection extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  isOverStart: true,
                  totalOvers: 20,
                  currentOvers: 0,
                  remainingOvers: 0,
                  currentBowl: 0,
                  totalBowls: 0,
                  bowler: {
                        name: 'Select Bowler'
                  },
                  bowls: [1, 2, 3, 4, 5, 6, '+'],
                  ballNo: 0,
                  runs: 0
            }
      }

      lockBowl() {
            let { currentBowl, currentOvers, bowls, runs, totalBowls } = this.state;
            totalBowls = totalBowls + 1;
            currentOvers = (parseInt(currentOvers) + ((currentBowl) * 0.1)).toFixed(1);
            document.getElementById(`bowl_${currentBowl-1}`).style.backgroundColor = '#333333';
            document.getElementById(`bowl_${currentBowl-1}`).style.pointerEvents = 'none';
            document.getElementById("lock-bowl").disabled = true;
            this.props.updateRuns(runs);
            this.setState({ totalBowls, currentOvers });
      }

      setBowlStatus(ballNo, i) {
            switch (ballNo) {
                  case '+': {
                        // set current colors to white for cowls
                        let bowls = [1, 2, 3, 4, 5, 6, '+'];
                        let { currentOvers } = this.state;
                        currentOvers = (parseInt(currentOvers) + 1);
                        this.setState({ isOverStart: true, bowls, currentOvers });
                        break;
                  }
                  default: {
                        document.getElementById("lock-bowl").disabled = false;
                        document.getElementById(`bowl_${i}`).style.backgroundColor = '#ffff00';
                        this.setState({ currentBowl: i+1, runs: 0 });
                        break;
                  }
            }
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
            const bowlStatus = ['WD', 'WK', 'NB', 'B', 'LB', 'R'];
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
                                                                        <div className="dd-list-half">{"Total Overs"}</div>
                                                                        <div className="dd-list-half">
                                                                              <input
                                                                                    className="sb-input"
                                                                                    value={this.state.totalOvers}
                                                                                    placeholder="Enter total overs"
                                                                                    min="20"
                                                                                    max="50"
                                                                                    onChange={(e) => this.setState({ totalOvers: e.target.value })}
                                                                              />
                                                                        </div>
                                                                  </div>
                                                                  <div className="dropdown-list">
                                                                        <div className="dd-list-half">{"Bowler for the over: "}</div>
                                                                        <div className="dd-list-half">
                                                                              {
                                                                                    this.renderBowlingTeamDropDown()
                                                                              }
                                                                        </div>
                                                                  </div>
                                                                  <button className="scoreboard-button" onClick={() => this.setState({ isOverStart: false }, () => { document.getElementById("lock-bowl").disabled = true; })}>OK</button>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                          :
                                          <div>
                                                <div>
                                                      <span className="overs">Bowler: {this.state.bowler.name}</span>
                                                </div>
                                                <div className="overs-status">
                                                      <span className="overs">Total: {this.state.totalOvers}</span>
                                                      <span className="overs">Current: {this.state.currentOvers}</span>
                                                      {/* <span className="overs">Remaining: {this.state.totalOvers - this.state.currentOvers}</span> */}
                                                </div>
                                                <div className="overs">
                                                      <div className="over-count">
                                                            <span>Overs:</span>
                                                            {
                                                                  bowls.map((item, i) =>
                                                                        <div key={`bowl_${i}`} id={`bowl_${i}`} className="bowl" onClick={() => this.setBowlStatus(item, i)}>{item}</div>
                                                                  )
                                                            }
                                                      </div>
                                                      <div className="over-count">
                                                            <span>Select status:</span>
                                                            {
                                                                  bowlStatus.map((item, j) =>
                                                                        <div
                                                                              id={`status_${item}`}
                                                                              key={`bowledStatus_${j}`}
                                                                              className="bowl"
                                                                              onClick={() => {
                                                                                    let { currentBowl, bowls } = this.state;
                                                                                    bowls[currentBowl-1] = item;
                                                                                    const isWicket = (item === 'WK');
                                                                                    if (isWicket) {
                                                                                          this.props.setWicket();
                                                                                    }
                                                                                    this.setState({ bowls });
                                                                              }
                                                                              }>
                                                                              {item}
                                                                        </div>
                                                                  )
                                                            }
                                                      </div>
                                                      <div className="dropdown-list">
                                                            <div className="dd-list-half">{"Total Runs for the current ball: "}</div>
                                                            <div className="dd-list-half">
                                                                  <input
                                                                        className="sb-input"
                                                                        value={this.state.runs}
                                                                        placeholder="Enter runs"
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
                                                      </div>
                                                      <button id="lock-bowl" className="scoreboard-button" onClick={() => this.lockBowl()}>OK</button>
                                                      {/* {this.state.bowlingStatus} */}
                                                </div>
                                          </div>
                              }
                        </div>
                  </div>
            );
      }
}

export default OversSection;