/* @flow */
import React, { Component } from 'react';
import './Timeline.css';
import TimeColumn from "./TimeColumn";
import EventColumn from "./EventColumn";
import type TimeRange from "./TimeRange"
import type { EventProps } from "./EventBlock"

type Props = {
  height: number,
  width: number,
  range: TimeRange,
  columns: {[string] : Array<EventProps>}
}

// Renders a graphical representation of a series of events
export default class Timeline extends Component<Props> {

  timeColumnWidth() {
    return this.props.width / 5
  }

  renderColumns() {
    const columnCount = Object.keys(this.props.columns).length
    const totalWidth = this.props.width * 4 / 5

    return Object.keys(this.props.columns).map((title, idx) =>
      <EventColumn
        title={title}
        key={idx}
        range={this.props.range}
        events={this.props.columns[title]}
        height={this.props.height}
        width={totalWidth / columnCount}
        x={this.timeColumnWidth() + idx * totalWidth / columnCount}
      />
    )
  }

  render() {
    let labelInterval = TimeColumn.fifteenMinutes

    while ((this.props.range.inMilliseconds() / labelInterval) > window.outerHeight / 100) {
      labelInterval = labelInterval * 2
    }

    return (
      <svg
        className="Timeline"
        width={window.innerWidth}
        height={window.innerHeight - 150}
        preserveAspectRatio="xMinYMin meet"
      >
          <TimeColumn
            range={this.props.range}
            labelInterval={labelInterval}
            height={this.props.height}
            width={this.timeColumnWidth()}
          />
          {this.renderColumns()}

      </svg>
    );
  }
}

// All SVG properties:
// accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
// amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
// baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight
// clip clipPath clipPathUnits clipRule colorInterpolation
// colorInterpolationFilters colorProfile colorRendering contentScriptType
// contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
// display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
// end exponent externalResourcesRequired fill fillOpacity fillRule filter
// filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
// fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy
// g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef
// gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic
// imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength
// kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor
// limitingConeAngle local markerEnd markerHeight markerMid markerStart
// markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode
// numOctaves offset opacity operator order orient orientation origin overflow
// overlinePosition overlineThickness paintOrder panose1 pathLength
// patternContentUnits patternTransform patternUnits pointerEvents points
// pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits
// r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions
// requiredFeatures restart result rotate rx ry scale seed shapeRendering slope
// spacing specularConstant specularExponent speed spreadMethod startOffset
// stdDeviation stemh stemv stitchTiles stopColor stopOpacity
// strikethroughPosition strikethroughThickness string stroke strokeDasharray
// strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity
// strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor
// textDecoration textLength textRendering to transform u1 u2 underlinePosition
// underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic
// vHanging vIdeographic vMathematical values vectorEffect version vertAdvY
// vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing
// writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole
// xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlns xmlnsXlink xmlBase
// xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
