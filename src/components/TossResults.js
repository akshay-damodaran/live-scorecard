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
                  <div className="tossResults">
                        <h2>Toss Results</h2>
                        <h4>Who won the toss?</h4>
                        <button>Team 1</button>
                        <button>Team 2</button>
                        <hr/>
                        <h4>Which team will do batting first?</h4>
                        <button>Team 1</button>
                        <button>Team 2</button>
                  </div>
            );
      }
}

export default TossResults;