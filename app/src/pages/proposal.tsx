import React from "react"

import Button from "@/components/atoms/button"

interface HomePageProps {
  path?: string
}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="mt-16 px-4 sm:px-24 md:px-36 lg:px-56">
      {/* Proposals */}
      <div className="mx-0 xl:mx-44 mt-12">
        <h1>Framework for the Use of Grant Specific Discord Channels</h1>
        <div className="lg:flex mt-4">
            <div className="lg:w-3/5">
                <p className="mt-2 text-base">
                    It would benefit the DAO to have a community-wide discussion around the use of our grant-specific Discord channels, and together, decide on a framework that specifies their intended use, allowed and prohibited content, etc.

    Some grant channels are currently underutilized or overloaded with posts that are irrelevant. We could improve transparency and information dissemination in our grants program by creating community guidelines that call for an efficient, easy-to-digest flow of important information regarding project status, updates, and a log of answers to common/frequently asked questions. I believe that by laying out clear expectations for communication between the community and grantees, we can elevate community-driven oversight of DAO projects.

    Should the DAO decide on a framework for the use of grant-specific channels?
                </p>
                <div>
                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="">
        <div className="lg:py-6">
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                  1
                </div>
              </div>
              <div className="w-px h-full bg-gray-300" />
            </div>
            <div className="pt-1 pb-8">
              <p className="mb-2 text-lg font-bold">Pre-proposal Poll</p>
              <p className="text-gray-700">
              Gather community input on important matters through a non-binding proposal to kickstart the Governance process.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                  2
                </div>
              </div>
              <div className="w-px h-full bg-gray-300" />
            </div>
            <div className="pt-1 pb-8">
              <p className="mb-2 text-lg font-bold">Draft Proposal</p>
              <p className="text-gray-700">
              Present a potential policy to the community in a structured format and formalize the discussion about the proposal’s potential impacts and implementation pathways.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                  3
                </div>
              </div>
            </div>
            <div className="pt-1 pb-8">
              <p className="mb-2 text-lg font-bold">Governance Proposal</p>
              <p className="text-gray-700">
              Finalize the decision-making process in a binding proposal by submitting a comprehensive proposal with all relevant details for implementation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
                </div>
                <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
    <div className="relative flex gap-4">
        <img src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png" className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy" />
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between">
                <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">COMMENTOR</p>
                <a className="text-gray-500 text-xl" href="#"><i className="fa-solid fa-trash"></i></a>
            </div>
            <p className="text-gray-400 text-sm">20 April 2022, at 14:88 PM</p>
        </div>
    </div>
    <p className="-mt-4 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />Maxime quisquam vero adipisci beatae voluptas dolor ame.</p>
</div>
            </div>
            <div className="lg:w-2/5 my-4">
                <div className="px-2 py-2 border-2">
                    <div>Yes</div>
                    <div>No</div>
                    <Button variant="primary" className="text-black">
                        Vote now
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
