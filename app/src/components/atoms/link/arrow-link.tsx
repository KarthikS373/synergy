import React from "react"
import Image from "next/image"
import Link from "next/link"

import ArrowRight from "../../../assets/svg/icon/arrow-right.svg"
import BlueArrowRight from "../../../assets/svg/icon/blue-arrow-right.svg"

interface ArrowLinkProperties extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  className?: string
  children: React.ReactNode
  color?: "blue" | "black"
}

const ArrowLink: React.FC<ArrowLinkProperties> = ({
  children,
  href = "#",
  color = "blue",
  ...properties
}) => {
  return (
    <Link href={href} className="" {...properties}>
      <div
        className={
          "group flex flex-row gap-2 " +
          (color === "blue" ? "text-primary-bright-blue" : "text-black")
        }
      >
        {children}
        <Image
          className="transition-all group-hover:translate-x-2"
          src={color === "blue" ? BlueArrowRight : ArrowRight}
          alt={""}
        />
      </div>
    </Link>
  )
}

export default ArrowLink
