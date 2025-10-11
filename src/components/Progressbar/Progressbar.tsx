import style from "./Progressbar.module.scss";
import { ReactComponent as DoneIcon } from "@/assets/img/done-icon.svg";
import { ReactComponent as CancelIcon } from "@/assets/img/cancell-icon.svg";
import { FC } from "react";
import { DayStatus } from "./module";

type ProgressbarProps = {
  progress: { dayStatus: DayStatus }[];
};

export const Progressbar: FC<ProgressbarProps> = ({ progress }) => (
  <div className={style.root}>
    {progress.map((day, index) => (
      <div className={style.root__item} key={index}>
        {day.dayStatus === DayStatus.Success ? (
          <div className={style.root__done}>
            <DoneIcon />
          </div>
        ) : day.dayStatus === DayStatus.Wait ? (
          <div
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "transparent",
              borderRadius: "50%",
              border: "2px solid rgb(1 187 22)",
            }}
          ></div>
        ) : (
          <CancelIcon />
        )}
      </div>
    ))}
  </div>
);
