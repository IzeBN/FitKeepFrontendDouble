import styles from "./ExercisesTop.module.scss";
import { ReactComponent as TimeIcon } from "@/assets/img/train-cards/time-icon.svg";

type ExercisesTopProps = {
  isExercisePage: boolean;
  id: number;
  title: string;
  duration: number;
};
export const ExercisesTop: React.FC<ExercisesTopProps> = ({
  isExercisePage,
  title,
  duration,
}) => {
  return (
    <div className={styles.root}>
      <h2>{title}</h2>
      {!isExercisePage ? (
        <div className="train-page__duration">
          <TimeIcon />
          <span>{duration}</span>
          <span style={{ marginLeft: "5px" }}>минут</span>
        </div>
      ) : (
        <p style={{ marginTop: "0px" }}>Описание</p>
      )}
    </div>
  );
};
