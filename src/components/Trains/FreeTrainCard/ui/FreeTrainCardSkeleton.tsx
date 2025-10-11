import classNames from "classnames";
import styles from "./FreeTrainCard.module.scss";

type FreeTrainCardSkeletonProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const FreeTrainCardSkeleton: React.FC<FreeTrainCardSkeletonProps> = ({
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
