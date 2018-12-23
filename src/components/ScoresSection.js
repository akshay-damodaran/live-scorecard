import React, { Component } from 'react';

class ScoresSection extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  runs: this.props.runs,
                  // wickets: 0
            }
      }

      componentWillReceiveProps(nextProps) {
            let { runs } = this.state;
            runs = runs + nextProps.runs;
            this.setState({ runs });
      }

      render() {
            const { runs, wickets } = this.state;
            // console.log(runs);
            return (
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
                              {/* <div className="wickets">
                                    <span>Wickets</span>
                                    <div className="score-minus" onClick={() => this.setState({ wickets: (wickets === 0) ? 0 : wickets - 1 })}><span>{'-'}</span></div>
                                    <div className="score">{wickets}</div>
                                    <div className="score-add" onClick={() => this.setState({ wickets: wickets + 1, isWicket: true })}><span>{'+'}</span></div>
                              </div> */}
                        </div>
                  </div>
            );
      }
}

export default ScoresSection;