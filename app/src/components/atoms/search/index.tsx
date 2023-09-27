import React from "react"
import Image from "next/image"

import FilterIcon from "../../../assets/svg/icon/filter.svg"

interface SearchBarProperties extends React.HTMLAttributes<HTMLInputElement> {
  filter?: boolean
  onFilter?: (event: React.MouseEvent<HTMLButtonElement>) => void
  filterIcon?: React.ReactNode
  filterDecoration?: string
  inputDecoration?: string
  prepend?: React.ReactNode
  append?: React.ReactNode
}

const SearchBar: React.FC<SearchBarProperties> = ({
  filter = false,
  onFilter,
  filterIcon,
  className,
  inputDecoration,
  filterDecoration,
  prepend,
  append,
  placeholder,
  ...properties
}) => {
  return (
    <>
      <div className={"center gap-2 rounded-lg py-1 pl-3 pr-1 " + className}>
        {prepend}
        <input
          placeholder={placeholder ?? "Search Entities"}
          className={
            "border-none bg-transparent pl-3 font-sans text-xs font-extralight outline-none ring-0 " +
            " " +
            inputDecoration
          }
          {...properties}
        />
        {filter && (
          <button onClick={onFilter} className={filterDecoration}>
            {filterIcon || (
              <Image
                className="h-8 w-8 rounded-lg bg-primary-bright-blue p-2"
                src={FilterIcon}
                alt={""}
              />
            )}
          </button>
        )}
        {append}
      </div>
    </>
  )
}

export default SearchBar
