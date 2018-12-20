import React from 'react';
// import socketIOClient from 'socket.io-client';

import '../styles/Home.css';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      team1: {},
      team2: {},
      batsman1: {},
      batsman2: {},
      bowler: {},
      bowlingStatus: [],
      tabs: ['Live-Score', 'Score-Board'],
      scoreBoardDetails: []
    }
  }

  componentDidMount() {

    // console.log('cdm');
    // const endpoint = 'http://127.0.0.4001';
    // const socket = socketIOClient(endpoint);

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
      batsman1: {
        name: 'Virat',
        runs: 9,
        balls: 6,
        fours: 2,
        sixes: 0
      },
      batsman2: {
        name: 'Dhoni',
        runs: 9,
        balls: 6,
        fours: 2,
        sixes: 0
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
      batsman1: liveScoreBoard.batsman1,
      batsman2: liveScoreBoard.batsman2,
      bowler: liveScoreBoard.bowler,
      bowlingStatus: liveScoreBoard.bowlingStatus,
      scoreBoardDetails: liveScoreBoard.scoreBoardDetails
    });
  }

  setTab(tabNo) {
    this.state.tabs.map((item, i) => {
      document.getElementById(`tab${i}`).style.backgroundColor = '#660033';
      document.getElementById(`tab${i}`).style.fontWeight = 'normal';
    });
    document.getElementById(`tab${tabNo}`).style.backgroundColor = '#ba124c';
    document.getElementById(`tab${tabNo}`).style.fontWeight = 'bold';
    this.setState({ currentTab: tabNo });
  }

  render() {
    return (
      <div className="home">
        <div className="home-header">
          <h2>Kalva-Pen Tennis Cricket Association</h2>
        </div>
        <div className="home-sponsors">
          <h4>Sponsored by Viren Patil and Karan Patil</h4>
        </div>
        <div className="home-teams">
          <div className="team">
            <img src={this.state.team1.logo} width="50" height="50" className="team-logo" />
            <h4>&nbsp;{this.state.team1.name}</h4>
          </div>
          <div className="team">
            <img src={this.state.team2.logo} width="50" height="50" className="team-logo" />
            <h4>&nbsp;{this.state.team2.name}</h4>
          </div>
        </div>
        <div className="toss-win">
          {
            (this.state.team1.wonToss) ?
              <span>{`${this.state.team1.name} won the toss and elected to do ${(this.state.team1.isBattingTeam) ? 'batting' : 'fielding'}.`}</span>
              :
              <span>{`${this.state.team2.name} won the toss and elected to do ${(this.state.team2.isBattingTeam) ? 'batting' : 'fielding'}.`}</span>
          }
        </div>
        <div className="home-body">
          {
            (this.state.currentTab == 0) ?
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
                    <tr>
                      <td key={`batsman1_name`}>{this.state.batsman1.name}</td>
                      <td key={`batsman1_runs`}>{this.state.batsman1.runs}</td>
                      <td key={`batsman1_balls`}>{this.state.batsman1.balls}</td>
                      <td key={`batsman1_fours`}>{this.state.batsman1.fours}</td>
                      <td key={`batsman1_sixes`}>{this.state.batsman1.sixes}</td>
                    </tr>
                    <tr>
                      <td key={`batsman2_name`}>{this.state.batsman2.name}</td>
                      <td key={`batsman2_runs`}>{this.state.batsman2.runs}</td>
                      <td key={`batsman2_balls`}>{this.state.batsman2.balls}</td>
                      <td key={`batsman2_fours`}>{this.state.batsman2.fours}</td>
                      <td key={`batsman2_sixes`}>{this.state.batsman2.sixes}</td>
                    </tr>
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
                      <td key={`bowler_name`}>{this.state.bowler.name}</td>
                      <td key={`bowler_overs`}>{this.state.bowler.overs}</td>
                      <td key={`bowler_runs`}>{this.state.bowler.runs}</td>
                      <td key={`bowler_maidens`}>{this.state.bowler.maidens}</td>
                      <td key={`bowler_wickets`}>{this.state.bowler.wickets}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="bowling-status">
                  {
                    this.state.bowlingStatus.map((item, i) =>
                      <div className="bowl-status">
                        <div className="bowl">{i + 1}</div>
                        <div className="bowl">{item}</div>
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
                    <tr>
                      {/* {
                        this.state.batsman[0].map((item, i) =>
                          <td key={`batsman1_${i}`}>{item}</td>
                        )
                      } */}
                    </tr>
                  </tbody>
                </table>
              </div>
          }
        </div>
        <div className="bottom-navigation">
          {
            this.state.tabs.map((item, i) =>
              <div id={`tab${i}`} className="tab" onClick={() => this.setTab(i)}>{item}</div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Home;
