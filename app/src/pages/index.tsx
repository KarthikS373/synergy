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
      <div className="rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 px-8 py-12 mx-0 xl:mx-44 shadow">
        <div className="">
          <h1 className="text-white lg:text-3xl">Get Involved in shaping the Future of the Nation.</h1>
          <p className="mt-4 text-white text-md lg:text-lg font-bold">
          DAO is a fundamental element within the ecosystem, serving as the consensus mechanism for establishing the guidelines for Synergy's virtual world. Engage in project funding initiatives and ensure your input is acknowledged.
          </p>
        </div>
        <div className="mt-8 flex gap-4">
          <Button variant="secondary" className="group hover:translate-y-[-2px] transition-all duration-200 ease-in-out" title="Learn more" />
          <Button variant="secondary" className="group hover:translate-y-[-2px] transition-all duration-200 ease-in-out" title="View Proposals" />
        </div>
      </div>

      {/* Stats */}
      <div className="mx-0 xl:mx-44 mt-6 flex gap-4 [&>*]:flex [&>*]:grow [&>*]:flex-col [&>*]:gap-2">
        <Card className="hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:translate-y-[-2px] transition-all duration-200 ease-in-out">
          <p className="">Proposals</p>
          <h2>15 active proposals</h2>
          <p>3 ending today</p>
        </Card>
        <Card className="hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:translate-y-[-2px] transition-all duration-200 ease-in-out">
          <p className="">Proposals</p>
          <h2>15 active proposals</h2>
          <p>3 ending today</p>
        </Card>
        <Card className="hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:translate-y-[-2px] transition-all duration-200 ease-in-out">
          <p className="">Proposals</p>
          <h2>15 active proposals</h2>
          <p>3 ending today</p>
        </Card>
      </div>

      {/* Proposals */}
      <div className="mx-0 xl:mx-44 mt-12">
        <h1>Open Proposals</h1>
        <p className="mt-2 opacity-75">
        Proposals are created by the community and work as the consensus mechanism used to outline policies and changes to the Synergy's ecosystem
        </p>
        <div className="mt-6">
          <Proposal type={"card"} />
          <Proposal type={"card"} />
          <Proposal type={"card"} />
          <Proposal type={"card"} />
          <Proposal type={"card"} />
        </div>
        <Button className="bg-gradient-to-r from-fuchsia-600 to-pink-600 center mt-4 w-full">View More</Button>
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
        <Button className="bg-gradient-to-r from-fuchsia-600 to-pink-600 center mt-4 w-full">View More</Button>
      </div>

      {/* Community engagement */}
      <div className="mx-0 xl:mx-44 mt-12">
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

      {/* stats and forum links */}
      <div className="mt-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 px-8 py-12 mx-0 xl:mx-44 shadow">
        <div className="">
          <h1 className="text-white lg:text-3xl">We have so much ahead of us. The future of the Metaverse is in your hands!</h1>
          <p className="mt-4 text-white text-md lg:text-lg font-bold">
          We're on the brink of an exciting future, with the Metaverse's destiny in your hands. Your actions and creativity will shape its growth and potential. Embrace your power and influence.
          </p>
        </div>
        <div className="mt-8 flex gap-4">
          <Button variant="secondary" className="group hover:translate-y-[-2px] transition-all duration-200 ease-in-out" title="Join our Discord Channel" />
          <Button variant="secondary" className="group hover:translate-y-[-2px] transition-all duration-200 ease-in-out" title="Debate on out Forum" />
        </div>
      </div>
    </HomeLayout>
  )
}

export default HomePage
