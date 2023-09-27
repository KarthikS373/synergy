import React from "react"
import Image from "next/image"

import HeaderIcon from "@/assets/svg/dashboard/cards/source-type.svg"
import CalendarIcon from "@/assets/svg/misc/calendar.svg"

import Capsule from "@/components/atoms/button/capsule"
import Card from "@/components/atoms/card"
import CommunitySourceActivePieChart from "@/components/chart/active-pie-chart"

const CHART_DATA = [
  { name: "", value: 0, fill: "" },
  { name: "Collected", value: 52_000, fill: "#51cbff" },
  { name: "Pending", value: 26_000, fill: "#017efb" },
  { name: "Project Budgets", value: 78_000, fill: "#b6e9ff" },
]

const CommunitySource: React.FC<any> = ({ chart = CHART_DATA }) => {
  const total = chart.reduce((a: number, b: any) => a + b.value, 0)

  return (
    <Card className="bg-primary-white w-full px-0 py-4 shadow-none">
      <div className="mt-2 flex w-full flex-row items-center justify-between px-4">
        <div className="flex flex-col items-start">
          <h3 className="font-semibold">Summary</h3>
          <p className="text-primary-cool-grey mt-1 flex flex-row gap-2 text-xs">
            <Image src={CalendarIcon} alt={""} />
            From 01 - 26 Sept 2023
          </p>
        </div>
        <Capsule buttons={["$", "€"]} parentClass="h-6 w-16" />
      </div>
      <div className="h-64">
        <CommunitySourceActivePieChart data={CHART_DATA} value={"17k"} />
      </div>
      <div className="flex flex-col gap-4 px-4">
        {CHART_DATA.map(
          (item, index) =>
            index > 0 && (
              <div key={index} className="flex w-full flex-row items-center justify-between">
                <div className="center gap-3">
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{
                      background: item.fill,
                    }}
                  />
                  <p>{item.name}</p>
                </div>
                <div className="center gap-4">
                  <h3 className="font-semibold">{item.value.toLocaleString("en-US")}</h3>
                  <span className="center bg-primary-pale-blue/25 text-primary-bright-blue h-8 w-8 rounded-full p-1 text-[10px] font-semibold">
                    {((item.value / total) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            )
        )}
      </div>
    </Card>
  )
}

export default CommunitySource
