import React from "react"
import clsx from "clsx"
import { Poppins } from "next/font/google"
import { ToastContainer } from "react-toastify"

import { UserProvider } from "@/providers/user-context"

import Footer from "./footer"
import Header from "./header"

const poppins = Poppins({
  fallback: ["sans-serif"],
  weight: ["300", "400", "500", "600", "700"],
  preload: false,
})

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div {...poppins}>
      <UserProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme="light"
        />
        <Header />
        <main className={clsx("font-poppins", className)}>{children}</main>
        <Footer />
      </UserProvider>
    </div>
  )
}

export default Layout
