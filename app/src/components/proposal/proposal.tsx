import React from "react"

import Button from "../ui/button"
import Card from "../ui/card"

interface ProposalProps {
  type: "card" | "expanded"
}

interface ExpProps {
  title?: string
}

const ProposalCard: React.FC<ExpProps> = () => {
  return (
    <Card>
      <div className="center gap-4 px-4">
        <span className="h-10 w-10 rounded-full bg-gray-500" />
        <div className="flex flex-col">
          <h1>Title of Proposal</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem, aspernatur</p>
        </div>
        <Button>Vote now</Button>
      </div>
    </Card>
  )
}

const ProposalExpanded: React.FC<ExpProps> = () => {
  return <></>
}

const Proposal: React.FC<ProposalProps> = ({ type }) => {
  if (type === "card") return <ProposalCard />

  if (type === "expanded") return <ProposalExpanded />

  return <></>
}

export default Proposal
