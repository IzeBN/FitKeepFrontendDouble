import styles from "./Plaque.module.scss";

import { ReactComponent as RightArrow } from "@/assets/img/right-arrow.svg";
import { cn } from "@/shared/utils";
import { Link } from "react-router-dom";

type PlaqueProps = {
  title: string;
  text?: string;
  link?: string;
  onClick?: () => void;
};

export const Plaque: React.FC<PlaqueProps> = ({ title, text, link = "", onClick }) => {
  const content = (
    <div 
      className={cn(styles.root, [
        { "pointer-events-none": text === "..." },
        { "cursor-pointer": onClick && !link }
      ])}
      onClick={onClick && !link ? onClick : undefined}
    >
      <div className={styles.root__title}>{title}</div>
      <div className={cn(styles.root__days, "items-center")}>
        <span style={{ whiteSpace: 'pre-line' }}>{text}</span>
        {(link || onClick) && <RightArrow />}
      </div>
    </div>
  );

  if (link && link !== "") {
    return <Link to={link}>{content}</Link>;
  }

  return content;
};
