import React from 'react';
import '../styles/DisplayTeams.css';

const DisplayTeams = ({ team1, team2, team1Players, team2Players, nextScreen, prevScreen }) => (
	<div className="admin-body">
		<div className="admin-body-title">
			<div className="back-button" onClick={() => { prevScreen(); }}>
				<i className="fa fa-chevron-circle-left" aria-hidden="true"></i>
			</div>
			<span>Display Teams</span>
		</div>
		<div className="display-team-input">
			<div className="team-players">
				<div className="team-players" id="team-1">
					<img src={require('../images/team1.png')} width="50" height="50" className="team-logo" alt={team1} />
					<span>&nbsp;&nbsp;{`Team 1: ${team1}`}</span>
				</div>
				<div className="team-players">
					{
						team1Players.map((item, i) =>
							<div key={`item_${item.id}`} className="team-player">
								<span>{item.name}</span>
							</div>
						)
					}
				</div>
			</div>
			<div className="team-players">
				<div className="team-players" id="team-2">
					<img src={require('../images/team2.png')} width="50" height="50" className="team-logo" alt={team2} />
					<span>&nbsp;&nbsp;{`Team 2: ${team2}`}</span>
				</div>
				<div className="team-players">
					{
						team2Players.map((item, i) =>
							<div key={`item_${item.id}`} className="team-player">
								<span>{item.name}</span>
							</div>
						)
					}
				</div>
			</div>
		</div>
		<div className="display-team-input">
			<button onClick={() => nextScreen()}>
				Let's Toss
			</button>
		</div>
	</div>
)

export default DisplayTeams;