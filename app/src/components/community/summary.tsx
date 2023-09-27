import React from "react"
import Image from "next/image"

import ChatIcon from "@/assets/svg/dashboard/cards/chat.svg"
import HomeIcon from "@/assets/svg/dashboard/cards/home.svg"
import IncidentsIcon from "@/assets/svg/dashboard/cards/incidents.svg"
import MembersIcon from "@/assets/svg/dashboard/cards/people.svg"

import DataIconTriangleCard from "@/components/atoms/card/data-icon-triangle"

const CommunitySummary = () => {
  return (
    <div className="flex flex-row flex-wrap gap-2 xl:flex-nowrap">
      <div className="grid w-full grid-cols-1 gap-1 pr-2 text-sm md:grid-cols-2 md:gap-6 md:pr-0 xl:grid-cols-4 xl:gap-4 2xl:gap-2">
        <DataIconTriangleCard
          data={[
            {
              key: "Total Projects",
              value: "108",
            },
            {
              key: "Active Projects",
              value: "7",
            },
          ]}
          color={"#ff8700"}
          icon={<Image src={HomeIcon} alt={""} />}
        />
        <DataIconTriangleCard
          data={[
            {
              key: "Total Members",
              value: "22.4k",
            },
            {
              key: "Total Reputation",
              value: "108M",
            },
          ]}
          color={"#b548c6"}
          icon={<Image src={MembersIcon} alt={""} />}
        />
        <DataIconTriangleCard
          data={[
            {
              key: "Total Proposals",
              value: "45",
            },
            {
              key: "New Proposals",
              value: "2",
            },
          ]}
          color={"#dc3434"}
          icon={<Image src={IncidentsIcon} alt={""} />}
        />
        <DataIconTriangleCard
          data={[
            {
              key: "Total Discussions",
              value: "45",
            },
            {
              key: "New Discussions",
              value: "1",
            },
          ]}
          color={"#32a7e2"}
          icon={<Image src={ChatIcon} alt={""} />}
        />
      </div>
    </div>
  )
}

export default CommunitySummary
