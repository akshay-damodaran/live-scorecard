import React, { Component } from 'react';
// import socketIOClient from 'socket.io-client';

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