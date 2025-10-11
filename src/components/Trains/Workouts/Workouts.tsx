import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

import { Workout } from "../Workout/Workout";
import { ChangeDateModal } from "@/features/change-date-modal";

import startIcon from "@/assets/img/start-icon.png";
import changeDateIcon from "@/assets/clock.png";
import changeIcon from "@/assets/change.png";

import { DEVELOP_START_LINK, PROD_START_LINK, tg } from "@/constants/";
import { useEditTrainingDateMutation } from "@/store/trainingsApi";
import { Exercise } from "../model";
import { ActionButton, ActionButtonVariant } from "@/shared/ui";
import { closeTG, formatToYMD } from "@/shared/utils";

type WorkoutsProps = {
  exercizes: Exercise[];
  trainingId: number;
  oldDate: string;
  isDevelop: boolean;
  isFixed?: boolean;
  isFree?: boolean;
  disabled?: boolean;
};

export const Workouts: React.FC<WorkoutsProps> = ({
  exercizes,
  trainingId,
  oldDate,
  isDevelop,
  isFixed,
  isFree,
  disabled,
}) => {
  const [initData, setInitData] = useState();
  const firstExercise = exercizes[0];

  const [startLink, setStartLink] = useState<string>();

  useEffect(() => {
    if (!isFree) {
      setStartLink(
        `${PROD_START_LINK}?start=exercize-${trainingId}-${firstExercise?.id}`
      );
    } else {
      setStartLink(
        `${PROD_START_LINK}?start=exercize-free${trainingId}-${firstExercise?.id}`
      );
    }
  }, [firstExercise?.id, isFree, trainingId]);

  const changeTrainDate = isDevelop
    ? `${DEVELOP_START_LINK}?start=EditSample`
    : `${PROD_START_LINK}?start=EditSample`;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTrainingDate, { isLoading }] = useEditTrainingDateMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDate) {
      const formattedDate = formatToYMD(selectedDate);
      const oldFormattedDate = formatToYMD(oldDate);

      await editTrainingDate({
        init: tg?.initData || "",
        trainig_id: trainingId,
        old_date: oldFormattedDate,
        new_date: formattedDate,
      });
      setIsModalOpen(false);
      toast.success("Дата успешно обновлена");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  useEffect(() => {
    if (!initData && tg?.initData) {
      setInitData(tg.initData);
    }
  }, [initData]);

  return (
    <div className="workouts">
      {isModalOpen && (
        <ChangeDateModal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}

      {!disabled && (
        <ActionButton
          label="Старт"
          icon={startIcon}
          to={startLink}
          onClick={closeTG}
        />
      )}
      {!isFixed && (
        <>
          <ActionButton
            label="Перенести"
            icon={changeDateIcon}
            onClick={() => setIsModalOpen(true)}
            variant={ActionButtonVariant.Move}
          />
        </>
      )}

      {exercizes.map((item: Exercise, index: number) => (
        <Workout
          describtion={String(item.description)}
          title={item.title}
          image={item.title_photo}
          key={index}
          id={item.id}
          trainingId={trainingId}
          isDevelop={isDevelop}
          duration={item.duration}
          isFixed={isFixed}
          disabled={disabled}
          documentation={item.documentation}
          muscleGroup={item.muscle_group}
          isFree={isFree}
        />
      ))}
    </div>
  );
};
