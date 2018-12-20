import React from 'react';
import '../styles/DisplayTeams.css';

const DisplayTeams = ({ team1, team2, team1Players, team2Players, nextScreen }) => (
	<div className="display-teams">
		<div className="header">
			<h3>Display Teams</h3>
		</div>
		<br />
		<table className="team-list">
			<thead className="table-heading">
				<tr>
					<th>{ team1 }</th>
					<th>{ team2 }</th>
				</tr>
			</thead>
			<tbody className="table-body">
			{
				team1Players.map((item, i) =>
					<tr key={`table_row_${i}`} className="player-row">
						<td>{ item.name }</td>
						<td>{ team2Players[i].name }</td>
					</tr>
				)
			}
			{/* <tr>
						<td><button onClick={() => { }}>Edit</button></td>
						<td><button onClick={() => { }}>Edit</button></td>
			</tr> */}
			</tbody>
		</table>
		<button className="teamplayer-button" onClick={() => nextScreen()}>
			Let's Toss
		</button>
		<br />
	</div>
)

export default DisplayTeams;