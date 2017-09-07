import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timeline from './Timeline';

class App extends Component {
  render() {
    let startTime = new Date()
    startTime.setHours(20, 0, 0, 0)

    let endTime = new Date(startTime.getTime() + 1 * 60 * 60 * 1000);

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Baby Tracker</h2>
        </div>

        <Timeline
          startTime={startTime}
          endTime={endTime}
          columns={{
            "Today": []
          }}
        />
      </div>
    );
  }
}

export default App;
