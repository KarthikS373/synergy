import React from "react"

import MainTab from "@/components/navigation/main-tab"

interface HomeLayoutProps {
  children: React.ReactNode
  className?: string
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children, className }) => {
  return (
    <>
      <MainTab />
      <main className="mt-16 px-4 sm:px-24 md:px-36 lg:px-56">{children}</main>
    </>
  )
}

export default HomeLayout
