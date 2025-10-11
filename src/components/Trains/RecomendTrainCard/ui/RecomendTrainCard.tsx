import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./RecomendTrainCard.module.scss";
import { ReactComponent as LeftArrow } from "@/assets/img/train-cards/left-arrow.svg";
import { tg } from "@/constants";

type RecomendTrainCardProps = {
  index: number;
  title: string;
  image: string;
  describtion: string;
  duration: string;
  className?: string;
  style?: React.CSSProperties;
  trainingId?: number;
  templateId?: number;
};

export const RecomendTrainCard: React.FC<RecomendTrainCardProps> = ({
  index,
  title,
  image,
  className,
  style,
  trainingId,
  templateId,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      to={`/recomend-train-page/${trainingId}?template=${templateId}`}
      className={classNames(styles.root, className, {
        [styles.today]: index === 0,
        [styles.hasOrnament]: index === 3,
      })}
      onClick={() => tg.HapticFeedback.impactOccurred("medium")}
      style={style}
    >
      <div className={styles.root__img}>
        {!isImageLoaded && <div className={styles.imgSkeleton} />}
        {image !== "none" && (
          <img
            src={image}
            alt={`train-card-image-${index}`}
            onLoad={() => setIsImageLoaded(true)}
            className={classNames(styles.image, {
              [styles.imageVisible]: isImageLoaded,
            })}
          />
        )}
      </div>

      {title && title !== "" && (
        <div
          className={styles.root__title}
          style={{ minHeight: "23px", maxHeight: "23px" }}
        >
          {title}
        </div>
      )}

      {index === 0 && (
        <div className={styles.root__btn + " main-btn"}>
          <LeftArrow />
          <span>Попробовать</span>
        </div>
      )}
    </Link>
  );
};
