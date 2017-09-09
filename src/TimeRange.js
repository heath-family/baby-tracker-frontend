/* @flow */

export default class TimeRange {
  start: Date
  end: Date;
  constructor(start: Date, end: Date) {
    this.start = start
    this.end = end
  }

  fractionThrough(now: Date): number {
    return (now - this.start) / (this.end - this.start)
  }

  inMilliseconds(): number {
    return this.end - this.start
  }

  firstFrac(frac: number): TimeRange {
    const newEnd = new Date(this.start.getTime() + (this.inMilliseconds() * frac))
    return new TimeRange(this.start, newEnd)
  }

  lastFrac(frac: number): TimeRange {
    const newStart = new Date(this.end.getTime() - (this.inMilliseconds() * frac))
    return new TimeRange(newStart, this.end)
  }

  firstThird(): TimeRange {
    return this.firstFrac(1/3)
  }

  lastThird(): TimeRange {
    return this.lastFrac(1/3)
  }
}
