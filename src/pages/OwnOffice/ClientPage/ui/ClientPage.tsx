import { FC } from "react";
import styles from "./ClientPage.module.scss";
import rightArrow from "../../../../assets/img/right-arrow.svg";
import backArrow from "../../../../assets/img/back-arrow.svg";
import { Link } from "react-router-dom";

const ProgressCircle = ({ percentage }: { percentage: number }) => {
  return (
    <div className={styles.progressContainer} style={{ margin: "14px auto" }}>
      <div className={styles.progressCircle}>
        <span className={styles.progressText}>{percentage}%</span>
      </div>
    </div>
  );
};

export const ClientPage: FC = () => {
  return (
    <div className={styles.ClientPage} style={{ paddingTop: "20px" }}>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <Link to={"/own-office/customers"}>
          <img src={backArrow} style={{ width: "15px" }} alt="" />
        </Link>
        <h3 className={styles.amount}>Клиент</h3>
        <span></span>
      </div>
      <div
        className={styles.user}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <img
          style={{ width: "150px", borderRadius: "500px" }}
          src="https://lumiere-a.akamaihd.net/v1/images/a_avatarpandorapedia_jakesully_16x9_1098_02_b13c4171.jpeg?region=340%2C0%2C1081%2C1081"
          alt=""
        />
        <span style={{ fontSize: "24px" }}>Сергей Козлов</span>
      </div>
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
              Запросы клиента
            </span>
            <span
              className={styles.sectionSubtitle}
              style={{ marginLeft: 0, paddingLeft: 0 }}
            >
              Цели, ограничения и предпочтения
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
      <div
        className={styles.halfBlocks}
        style={{ maxWidth: "400px", marginLeft: "auto", marginRight: "auto" }}
      >
        <div className={styles.halfBlocks__left}>
          <ProgressCircle percentage={75} />
          <span>Процент завершения тренировок</span>
        </div>
        <div className={styles.halfBlocks__right}>
          <span className={styles.achieve_green}>Достижения</span>
          <h2>136</h2>
          <span>Дней подряд</span>
        </div>
      </div>
    </div>
  );
};
