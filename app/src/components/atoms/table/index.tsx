import React, { useState } from "react"
import Image from "next/image"

import Checkbox from "../checkbox"
import Filter from "../icons/filter"

interface TableProperties {
  children?: React.ReactNode
  className?: string
  headers: {
    name: string
    type: "filter" | "sort" | "text" | "checkbox"
    onChange?: Callback<React.ChangeEvent>
    filter?: Callback
  }[]
  rows: {
    name: string
    type: "avatar" | "tag" | "text" | "action" | "checkbox"
    src?: string
    icon?: React.ReactNode
    className?: string
    onClick?: Callback<React.MouseEvent>
  }[][]
  headerDecoration?: string
  rowDecoration?: {
    odd?: string
    even?: string
  }
}

const Table: React.FC<TableProperties> = ({
  headers,
  rows,
  headerDecoration,
  rowDecoration,
  className,
}) => {
  return (
    <div
      className={
        "no-scroll -mx-4 w-full min-w-full overflow-x-auto py-4 sm:-mx-8 sm:px-0 " + className
      }
    >
      <div className="inline-block w-full min-w-full rounded-lg">
        <table className="w-full min-w-full overflow-x-scroll whitespace-nowrap leading-normal ">
          <thead>
            <tr>
              {headers.map((header, index) => {
                return (
                  <Head
                    key={`${header.name}-${header.type}-${index}`}
                    cell={header}
                    decoration={headerDecoration}
                  />
                )
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              return (
                <tr
                  key={`${row[index].name}-${index}`}
                  className={index % 2 === 0 ? rowDecoration?.even : rowDecoration?.odd}
                >
                  {row.map((cell, index_) => {
                    return <Row key={`${cell.name}-${cell.type}-${index_}`} cell={cell} />
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table

interface HeaderProperties {
  cell: {
    name: string
    type: "filter" | "sort" | "text" | "checkbox"
    onChange?: Callback<React.ChangeEvent>
    filter?: Callback
  }
  decoration?: string
}

interface RowProperties {
  cell: {
    name: string
    type: "avatar" | "text" | "action" | "tag" | "checkbox"
    src?: string
    icon?: React.ReactNode
    className?: string
  }
  className?: string
}

const Head: React.FC<HeaderProperties> = ({ cell, decoration }) => {
  const [state, setState] = useState<any>()

  let Element = <></>

  if (cell.type === "filter") {
    Element = (
      <div className="flex cursor-pointer flex-row items-baseline gap-1 ">
        {cell.name}
        <Filter state={state === undefined ? "filter" : state} />
      </div>
    )
  }

  if (cell.type === "checkbox") {
    Element = (
      <div className="center">
        <Checkbox
          className={(active) =>
            `border-primary-bright-blue ${active ? "bg-white" : "bg-primary-bright-blue"} `
          }
          fill="#ffffff"
        />
      </div>
    )
  }

  if (cell.type === "text") Element = <p className="">{cell.name}</p>

  return (
    <th
      className={"py-2 text-xs font-semibold tracking-wider " + decoration}
      onClick={() => {
        cell.filter?.()
        if (cell.type === "filter") {
          setState((previous: string) => {
            switch (previous) {
              case "filter": {
                return "up"
              }
              case "up": {
                return "down"
              }
              case "down": {
                return "filter"
              }
              default: {
                return "filter"
              }
            }
          })
        }
      }}
    >
      {Element}
    </th>
  )
}

const Row: React.FC<RowProperties> = ({ cell, className }) => {
  let Element = <></>

  if (cell.type === "checkbox") {
    Element = (
      <div className="center">
        <Checkbox
          className={(active) =>
            `border-primary-bright-blue ${active ? "bg-white" : "bg-primary-bright-blue"} `
          }
          fill="#ffffff"
        />
      </div>
    )
  }

  if (cell.type === "avatar") {
    Element = (
      <div className="center">
        <div className={"h-8 w-8 flex-shrink-0 overflow-hidden rounded-full " + cell.className}>
          <Image
            className="h-full w-full object-cover object-center"
            src={cell.src || ""}
            alt=""
            width={180}
            height={120}
          />
        </div>
      </div>
    )
  }

  if (cell.type === "text") {
    Element = <p className={" whitespace-no-wrap text-gray-900 " + cell.className}>{cell.name}</p>
  }

  if (cell.type === "tag") {
    Element = (
      <span className={"relative inline-block font-semibold leading-tight " + className}>
        <span aria-hidden className="absolute inset-0 rounded-full opacity-50"></span>
        <span className="relative">Action</span>
      </span>
    )
  }

  if (cell.type === "action") {
    Element = (
      <>
        <i className={"whitespace-no-wrap center text-gray-900 " + className}>{cell.icon}</i>
      </>
    )
  }

  return <td className={"whitespace-nowrap px-2 py-2 text-center text-sm "}>{Element}</td>
}
