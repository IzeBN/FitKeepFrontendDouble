import styles from "./Trains.module.scss";

import { TrainCard } from "./TrainCard/";

import { formatScheduleDate, isSameDay } from "@/shared/utils/";
import { Training } from "./model";
import classNames from "classnames";

type TrainsProps = {
  trainings: Training[];
  isFirstTrain?: boolean;
  hasActiveSubscription?: boolean;
};

const today = new Date();

export const Trains: React.FC<TrainsProps> = ({
  trainings,
  isFirstTrain = false,
  hasActiveSubscription = false,
}) => {
  // Вычисляем дату через 2 недели от сегодня
  const twoWeeksFromNow = new Date(today);
  twoWeeksFromNow.setDate(today.getDate() + 7);


  const currentTrainings = trainings
    ? trainings.filter((train) => {
        const trainDate = new Date(train.schedule);
        return isSameDay(trainDate, today) || trainDate > today;
      })
    : [];

  const pastTrainings = trainings
    ? trainings.filter((train) => {
        const trainDate = new Date(train.schedule);
        return trainDate < today && !isSameDay(trainDate, today);
      })
    : [];

  return (
    <div className={styles.root}>
      {trainings && trainings.length > 0 && (
        <>
          {isFirstTrain ? (
            currentTrainings.slice(0, 1).map((train, index) => (
              <div key={index}>
                <h2
                  className={classNames("trains__title", {
                    [styles.firstTrainTitle]: isFirstTrain,
                  })}
                >
                  {isFirstTrain
                    ? "Ближайшая тренировка"
                    : formatScheduleDate(train.schedule)}
                </h2>
                <TrainCard
                  index={train.id}
                  image={String(train.title_photo)}
                  describtion="Описание"
                  duration={String(train.training_sample_id)}
                  title={train.title}
                />
              </div>
            ))
          ) : (
            <div style={{ marginTop: "25px", marginBottom: "25px" }}>
              {currentTrainings.map((train, index) => (
                <div key={index}>
                  <h2 className="trains__title">
                    {formatScheduleDate(train.schedule)}
                  </h2>
                  <TrainCard
                    index={train.id}
                    image={String(train.title_photo)}
                    describtion="Описание"
                    duration={String(train.training_sample_id)}
                    title={train.title}
                    isLocked={!hasActiveSubscription && new Date(train.schedule) > twoWeeksFromNow}
                  />
                </div>
              ))}
            </div>
          )}

          {!isFirstTrain && pastTrainings.length > 0 && (
            <div>
              <h2 className="trains__title">Неактуальные тренировки:</h2>
              {pastTrainings.map((train, index) => (
                <div key={index}>
                  <h2
                    className={"trains__title"}
                    style={{ textDecoration: "line-through", color: "#ff4b38" }}
                  >
                    {formatScheduleDate(train.schedule)}
                  </h2>
                  <div>
                    <TrainCard
                      index={train.id}
                      image={String(train.title_photo)}
                      describtion="Описание"
                      duration={String(train.training_sample_id)}
                      title={train.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
