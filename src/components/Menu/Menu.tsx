import { Link } from "react-router-dom";

import { ReactComponent as UserIcon } from "@/assets/img/menu/user-icon.svg";
import { ReactComponent as MoreIcon } from "@/assets/img/menu/more-icon.svg";
import { ReactComponent as HomeIcon } from "@/assets/img/menu/home-icon.svg";

import styles from "./Menu.module.scss";
import { tg } from "@/constants";

type MenuProps = {
  active?: number;
};

export const Menu: React.FC<MenuProps> = ({ active }) => {
  const menuTitles = ["Главная", "Тренировки", "Еще"];
  const menuIcons = [<HomeIcon />, <UserIcon />, <MoreIcon />];
  const menuLinks = ["/", "/trains", "/more"];

  const handleLinkClick = (e: React.MouseEvent) => {
    tg.HapticFeedback.impactOccurred("medium");
  };

  return (
    <div className={styles.root}>
      <div className="container">
        {menuTitles.map((item, key) => {
          return (
            <Link
              key={key}
              to={menuLinks[key]}
              className={`${styles.root__item} 
                ${active === key && "active"}`}
              onClick={handleLinkClick}
            >
              {menuIcons[key]}
              <span>{item}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
