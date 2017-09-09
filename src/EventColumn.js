/* @flow */
import React, { Component } from 'react'
import './EventColumn.css'
import TextBlock from "./TextBlock"
import EventBlock from "./EventBlock"
import Hammer from "react-hammerjs"

import type TimeRange from "./TimeRange"
import type { EventProps } from "./EventBlock"

type Props = {
  x: number,
  y: number,
  width: number,
  height: number,
  title: string,
  range: TimeRange,
  titleHeight: number,
  events: Array<EventProps>
}
export default class EventColumn extends Component<Props> {

  static defaultProps = {
    x: 0,
    y: 0,
    titleHeight: 20
  }

  render() {

    const hammerOpts = {
      recognizers: {
          pinch: { enable: true }
      }
    }
    return (
      <svg
        className="EventColumn"
        width={this.props.width}
        height={this.props.height}
        x={this.props.x}
        y={this.props.y}
        preserveAspectRatio="xMinYMin meet"
      >
        <TextBlock
          className="EventColumnHeader"
          width={this.props.width}
          height={this.props.titleHeight}
          y={this.props.y}
          text={this.props.title}
        />
        {this.props.events.map((ev, idx) => <Hammer
            onPinch={(e) => alert("onPinch: "+e)}
            onSwipe={(e) => alert("onSwipe: "+e)}
            onPinchIn={(e) => alert("onPinchIn: "+e)}
            onPinchOut={(e) => alert("onPinchOut: "+e)}
            onPress={(e) => alert("onPress: "+e)}
            options={hammerOpts}
          >
            <EventBlock
              key={idx}
              width={this.props.width}
              parentRange={this.props.range}
              event={ev}
              yOffset={this.props.titleHeight}
              maxHeight={this.props.height - this.props.titleHeight}
            />
          </Hammer>
        )}
      </svg>
    );
  }
}
