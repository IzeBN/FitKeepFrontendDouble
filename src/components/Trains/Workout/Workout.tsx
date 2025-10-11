import { FC } from "react";

import { Link } from "react-router-dom";

import styles from "./Workout.module.scss";
import linkIcon from "@/assets/link-icon.png";
import changeIcon from "@/assets/change.png";
import { DEVELOP_START_LINK, PROD_START_LINK, tg } from "@/constants";
import { ActionButton, ActionButtonVariant } from "@/shared/ui";

type WorkoutProps = {
  id: number;
  title: string;
  image: string;
  describtion: string;
  trainingId: number;
  isDevelop: boolean;
  duration?: number;
  isFixed?: boolean;
  disabled?: boolean;
  documentation?: string;
  muscleGroup?: string;
  isFree?: boolean;
};

export const Workout: FC<WorkoutProps> = ({
  title,
  image,
  id,
  trainingId,
  isDevelop,
  isFixed,
  disabled,
  documentation,
  muscleGroup,
  isFree,
}) => {
  let link: string;

  if (!isFree) {
    link = isDevelop
      ? `${DEVELOP_START_LINK}?start=exercize-${trainingId}-${id}`
      : `${PROD_START_LINK}?start=exercize-${trainingId}-${id}`;
  } else {
    link = isDevelop
      ? `${DEVELOP_START_LINK}?start=exercize-free${trainingId}-${id}`
      : `${PROD_START_LINK}?start=exercize-free${trainingId}-${id}`;
  }

  const changeTrainDate = isDevelop
    ? `${DEVELOP_START_LINK}?start=EditSample`
    : `${PROD_START_LINK}?start=EditSample`;

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();

    tg.HapticFeedback.impactOccurred("medium");

    window.location.href = link;

    setTimeout(() => {
      tg.close();
    }, 200);
  };

  return (
    <div className="my-4">
      <Link
        to={link}
        target="_blank"
        onClick={handleLinkClick}
        className={styles.root}
        style={{
          pointerEvents: disabled ? "none" : "auto",
        }}
      >
        <h3 className={styles.root__title}>{title}</h3>
        <div className={styles.root__content}>
          <div
            className={styles.root__picture}
            style={{ position: "relative" }}
          >
            {!disabled && (
              <div
                style={{
                  position: "absolute",
                  zIndex: "30",
                  transform: "translate(-50%, -50%)",
                  top: "50%",
                  left: "50%",
                  width: "23px",
                  height: "47px",
                }}
              >
                <img
                  src={linkIcon}
                  style={{
                    width: "23px",
                    height: "47px",
                  }}
                  alt=""
                />
              </div>
            )}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: "10",
                background:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(116, 116, 116, 0.9) 100%)",
                top: "0",
                left: "0",
              }}
            ></div>
            <img src={image} alt={title} />
          </div>

          <div className={styles.root__text}>{documentation}</div>
          <div className="py-1 mt-2 px-4 bg-slate-200 rounded-[16px]">
            {muscleGroup}
          </div>
        </div>
      </Link>
      {!isFixed && (
        <ActionButton
          label="Заменить"
          icon={changeIcon}
          to={changeTrainDate}
          variant={ActionButtonVariant.Change}
          type="small"
        />
      )}
    </div>
  );
};
