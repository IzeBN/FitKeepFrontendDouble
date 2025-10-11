import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./FreeTrainCard.module.scss";
import { ReactComponent as LeftArrow } from "@/assets/img/train-cards/left-arrow.svg";
import { tg } from "@/constants";

type FreeTrainCardProps = {
  index: number;
  title: string;
  image: string;
  describtion: string;
  duration: string;
  className?: string;
  style?: React.CSSProperties;
};

export const FreeTrainCard: React.FC<FreeTrainCardProps> = ({
  index,
  title,
  image,
  className,
  style,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      to={`/free-train-page/${index}`}
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
