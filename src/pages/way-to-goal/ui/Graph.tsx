import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  DotProps
} from "recharts";

type GraphData = {
  date: string;
  weight: number;
};

type GraphProps = {
  data?: GraphData[];
};

// Данные по умолчанию для графика
const defaultData: GraphData[] = [
  { date: "Сегодня", weight: 0 },
  { date: "Окт. 5", weight: 0 },
  { date: "Окт. 23", weight: 0 },
  { date: "Нояб. 10", weight: 0 },
];

// Кастомная точка
const CustomDot = (props: DotProps) => {
  const { cx, cy } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill="#3164e3"
      stroke="#fff"
      strokeWidth={2}
    />
  );
};

// Кастомный тултип
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-[14px] font-medium text-[#3c3c3c]">{label}</p>
        <p className="text-[16px] font-bold text-[#3164e3]">
          {payload[0].value} кг
        </p>
      </div>
    );
  }
  return null;
};

export const Graph = ({ data = defaultData }: GraphProps) => (
  <div className="h-[400px]">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF0000" stopOpacity={0.35} />{" "}
            {/* Ярко-красный */}
            <stop offset="100%" stopColor="#3164e3" stopOpacity={0.22} />{" "}
            {/* Синий */}
          </linearGradient>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF0000" /> {/* Ярко-красный */}
            <stop offset="100%" stopColor="#3164e3" /> {/* Синий */}
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#e0e0e0' }}
          domain={['dataMin - 2', 'dataMax + 2']}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="weight"
          fill="url(#areaGradient)"
          fillOpacity={1}
          stroke="url(#lineGradient)"
          strokeWidth={3}
          dot={<CustomDot />}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
