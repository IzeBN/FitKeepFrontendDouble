import { InventoryPlace } from "./InventoryPlace/InventoryPlace";
import { useGetEquipmentsQuery } from "../../store/equipmentsApi";
import { Preloader } from "../Preloader/Preloader";
import { useEffect, useState } from "react";

export const Inventory = () => {
  const { data } = useGetEquipmentsQuery({});
  const [isShowPreloader, togglePreloader] = useState(true);

  const inventory = data.equipments[0];
  const details = inventory.details;

  useEffect(() => {
    setTimeout(() => {
      togglePreloader(false);
    }, 1000);
  }, []);
  return (
    <div className="inventory">
      {isShowPreloader && <Preloader />}

      <InventoryPlace items={details} />
    </div>
  );
};
