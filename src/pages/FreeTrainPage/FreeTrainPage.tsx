import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import classNames from "classnames";

import { ExercisesTop, Menu, Preloader, TopNav, Workouts } from "@/components";
import {
  useCreateExercizeMutation,
  useGetFreeTrainingsQuery,
} from "@/store/trainingsApi";

import { formatScheduleDate } from "@/shared/utils/";
import { tg } from "@/constants";
import { Training } from "@/components/Trains";

export const FreeTrainPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [initData, setInitData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [training, setTraining] = useState<Training | null>(null);
  const [exercizes, setExercizes] = useState<any[] | null>(null);
  const [isDevelop, setIsDevelop] = useState(false);

  const [createExercisez] = useCreateExercizeMutation();
  const { data: freeTrainingsData } = useGetFreeTrainingsQuery(); // ✅ корректное использование query-хука

  const isExercisePage =
    location.pathname === `/train-page/${id}/exercise-page`;
  const linkPath = isExercisePage ? `/train-page/${0}` : `/free-trains`;

  useEffect(() => {
    tg.ready();
    window.scrollTo(0, 0);
    setInitData(tg.initData || null);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!initData || !id || !freeTrainingsData) return;

      try {
        const exercisesResponse = await createExercisez({
          init: initData,
          training_id: Number(id),
          training_type: "free",
        }).unwrap();

        const selectedTraining = freeTrainingsData.find(
          (item: Training) => item.id === parseInt(id)
        );

        if (!selectedTraining) {
          throw new Error("Training not found");
        }

        setTraining(selectedTraining);
        setExercizes(exercisesResponse.exercizes || []);

        if (exercisesResponse.environment !== "production") {
          setIsDevelop(true);
        }
      } catch (err) {
        console.error("Error:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initData, id, createExercisez, freeTrainingsData]);

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
          title={"Бесплатная тренировка"}
        />
        {training.title_photo !== null && (
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
            duration={Number(training.duration)}
            isExercisePage={isExercisePage}
            id={Number(id)}
          />
          <Workouts
            isDevelop={isDevelop}
            oldDate={training.schedule}
            trainingId={training.id}
            exercizes={exercizes}
            isFixed
            isFree
          />
        </div>
      </div>
    </div>
  );
};
