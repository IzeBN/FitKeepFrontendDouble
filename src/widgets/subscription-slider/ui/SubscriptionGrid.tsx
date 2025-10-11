import { FC } from "react";

import styles from "./SubscriptionGrid.module.scss";
import { SubscriptionSliderProps } from "../model/types";
import { SubcriptionSlide } from "./SubcriptionSlide";

export const SubscriptionGrid: FC<SubscriptionSliderProps> = ({
  subscriptions,
}) => {
  return (
    <div className={styles.gridContainer}>
      {subscriptions.map((tarif, index) => (
        <SubcriptionSlide
          key={tarif.id}
          tarif={tarif}
          index={index}
          currentIndex={index} // Всегда активный, так как нет слайдера
        />
      ))}
    </div>
  );
};
