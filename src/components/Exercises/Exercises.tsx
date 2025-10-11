import { ExerciseCard } from "./ExerciseCard/ExerciseCard";
import styles from "./Exercises.module.scss";
interface Exercise {
  id: number;
  title: string;
  description: string | null;
  title_photo: string; // URL строки
  video_file: string; // URL строки
  from_trainer: string | null;
  weight: number | null;
  repetitions: number;
  of_date: string; // ISO строка
  approaches: number;
  duration: number; // Длительность упражнения в минутах
  break_duration: number; // Перерыв между подходами в минутах
  load_cns: number; // Нагрузка на ЦНС (0–100%)
}
// Типизация для пропсов компонента Workouts
interface ExercisesProps {
  id: number;
  exercizes: Exercise[]; // Массив объектов Exercise
}

export const Exercises: React.FC<ExercisesProps> = ({ id, exercizes }) => {
  return (
    <div className={styles.root}>
      {exercizes.map((item, key) => {
        return (
          <ExerciseCard
            image={item.title_photo}
            duration={item.duration}
            description={item.description ? item.description : ""}
            title={item.title}
            key={key}
            id={id}
          />
        );
      })}
    </div>
  );
};
