import React, { useEffect, useState } from "react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

interface PaginationProperties {
  total: number
  current: number
  perPage?: number
  setCurrent: React.Dispatch<React.SetStateAction<number>>
  onChange?: (page: number) => void
}

const Pagination: React.FC<PaginationProperties> = ({
  total,
  perPage = 5,
  current = 0,
  setCurrent,
  onChange,
}) => {
  useEffect(() => {
    onChange?.(current)
  }, [current])

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav className="isolate inline-flex -space-x-px" aria-label="Pagination">
            <button
              onClick={() => {
                setCurrent((previous) => previous - 1)
              }}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <MdChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                aria-current="page"
                className={
                  "relative z-10 inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-black/75 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " +
                  (current === page ? "bg-primary-bright-blue text-primary-white" : "")
                }
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => {
                setCurrent((previous) => previous + 1)
              }}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <MdChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
