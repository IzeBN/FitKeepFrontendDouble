import styles from "./NoTrainsPlaque.module.scss";

import exerciseIcon from "@/assets/stretching-exercises.png";

export const NoTrainsPlaque = () => {
  return (
    <div className={styles.trainsEmpty}>
      <div className={styles.trainsEmpty__text}>
        <img src={exerciseIcon} alt="exercise-icon" />
        <h3>У вас нет тренировок</h3>
      </div>
    </div>
  );
};
