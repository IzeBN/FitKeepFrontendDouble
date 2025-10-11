import React from "react";
import styles from "./WeekAchieve.module.scss";
import { DayTrackerPlaque } from "components";

export const WeekAchieve: React.FC = () => {
  return (
    <div className={styles.root}>
      <h2>Достижения</h2>
      <div className={styles.root__green_plaque}>
        16-часовое ежедневное голодание минимум 5 дней
      </div>
      <DayTrackerPlaque />
    </div>
  );
};
