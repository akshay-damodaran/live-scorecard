import React from 'react';
import socketIOClient from 'socket.io-client';
// import socketIOClient from 'socket.io-client';

import '../styles/Home.css';

class Home extends React.Component {

  constructor(props) {
    super(props);
    const endpoint = 'http://127.0.0.1:4002';
    const socket = socketIOClient(endpoint);

    this.state = {
      currentTab: 0,
      
      
      team1: {},
      team2: {},
      batsman1: {},
      batsman2: {},
      bowler: {},
      bowlingStatus: [],
      tabs: ['Live-Score', 'Score-Board'],
      scoreBoardDetails: [],


      socket,
      team1_runs: 0,
      team1_wickets: 0,
      team2_runs: 0,
      team2_wickets: 0,
      team1_total_balls: 0,
      team2_total_balls: 0,
      current_striker: 1,
      currentBatsman: [{
        id: 1,
        name: 'Akshay Damodaran',
        runs: 40,
        balls: 7,
        fours: 1,
        sixes: 6,
      }, {
        id: 2,
        name: 'Sudarshana Patil',
        runs: 0,
        balls: 10,
        fours: 0,
        sixes: 0,
      },]
    }
  }

  componentDidMount() {
    const { socket } = this.state;
    // socket.on('scoreBoard', liveScoreBoard => {
    //   console.log('Live Score Board: ', liveScoreBoard);
    //   window.sessionStorage.setItem('scoreBoardDetails', JSON.stringify(liveScoreBoard.scoreBoardDetails));
    //   if (this.state.scoreBoardDetails.length === 0) {
    //     this.setState({
    //       scoreBoardDetails: JSON.parse(window.sessionStorage.getItem('scoreBoardDetails'))
    //     });
    //   }
    //   this.setState({ liveScoreBoard });
    // });

    socket.on('initialize', data => {
      this.setState(data);
    });

    socket.on('eachBallUpdate', data => {
      const {
        runScored,
        teamId,
        playerId,
        strikerId,
      } = data;

      let { currentBatsman } = this.state;
      currentBatsman = currentBatsman.map(batsman => {
        if (batsman.id === playerId) {
          batsman.runs += runScored
        }
        return batsman;
      });


    });


    document.getElementById(`tab${this.state.currentTab}`).style.backgroundColor = '#ba124c';
    document.getElementById(`tab${this.state.currentTab}`).style.fontWeight = 'bold';
    let liveScoreBoard = {
      team1: {
        name: 'Mumbai',
        logo: require('../images/team1.png'),
        wonToss: true,
        isBattingTeam: true
      },
      team2: {
        name: 'Pune',
        logo: require('../images/team2.png'),
        wonToss: false,
        isBattingTeam: false
      },
      bowler: {
        name: 'S Abbasi',
        overs: 9,
        runs: 6,
        maidens: 2,
        wickets: 0
      },
      bowlingStatus: ['WD', 'NB', 'WK', 'B', 'LB', '-'],
      scoreBoardDetails: [{
        name: 'Dhoni',
        runs: 9,
        balls: 6,
        fours: 2,
        sixes: 0
      }, {
        name: 'Dhoni',
        runs: 9,
        balls: 6,
        fours: 2,
        sixes: 0
      }, {
        name: 'Dhoni',
        runs: 9,
        balls: 6,
        fours: 2,
        sixes: 0
      }]
    }
    this.setState({
      team1: liveScoreBoard.team1,
      team2: liveScoreBoard.team2,
      // batsman1: liveScoreBoard.batsman1,
      // batsman2: liveScoreBoard.batsman2,
      bowler: liveScoreBoard.bowler,
      bowlingStatus: liveScoreBoard.bowlingStatus,
      scoreBoardDetails: liveScoreBoard.scoreBoardDetails
    });
  }

  setTab(tabNo) {
    this.state.tabs.map((item, i) => {
      document.getElementById(`tab${i}`).style.backgroundColor = '#660033';
      document.getElementById(`tab${i}`).style.fontWeight = 'normal';
      return null;
    });
    document.getElementById(`tab${tabNo}`).style.backgroundColor = '#ba124c';
    document.getElementById(`tab${tabNo}`).style.fontWeight = 'bold';
    this.setState({ currentTab: tabNo });
  }

  render() {
    const {
      team1,
      team2,
      bowler,
      bowlingStatus,
      tabs,
      scoreBoardDetails,
      current_striker,
      currentBatsman,
    } = this.state;
    return (
      <div className="home">
        <div className="home-header">
          <h2>Kalva-Pen Tennis Cricket Association</h2>
        </div>
        <div className="home-sponsors">
          <h4>Sponsored by Viren Patil and Karan Patil</h4>
        </div>
        <div className="home-teams">
          <div className="team" style={{ backgroundColor: '#66ccff' }}>
            <img src={team1.logo} width="50" height="50" className="team-logo" alt={team1.name} />
            <h4>&nbsp;{team1.name}</h4>
          </div>
          <div className="team" style={{ backgroundColor: '#ccccff' }}>
            <img src={team2.logo} width="50" height="50" className="team-logo" alt={team2.name} />
            <h4>&nbsp;{team2.name}</h4>
          </div>
        </div>
        <div className="toss-win">
          {
            (team1.wonToss) ?
              <span>{`${team1.name} won the toss and elected to do ${(team1.isBattingTeam) ? 'batting' : 'fielding'}.`}</span>
              :
              <span>{`${team2.name} won the toss and elected to do ${(team2.isBattingTeam) ? 'batting' : 'fielding'}.`}</span>
          }
        </div>
        <div className="home-body">
          {
            (this.state.currentTab === 0) ?
              <div className="home-card">
                <table className="score-board">
                  <thead>
                    <tr>
                      <th>Batsmen</th>
                      <th>R</th>
                      <th>B</th>
                      <th>4S</th>
                      <th>6S</th>
                      <th>SR/RR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBatsman.map(batsman => (
                      <tr key={batsman.id}>
                        <td>{ `${batsman.name}${batsman.id === current_striker ? '*': ''}` }</td>
                        <td>{ batsman.runs }</td>
                        <td>{ batsman.balls }</td>
                        <td>{ batsman.fours }</td>
                        <td>{ batsman.sixes }</td>
                        <td>{ batsman.balls ? Math.round(batsman.runs / batsman.balls * 10000) / 100 : 0 }</td>
                      </tr>
                    ))}
                  </tbody>
                  <thead>
                    <tr>
                      <th>Bowler</th>
                      <th>O</th>
                      <th>R</th>
                      <th>M</th>
                      <th>W</th>
                      <th>Econ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {
                        Object.keys(bowler).map((item, i) =>
                          <td key={`bowler_${item}`}>{bowler[item]}</td>
                        )
                      }
                      <td key={`bowler_economy`}>{(bowler.runs / bowler.overs * 100).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="bowling-status">
                  {
                    bowlingStatus.map((item, i) =>
                      <div className="bowl-status">
                        <div className="bowl">{i + 1}</div>
                        <div className="bowl" id="status" style={{ backgroundColor: (item === 'WK') ? '#ff0000' : '#333333' }}>{item}</div>
                      </div>
                    )
                  }
                </div>
              </div>
              :
              <div className="home-card">
                <table className="score-board">
                  <thead>
                    <tr>
                      <th>Batsmen</th>
                      <th>R</th>
                      <th>B</th>
                      <th>4S</th>
                      <th>6S</th>
                      <th>SR/RR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      scoreBoardDetails.map((obj) =>
                        <tr className="scoreboard-details">
                          {
                            Object.keys(obj).map((item, i) =>
                              <td key={`batsman_${i}`}>{obj[item]}</td>
                            )
                          }
                          <td key={`batsman_strikeRate`}>{obj.runs / obj.balls * 100}</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
          }
        </div>
        <div className="bottom-navigation">
          {
            tabs.map((item, i) =>
              <div id={`tab${i}`} className="tab" onClick={() => this.setTab(i)}>{item}</div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Home;
