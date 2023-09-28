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
      <div className="rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 px-8 py-12 mx-0 xl:mx-16 shadow">
        <div className="">
          <h1 className="text-white lg:text-3xl">Initiatives making our Ecosystem grow</h1>
          <p className="mt-4 text-white text-md lg:text-lg font-bold">
          On a quarterly basis, our crowdfunding community collectively decides on fund allocation and distribution to support community-driven projects. Explore further to discover their objectives, advancements, and the influence they're generating within our initiative.
          </p>
        </div>
      </div>

      {/* Projects */}
      <div className="mx-0 xl:mx-16 mt-12">
        <h1>Open Projects</h1>
        <p className="mt-2 opacity-75">
        Explore the open project's details and objectives
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
        <Project type={"card"} title={"Artistic Revolution"} description={"Funding a series of street art installations to promote urban creativity."} />
          <Project type={"card"} title={"Ocean Cleanup Expedition"} description={"Supporting an expedition to remove plastic waste from the world's oceans."} />
          <Project type={"card"} title={"Wildlife Conservation in Action"} description={"Crowdfunding a documentary series on efforts to protect endangered species."} />
          <Project type={"card"} title={"Food for All"} description={"Supporting a food bank's mission to provide meals to the homeless and hungry."} />
          <Project type={"card"} title={"STEM Scholarships"} description={"Providing scholarships for students pursuing science, technology, engineering, and mathematics education."} />
        </div>
        <Button className="bg-gradient-to-r from-fuchsia-600 to-pink-600 center mt-4 w-full">View More</Button>
      </div>
    </HomeLayout>
  )
}

export default HomePage
