import style from "./TopNav.module.scss";

import { ReactComponent as BackArrow } from "@/assets/img/back-arrow.svg";
import { Link } from "react-router-dom";
import { tg } from "@/constants";
type TopNavProps = {
  title: string;
  activePage?: number;
  linkPath?: string;
  handleSetActivePage: (page: number) => void;
  backArrowNoAvailable?: boolean;
};

export const TopNav: React.FC<TopNavProps> = ({
  title,
  activePage = 0,
  linkPath,
  handleSetActivePage,
  backArrowNoAvailable,
}) => {
  return (
    <div className={style.root}>
      {activePage === 0 ? (
        <Link
          to={String(linkPath)}
          className={style.root__arrow}
          onClick={() => tg.HapticFeedback.impactOccurred("medium")}
          style={{
            opacity: backArrowNoAvailable ? 0 : 1,
            visibility: backArrowNoAvailable ? "hidden" : "visible",
          }}
        >
          <BackArrow />
        </Link>
      ) : (
        <div
          onClick={() => handleSetActivePage(0)}
          className={style.root__arrow}
        >
          <BackArrow />
        </div>
      )}

      <div className={style.root__title}>{title}</div>
      <div style={{ opacity: 0, userSelect: "none" }}>Right S</div>
    </div>
  );
};
