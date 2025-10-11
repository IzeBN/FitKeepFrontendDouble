import Logo from "@/assets/img/app/logo.jpg";
import ArrowUpIcon from "@/assets/img/icons/arrow-up-decorate.png";
import CloseIcon from "@/assets/close.png";
import styles from "./ShortcutAlertBanner.module.scss";
import { FC, useState } from "react";
import { cn } from "@/shared/utils";

type ShortcutAlertBannerProps = {
  className?: string;
};

export const ShortcutAlertBanner: FC<ShortcutAlertBannerProps> = (props) => {
  const { className } = props;
  const [isShowBanner, setShowBanner] = useState(true);

  const handleBanner = () => {
    setShowBanner(false);
  };

  if (!isShowBanner) {
    return null;
  }

  return (
    <div className={cn(styles.root, className)}>
      <button className={styles.root__close} onClick={handleBanner}>
        <img src={CloseIcon} alt="close icon" />
      </button>
      <img src={Logo} alt={"Fit Mentor"} className={styles.root__logo} />
      <p>Жми «добавить на экран домой», так мы точно не потеряемся</p>
      <img src={ArrowUpIcon} alt="arrow up" className={styles.root__arrow} />
    </div>
  );
};
