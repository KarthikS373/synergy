import Image from "next/image"

import HeaderIcon from "@/assets/svg/dashboard/cards/inventory.svg"

import Card from "@/components/atoms/card"
import InventoryBarChart from "@/components/chart/inventory-bar-chart"

const CommunityInventory = () => {
  return (
    <Card className="bg-primary-white h-full px-0 py-4 shadow-none">
      <div className="center mt-4 justify-start gap-2">
        <span className="center justify-start gap-2 rounded border px-1">
          <span className="h-4 w-4 rounded bg-[#017EFA]" /> Project Requirements
        </span>
        <span className="center justify-start gap-2 rounded border px-1">
          <span className="h-4 w-4 rounded bg-[#51CBFF]" /> Community Funding
        </span>
      </div>
      <div className="mt-12 h-96 w-full">
        <InventoryBarChart
          data={[
            {
              name: "Jan",
              in: Math.floor(Math.random() * 5000),
              out: Math.floor(Math.random() * 5000),
              value: Math.floor(Math.random() * 5000) + 1000,
            },
            {
              name: "Feb",
              in: Math.floor(Math.random() * 5000),
              out: Math.floor(Math.random() * 5000),
              value: Math.floor(Math.random() * 5000) + 1000,
            },
            {
              name: "Mar",
              in: Math.floor(Math.random() * 5000),
              out: Math.floor(Math.random() * 5000),
              value: Math.floor(Math.random() * 5000) + 1000,
            },
            {
              name: "Apr",
              in: Math.floor(Math.random() * 5000),
              out: Math.floor(Math.random() * 5000),
              value: Math.floor(Math.random() * 5000) + 1000,
            },
            {
              name: "May",
              in: Math.floor(Math.random() * 5000),
              out: Math.floor(Math.random() * 5000),
              value: Math.floor(Math.random() * 5000) + 1000,
            },
            {
              name: "June",
              in: Math.floor(Math.random() * 5000),
              out: Math.floor(Math.random() * 5000),
              value: Math.floor(Math.random() * 5000) + 1000,
            },
            {
              name: "July",
              in: Math.floor(Math.random() * 5000),
              out: Math.floor(Math.random() * 5000),
              value: Math.floor(Math.random() * 5000) + 1000,
            },
            {
              name: "Aug",
              in: Math.floor(Math.random() * 5000),
              out: Math.floor(Math.random() * 5000),
              value: Math.floor(Math.random() * 5000) + 1000,
            },
          ]}
        />
      </div>
    </Card>
  )
}

export default CommunityInventory
