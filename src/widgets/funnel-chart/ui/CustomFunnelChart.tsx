import React from "react";

type StepData = {
  step: string;
  users_count: number;
};

type Props = {
  data: StepData[];
  width?: number | string; // Можно число (px) или строку (например, "100%")
  heightPerStep?: number;
};

export const CustomFunnelChart: React.FC<Props> = ({
  data,
  width = 400, // число по умолчанию
  heightPerStep = 70,
}) => {
  if (!data.length)
    return <p className="text-center text-gray-500">Нет данных</p>;

  const maxCount = Math.max(...data.map((d) => d.users_count));

  // Высота SVG с добавлением 20px запаса снизу, чтобы текст не обрезался
  const height = data.length * heightPerStep + 20;

  return (
    <svg
      width={width}
      height={height}
      className="mx-auto"
      role="img"
      aria-label="Funnel Chart"
      viewBox={`0 0 ${typeof width === "number" ? width : 400} ${height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {data.map((item, i) => {
        const baseWidth = typeof width === "number" ? width : 400;
        const barWidth = (item.users_count / maxCount) * baseWidth;
        const y = i * heightPerStep;

        return (
          <g key={item.step}>
            {/* Прямоугольник */}
            <rect
              x={(baseWidth - barWidth) / 2}
              y={y + 10}
              width={barWidth}
              height={heightPerStep - 20}
              fill={`hsl(${240 - i * 20}, 60%, 70%)`}
              rx={10}
            />
            {/* Текст с количеством и процентом */}
            <text
              x={baseWidth / 2}
              y={y + heightPerStep / 2}
              fill="#000"
              fontSize={14}
              fontWeight="600"
              textAnchor="middle"
              alignmentBaseline="middle"
              className="select-none"
            >
              {item.users_count} (
              {((item.users_count / maxCount) * 100).toFixed(1)}%)
            </text>
            {/* Текст с названием шага */}
            <text
              x={baseWidth / 2}
              y={y + heightPerStep - 5}
              fill="#333"
              fontSize={12}
              textAnchor="middle"
              alignmentBaseline="hanging"
              className="select-none"
            >
              {item.step.length > 30 ? item.step.slice(0, 27) + "…" : item.step}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
