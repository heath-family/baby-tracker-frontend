/* @flow */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timeline from './Timeline';
import TimeRange from './TimeRange';

class App extends Component<{||}> {
  render() {
    let startTime = new Date()
    startTime.setHours(20, 0, 0, 0)

    let endTime = new Date(startTime.getTime() + 1 * 60 * 60 * 1000);

    let range = new TimeRange(startTime, endTime)

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Baby Tracker</h2>
        </div>

        <Timeline
          height={window.innerHeight - 150}
          width={window.innerWidth}
          range={range}
          columns={{
            "Today": [
              {range: range.firstThird(), text: "older", color: "#afa"},
              {range: range.lastThird(), text: "recent", color: "#afa"},
            ]
          }}
        />
      </div>
    );
  }
}

export default App;
