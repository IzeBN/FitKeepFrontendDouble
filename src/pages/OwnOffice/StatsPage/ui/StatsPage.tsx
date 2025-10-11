import logo from "../../../../assets/img/office-logo.png";
import { FC } from "react";
import { Menu } from "../../../../widgets/menu";
import styles from "./StatsPage.module.scss";

export const StatsPage: FC = () => {
  return (
    <div className={styles.StatsPage} style={{ paddingTop: "20px" }}>
      <Menu activeMenu={3} />
      <div style={{ textAlign: "center" }}>
        <h3 className={styles.amount}>Статистика</h3>
      </div>
      <div className={styles.customersList}>
        <div
          className={styles.customerItem}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className={styles.customerName}>Название операции</span>
            <span style={{ color: "#AAB2BD", fontSize: "12px" }}>
              15 марта 2025 в 11:22
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#AAB2BD",
            }}
          >
            <div style={{ color: "#01BB16" }}>+2000Р</div>
            Заработано
          </div>
        </div>
        <div
          className={styles.customerItem}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className={styles.customerName}>Название операции</span>
            <span style={{ color: "#AAB2BD", fontSize: "12px" }}>
              15 марта 2025 в 11:22
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#AAB2BD",
            }}
          >
            <div style={{ color: "#01BB16" }}>+2000Р</div>
            Заработано
          </div>
        </div>
        <div
          className={styles.customerItem}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className={styles.customerName}>Название операции</span>
            <span style={{ color: "#AAB2BD", fontSize: "12px" }}>
              15 марта 2025 в 11:22
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#AAB2BD",
            }}
          >
            <div style={{ color: "#01BB16" }}>+2000Р</div>
            Заработано
          </div>
        </div>
        <div
          className={styles.customerItem}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className={styles.customerName}>Название операции</span>
            <span style={{ color: "#AAB2BD", fontSize: "12px" }}>
              15 марта 2025 в 11:22
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#AAB2BD",
            }}
          >
            <div style={{ color: "#01BB16" }}>+2000Р</div>
            Заработано
          </div>
        </div>
        <div
          className={styles.customerItem}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className={styles.customerName}>Название операции</span>
            <span style={{ color: "#AAB2BD", fontSize: "12px" }}>
              15 марта 2025 в 11:22
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#AAB2BD",
            }}
          >
            <div style={{ color: "#01BB16" }}>+2000Р</div>
            Заработано
          </div>
        </div>
        <div
          className={styles.customerItem}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className={styles.customerName}>Название операции</span>
            <span style={{ color: "#AAB2BD", fontSize: "12px" }}>
              15 марта 2025 в 11:22
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#AAB2BD",
            }}
          >
            <div style={{ color: "#01BB16" }}>+2000Р</div>
            Заработано
          </div>
        </div>
      </div>
    </div>
  );
};
