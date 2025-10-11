import styles from "./Menu.module.scss";
import { Link } from "react-router-dom";

import { ReactComponent as HouseIcon } from "@/assets/img/menu-icons/house.svg";
import { ReactComponent as UserIcon } from "@/assets/img/menu-icons/user.svg";
import { ReactComponent as BarbellIcon } from "@/assets/img/menu-icons/dumbell.svg";
import { ReactComponent as DocsIcon } from "@/assets/img/menu-icons/docs.svg";
import { ReactComponent as WhiteBarbellIcon } from "@/assets/img/menu-icons/white-dumbell.svg";

type MenuType = {
  activeMenu: number;
};

export const Menu: React.FC<MenuType> = ({ activeMenu }) => {
  return (
    <div className={styles.menu}>
      <ul className={styles.menuList}>
        <li
          className={styles.menuItem}
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
            backgroundColor: activeMenu === 1 ? "#8E5DFB" : "transparent",
            color: activeMenu === 1 ? "#FFF" : "#000",
            borderRadius: activeMenu === 1 ? "100px" : "0",
            cursor: "pointer",
            transition: "0.2s ease opacity",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <Link
            to="/own-office"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <HouseIcon
              style={{
                filter: activeMenu === 1 ? "invert(1)" : "none",
              }}
            />
            {activeMenu === 1 && <span>Главная</span>}
          </Link>
        </li>
        <li
          className={styles.menuItem}
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
            backgroundColor: activeMenu === 2 ? "#8E5DFB" : "transparent",
            color: activeMenu === 2 ? "#FFF" : "#000",
            borderRadius: activeMenu === 2 ? "100px" : "0",
            cursor: "pointer",
            transition: "0.2s ease opacity",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <Link
            to="/own-office/customers"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <UserIcon
              style={{
                filter: activeMenu === 2 ? "invert(1)" : "none",
              }}
            />
            {activeMenu === 2 && <span>Клиенты</span>}
          </Link>
        </li>
        <li
          className={styles.menuItem}
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
            backgroundColor: activeMenu === 3 ? "#8E5DFB" : "transparent",
            color: activeMenu === 3 ? "#FFF" : "#000",
            borderRadius: activeMenu === 3 ? "100px" : "0",
            cursor: "pointer",
            transition: "0.2s ease opacity",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <Link
            to="/own-office/stats"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {activeMenu === 3 ? (
              <WhiteBarbellIcon />
            ) : (
              <BarbellIcon
                style={{
                  filter: "none",
                }}
              />
            )}

            {activeMenu === 3 && <span>Шаблоны</span>}
          </Link>
        </li>
        <li
          className={styles.menuItem}
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
            backgroundColor: activeMenu === 4 ? "#8E5DFB" : "transparent",
            color: activeMenu === 4 ? "#FFF" : "#000",
            borderRadius: activeMenu === 4 ? "100px" : "0",
            cursor: "pointer",
            transition: "0.2s ease opacity",
            pointerEvents: "none",
            opacity: "0.5",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <Link
            to="/recomend-template/1"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <DocsIcon
              style={{
                filter: activeMenu === 4 ? "invert(1)" : "none",
              }}
            />
            {activeMenu === 4 && <span>Шаблон</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};
