import React from "react"
import clsx from "clsx"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress?: number
  primaryDecoration?: string
  secondaryDecoration?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0.25,
  className,
  primaryDecoration,
  secondaryDecoration,
  ...props
}) => {
  return (
    <div className={clsx("flex flex-row flex-nowrap", className)} {...props}>
      <div
        style={{
          width: progress <= 1 ? `${progress * 100}%` : `${progress}%`,
        }}
        className={clsx("h-0.5 rounded-full bg-black/75", primaryDecoration)}
      />
      <div
        style={{
          width: progress <= 1 ? `${(1 - progress) * 100}%` : `${100 - progress}%`,
        }}
        className={clsx("h-0.5 rounded-full bg-gray-500/20", secondaryDecoration)}
      />
    </div>
  )
}

export default ProgressBar
