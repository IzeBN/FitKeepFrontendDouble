import { ReactComponent as RightArrow } from "../../../../assets/img/right-arrow.svg";
import { FC } from "react";
import { Menu } from "../../../../widgets/menu";
import styles from "./TemplatesPage.module.scss";
import { Link } from "react-router-dom";

export const TemplatesPage: FC = () => {
  return (
    <div className={styles.TemplatesPage} style={{ paddingTop: "20px" }}>
      <Menu activeMenu={3} />
      <div style={{ textAlign: "center" }}>
        <h3 className={styles.amount}>Шаблоны</h3>
      </div>
      <nav className={styles.tabs}>
        <ul>
          <li className={styles.isActive}>Все вместе</li>
          <li>Мои шаблоны</li>
        </ul>
      </nav>
      <div className={styles.customersList}>
        <Link
          to="#"
          className={styles.customerItem}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "5px 0",
          }}
        >
          <span className={styles.customerName}>Выносливость</span>
          <RightArrow />
        </Link>
        <Link
          to="#"
          className={styles.customerItem}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "5px 0",
          }}
        >
          <span className={styles.customerName}>Сила</span>
          <RightArrow />
        </Link>
        <Link
          to="#"
          className={styles.customerItem}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "5px 0",
          }}
        >
          <span className={styles.customerName}>Гипертрофия</span>
          <RightArrow />
        </Link>
        <Link
          to="#"
          className={styles.customerItem}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "5px 0",
          }}
        >
          <span className={styles.customerName}>Сильная выносливость</span>
          <RightArrow />
        </Link>
        <Link
          to="#"
          className={styles.customerItem}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "5px 0",
          }}
        >
          <span className={styles.customerName}>Гибкость</span>
          <RightArrow />
        </Link>
      </div>
    </div>
  );
};
