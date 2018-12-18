import React, { Component } from 'react';

import '../styles/Admin.css';

import Teams from '../components/Teams';
import TeamPlayers from '../components/TeamPlayers';
import TossResults from '../components/TossResults';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageComponent: 'enterTeams',
      teamNames: ['Team 1', 'Team 2']
    }
  }

  setTeams(teams) {
    if (teams && teams[0] && teams[1]) {
      this.setState({
        teamNames: teams,
        pageComponent: 'teamPlayers'
      });
    }
  }

  renderComponent() {
    switch (this.state.pageComponent) {
      case 'enterTeams': {
        return (
          <Teams
            setTeams={this.setTeams.bind(this)}
          />
        );
      }
      case 'teamPlayers': {
        return (
          <TeamPlayers
            teamNames={this.state.teamNames}
          />
        );
      }
      case 'tossResults': {
        return (
          <TossResults />
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
        <h1>ScoreBuzz</h1>
        <hr />
        <br />
        {this.renderComponent()}
      </div>
    );
  }

}

export default Admin;