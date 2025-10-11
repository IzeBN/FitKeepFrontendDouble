import logo from "../../../../assets/img/office-logo.png";
// import startPageImg from "../../../../assets/img/start-page-img.jpg";
import { FC } from "react";
import { Menu } from "../../../../widgets/menu";
import styles from "./OwnOfficeMain.module.scss";

import rightArrow from "../../../../assets/img/right-arrow.svg";

export const OwnOfficeMain: FC = () => {
  return (
    <div className={styles.OwnOfficeMain}>
      <Menu activeMenu={1} />
      <div className={styles.header}>
        <img
          src={logo}
          width={130}
          style={{ width: "130px" }}
          alt="Fit Mentor Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.dashboard}>
        <div className={styles.stats}>
          <div className={styles.earned}>
            <span className={styles.label} style={{ color: "#AAB2BD" }}>
              Заработано за всё время
            </span>
            <hr style={{ opacity: "0.2" }} />
            <h3 className={styles.amount}>252 750 ₽</h3>
            <div style={{ color: "#AAB2BD" }}>
              <span
                className={styles.growth}
                style={{
                  color: "#01BB16",
                  background: "#01BB1614",
                  borderRadius: "60px",
                  padding: "8px 14px",
                  marginRight: "10px",
                }}
              >
                ↑ 32%
              </span>
              За последний месяц
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.dashboard} style={{ marginTop: "20px" }}>
        <div className={styles.stats}>
          <div className={styles.earned}>
            <img src={startPageImg} alt="" />
            <h3 className={styles.smTitle}>
              Несколько рекомендаций для первой продажи
            </h3>
          </div>
        </div>
      </div> */}

      <div
        className={styles.sections}
        style={{ maxWidth: "400px", marginLeft: "auto", marginRight: "auto" }}
      >
        <a
          href="#"
          target="_blank"
          className={styles.section}
          style={{
            border: "none",
            padding: "25px 20px",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className={styles.sectionTitle} style={{ fontSize: "17px" }}>
              Новые запросы
            </span>
            <span
              className={styles.sectionSubtitle}
              style={{ marginLeft: 0, paddingLeft: 0 }}
            >
              Потенциальные и текущие клиенты
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              className={styles.sectionCount}
              style={{ background: "#8E5DFB" }}
            >
              2
            </span>
            <span className={styles.sectionArrow}>
              <img style={{ width: "8px" }} src={rightArrow} alt="" />
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};
