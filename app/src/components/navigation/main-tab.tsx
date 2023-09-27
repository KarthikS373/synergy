import React from "react"
import clsx from "clsx"
import Link from 'next/link';

const tabs = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Proposals",
    path: "#",
  },
  {
    id: 3,
    title: "Projects",
    path: "/projects",
  },
  {
    id: 4,
    title: "Discussion",
    path: "#",
  },
]

interface TabProps {
  id: number
  title: string
  path: string
  active?: boolean
}

const Tab: React.FC<TabProps> = ({ active, id, path, title }) => {
  return (
    <div className={clsx("cursor-pointer px-8 py-4 hover:bg-gray-500/5", active ? "" : "")}>
      <li
        className={clsx(
          "relative list-none transition-all after:absolute after:-bottom-4 after:left-0 after:h-1 after:rounded-full after:bg-orange-400",
          active ? "font-semibold after:w-full" : "after:w-0"
        )}
      >
        {title}
      </li>
    </div>
  )
}

const MainTab: React.FC = () => {
  return (
    <>
      <div className="mb-6">
        <div className="flex px-6">
          {tabs.map((tab, index) => {
            return <Link href={tab.path}><Tab key={tab.id} active={index === 0} {...tab} /></Link>
          })}
        </div>
        <hr />
      </div>
    </>
  )
}

export default MainTab
