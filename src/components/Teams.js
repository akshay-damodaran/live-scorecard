import React from 'react';
import '../styles/Teams.css';

const Teams = ({ team1 = '', team2 = '', changeTeamName = f => f, nextScreen = f => f }) => (
	<div className="admin-body">
		<div className="admin-body-title">
			<span>{'Start a match'}</span>
		</div>
		<div className="team-input">
			<input
				id="teams-input-1"
				placeholder="Enter Team 1 Name"
				value={team1}
				type="text"
				onChange={e => changeTeamName({ team1: e.target.value })}
				required
				autoFocus
			/>
		</div>
		<div className="team-input">
			<input
				id="teams-input-2"
				placeholder="Enter Team 2 Name"
				value={team2}
				type="text"
				onChange={e => changeTeamName({ team2: e.target.value })}
				required
			/>
		</div>
		<div className="team-input">
			<button onClick={() => nextScreen()}>
				Let's Build Teams
			</button>
		</div>
	</div>
);

export default Teams;
