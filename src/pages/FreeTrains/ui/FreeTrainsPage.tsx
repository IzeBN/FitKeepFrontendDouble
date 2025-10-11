import { Menu, Preloader } from "@/components";
import { FreeTrains } from "@/components/Trains";
import { useGetFreeTrainingsQuery } from "@/store/trainingsApi";
import style from "./FreeTrainsPage.module.scss";

export const FreeTrainsPage = () => {
  const { data: freeTrains, isLoading } = useGetFreeTrainingsQuery();

  if (isLoading) {
    return (
      <>
        <Menu active={1} />
        <Preloader hasMenu />
      </>
    );
  }

  return (
    <div className={style.root + " container"}>
      <FreeTrains trainings={freeTrains || []} />
      <Menu active={1} />
    </div>
  );
};
