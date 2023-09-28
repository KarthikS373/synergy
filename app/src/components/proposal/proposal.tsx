import React from "react"
import Link from "next/link"

import Button from "../atoms/button"
import Card from "../ui/card"

interface ProposalProps {
  type: "card" | "expanded",
  title?: string,
  description?: string
}

interface ExpProps {
  title?: string
  description?: string
}

const ProposalCard: React.FC<ExpProps> = ({title, description}) => {
  return (
    <Card>
      <div className="center justify-between gap-4 px-4">
        <div className="center gap-8">
          <span className="h-10 w-10 rounded-full bg-gray-500/25" />
          <div className="flex flex-col">
            <h1 className="text-2xl text-black/80">{title}</h1>
            <p className="opacity-75">
              {description}
            </p>
          </div>
        </div>
        <Link href="/proposal">
          <Button variant="primary" className="bg-gradient-to-r from-fuchsia-600 to-pink-600 text-black">
            Vote now
          </Button>
        </Link>
      </div>
    </Card>
  )
}

const ProposalExpanded: React.FC<ExpProps> = () => {
  return <></>
}

const Proposal: React.FC<ProposalProps> = ({ type, title, description }) => {
  if (type === "card") return <ProposalCard title={title} description={description} />

  if (type === "expanded") return <ProposalExpanded />

  return <></>
}

export default Proposal
