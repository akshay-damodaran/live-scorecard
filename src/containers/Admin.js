import React, { Component } from 'react';
// import socketIOClient from 'socket.io-client';

import '../styles/Admin.css';

import Teams from '../components/Teams';
import TeamPlayers from '../components/TeamPlayers';
import DisplayTeams from '../components/DisplayTeams';
import TossResults from '../components/TossResults';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageComponent: 1,
      currentTeam: 1,
      teamNames: ['Team 1', 'Team 2'],
      team1: {},
      team2: {},
      tossResults: 0,
      battingTeam: 0
    }
  }

  // componentDidMount() {
  //   console.log('cdm')
  //   const endpoint = 'http://127.0.0.4001';
  //   const socket = socketIOClient(endpoint);

  //   socket.on('initialize', pageComponent => {
  //     console.log('Page Component : ', pageComponent);
  //     // this.setState({ pageComponent });
  //   });

  //   console.log('cdu');
  // }


  setTeams(teams) {
    if (teams && teams[0] && teams[1]) {
      this.setState({
        teamNames: teams,
        pageComponent: 2
      });
    }
  }

  setTeamPlayers(teamNo, players) {
    switch (teamNo) {
      case 1: {
        this.setState({
          team1: {
            teamNo,
            teamName: this.state.teamNames[0],
            teamPlayers: players
          },
          currentTeam: 2
        });
        break;
      }
      case 2: {
        this.setState({
          team2: {
            teamNo,
            teamName: this.state.teamNames[1],
            teamPlayers: players,
          },
          pageComponent: 3
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  setTossPage() {
    this.setState({ pageComponent: 4 });
  }

  setTossResults(tossResults, battingTeam) {
    this.setState({
      tossResults,
      battingTeam
    });
  }

  renderComponent() {
    switch (this.state.pageComponent) {
      case 1: {
        return (
          <Teams
            setTeams={this.setTeams.bind(this)}
          />
        );
      }
      case 2: {
        return (
          <TeamPlayers
            teamNo={this.state.currentTeam}
            teamName={this.state.teamNames[this.state.currentTeam - 1]}
            setTeamPlayers={this.setTeamPlayers.bind(this)}
          />
        );
      }
      case 3: {
        return (
          <DisplayTeams
            team1={this.state.team1}
            team2={this.state.team2}
            setTossPage={this.setTossPage.bind(this)}
          />
        );
      }
      case 4: {
        return (
          <TossResults
            teamNames={this.state.teamNames}
            setTossResults={this.setTossResults.bind(this)}
          />
        );
      }
      default: {
        return (
          <Teams />
        );
      }
    }
  }

  render() {
    return (
      <div className="admin">
        <div className="admin-header">
          <h2>ScoreBuzz</h2>
        </div>
        <div className="admin-body">
          <div className="admin-card">
            {this.renderComponent()}
          </div>
        </div>
      </div>
    );
  }

}

export default Admin;