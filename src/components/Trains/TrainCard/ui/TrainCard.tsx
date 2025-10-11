import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

import styles from "./TrainCard.module.scss";
import { ReactComponent as LeftArrow } from "@/assets/img/train-cards/left-arrow.svg";
import LockIcon from "@/assets/lock.png";
import { tg } from "@/constants";
import { cn } from "@/shared/utils";

type TrainCardProps = {
  index: number;
  title: string;
  image: string;
  describtion: string;
  duration: string;
  isLocked?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export const TrainCard: React.FC<TrainCardProps> = ({
  index,
  title,
  image,
  isLocked,
  className,
  style,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    tg.HapticFeedback.impactOccurred("medium");
    
    if (isLocked) {
      e.preventDefault();
      e.stopPropagation();
      navigate("/subscription");
    }
  };

  return (
    <Link
      to={index !== 0 ? `/train-page/${index}` : "/free-trains"}
      className={cn(
        styles.root,
        className,
        {
          [styles.today]: index === 0,
          [styles.hasOrnament]: index === 3,
        },
        "relative"
      )}
      onClick={handleCardClick}
      style={style}
    >
      {isLocked && (
        <div
          className={
            "!absolute top-0 left-0 right-0 bottom-0 m-auto bg-[#000000c9] w-full h-full flex justify-center items-center !z-20"
          }
        >
          <img src={LockIcon} alt="lock" className="w-[40px] h-[40px]" />
        </div>
      )}
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
