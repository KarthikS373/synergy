import React from "react"

type CardProperties = React.HTMLAttributes<HTMLDivElement>

const Card: React.FC<CardProperties> = ({ children, className }) => {
  return <div className={`rounded-lg px-2 py-1 shadow-md ${className}`}>{children}</div>
}

export default Card
