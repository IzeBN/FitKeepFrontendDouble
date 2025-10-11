import { FC } from "react";
import styles from "./ProgressPage.module.scss";
import { TopNav } from "components";
import { Achieves } from "./Achieves";
import { Graphic } from "./Grapic";
import { dummyAchieves } from "../../../constants";

export const ProgressPage: FC = () => {
  return (
    <div className={styles.root}>
      <TopNav
        linkPath={"/"}
        handleSetActivePage={() => null}
        title={"Прогресс"}
      />
      <div className="container">
        <h2>Мои награды</h2>

        <Achieves dummyAchieves={dummyAchieves} />
        <Graphic />
      </div>
    </div>
  );
};
