import { FC, useEffect, useState } from "react";

import { Trains } from "@/components";
import { Training } from "@/components/Trains";
import { useCreateTrainingMutation } from "@/store/trainingsApi";
import { TrainCardSkeleton } from "@/components/Trains/TrainCard";

type FirstTrainProps = {
  initData: string | undefined;
};

export const FirstTrain: FC<FirstTrainProps> = (props) => {
  const { initData } = props;
  const [createTraining, { isLoading }] = useCreateTrainingMutation();
  const [trainings, setTrainings] = useState<Training[] | null>(null);
  const [isReadyToRender, setIsReadyToRender] = useState(false);

  const handleCreateTraining = async () => {
    if (!initData) return;

    try {
      const result = await createTraining({ init: initData }).unwrap();
      const loadedTrainings = result.trainings || [];
      setTrainings(loadedTrainings);

      // Прелоадим изображения
      const preloadImages = loadedTrainings.map((t: Training) => {
        return new Promise<void>((resolve) => {
          if (!t.title_photo || t.title_photo === "none") return resolve();
          const img = new Image();
          img.src = t.title_photo;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });

      Promise.all(preloadImages).then(() => setIsReadyToRender(true));
    } catch (err) {
      console.error("Error:", err);
      setTrainings([]);
      setIsReadyToRender(true); // чтобы не застрять на скелетоне
    }
  };

  useEffect(() => {
    handleCreateTraining();
  }, []);

  if (isLoading || !isReadyToRender) {
    return (
      <>
        <h2 className="trains__title" style={{ color: "#362f41", opacity: 0 }}>
          Ближайшая тренировка
        </h2>
        <TrainCardSkeleton />
      </>
    );
  }

  return (
    <div>{trainings && <Trains isFirstTrain trainings={trainings} />}</div>
  );
};
