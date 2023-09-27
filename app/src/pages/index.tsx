import React from "react"

import HomeLayout from "@/components/home/layout"
import Proposal from "@/components/proposal/proposal"
import Button from "@/components/ui/button"
import Card from "@/components/ui/card"

interface HomePageProps {
  path?: string
}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <HomeLayout>
      {/* Learn more card */}
      <div className="">
        <h1>Get Involved in shaping the Future of the Nation</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam odit qui aliquid
          mollitia. Nostrum odit vitae eligendi perspiciatis tenetur minima repudiandae, laboriosam
          itaque vero atque autem quasi unde a nulla adipisci exercitationem.
        </p>
        <div className="mt-4 flex gap-4">
          <Button className="group" title="Learn more" />
          <Button className="group" title="View Proposals" />
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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque suscipit error dicta
          voluptatem praesentium! Corrupti iure incidunt dolorum!
        </p>
        <div className="mt-6">
          <Proposal type={"card"} />
          <Proposal type={"card"} />
          <Proposal type={"card"} />
          <Proposal type={"card"} />
          <Proposal type={"card"} />
          <Button className="center mt-4 w-full">View More</Button>
        </div>
      </div>

      {/* Projects */}
      <div className="mt-12">
        <h1>Open Projects</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque suscipit error dicta
          voluptatem praesentium! Corrupti iure incidunt dolorum!
        </p>
        <div className="mt-6">
          <Proposal type={"card"} />
          <Proposal type={"card"} />
          <Proposal type={"card"} />
          <Proposal type={"card"} />
          <Proposal type={"card"} />
          <Button className="center mt-4 w-full">View More</Button>
        </div>
      </div>
    </HomeLayout>
  )
}

export default HomePage
