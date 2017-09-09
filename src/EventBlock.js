/* @flow */
import React, { Component } from 'react';
import TextBlock from "./TextBlock";
import type TimeRange from "./TimeRange"

export type EventProps = {
  range: TimeRange,
  text: string,
  color: string
}

type Props = {
  x: number,
  width: number,
  maxHeight: number,
  yOffset: number,
  parentRange: TimeRange,
  event: EventProps
}

export default class EventBlock extends Component<Props> {
  static defaultProps = {
    x: 0,
    width: 100,
    maxHeight: 100,
    yOffset: 35
  }

  top() {
    return this.props.yOffset + this.props.maxHeight * this.props.parentRange.fractionThrough(
      this.props.event.range.start,
    )
  }

  middle() {
    return this.top() + this.height() / 2
  }

  bottom() {
    return this.props.yOffset + this.props.maxHeight * this.props.parentRange.fractionThrough(
      this.props.event.range.end,
    )
  }

  height() {
    return this.bottom() - this.top()
  }

  render() {
    return (
      <TextBlock
        width={this.props.width}
        height={this.height()}
        x={this.props.x}
        y={this.top()}
        fill={this.props.event.color}
        text={this.props.event.text}
      />
    )
  }
}
