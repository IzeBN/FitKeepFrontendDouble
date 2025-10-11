import { FC } from "react";
import { AchievesProps } from "../model";
import styles from "./Achieves.module.scss";

export const Achieves: FC<AchievesProps> = ({ dummyAchieves }) => {
  return (
    <div className={styles.root}>
      {dummyAchieves.map((achieve) => (
        <div key={achieve.id} className={styles.root__item}>
          <img src={achieve.img} alt={achieve.title} />
          <p>{achieve.title}</p>
        </div>
      ))}
    </div>
  );
};
