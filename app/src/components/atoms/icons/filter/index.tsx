import React, { useState } from "react"
import Image from "next/image"

import FilterIcon from "../../../../assets/svg/icon/filter/filter.svg"
import FilterDownIcon from "../../../../assets/svg/icon/filter/filter-down.svg"
import FilterUpIcon from "../../../../assets/svg/icon/filter/filter-up.svg"

const Filters = {
  up: FilterUpIcon,
  filter: FilterIcon,
  down: FilterDownIcon,
}

interface FilterProperties {
  className?: string
  state: "up" | "filter" | "down"
}

const Filter: React.FC<FilterProperties> = ({ state, className }) => {
  return <Image src={Filters[state]} alt={""} className={"w-1.5 " + className} />
}

export default Filter
