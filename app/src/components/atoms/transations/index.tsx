import React from "react"

const variants = {
  simple: "",
}

export interface TransactionsProperties extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title?: string
  content?: string
  variant?: keyof typeof variants
  status?: "in" | "out"
  value: number
}

const Transactions: React.FC<TransactionsProperties> = ({
  content,
  icon,
  title,
  className,
  value,
  status,
  variant = "simple",
  ...properties
}) => {
  let BASE_CLASS = ""

  if (variant === "simple") {
    BASE_CLASS += variants[variant]

    return (
      <div className={`${BASE_CLASS} ${className}`} {...properties}>
        <div className="flex flex-row items-center justify-between px-0.5 md:px-2">
          <div className="center -ml-1 gap-1">
            <div className="flex-shrink-0">{icon}</div>
            <div className="">
              <p className="whitespace-nowrap text-sm font-bold text-black/75">{title}</p>
              <div className="flex items-center text-[10px] text-primary-cool-grey">
                <p>{content}</p>
              </div>
            </div>
          </div>
          <div
            className={
              "flex flex-col items-end gap-0 " +
              (status === "in" ? "text-secondary-light-green" : "text-secondary-light-red")
            }
          >
            <h1 className="text-sm font-bold">+{value}</h1>
            <p className="-mt-1 text-xs">{status}</p>
          </div>
        </div>
      </div>
    )
  }

  return <></>
}

export default Transactions
