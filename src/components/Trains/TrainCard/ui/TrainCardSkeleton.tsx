import classNames from "classnames";
import styles from "./TrainCard.module.scss";

type TrainCardSkeletonProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const TrainCardSkeleton: React.FC<TrainCardSkeletonProps> = ({
  className,
  style,
}) => {
  return (
    <div
      className={classNames(styles.root, styles.skeleton, className)}
      style={style}
    >
      <div className={styles.root__img} />
      <div className={styles.skeleton__title} />
      <div className={styles.skeleton__btn} />
    </div>
  );
};
