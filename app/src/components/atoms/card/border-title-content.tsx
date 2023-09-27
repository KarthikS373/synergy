import React from "react"
import Image from "next/image"

import borderIcon from "../../../assets/svg/misc/blue-border.svg"

interface BorderTitleContentProperty {
  title?: React.ReactNode
  content?: React.ReactNode
  children?: React.ReactNode
  border?: React.ReactNode
  append?: React.ReactNode
}

const BorderTitleContent: React.FC<BorderTitleContentProperty> = ({
  content,
  children,
  border,
  title,
  append,
}) => {
  return (
    <div className="relative flex flex-row gap-2">
      {append}
      {border || <Image src={borderIcon} alt="" />}
      <div className={`flex flex-col rounded-sm`}>
        {title}
        <div className="-mt-1">{content}</div>
        {children}
      </div>
    </div>
  )
}

export default BorderTitleContent
