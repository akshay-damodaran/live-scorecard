import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

import '../styles/Admin.css';

import Teams from '../components/Teams';
import TeamPlayers from '../components/TeamPlayers';
import DisplayTeams from '../components/DisplayTeams';
import TossResults from '../components/TossResults';
import AdminScoreBoard from '../components/AdminScoreBoard';
import Login from '../components/Login';

import conf from '../conf';

class Admin extends Component {
  constructor(props) {
    super(props);
    const endpoint = conf.broadcast_socket_url;
    const socket = socketIOClient(endpoint);

    this.state = {
      pageComponent: 1,
      currentTeam: 1,
      team1: {
        name: '',
        logo: '',
        wonToss: false,
        isBatting: false,
        runs: 0,
        wickets: 0,
        ballsFaced: 0
      },
      team2: {
        name: '',
        logo: '',
        wonToss: false,
        isBatting: false,
        runs: 0,
        wickets: 0,
        ballsFaced: 0
      },
      team1Players: Array(11).fill(null).map((item, i) => ({ id: i, name: '' })),
      team2Players: Array(11).fill(null).map((item, i) => ({ id: i, name: '' })),
      tossResult: 0,
      battingTeam: 0,
      totalOvers: 2,
      socket,
      inningId: 1,
      overArray: [],
    }
  }

  componentDidMount() {
    const { socket } = this.state;
    socket.on('initialize', data => {
      // console.log('Page Component : ', data);
      const { matchStatus, team1, team2, inningId, toss, overArray, } = data
      this.setState({
        pageComponent: matchStatus,
        team1,
        team2,
        team1Players: team1.players,
        team2Players: team2.players,
        overArray: Array(6).fill(0),
        battingTeam: toss.battingTeam,
        inningId,
      });
    });
    socket.on('nextScreen', data => {
      // console.log('Data : ', data);
      this.setState({ pageComponent: data });
    })
  }

  prevScreen() {
    let {
      pageComponent,
      socket
    } = this.state;
    // if (pageComponent === 0) {
    //   pageComponent = 1;
    // }
    // this.setState({
    //   pageComponent: pageComponent - 1,
    // });

    // Send sockent message for previous screen
    socket.emit('nextScreen', pageComponent - 1);
  }

  nextScreen() {
    let {
      pageComponent,
      socket
    } = this.state;
    // // No of screens
    // let n = 6;
    // if (pageComponent === n) {
    //   pageComponent = -1;
    // }
    // this.setState({
    //   pageComponent: pageComponent + 1,
    // });

    // Send sockent message for next screen
    socket.emit('nextScreen', pageComponent + 1);
  }

  changeTeamName(teamName) {
    this.setState({
      ...teamName,
    });
  }

  setTotalOvers(totalOvers) {
    this.setState({ totalOvers: totalOvers.totalOvers });
  }

  setTeamPlayers(teamId, teamName, teamPlayers) {
    const url = `${conf.base_url}apis/createteam`;
    axios.post(
      url,
      {
        teamName,
        teamId,
        teamPlayers,
        totalOvers: this.state.totalOvers
      })
      .then(res => {
        // console.log('Res : ', res);
      })
      .catch(err => console.log('Error : ', err));
    if (teamId === 1) {
      this.setState({ team1Players: teamPlayers });
    } else {
      this.setState({ team2Players: teamPlayers });
    }
    this.nextScreen();
  }

  setTossResults() {
    const { tossResult, battingTeam } = this.state;
    const url = `${conf.base_url}apis/toss`;
    const decision = (tossResult === battingTeam) ? '0' : '1';
    axios.post(
      url,
      {
        teamId: tossResult,
        battingTeam,
        decision,
      }
    )
    this.nextScreen();
  }

  handleImageUpload(e, teamName) {
    let imageData = document.querySelector('input[type=file]').files[0];
    let url = '';
    axios.post(
      url,
      imageData
    );
  }

  renderComponent() {
    const { team1, team2, totalOvers, team1Players, team2Players, tossResult, battingTeam, pageComponent, overArray } = this.state;
    switch (pageComponent) {
      case 0: {
        return (
          <Login
            nextScreen={() => this.nextScreen()}
          />
        )
      }
      case 1: {
        return (
          <Teams
            team1={team1.name}
            team2={team2.name}
            totalOvers={totalOvers}
            nextScreen={() => this.nextScreen()}
            changeTeamName={(teamName) => this.changeTeamName(teamName)}
            setTotalOvers={(totalOvers) => this.setTotalOvers(totalOvers)}
          />
        );
      }
      case 2: {
        return (
          <TeamPlayers
            teamNo={1}
            teamName={team1.name}
            teamPlayers={team1Players}
            setTeamPlayers={teamPlayers => this.setTeamPlayers(1, team1, teamPlayers)}
            prevScreen={() => this.prevScreen()}
          />
        );
      }
      case 3: {
        return (
          <TeamPlayers
            teamNo={2}
            teamName={team2.name}
            teamPlayers={team2Players}
            setTeamPlayers={teamPlayers => this.setTeamPlayers(2, team2, teamPlayers)}
            prevScreen={() => this.prevScreen()}
          />
        )
      }
      case 4: {
        return (
          <DisplayTeams
            team1={team1.name}
            team2={team2.name}
            team1Players={team1Players}
            team2Players={team2Players}
            nextScreen={() => this.nextScreen()}
            prevScreen={() => this.prevScreen()}
          />
        );
      }
      case 5: {
        return (
          <TossResults
            team1={team1}
            team2={team2}
            setTossData={data => this.setState({ ...data })}
            setTossResults={() => this.setTossResults()}
            prevScreen={() => this.prevScreen()}
          />
        );
      }
      case 6: {
        return (
          <AdminScoreBoard
            team1={team1}
            team2={team2}
            // totalOvers={this.state.totalOvers}
            team1Players={team1Players}
            team2Players={team2Players}
            tossResult={tossResult}
            battingTeam={battingTeam}
            totalOvers={totalOvers}
            overArray={overArray}
            prevScreen={() => this.prevScreen()}
            scoreCardDisplay={this.state.pageComponent}
            socket={this.state.socket}
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
          <h2>Kalva-Pen Tennis Cricket Association</h2>
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