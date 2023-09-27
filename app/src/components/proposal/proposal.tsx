import React from "react"
import Link from "next/link"

import Button from "../atoms/button"
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
      <div className="center justify-between gap-4 px-4">
        <div className="center gap-8">
          <span className="h-10 w-10 rounded-full bg-gray-500/25" />
          <div className="flex flex-col">
            <h1 className="text-2xl text-black/80">Title of Proposal</h1>
            <p className="opacity-75">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem, aspernatur
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

const Proposal: React.FC<ProposalProps> = ({ type }) => {
  if (type === "card") return <ProposalCard />

  if (type === "expanded") return <ProposalExpanded />

  return <></>
}

export default Proposal
