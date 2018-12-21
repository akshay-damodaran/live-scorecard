import React from 'react';
import '../styles/TossResults.css';

const TossResults = ({ team1 = '', team2 = '', setTossResults = f => f, setTossData = f => f }) => (
      <div className="toss-results">
            <div className="header">
                  <h3>Toss Results</h3>
            </div>
            <div className="toss-team">
                  <h4>Who won the toss?</h4>
                  <button id="toss-button-1" className="toss-button" onClick={() => {
                        document.getElementById("toss-button-1").style.backgroundColor = "#ba124c";
                        document.getElementById("toss-button-1").style.color = "#ffffff";
                        document.getElementById("toss-button-2").style.backgroundColor = "#e6e6e6";
                        document.getElementById("toss-button-2").style.color = "#000000";
                        setTossData({ tossResult: 1 });
                  }}>
                        {`Team 1: ${team1}`}
                  </button>
                  <br />
                  <button id="toss-button-2" className="toss-button" onClick={() => {
                        document.getElementById("toss-button-2").style.backgroundColor = "#ba124c";
                        document.getElementById("toss-button-2").style.color = "#ffffff";
                        document.getElementById("toss-button-1").style.backgroundColor = "#e6e6e6";
                        document.getElementById("toss-button-1").style.color = "#000000";
                        setTossData({ tossResult: 2 });
                  }}>
                        {`Team 2: ${team2}`}
                  </button>
            </div>
            <hr />
            <div className="batting-team">
                  <h4>Which team will do batting first?</h4>
                  <button id="batting-team-1" className="toss-button" onClick={() => {
                        document.getElementById("batting-team-1").style.backgroundColor = "#ba124c";
                        document.getElementById("batting-team-1").style.color = "#ffffff";
                        document.getElementById("batting-team-2").style.backgroundColor = "#e6e6e6";
                        document.getElementById("batting-team-2").style.color = "#000000";
                        setTossData({ battingTeam: 1 });
                  }}>
                        {`Team 1: ${team1}`}
                  </button>
                  <br />
                  <button id="batting-team-2" className="toss-button" onClick={() => {
                        document.getElementById("batting-team-2").style.backgroundColor = "#ba124c";
                        document.getElementById("batting-team-2").style.color = "#ffffff";
                        document.getElementById("batting-team-1").style.backgroundColor = "#e6e6e6";
                        document.getElementById("batting-team-1").style.color = "#000000";
                        setTossData({ battingTeam: 2 });
                  }}>
                        {`Team 2: ${team2}`}
                  </button>
            </div>
            <br />
            <br />
            <br />
            <button className="toss-button" onClick={() => setTossResults()}>Let's Play</button>
      </div>
)

export default TossResults;