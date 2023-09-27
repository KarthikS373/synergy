import React from "react"
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"

interface DoughnutChartProperties {
  fillPercentage?: number
  value?: number
  maxValue?: number
  className?: string
  text?: string
  strokeWidth?: number
  background?: boolean
  backgroundPadding?: number
  counterClockwise?: boolean
  circleRatio?: number
  style?: {
    rotation?: number | undefined
    strokeLinecap?: "round" | "butt"
    textColor?: string | undefined
    textSize?: string | number | undefined
    pathColor?: string | undefined
    pathTransition?: string | undefined
    pathTransitionDuration?: number | undefined
    trailColor?: string | undefined
    backgroundColor?: string | undefined
  }
}

const DoughnutProgressChart: React.FC<DoughnutChartProperties> = ({
  fillPercentage,
  maxValue,
  value,
  style,
  text,
  ...properties
}) => {
  return (
    <CircularProgressbar
      value={fillPercentage || value || 0}
      maxValue={maxValue}
      text={text ?? `${fillPercentage || 0}%`}
      styles={buildStyles({ ...style })}
      {...properties}
    />
  )
}

export default DoughnutProgressChart
