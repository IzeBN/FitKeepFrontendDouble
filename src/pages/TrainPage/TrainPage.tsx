import React, { FC, useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import classNames from "classnames";

import { ExercisesTop, Menu, Preloader, TopNav, Workouts } from "@/components";
import {
  useCreateExercizeMutation,
  useCreateTrainingMutation,
} from "@/store/trainingsApi";

import { formatScheduleDate } from "@/shared/utils/";
import { tg } from "@/constants";

type Training = {
  id: number;
  title: string;
  title_photo: string;
  duration: number;
  schedule: string;
};

type TrainPageProps = {
  initData: string;
};

export const TrainPage: FC<TrainPageProps> = (props) => {
  const { initData } = props;
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [training, setTraining] = useState<Training | null>(null);
  const [exercizes, setExercizes] = useState<any[] | null>(null);
  const [isDevelop, setIsDevelop] = useState(false);

  const [createExercisez] = useCreateExercizeMutation();
  const [createTraining] = useCreateTrainingMutation();

  const isExercisePage =
    location.pathname === `/train-page/${id}/exercise-page`;
  const linkPath = isExercisePage ? `/train-page/0` : `/trains`;

  useEffect(() => {
    tg.ready();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!initData || !id) return;

      try {
        const [exercisesResponse, trainingResponse] = await Promise.all([
          createExercisez({
            init: initData,
            training_id: Number(id),
            training_type: "schedule",
          }).unwrap(),
          createTraining({ init: initData }).unwrap(),
        ]);

        const trainings = trainingResponse.trainings || [];
        const selectedTraining = trainings.find(
          (item: Training) => item.id === parseInt(id)
        );

        if (!selectedTraining) {
          throw new Error("Training not found");
        }

        setTraining(selectedTraining);
        const loadedExercises = exercisesResponse.exercizes || [];
        setExercizes(loadedExercises);

        if (exercisesResponse.environment !== "production") {
          setIsDevelop(true);
        }

        const openFirstTrain = searchParams.get("openFirstTrain");
        if (openFirstTrain === "true" && loadedExercises.length > 0) {
          const firstExerciseId = loadedExercises[0].id;
          const trainingId = selectedTraining.id;
          const tgLink = `https://t.me/FitGuid_bot?start=exercize-${trainingId}-${firstExerciseId}`;
          window.location.href = tgLink;
          tg.close();
        }
      } catch (err) {
        console.error("Error:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initData, id, createExercisez, createTraining, searchParams, navigate]);

  if (isLoading) {
    return (
      <>
        <Preloader hasMenu />
        <Menu active={0} />
      </>
    );
  }

  if (!training || !exercizes) {
    return (
      <div>
        <Menu active={0} />
      </div>
    );
  }

  return (
    <div className="train-page">
      <div className="container" style={{ position: "relative" }}>
        <TopNav
          linkPath={linkPath}
          handleSetActivePage={() => null}
          title={formatScheduleDate(training.schedule)}
        />
        {training.title_photo !== "none" && (
          <div className="train-page__picture">
            <img src={training.title_photo} alt="" />
          </div>
        )}
        <div
          className={classNames("exercises", {
            "no-image": training.title_photo === "none",
          })}
        >
          <ExercisesTop
            title={training.title}
            isExercisePage={isExercisePage}
            duration={training.duration}
            id={Number(id)}
          />
          <Workouts
            isDevelop={isDevelop}
            oldDate={training.schedule}
            trainingId={training.id}
            exercizes={exercizes}
          />
        </div>
      </div>
    </div>
  );
};
