import { useEffect, useState } from "react";
import style from "./DayTrackerPlaque.module.scss";

import { Progressbar } from "@/components";
import { useGetUserProgressMutation } from "store/equipmentsApi";
import { DayStatus } from "@/components/Progressbar/module";

import weekCalendar from "@/assets/week-calendar.png";
import { DayTrackerPlaqueSkeleton } from "./DayTrackerPlaqueSkeleton";

const tg = window.Telegram.WebApp;

const TRAINING_SAMPLE_LINK = "https://t.me/FitGuid_bot?start=getTrainingSample";
const DAYS_OF_WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MAX_PROGRESS_DAYS = 7;
const NO_PROGRESS_MESSAGE = "У вас еще нет прогресса";
const GET_PROGRAM_BUTTON_TEXT = "Получить программу";

export const DayTrackerPlaque = () => {
  const [initData, setInitData] = useState<string>();
  const [progress, setProgress] = useState<{ dayStatus: DayStatus }[] | null>(
    null
  );

  const [createProgress, { isLoading }] = useGetUserProgressMutation();

  useEffect(() => {
    tg.ready();
    if (tg?.initData) {
      setInitData(tg.initData);
    }
  }, []);

  const handleCreateProgress = async () => {
    try {
      const result = await createProgress({ init: initData! }).unwrap();

      if (
        result &&
        typeof result.progres === "object" &&
        result.progres !== null
      ) {
        const formattedProgress = Object.values(result.progres).map(
          (status) => ({
            dayStatus: status as DayStatus,
          })
        );
        const truncatedProgress = formattedProgress.slice(0, MAX_PROGRESS_DAYS);
        setProgress(truncatedProgress);
      } else {
        setProgress([]);
      }
    } catch (err) {
      console.error("Error fetching user progress:", err);
      setProgress([]);
    }
  };

  useEffect(() => {
    if (initData) {
      handleCreateProgress();
    }
  }, [initData]);

  const openResume = () => {
    window.open(TRAINING_SAMPLE_LINK, "_self");
    window.Telegram.WebApp.close();
  };

  if (isLoading || progress === null) {
    // Check for null explicitly for initial loading state
    return <DayTrackerPlaqueSkeleton />;
  }

  return (
    <div className={style.root} style={{ maxHeight: "142px" }}>
      {progress.length >= 1 ? (
        <>
          <ul className="days">
            {DAYS_OF_WEEK.map((day, index) => (
              <li
                key={index}
                className={
                  new Date().getDay() === (index + 1) % DAYS_OF_WEEK.length
                    ? "active"
                    : ""
                }
              >
                {day}
              </li>
            ))}
          </ul>

          <Progressbar progress={progress} />
        </>
      ) : (
        <div
          className={style.weekCalendar}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <img src={weekCalendar} alt="week-calendar-icon" />
            <h3>{NO_PROGRESS_MESSAGE}</h3>
          </div>
          <div>
            <button className={style.weekCalendar__btn} onClick={openResume}>
              {GET_PROGRAM_BUTTON_TEXT}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};