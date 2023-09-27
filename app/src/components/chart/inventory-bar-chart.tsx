import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts"

interface InventoryBarChartProperties {
  data: {
    name: string
    value: number
    in: number
    out: number
  }[]
}

const InventoryBarChart: React.FC<InventoryBarChartProperties> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <Tooltip
          content={(properties) => {
            if ((properties?.payload?.length || 0) > 0) {
              if (properties?.payload?.[0]?.payload) {
                const name = properties?.payload?.[0]?.payload?.name
                const inData = properties?.payload?.[0]?.payload?.in
                const outData = properties?.payload?.[0]?.payload?.out

                return (
                  <div className="borded bg-primary-white/50 flex flex-col gap-1 rounded-lg border-black px-2 py-3">
                    <h4>{name}</h4>
                    <p>In: {inData}</p>
                    <p>Out: {outData}</p>
                  </div>
                )
              }
              return <></>
            }
            return <></>
          }}
        />
        <Bar
          isAnimationActive={false}
          barSize={35}
          radius={[4, 4, 0, 0]}
          dataKey="in"
          fill="#017EFA"
        />
        <Bar
          isAnimationActive={false}
          barSize={35}
          radius={[4, 4, 0, 0]}
          dataKey="out"
          fill="#51CBFF"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default InventoryBarChart
