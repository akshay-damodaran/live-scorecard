import React from 'react';
import '../styles/Teams.css';

const Teams = ({ team1 = '', team2 = '', totalOvers = '', changeTeamName = f => f, setTotalOvers = f => f, nextScreen = f => f }) => (
	<div className="admin-body">
		<div className="admin-body-title">
			<span>{'Start a match'}</span>
		</div>
		<form onSubmit={(e) => {
			e.preventDefault();
			nextScreen()
		}}>
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
			<div className="login-input">
				<input type="file" name="team1-logo" accept="image/*" onChange={(e) => this.handleImageUpload(e, 'team1')} />
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
			<div className="login-input">
				<input type="file" name="team2-logo" accept="image/*" onChange={(e) => this.handleImageUpload(e, 'team2')} />
			</div>
			<div className="team-input">
				<input
					id="teams-input-3"
					placeholder="Enter total overs"
					value={totalOvers}
					type="number"
					onChange={e => setTotalOvers({ totalOvers: e.target.value })}
					required
				/>
			</div>
			{/* // overs input */}
			<div className="team-input">
				<input type="submit" value={`Let's Build Teams`} />
			</div>
		</form>
	</div>
);

export default Teams;
