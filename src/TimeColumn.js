import React, { Component } from 'react';
import './TimeColumn.css';

function startOfDay(when: Date): Date {
  let result = new Date(when)
  result.setHours(0,0,0,0)
  return result
}
const TEXT_HEIGHT = 35
export default class TimeColumn extends Component {
  static fifteenMinutes = 15 * 60 * 1000;
  static threeHours = 3 * 60 * 60 * 1000
  static defaultProps = {
    labelInterval: TimeColumn.fifteenMinutes,
  }

  labelCount() {
    return (this.props.endTime - this.props.startTime) / this.props.labelInterval
  }

  yCoord(time: Date): number {
    return (time - this.props.startTime) / (this.props.endTime - this.props.startTime) * this.props.height + TEXT_HEIGHT
  }

  times() {
    // from start of day @ startTime until end of day at endTime, add labelInterval if in bounds.
    let now = startOfDay(this.props.startTime)
    let end = this.props.endTime
    let result = []

    // Handle bad values for end/now
    if (!((end < now) || (end > now) || (end === now))) {
      return result
    }

    while (now < end) {
      if (now >= this.props.startTime) {
        result.push(now)
      }
      now = new Date(now.getTime() + this.props.labelInterval);
    }
    return result
  }

  format(time: Date): string {
    const months = ["Jan", "Feb", "Mar", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let h = (time.getHours() + 23) % 12 + 1
    let m = (time.getMinutes())
    let afternoon = time.getHours() >= 12
    let newDay = time.getTime() === startOfDay(time).getTime()

    let options = {};
    if (newDay) {
      return "" + time.getDate() + " " + months[time.getMonth()]
    } else if (m == 0) {
      return "" + h + " " + (afternoon ? "PM" : "AM")
    }

    return new Intl.DateTimeFormat(
      'en-US',
      {hour: 'numeric', minute: '2-digit'}
    ).format(time);
  }

  render() {
    // TODO: Formatter should have
    // * No AM/PM
    // * Except on the hour, when it should have no minutes
    // * And at midnight it should have the date

    return (
      <svg
        className="TimeColumn"
        width={this.props.width}
        height={this.props.height}
        preserveAspectRatio="xMinYMin meet"
      >
        {this.times().map((time, idx) => <text
          key={time}
          className="time-label"
          x="0"
          y={this.yCoord(time)}
        >
          { this.format(time) }
        </text>)}
      </svg>
    );
  }
}
