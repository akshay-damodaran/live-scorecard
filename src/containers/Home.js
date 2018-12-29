import React from 'react';
import socketIOClient from 'socket.io-client';
// import socketIOClient from 'socket.io-client';

import '../styles/Home.css';

class Home extends React.Component {

  constructor(props) {
    super(props);
    const endpoint = 'http://127.0.0.1:4002';
    const socket = socketIOClient(endpoint);
    
    const team1 = {
      name: "Yet to be decided",
      runs: 0,
      wickets: 0,
      ballsFaced: 0,
    };
    const team2 = {
      name: "Yet to be decided",
      runs: 0,
      wickets: 0,
      ballsFaced: 0,
    };
    const inningId = 1;
    const overArray = [];
    const batsmanBoard = [];
    const matchStatus = '1';

    this.state = {
      currentTab: 0,
      tabs: ['Live-Score', 'Score-Board'],
      socket,
      team1,
      team2,
      inningId,
      overArray,
      batsmanBoard,
      matchStatus,
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

    const data = {
      team1: {
        name:"abc" ,
        logo: require('../images/team1.png'),
        wonToss: false,
        isBatting: true,
        runs: 200,
        wickets: 3,
        ballsFaced:5
      },
      team2: {
        name: "jhj",
        logo: require('../images/team2.png'),
        wonToss: true,
        isBatting: false,
        runs: 200,
        wickets: 3,
        ballsFaced:4
      },
      inningId: 1,
      heading: {
        title: '2 won the toss and elected to do B.'
      },
      striker: {
        id: 4,
        name: 'Akshay Damodaran',
        runs: 3,
        balls: 6,
        fours: '0',
        sixes: '0'
      },
      nonStriker: {
        id: 5,
        name: 'Jagrutee Banda',
        runs: 4,
        balls: 6,
        fours: '0',
        sixes: '0'
      },
      bowler: {
        id: 4,
        name: 'abc',
        runsGiven: 5,
        ballsBowled: 16,
        maiden: 3,
        wickets: 2
      },
      overArray: [
      ],
      batsmanBoard: [
        {
          id: 4,
          name: 'abc',
          runs: 12,
          balls: 12,
          fours: '0',
          sixes: '0'
        },
        {
          id: 4,
          name: 'abc',
          runs: 12,
          balls: 34,
          fours: '0',
          sixes: '0'
        }
      ]
    }

    // this.setState({ ...data, current_striker, currentBatsman });

    // On connection with server
    socket.on('initialize', data => {
      const current_striker = data.striker.id;
      let currentBatsman = [];
      if (data.striker && data.nonStriker) {
        currentBatsman = [data.striker, data.nonStriker];
      }

      // let headline, teamName, balls, runs;

      let { headline, inningId, battingTeam, team1, team2, totalBalls } = data;
      headline = this.getHeadLine(headline.title, inningId, battingTeam, team1, team2, totalBalls);

      this.setState({ ...data, current_striker, currentBatsman, });
    });

    // On each ball
    socket.on('eachBallUpdate', data => {
      const {
        runScored,
        teamId,
        playerId,
        strikerId,
      } = data;

      let { currentBatsman, bowler, team1, team2, overArray } = this.state;

      // Update currentBatsman details
      currentBatsman = currentBatsman.map(batsman => {
        if (batsman.id === playerId) {
          batsman.runs += runScored;
          batsman.balls += 1;
          if (runScored === 4) {
            batsman.fours += 1
          } else if (runScored === 6) {
            batsman.sixes += 1
          }
        }
        return batsman;
      });

      // Update over status
      overArray.push(runScored);

      // Update bowler details
      bowler.runsGiven += runScored;
      bowler.ballsBowled += 1;

      // Update team details
      if (teamId == 1) {
        team1.runs += runScored;
        team1.ballsFaced += 1;
      } else if (teamId == 2) {
        team2.runs += runScored;
        team2.ballsFaced += 1;
      }

      let { headline, inningId, battingTeam, totalBalls } = this.state;
      headline = this.getHeadLine(headline, inningId, battingTeam, team1, team2, totalBalls);

      this.setState({
        currentBatsman,
        strikerId,
        bowler,
        team1,
        team2,
        overArray,
      })
    });

    // On wicket
    socket.on('wicket', data => {
      const { runScored, playerId, teamId, newPlayerId, newPlayerName, strikerId, } = data;
      let { team1, team2, currentBatsman, batsmanBoard, overArray } = this.state;
      
      // Update team wickets
      if (teamId == 1) {
        team1.wickets += 1;
      } else if (teamId == 2) {
        team2.wickets += 1;
      }

      // Update current batsman list
      const outIndex = currentBatsman.findIndex(batsman => batsman.id === playerId);
      currentBatsman.splice(outIndex, 1);
      currentBatsman.push({
        id: newPlayerId,
        name: newPlayerName,
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
      });

      // Update over status
      overArray.push(`${runScored}W`);

      // Add new player in scoreboard
      batsmanBoard.push({
        id: newPlayerId,
        name: newPlayerName,
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
      });

      this.setState({ team1, team2, currentBatsman, strikerId, overArray });
    });

    // On start of the innings
    socket.on('inningStart', data => {
      const { strikerId, inningId } = data;

      this.setState({ inningId, strikerId });
    });

    // On start of over
    socket.on('overStart', data => {
      const { bowler, strikerId, totalRuns, teamId } = data;

      // Initialize overArray
      const overArray = [];

      this.setState({ bowler, strikerId, overArray, });
    });

    // On extras given by bowler
    socket.on('extra', data => {
      const { score, teamId, type } = data;

      let { headline, inningId, battingTeam, team1, team2, totalBalls } = this.state;
      headline = this.getHeadLine(headline, inningId, battingTeam, team1, team2, totalBalls);
      
    });

    // On end of the innings
    socket.on('inningEnd', data => {
      const { teamId, totalScore, totalWicket } = data;
    });

    // document.getElementById(`tab${this.state.currentTab}`).style.backgroundColor = '#ba124c';
    // document.getElementById(`tab${this.state.currentTab}`).style.fontWeight = 'bold';
  }

  getHeadLine(headline, inningId, battingTeam, team1, team2, totalBalls) {
    if (inningId === 1) {
        return headline;
      } else if (inningId === 2) {
        let teamName, runs, balls;
        if (battingTeam === 1) {
          teamName = team1.name;
          runs = team2.runs - team1.runs + 1;
          balls = totalBalls - team1.ballsFaced;
        } else if (battingTeam === 2) {
          teamName = team2.name;
          runs = team1.runs - team2.runs + 1;
          balls = totalBalls - team2.balls;
        }
        headline = `${teamName} needs ${runs} runs to win from ${balls} balls.`
      }
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

  renderInitial() {
    console.log('hi')
    return (
      <div>
        <p>Match Yet To be start</p>
      </div>
    );
  }

  renderData() {
    const {
      team1,
      team2,
      bowler,
      inningId,
      heading,
      overArray,
      tabs,
      scoreBoardDetails,
      current_striker,
      currentBatsman,
    } = this.state;

    return (
      <React.Fragment>
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
          {inningId === '1' && <span>{ heading.title }</span>}
          {/* {data.inningId === '2' && <span>{`${q}`}</span>} */}
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
                      <td>{ bowler.name }</td>
                      <td>{ `${Math.floor(bowler.ballsBowled / 6)}.${bowler.ballsBowled % 6}` }</td>
                      <td>{ bowler.runsGiven }</td>
                      <td>{ bowler.maiden }</td>
                      <td>{ bowler.wickets }</td>
                      <td>{(bowler.runsGiven / `${Math.floor(bowler.ballsBowled / 6)}.${bowler.ballsBowled % 6}` * 100).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="bowling-status">
                  {
                    overArray.map((item, i) =>
                      <div className="bowl-status" key={i}>
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
              <div
                id = {`tab${i}`}
                className = "tab"
                key = {item}
                onClick = {() => this.setTab(i)}
              >
                {item}
              </div>
            )
          }
        </div>
      </React.Fragment>
    );
  }

  renderDisplay() {
    const { matchStatus } = this.state;
    switch (matchStatus) {
      case '1': return this.renderInitial();
      default: return this.renderData();
    }
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
        { this.renderDisplay() }
      </div>
    );
  }
}

export default Home;
