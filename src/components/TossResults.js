import React, { Component } from 'react';
import '../styles/TossResults.css';

class TossResults extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  tossResults: [],
                  batting: []
            }
      }

      render() {
            return (
                  <div className="toss-results">
                        <div className="header">
                              <h3>Toss Results</h3>
                        </div>
                        <div className="toss-team">
                              <h4>Who won the toss?</h4>
                              <button>Team 1</button>
                              <br />
                              <button>Team 2</button>
                        </div>
                        <hr />
                        <div className="batting-team">
                              <h4>Which team will do batting first?</h4>
                              <button>Team 1</button>
                              <br />
                              <button>Team 2</button>
                        </div>
                        <br />
                        <br />
                        <br />
                        <button>Let's Play</button>
                  </div>
            );
      }
}

export default TossResults;