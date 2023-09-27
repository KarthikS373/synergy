import React from "react"

import Button from "@/components/atoms/button"
import CommunityInventory from "@/components/community/inventory"
import CommunitySource from "@/components/community/source"
import CommunitySummary from "@/components/community/summary"
import HomeLayout from "@/components/home/layout"
import Project from "@/components/project/project"
import Proposal from "@/components/proposal/proposal"
import Card from "@/components/ui/card"

interface HomePageProps {
  path?: string
}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <HomeLayout>
      {/* Learn more card */}
      <div className="rounded-xl bg-orange-500/75 px-8 py-12 shadow">
        <div className="w-2/3">
          <h1 className="w-4/5">Get Involved in shaping the Future of the Nation</h1>
          <p className="mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam odit qui aliquid
            mollitia. Nostrum odit vitae eligendi perspiciatis tenetur minima repudiandae,
            laboriosam itaque vero atque autem quasi unde a nulla adipisci exercitationem.
          </p>
        </div>
        <div className="mt-4 flex gap-4">
          <Button variant="secondary" className="group" title="Learn more" />
          <Button variant="secondary" className="group" title="View Proposals" />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 flex w-full gap-4 [&>*]:flex [&>*]:grow [&>*]:flex-col [&>*]:gap-2">
        <Card className="">
          <p className="">Proposals</p>
          <h2>15 active proposals</h2>
          <p>3 ending today</p>
        </Card>
        <Card className="">
          <p className="">Proposals</p>
          <h2>15 active proposals</h2>
          <p>3 ending today</p>
        </Card>
        <Card className="">
          <p className="">Proposals</p>
          <h2>15 active proposals</h2>
          <p>3 ending today</p>
        </Card>
      </div>

      {/* Proposals */}
      <div className="mt-12">
        <h1>Open Proposals</h1>
        <p className="mt-2 opacity-75">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque suscipit error dicta
          voluptatem praesentium! Corrupti iure incidunt dolorum!
        </p>
        <div className="mt-6">
          <Proposal type={"card"} />
          <Proposal type={"card"} />
          <Proposal type={"card"} />
          <Proposal type={"card"} />
          <Proposal type={"card"} />
        </div>
        <Button className="center mt-4 w-full">View More</Button>
      </div>

      {/* Projects */}
      <div className="mt-12">
        <h1>Open Projects</h1>
        <p className="mt-2 opacity-75">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque suscipit error dicta
          voluptatem praesentium! Corrupti iure incidunt dolorum!
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Project type={"card"} />
          <Project type={"card"} />
          <Project type={"card"} />
          <Project type={"card"} />
          <Project type={"card"} />
        </div>
        <Button className="center mt-4 w-full">View More</Button>
      </div>

      {/* Community engagement */}
      <div className="mt-12">
        <h1>Community Engagement</h1>
        <p className="mt-2 opacity-75">
          See the participation signal from the community and understand the basic health stats from
          the community
        </p>
        <div className="mt-4">
          <CommunitySummary />
        </div>
        <div className="center mt-12 flex-col flex-wrap gap-4 lg:gap-2 xl:grid xl:grid-cols-6">
          <div className="w-full px-1.5 md:px-0 xl:col-span-2">
            <CommunitySource />
          </div>
          <div className="w-[95%] md:w-full lg:col-span-4">
            <CommunityInventory />
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default HomePage
