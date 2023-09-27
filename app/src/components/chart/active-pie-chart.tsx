import React, { useState } from "react"
import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts"

const DashboardSourceTypeActivePieChart: React.FC<any> = ({ data, value: v }) => {
  const [active, setActive] = useState(0)

  const renderActiveShape = (properties: any) => {
    const RADIAN = Math.PI / 180
    const {
      cx,
      cy,
      name,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = properties
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const d = `M${sx},${sy}L${mx},${my}L${ex},${ey}`
    const textAnchor = cos >= 0 ? "start" : "end"

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={10}
          textAnchor="middle"
          className="text-4xl font-extrabold text-black/75"
          fill={"current" || "black"}
        >
          {v}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius - 10}
          outerRadius={innerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={"#d9ecffa5"}
        />
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius}
          outerRadius={outerRadius + 10}
          fill={"#d9ecffa5"}
        />
        {active > 0 && (
          <>
            <path d={d} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
              x={ex + (cos >= 0 ? 1 : -1) * 12}
              y={ey}
              textAnchor={textAnchor}
              className="text-xs"
              fill="#333"
            >{`${name} ${value}`}</text>
            <text
              x={ex + (cos >= 0 ? 1 : -1) * 12}
              y={ey}
              dy={18}
              className="text-xs font-extralight"
              textAnchor={textAnchor}
              fill="#999"
            >
              {`(${(percent * 100).toFixed(2)}%)`}
            </text>
          </>
        )}
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={360} height={360}>
        <Pie
          activeIndex={active}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          dataKey="value"
          onMouseEnter={(_, index) => {
            setActive(index)
          }}
          onMouseLeave={() => {
            setActive(0)
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default React.memo(DashboardSourceTypeActivePieChart)
