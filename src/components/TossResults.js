import React, { Component } from 'react';
import '../styles/TossResults.css';

class TossResults extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  tossResults: 0,
                  battingTeam: 0
            }
      }

      setTossResults() {
            this.props.setTossResults(this.state.tossResults, this.state.battingTeam)
      }

      render() {
            return (
                  <div className="toss-results">
                        <div className="header">
                              <h3>Toss Results</h3>
                        </div>
                        <div className="toss-team">
                              <h4>Who won the toss?</h4>
                              <button onClick={() => this.setState({ tossResults: 1 })}>{`Team 1: ${this.props.teamNames[0]}`}</button>
                              <br />
                              <button onClick={() => this.setState({ tossResults: 2 })}>{`Team 2: ${this.props.teamNames[1]}`}</button>
                        </div>
                        <hr />
                        <div className="batting-team">
                              <h4>Which team will do batting first?</h4>
                              <button onClick={() => this.setState({ battingTeam: 1 })}>{`Team 1: ${this.props.teamNames[0]}`}</button>
                              <br />
                              <button onClick={() => this.setState({ battingTeam: 1 })}>{`Team 2: ${this.props.teamNames[1]}`}</button>
                        </div>
                        <br />
                        <br />
                        <br />
                        <button onClick={() => this.setTossResults()}>Let's Play</button>
                  </div>
            );
      }
}

export default TossResults;