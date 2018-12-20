import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

import '../styles/Admin.css';

import Teams from '../components/Teams';
import TeamPlayers from '../components/TeamPlayers';
import DisplayTeams from '../components/DisplayTeams';
import TossResults from '../components/TossResults'

import conf from '../conf';

class Admin extends Component {
  constructor(props) {
    super(props);
    const endpoint = 'http://127.0.0.1:4001';
    const socket = socketIOClient(endpoint);

    this.state = {
      pageComponent: 0,
      currentTeam: 1,
      team1: '',
      team2: '',
      team1Players: Array(15).fill(null).map(() => ({name: ''})),
      team2Players: Array(15).fill(null).map(() => ({name: ''})),
      // team2: {},
      socket,
    }
  }

  componentDidMount() {
    const { socket } = this.state;
    socket.on('initialize', pageComponent => {
      console.log('Page Component : ', pageComponent);
      this.setState({ pageComponent });
    });
  }

  nextScreen() {
    let { pageComponent, socket } = this.state;
    // No of screens
    let n = 5;
    if(pageComponent === n) {
      pageComponent = -1;
    }
    this.setState({
      pageComponent: pageComponent + 1,
    });

    // Send sockent message for next screen
    socket.emit('nextScreen', pageComponent + 1);
  }

  changeTeamName(teamName) {
    this.setState({
      ...teamName,
    });
  }

  setTeamPlayers(teamId, teamName, teamPlayers) {
    axios.post({
      url: `${conf.base_url}/apis/createteam`,
      body: {
        teamName,
        teamId,
        teamPlayers,
      },
    });
    this.nextScreen();
  }

  setTossPage() {
    this.setState({ pageComponent: 3 });
  }

  renderComponent() {
    const { team1, team2 } = this.state;
    switch (this.state.pageComponent) {
      case 0: {
        return (
          <Teams
            team1 = {team1}
            team2 = {team2}
            nextScreen = {() => this.nextScreen()}
            changeTeamName = {(teamName) => this.changeTeamName(teamName)}
          />
        );
      }
      case 1: {
        return (
          <TeamPlayers
            teamNo = {1}
            teamName = {this.state.team1}
            setTeamPlayers = {teamPlayers => this.setTeamPlayers(1, team1, teamPlayers)}
          />
        );
      }
      case 2: {
        return (
          <TeamPlayers
            teamNo = {2}
            teamName = {this.state.team2}
            setTeamPlayers = {teamPlayers => this.setTeamPlayers(2, team2, teamPlayers)}
          />
        )
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