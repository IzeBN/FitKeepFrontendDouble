import { ReactComponent as TimeIcon } from "../../../assets/img/train-cards/time-icon.svg";
import { Link } from "react-router-dom";
import styles from "./ExerciseCard.module.scss";

interface ExerciseCardProps {
  id: number;
  title: string;
  description: string;
  duration: number;
  image: string;
}
export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  id,
  title,
  description,
  duration,
  image,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.root_img}>
        {id !== 3 && <img src={image} alt="" />}
      </div>
      <h4 className={styles.root_title}>{title}</h4>
      <p>{description}</p>
      <div className="train-page__duration">
        <TimeIcon />
        <span>{duration} мин</span>
      </div>
    </div>
  );
};
