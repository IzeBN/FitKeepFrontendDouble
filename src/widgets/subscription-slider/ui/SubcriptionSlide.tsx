import { FC } from "react";

import { ActionButton } from "@/shared/ui";
import { Tarif } from "../model/types";
import { baseTarifs } from "../model/constants";

import styles from "./SubscriptionGrid.module.scss";
import IconDone from "@/assets/done.png";
import BadgeIcon from "@/assets/badge.png";
import { cn } from "@/shared/utils";

type SubcriptionSlideProps = {
  tarif: Tarif;
  index: number;
  currentIndex: number;
};

export const SubcriptionSlide: FC<SubcriptionSlideProps> = (props) => {
  const { tarif, index, currentIndex } = props;
  
  if (!tarif) {
    return null;
  }

  return (
    <div
      key={index}
      className={`${styles.slide} ${
        index === currentIndex ? "" : styles.inactive
      } ${tarif.is_trial ? styles.trialSlide : ""}`}
    >
      <h3 className={styles.title}>
        {tarif.tarif_type}
        {tarif.is_trial && (
          <span className={`ml-2 ${styles.trialBadge}`}>
            ПРОБНЫЙ
          </span>
        )}
      </h3>
      <p className="text-[14px] text-[#7E7E7E] font-[400] my-0">
        {tarif.is_trial ? `${tarif.trial_period} за ${tarif.trial_price} ₽` : tarif.period}
      </p>
      <ul>
        {tarif.features.map((feature, i) => (
          <li key={i} className="flex gap-3 items-center my-4 text-[#292929]">
            <img className="w-[20px]" src={BadgeIcon} alt="BadgeIcon" />
            <span>{feature}</span>
          </li>
        ))}
        {baseTarifs.map((feature, i) => (
          <li key={i} className="flex gap-3 items-center my-4 text-[#696969]">
            <img className="w-[20px]" src={IconDone} alt="IconDone" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <h4 className={styles.prevPrice}>{tarif.prev_price}</h4>
      <p className="text-[14px] text-[#cdcdcd] font-[400] my-0 mt-[5px]">
        {tarif.pricePerTime}
      </p>

      <ActionButton
        label={
          tarif.is_trial 
            ? `${tarif.trial_price} ₽ за ${tarif.trial_period}` 
            : `${tarif.price} ₽ ${tarif.id < 3 ? "/ мес." : ""}`
        }
        btnClassName={cn(
          "font-[700] !text-[22px] !py-[10px] !px-[40px]",
          tarif.is_trial && "!bg-green-500 hover:!bg-green-600"
        )}
        to={`/subscription/${tarif.id}`}
      />
    </div>
  );
};
