import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import styles from "./Graphic.module.scss";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const Graphic: React.FC = () => {
  const data: ChartData<"line"> = {
    labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    datasets: [
      {
        label: "Тренировки",
        data: [5, 7, 3, 8, 4, 6, 9],
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.3)",
        pointBackgroundColor: "rgba(153,102,255,1)",
        tension: 0.1,
        pointBorderColor: "#fff",
        fill: true,
      },
      {
        label: "Достижения",
        data: [2, 3, 1, 4, 2, 3, 5],
        borderColor: "rgba(1, 187, 22, 1)",
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={styles.root}>
      <h2>Прогресс</h2>
      <Line data={data} options={options} />
    </div>
  );
};
