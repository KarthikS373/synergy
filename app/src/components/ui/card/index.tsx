import React from "react"

const variants = {
  primary: "",
  secondary: "",
  link: "",
  pill: "",
}

interface CardProperties extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  textClassName?: string
  variant?: keyof typeof variants
}

const Card = ({
  title,
  onClick,
  className = "",
  textClassName = "",
  variant = "primary",
  children,
  style,
  ...properties
}: CardProperties) => {
  const BASE_CLASS = "shadow rounded-md p-4 bg-white"

  return (
    <div
      onClick={onClick}
      style={style}
      className={`${BASE_CLASS} ${variant && variants[variant]} ${className}`}
      {...properties}
    >
      {children && children}
      {title && <p className={` ${textClassName}`}>{title}</p>}
    </div>
  )
}

export default Card
