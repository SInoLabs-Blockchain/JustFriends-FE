import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  {
    profit: 500000,
    time: "06/23/2023",
  },
  {
    profit: 410000,
    time: "06/24/2023",
  },
  {
    profit: 220000,
    time: "06/25/2023",
  },
  {
    profit: 630000,
    time: "06/26/2023",
  },
  {
    profit: 850000,
    time: "06/27/2023",
  },
  {
    profit: 690000,
    time: "06/28/2023",
  },
  {
    profit: 300000,
    time: "06/29/2023",
  },
];

const CustomLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <defs>
          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3E97FF" />
            <stop offset="100%" stopColor="#3E97FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          height={60}
          axisLine={{ stroke: "#ffff" }}
          tickLine={{ stroke: "#ffff" }}
          tick={{
            fontFamily: "Gilroy",
            fontSize: 14,
            fill: "#031D3C",
          }}
          tickMargin={16}
        />
        <YAxis
          axisLine={{ stroke: "#ffff" }}
          tickLine={{ stroke: "#ffff" }}
          tick={{
            fontFamily: "Gilroy",
            fontSize: 14,
            fill: "#031D3C",
          }}
          tickMargin={16}
        />
        <Tooltip />
        <Line
          type="monotone"
          dot={false}
          dataKey="profit"
          stroke="#3E97FF"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="profit"
          stroke="#3E97FF"
          strokeWidth={2}
          fillOpacity={0.16}
          fill="url(#colorProfit)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
