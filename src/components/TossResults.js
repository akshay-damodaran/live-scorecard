import React from 'react';
import '../styles/TossResults.css';

const TossResults = ({ team1 = {}, team2 = {}, setTossResults = f => f, setTossData = f => f, prevScreen = f => f }) => (
      <div className="admin-body">
            <div className="admin-body-title">
                  <div className="back-button" onClick={() => { prevScreen(); }}>
                        <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>
                  </div>
                  <span>Toss Results</span>
            </div>
            <div className="toss-results">
                  <br />
                  <span>Who won the toss?</span>
                  <button id="toss-button-1" onClick={() => {
                        document.getElementById("toss-button-1").style.backgroundColor = "#ba124c";
                        document.getElementById("toss-button-1").style.color = "#ffffff";
                        document.getElementById("toss-button-2").style.backgroundColor = "#e6e6e6";
                        document.getElementById("toss-button-2").style.color = "#000000";
                        setTossData({
													tossResult: 1,
													team1: {
														...team1,
														wonToss: true,
													}
												});
                  }}>
                        {`Team 1: ${team1.name}`}
                  </button>
                  <button id="toss-button-2" onClick={() => {
                        document.getElementById("toss-button-2").style.backgroundColor = "#ba124c";
                        document.getElementById("toss-button-2").style.color = "#ffffff";
                        document.getElementById("toss-button-1").style.backgroundColor = "#e6e6e6";
                        document.getElementById("toss-button-1").style.color = "#000000";
                        setTossData({
													tossResult: 2,
													team2: {
														...team2,
														wonToss: true,
													}
												});
                  }}>
                        {`Team 2: ${team2.name}`}
                  </button>
                  <br />
            </div>
            <div className="toss-results">
                  <span>Which team will do batting first?</span>
                  <button id="batting-team-1" onClick={() => {
                        document.getElementById("batting-team-1").style.backgroundColor = "#ba124c";
                        document.getElementById("batting-team-1").style.color = "#ffffff";
                        document.getElementById("batting-team-2").style.backgroundColor = "#e6e6e6";
                        document.getElementById("batting-team-2").style.color = "#000000";
                        setTossData({
													battingTeam: 1,
													team1: {
														...team1,
														isBatting: true,
													}
												});
                  }}>
                        {`Team 1: ${team1.name}`}
                  </button>
                  <button id="batting-team-2" onClick={() => {
                        document.getElementById("batting-team-2").style.backgroundColor = "#ba124c";
                        document.getElementById("batting-team-2").style.color = "#ffffff";
                        document.getElementById("batting-team-1").style.backgroundColor = "#e6e6e6";
                        document.getElementById("batting-team-1").style.color = "#000000";
                        setTossData({
													battingTeam: 2,
													team2: {
														...team2,
														isBatting: true,
													}
												});
                  }}>
                        {`Team 2: ${team2.name}`}
                  </button>
                  <br />
            </div>
            <div className="toss-results">
                  <button onClick={() => setTossResults()}>Let's Play</button>
            </div>
      </div>
)

export default TossResults;