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
          <h1 className="text-white lg:text-3xl">Get Involved in shaping the Future of the Nation</h1>
          <p className="mt-4 text-white text-md lg:text-lg font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam odit qui aliquid
            mollitia. Nostrum odit vitae eligendi perspiciatis tenetur minima repudiandae,
            laboriosam itaque vero atque autem quasi unde a nulla adipisci exercitationem.
          </p>
        </div>
        <div className="mt-8 flex gap-4">
          <Button variant="secondary" className="group hover:translate-y-[-2px] transition-all duration-200 ease-in-out" title="Learn more" />
          <Button variant="secondary" className="group hover:translate-y-[-2px] transition-all duration-200 ease-in-out" title="View Proposals" />
        </div>
      </div>

      {/* Projects */}
      <div className="mx-0 xl:mx-44 mt-12">
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
    </HomeLayout>
  )
}

export default HomePage
