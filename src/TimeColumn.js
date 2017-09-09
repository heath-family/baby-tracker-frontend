/* @flow */
import React, { Component } from 'react';
import './TimeColumn.css';
import type TimeRange from "./TimeRange"

function startOfDay(when: Date): Date {
  let result = new Date(when)
  result.setHours(0,0,0,0)
  return result
}

type Props = {
  labelInterval: number,
  textHeight: number,
  range: TimeRange,
  height: number,
  width: number
}
export default class TimeColumn extends Component<Props> {
  static fifteenMinutes = 15 * 60 * 1000;
  static threeHours = 3 * 60 * 60 * 1000
  static defaultProps = {
    labelInterval: TimeColumn.fifteenMinutes,
    textHeight: 35
  }

  labelCount() {
    return this.props.range.inMilliseconds() / this.props.labelInterval
  }

  yCoord(time: Date): number {
    return this.props.textHeight + this.props.height * this.props.range.fractionThrough(time)
  }

  times() {
    // from start of day @ startTime until end of day at endTime, add labelInterval if in bounds.
    let now = startOfDay(this.props.range.start)
    let end = this.props.range.end
    let result = []

    // Handle bad values for end/now
    if (!((end < now) || (end > now) || (end === now))) {
      return result
    }

    while (now < end) {
      if (now >= this.props.range.start) {
        result.push(now)
      }
      now = new Date(now.getTime() + this.props.labelInterval);
    }
    return result
  }

  // TODO: Formatter should have
  // * No AM/PM
  // * Except on the hour, when it should have no minutes
  // * And at midnight it should have the date
  format(time: Date): string {
    const months = ["Jan", "Feb", "Mar", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let h = (time.getHours() + 23) % 12 + 1
    let m = (time.getMinutes())
    let afternoon = time.getHours() >= 12
    let newDay = time.getTime() === startOfDay(time).getTime()

    if (newDay) {
      return "" + time.getDate() + " " + months[time.getMonth()]
    } else if (m === 0) {
      return "" + h + " " + (afternoon ? "PM" : "AM")
    }

    return "" + h + ":" + m
  }

  render() {
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
