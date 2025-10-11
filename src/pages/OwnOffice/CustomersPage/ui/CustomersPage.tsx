import logo from "../../../../assets/img/office-logo.png";
import { FC } from "react";
import { Menu } from "../../../../widgets/menu";
import styles from "./CustomersPage.module.scss";
import { Link } from "react-router-dom";

export const CustomersPage: FC = () => {
  return (
    <div className={styles.CustomersPage} style={{ paddingTop: "20px" }}>
      <Menu activeMenu={2} />
      <div style={{ textAlign: "center" }}>
        <h3 className={styles.amount}>Клиенты</h3>
      </div>
      <div className={styles.customersList}>
        <Link to="1" className={styles.customerItem}>
          <img
            src="https://lumiere-a.akamaihd.net/v1/images/a_avatarpandorapedia_jakesully_16x9_1098_02_b13c4171.jpeg?region=340%2C0%2C1081%2C1081"
            alt="Сергей Козлов"
            className={styles.customerAvatar}
          />
          <span className={styles.customerName}>Сергей Козлов</span>
          <span className={styles.notification}>3</span>
        </Link>
      </div>
    </div>
  );
};
