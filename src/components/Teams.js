 import React from 'react';
import '../styles/Teams.css';

const Teams = ({ team1 = '', team2 = '', changeTeamName = f => f, nextScreen = f => f }) => (
	<div className="teams">
		<h2>Start a match</h2>
		<br />
		<input
			className = "team-input"
			id = "teams-input-1"
			placeholder = "Enter Team 1 Name"
			value = { team1 }
			onChange = {e => changeTeamName({ team1: e.target.value })}
			// onFocus={() => this.setState({ team1: '' })}
			required
		/>
		<br />
		<br />
		<input
			className = "team-input"
			id = "teams-input-2"
			placeholder = "Enter Team 2 Name"
			value = { team2 }
			onChange = {e => changeTeamName({ team2: e.target.value })}
			// onFocus={() => this.setState({ team2: '' })}
			required
		/>
		<br />
		<br />
		<button className="team-button" onClick={() => nextScreen()}>
			Let's Build Teams
		</button>
	</div>
);

export default Teams;
