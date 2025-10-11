import { ReactComponent as CloseIcon } from "../../../assets/img/close-icon.svg";
import styles from "./GreenPlaque.module.scss";

type GreenPlaqueProps = {
  classNames?: string;
  styles?: React.CSSProperties;
};

const GreenPlaque: React.FC<GreenPlaqueProps> = ({
  classNames,
  styles: customStyles,
}) => {
  return (
    <div
      className={styles.root + " " + classNames}
      style={{ ...styles, ...customStyles }}
    >
      <CloseIcon />
      <span>Дальше вернитесь в чат с ботом</span>
    </div>
  );
};

export default GreenPlaque;
