import React from 'react';
import '../styles/TossResults.css';

const TossResults = ({ team1 = '', team2 = '', setTossResults = f => f, setTossData = f => f }) => (
	<div className="toss-results">
		<div className="header">
			<h3>Toss Results</h3>
		</div>
		<div className="toss-team">
			<h4>Who won the toss?</h4>
			<button onClick={() => setTossData({ tossResult: 1 })}>{`Team 1: ${ team1 }`}</button>
			<br />
			<button onClick={() => setTossData({ tossResult: 2 })}>{`Team 2: ${ team2 }`}</button>
		</div>
		<hr />
		<div className="batting-team">
			<h4>Which team will do batting first?</h4>
			<button onClick={() => setTossData({ battingTeam: 1 })}>{`Team 1: ${ team1 }`}</button>
			<br />
			<button onClick={() => setTossData({ battingTeam: 1 })}>{`Team 2: ${ team2 }`}</button>
		</div>
		<br />
		<br />
		<br />
		<button onClick={() => setTossResults()}>Let's Play</button>
	</div>
)

export default TossResults;