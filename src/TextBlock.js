/* @flow */
import React, { Component } from 'react';

type Props = {
  x: number,
  y: number,
  width: number,
  height: number,
  text: string,
  className?: string,
  fill?: string,
  stroke?: string,
  rect?: Object
}
export default class TextBlock extends Component<Props> {
  static defaultProps = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    text: "Sample",
    fill: "green"
  }

  render() {
    return (
      <svg
        className={`TextBlock ${this.props.className || ''}`}
        width={this.props.width}
        height={this.props.height}
        x={this.props.x}
        y={this.props.y}
        preserveAspectRatio="xMinYMin meet"
      >
        <rect
          x={0}
          y={0}
          width={this.props.width}
          height={this.props.height}
          fill={this.props.fill}
          stroke={this.props.stroke}
          {...this.props.rect}
        />
        <text
          className="text-block-label"
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {this.props.text}
        </text>
      </svg>
    )
  }
}
