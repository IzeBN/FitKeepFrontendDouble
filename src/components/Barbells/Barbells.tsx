import { BarbellSizes } from "./BarbellSizes/BarbellSizes";
import { GriphSizes } from "../GriphSizes/GriphSizes";
import { Preloader } from "../Preloader/Preloader";
import { useGetEquipmentsQuery } from "../../store/equipmentsApi";
import { useEffect, useState } from "react";

export const Barbells = () => {
  const { data } = useGetEquipmentsQuery({});

  const barbells = data.equipments[2];
  const details = barbells.details;

  const [isShowPreloader, togglePreloader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      togglePreloader(false);
    }, 1000);
  }, []);

  return (
    <div className="barbells">
      {isShowPreloader && <Preloader />}
      <BarbellSizes details={details} />
      <GriphSizes details={details} />
    </div>
  );
};
