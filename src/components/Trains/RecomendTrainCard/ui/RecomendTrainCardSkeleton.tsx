import classNames from "classnames";
import styles from "./RecomendTrainCard.module.scss";

type RecomendTrainCardSkeletonProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const RecomendTrainCardSkeleton: React.FC<
  RecomendTrainCardSkeletonProps
> = ({ className, style }) => {
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
