import React, { Component } from 'react';
import '../styles/TeamPlayers.css';

class TeamPlayers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mainPlayers: Array(11).fill(null).map(() => ({ name: '' })), // remove by default data
			extraPlayers: Array(5).fill(null).map(() => ({ name: '' })) // remove by default data
		}
	}

	setPlayer(playerName, i, playerType) {
		switch (playerType) {
			case 'main': {
				let mainPlayers = this.state.mainPlayers;
				mainPlayers[i].name = playerName;
				this.setState({ mainPlayers });
				break;
			}
			case 'extra': {
				let extraPlayers = this.state.extraPlayers;
				extraPlayers[i].name = playerName;
				this.setState({ extraPlayers });
				break;
			}
			default: {
				break;
			}
		}
	}

	render() {
		const { teamNo, teamName, setTeamPlayers, prevScreen } = this.props;
		let { mainPlayers, extraPlayers } = this.state;
		mainPlayers = Array(11).fill(null).map((item, i) => ({ id: i, name: (this.props.teamNo === 1) ? `Mum${i}` : `Pun${i}` })); // remove by default data
		extraPlayers = Array(5).fill(null).map((item, i) => ({ id: 12 + i, name: (this.props.teamNo === 1) ? `Mum${12 + i}` : `Pun${12 + i}` })); // remove by default data
		return (
			<div className="admin-body">
				<div className="admin-body-title" id="team-bg">
					<div className="back-button" onClick={() => { prevScreen(); }}>
						<i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
					</div>
					<img src={(teamNo === 1) ? require('../images/team1.png') : require('../images/team2.png')} width="50" height="50" className="team-logo" alt={teamName} />
					<span>&nbsp;&nbsp;{`Team ${teamNo}: ${teamName}`}</span>
				</div>
				<div className="admin-body-title">
					<span>{`Main Players`}</span>
				</div>
				{
					mainPlayers.map((player, i) =>
						<div className="teamplayer-input">
							<input
								key={`mainplayer_${i}`}
								placeholder={`Player ${i + 1} name`}
								value={player.name}
								onChange={(e) => this.setPlayer(e.target.value, i, 'main')}
								type="text"
								required
							/>
						</div>
					)
				}
				<div className="admin-body-title">
					<span>{`Extra Players`}</span>
				</div>
				{
					extraPlayers.map((player, i) =>
						<div className="teamplayer-input">
							<input
								key={`extraplayer_${i}`}
								placeholder={`Player ${i + 12} name`}
								value={player.name}
								onChange={(e) => this.setPlayer(e.target.value, i, 'extra')}
								type="text"
								required
							/>
						</div>
					)
				}
				<div className="teamplayer-input">
					<button className="teamplayer-button" onClick={() => {
						setTeamPlayers([...mainPlayers, ...extraPlayers]);
						// this.setState({ 
						// 	mainPlayers: Array(11).fill(null).map(() => ({ name: '' })),
						// 	extraPlayers: Array(5).fill(null).map(() => ({ name: '' }))
						// });
					}}>
						{
							(teamNo === 1) ?
								`Let's Build Team 2`
								:
								`Done with Teams`
						}
					</button>
				</div>
			</div>
		)
	}
}

export default TeamPlayers;