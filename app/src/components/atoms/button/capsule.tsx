import React, { useCallback, useState } from "react"
import Image from "next/image"

import DollarIcon from "../../../assets/svg/icon/currency/dollar.svg"
import EuroIcon from "../../../assets/svg/icon/currency/euro.svg"

interface CapsuleProperties {
  buttons: [React.ReactNode, React.ReactNode]
  active?: string
  inactive?: string
  parentClass?: string
  className?: string
  onChange?: Callback<number>
}

const Capsule: React.FC<CapsuleProperties> = ({
  active = "bg-[#3b82f6] text-white",
  buttons,
  className = "px-[6.5px] text-sm",
  inactive = "bg-[#dbeafe] text-primary-cool-grey ",
  onChange,
  parentClass,
}) => {
  const [selected, setSelected] = useState<0 | 1>(0)

  const getCurrency = useCallback((index: React.ReactNode, className: string) => {
    switch (index) {
      // case "$": {
      //   return <Image src={DollarIcon} className={className} alt={""} />
      //   break
      // }

      // case "€": {
      //   return <Image src={EuroIcon} className={className} alt={""} />
      //   break
      // }

      default: {
        return index
      }
    }
  }, [])

  return (
    <div className={"flex flex-row gap-0 " + parentClass}>
      <button
        onClick={() => {
          setSelected(0)
          onChange?.(0)
        }}
        className={
          "w-full rounded-l-full " +
          className +
          " " +
          (selected === 0 ? ` ${active}` : ` ${inactive}`)
        }
      >
        {getCurrency(buttons[0], selected === 0 ? ` ${active}` : ` ${inactive}`)}
      </button>
      <button
        onClick={() => {
          setSelected(1)
          onChange?.(1)
        }}
        className={
          "w-full rounded-r-full " +
          className +
          " " +
          (selected === 1 ? ` ${active}` : ` ${inactive}`)
        }
      >
        {getCurrency(buttons[1], selected === 1 ? ` ${active}` : ` ${inactive}`)}
      </button>
    </div>
  )
}

export default Capsule
