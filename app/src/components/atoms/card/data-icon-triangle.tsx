import React from "react"

interface DataIconTriangleCardProperties extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  data: {
    key: string
    value: string
  }[]
  field?: React.ReactNode
  color?: string
  logoDecoration?: string
  titleDecoration?: string
  contentDecoration?: string
}

const DataIconTriangleCard: React.FC<DataIconTriangleCardProperties> = ({
  icon,
  data,
  className,
  field,
  color = "",
  logoDecoration = "",
  titleDecoration = "",
  contentDecoration = "",
}) => {
  return (
    <div
      className={`relative flex min-h-[145px] cursor-pointer flex-col justify-between transition-all duration-300 hover:scale-105 hover:drop-shadow-md md:min-h-[160px] xl:min-h-min ${className}`}
    >
      <div className="absolute right-[10%] scale-90 xl:hidden">{field}</div>
      <div className="border-stroke h-full rounded-lg border bg-white px-3 py-4 shadow-sm xl:h-40">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${logoDecoration}`}
        >
          {icon}
        </div>
        <div className="relative mt-4 flex w-full items-end justify-between gap-3">
          {data.map((item, index) => {
            return (
              <div key={item.value} className="w-1/2">
                <h4
                  className={`text-sm tracking-widest text-primary-cool-grey md:whitespace-break-spaces xl:w-1/2 ${titleDecoration}`}
                >
                  {item.key}
                </h4>
                <span className={`whitespace-nowrap text-base font-semibold ${contentDecoration}`}>
                  {item.value}
                </span>
              </div>
            )
          })}
          <div className="absolute bottom-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18.829"
              height="18.829"
              viewBox="0 0 18.829 18.829"
            >
              <g id="bottom" transform="translate(-461.294 -929.283)">
                <path
                  d="M0,18.829H18.829V0Z"
                  transform="translate(461.294 929.283)"
                  fill={color || "#ff8700"}
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataIconTriangleCard
