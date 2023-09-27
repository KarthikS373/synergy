import React from "react"

const variants = {
  primary:
    "bg-primary-400 hover:bg-primary-400/90 transition-all text-white font-bold py-2 px-4 rounded-lg  ",
  secondary:
    "py-2 px-4 bg-primary-50 hover:bg-primary-50/75 transition-all text-white font-bold py-2 px-4 rounded-lg ",
  link: "inline-block px-6 py-2.5 bg-transparent text-600 font-medium text-xs leading-tight uppercase rounded hover:text-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out",
  black: "m-auto items-center flex h-[40px] w-[200px] flex-col justify-center bg-black text-white",
  pill: "h-10 px-5 text-white transition-colors duration-150 bg-primary-50 rounded-full focus:shadow-outline hover:bg-primary-50/90",
}

interface ButtonProperties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
  textClassName?: string
  variant?: keyof typeof variants
}

const Button = ({
  title,
  onClick,
  className = "",
  disabled = false,
  textClassName = "",
  variant = "primary",
  children,
  type,
  style,
  ...properties
}: ButtonProperties) => {
  const BASE_CLASS = "font-bold rounded"

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`${BASE_CLASS} ${variant && variants[variant]} ${className}`}
      {...properties}
    >
      {children && children}
      {title && <p className={` ${textClassName}`}>{title}</p>}
    </button>
  )
}

export default Button
