import styles from "./MorePageMenu.module.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { ReactComponent as RightArrow } from "@/assets/img/right-arrow.svg";
import { closeTG } from "@/shared/utils";
import { tg } from "@/constants";

type MorePageMenuProps = {
  disabled: boolean;
};

export const MorePageMenu: React.FC<MorePageMenuProps> = ({ disabled = true }) => {
  return (
    <ul className={styles.root}>
      <li
        className={classNames(styles.root__item, {
          [styles.root__item_disabled]: disabled,
        })}
        onClick={() => tg.HapticFeedback.impactOccurred("medium")}
      >
        <Link
          to={disabled ? "#" : "/equipments"}
          onClick={(e) => {
            if (disabled) e.preventDefault();
          }}
        >
          <span>
            <span className={styles.root__icon}>⚙️</span>
            <span>Настроить оборудование</span>
          </span>
          <RightArrow />
        </Link>
      </li>

      <li
        className={styles.root__item}
        onClick={() => tg.HapticFeedback.impactOccurred("medium")}
      >
        <a
          onClick={closeTG}
          href="https://t.me/FitGuid_bot?startsupport-manager"
        >
          <span>
            <span className={styles.root__icon}>👨‍💻</span>
            <span>Написать в поддержку</span>
          </span>
          <RightArrow />
        </a>
      </li>
      <li
        className={styles.root__item}
        onClick={() => tg.HapticFeedback.impactOccurred("medium")}
      >
        <a
          onClick={closeTG}
          href="https://t.me/FitGuid_bot?startsupport-trainer"
        >
          <span>
            <span className={styles.root__icon}>👋</span>
            <span>Написать тренеру</span>
          </span>
          <RightArrow />
        </a>
      </li>
    </ul>
  );
};
