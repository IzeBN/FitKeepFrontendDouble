import { useGetEquipmentsQuery } from "../../store/equipmentsApi";
import { DumbbellSizes } from "./DumbbellSizes/DumbbellSizes";
import { Preloader } from "../Preloader/Preloader";
import { useEffect, useState } from "react";

export const Dumbbells = () => {
  const { data } = useGetEquipmentsQuery({});

  const dumbbells = data.equipments[3];
  const details = dumbbells.details;

  const [isShowPreloader, togglePreloader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      togglePreloader(false);
    }, 1000);
  }, []);

  return (
    <div className="dumbbells">
      {isShowPreloader && <Preloader />}
      <DumbbellSizes details={details} />
    </div>
  );
};
