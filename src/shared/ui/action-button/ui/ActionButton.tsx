import { cn } from "@/shared/utils";
import { ActionButtonVariant } from "../model";
import styles from "./ActionButton.module.scss";
import { Link } from "react-router-dom";

type IconPosition = "left" | "right";

type ActionButtonProps = {
  label: string;
  icon?: string;
  onClick?: () => void;
  to?: string;
  variant?: ActionButtonVariant;
  type?: "small";
  btnClassName?: string;
  isBig?: boolean;
  isWhiteIcon?: boolean;
  iconPosition?: IconPosition;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
  to = "#",
  variant = ActionButtonVariant.Default,
  type,
  isBig,
  isWhiteIcon,
  btnClassName,
  iconPosition = "left",
}) => {
  const className =
    styles.startBtn +
    (variant === ActionButtonVariant.Move ? ` ${styles.moveBtn}` : "") +
    (variant === ActionButtonVariant.Cancel ? ` ${styles.cancelBtn}` : "") +
    (variant === ActionButtonVariant.Change ? ` ${styles.changeBtn}` : "") +
    (type === "small" ? ` ${styles.small}` : "");

  const iconElement = icon && (
    <img
      src={icon}
      className={styles.root__button__icon}
      style={{ filter: isWhiteIcon ? "invert(0)" : "" }}
      alt=""
    />
  );

  return (
    <Link
      className={cn(className, isBig ? ` ${styles.big}` : "", btnClassName)}
      to={to}
      onClick={onClick}
    >
      {iconPosition === "left" && iconElement}
      <span>{label}</span>
      {iconPosition === "right" && iconElement}
    </Link>
  );
};
