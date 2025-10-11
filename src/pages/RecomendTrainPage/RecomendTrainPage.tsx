import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import classNames from "classnames";

import { ExercisesTop, Menu, Preloader, TopNav, Workouts } from "@/components";
import { useGetUserMutation } from "@/store/usersApi";
import { formatScheduleDate } from "@/shared/utils/";
import { tg } from "@/constants";
import { SelectSample, Training, User } from "@/entities/user";

export const RecomendTrainPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [initData, setInitData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [training, setTraining] = useState<Training | null>(null);
  const [exercizes, setExercizes] = useState<any[] | null>(null); // можно убрать позже
  const [isDevelop, setIsDevelop] = useState(false); // можно убрать позже

  const [createUser] = useGetUserMutation();

  const isExercisePage =
    location.pathname === `/train-page/${id}/exercise-page`;
  const linkPath = isExercisePage ? `/train-page/0` : `/trains`;

  const sampleID =
    Number(new URLSearchParams(location.search).get("template")) || 0;

  useEffect(() => {
    tg.ready();
    window.scrollTo(0, 0);
    setInitData(tg.initData || null);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!initData || !id) return;

      try {
        const userResponse = await createUser({ init: initData }).unwrap();
        // Получен образец тренировки

        if (
          typeof userResponse.select_samples === "string" ||
          !Array.isArray(userResponse.select_samples)
        ) {
          throw new Error("Invalid select_samples");
        }

        const selectedSample: SelectSample | undefined =
          userResponse.select_samples[sampleID - 1];
        if (!selectedSample) throw new Error("No such sample");

        const selectedTraining = selectedSample.trainings.find(
          (item) => item.training_id === Number(id)
        );
        if (!selectedTraining) throw new Error("Training not found");

        setTraining(selectedTraining);
        setExercizes(selectedTraining.exercizes); // временно, если нужен компонент Workouts
        setIsDevelop(false); // по умолчанию
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initData, id, createUser, sampleID]);

  if (isLoading) {
    return (
      <>
        <Preloader hasMenu />
        <Menu active={0} />
      </>
    );
  }

  if (error || !training) {
    return (
      <div>
        RecomendPage (ошибка или нет данных)
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
          title={"Просмотр тренировки"}
        />
        {training.title_photo !== "none" && training.title_photo && (
          <div className="train-page__picture">
            <img src={training.title_photo} alt={training.title} />
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
            duration={Number(training.training_duration || 15)}
            id={Number(id)}
          />
          <Workouts
            isDevelop={isDevelop}
            oldDate={formatScheduleDate(String(new Date()))}
            trainingId={training.training_id}
            exercizes={exercizes || []}
            isFixed
            disabled
          />
        </div>
      </div>
    </div>
  );
};
