import React, { Component } from 'react';
import '../styles/TeamPlayers.css';

class TeamPlayers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mainPlayers: Array(11).fill(null).map(() => ({name: ''})),
			extraPlayers: Array(4).fill(null).map(() => ({name: ''}))
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
		const { teamNo, teamName, setTeamPlayers } = this.props;
		const { mainPlayers, extraPlayers } = this.state;
		return (
			<div className="teamplayers">
				<div>
					<h2>{`Team ${teamNo}: ${teamName}`}</h2>
					{
						mainPlayers.map((player, i) =>
							<input
								className = "teamplayer-input"
								key = {`mainplayer_${i}`}
								placeholder = {`Player ${i + 1} name`}
								value = { player.name }
								onChange = {(e) => this.setPlayer(e.target.value, i, 'main')}
								type = "text"
								required
							/>
						)
					}
					<br />
					<h2>Extra Players</h2>
					{
						extraPlayers.map((player, i) =>
							<input
								className = "teamplayer-input"
								key = {`extraplayer_${i}`}
								placeholder = {`Player ${i + 12} name`}
								value = {player.name}
								onChange = {(e) => this.setPlayer(e.target.value, i, 'extra')}
								type = "text"
								required
							/>
						)
					}
					<br />
					<button className="teamplayer-button" onClick={() => setTeamPlayers([...mainPlayers, ...extraPlayers])}>
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