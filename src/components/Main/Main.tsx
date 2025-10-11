import { FC, useEffect, useState } from "react";

import styles from "./Main.module.scss";

import { Menu } from "@/components/Menu/";
import { Plaque } from "@/components/Main/Plaque/";
import { DayTrackerPlaque } from "@/widgets/day-tracker-plaque/";
import { tg } from "@/constants";
import { TrainCard } from "@/components/Trains/TrainCard";
import { FirstTrain } from "@/widgets/first-train";
import { ShortcutAlertBanner } from "@/widgets";
import { User } from "@/entities/user";
import { UserStatus } from "@/pages/TrainsPage/TrainsPage";

const MAIN_MENU_ACTIVE_ITEM = 0;
const PROGRESS_PAGE_LINK = "/progress-page";
const PROGRESS_TITLE = "Ваш прогресс";

type MainProps = {
  user: User;
};

export const Main: FC<MainProps> = (props) => {
  const { user } = props;
  const [initData, setInitData] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!initData) {
      tg.expand();
      tg.ready();
      setInitData(tg?.initData);
    }
  }, [initData]);

  let isShowFirstTrain = false;

  if (
    user?.select_samples === UserStatus.REQUIRED_ANCET ||
    (Array.isArray(user?.select_samples) && user.select_samples.length > 0)
  ) {
    isShowFirstTrain = false;
  } else {
    isShowFirstTrain = true;
  }

  return (
    <main className={styles.root}>
      <Menu active={MAIN_MENU_ACTIVE_ITEM} />
      <ShortcutAlertBanner />
      <Plaque link={PROGRESS_PAGE_LINK} title={PROGRESS_TITLE} />
      <DayTrackerPlaque />
      {initData && isShowFirstTrain && <FirstTrain initData={initData} />}
      <h2 className="trains__title" style={{ color: "#362f41" }}>
        Попробуйте{" "}
        <span style={{ color: "rgb(1 187 22)" }}>наши бесплатные</span>{" "}
        тренировки
      </h2>
      <TrainCard
        index={0}
        title=""
        image="https://images.mentoday.ru/upload/img_cache/e7b/e7b2530434ad0e463ed735f26def89d9_ce_3000x2000x0x0.jpg"
        describtion=""
        duration="30 мин"
        style={{ minHeight: "140px", height: "174px" }}
      />
    </main>
  );
};
