import React from "react"

import Button from "../ui/button"
import Card from "../ui/card"
import ProgressBar from "../ui/progressbar"

interface ProjectProps {
  type: "card" | "expanded"
  title?: string,
  description?: string
}

interface ExpProps {
  title?: string
  description?: string
}

const ProjectCard: React.FC<ExpProps> = ({title, description}) => {
  const rd = Math.random()

  return (
    <Card>
      <div className="center justify-between text-xs">
        <div className="center gap-4">
          <span className="rounded-full bg-orange-500/50 px-2 py-0.5 text-[8px] text-white">
            Category
          </span>
          <p>Budget: Rs 10,000</p>
        </div>
        <div className="flex gap-4">
          <p>Proposed by: Sam</p>
        </div>
      </div>
      <div className="font-bold text-xl mt-3 w-4/5">
      {title}: {description}
      </div>
      <div className="mt-12 md:mt-2">
        <div className="mt-4 flex items-center justify-between">
          <span className="flex flex-col items-baseline lg:flex-row lg:gap-2">
            <h2 className="whitespace-nowrap text-xl font-semibold">
              Raised Rs: {Math.ceil(rd * 100_000 + 500)}
            </h2>
            <span className="text-xs lg:text-sm">
              ({rd > 0.5 ? "High Priority" : "Cliff Period"})
            </span>
          </span>
          <span className="flex flex-col items-end justify-end lg:flex-row lg:items-baseline lg:gap-2">
            <div className="text-alpha-dock-light text-sm"></div>
            <div className="text-alpha-dock-light text-sm">
              {Math.ceil(Math.random() * 10 + 12)} days to go
            </div>
          </span>
        </div>
        <ProgressBar className="mt-1.5" progress={rd} />
      </div>
    </Card>
  )
}

const ProjectExpanded: React.FC<ExpProps> = () => {
  return <></>
}

const Project: React.FC<ProjectProps> = ({ type, title, description }) => {
  if (type === "card") return <ProjectCard title={title} description={description} />

  if (type === "expanded") return <ProjectExpanded />

  return <></>
}

export default Project
