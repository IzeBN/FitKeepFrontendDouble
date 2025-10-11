import { FC, useEffect, useState } from "react";

import styles from "./AdaptiveAttachedMenu.module.scss";
import BackArrow from "@/assets/left-arrow.png";
import { tg } from "@/constants";
import SparklesIcon from "@/assets/sparkles.png";
import StartIcon from "@/assets/play.png";
import classNames from "classnames";
import { cn } from "@/shared/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRefreshSamplesMutation } from "@/store/usersApi";
import { PreloaderCat } from "@/components/Preloader/PreloaderCat";

type AdaptiveAttachedMenuProps = {
  isOpen: boolean;
  firstTrainPageId: number;
  hasActiveSubscription?: boolean;
};

export const AdaptiveAttachedMenu: FC<AdaptiveAttachedMenuProps> = ({
  isOpen,
  firstTrainPageId = 0,
  hasActiveSubscription = false,
}) => {
  const [isShowTextarea, setIsShowTextarea] = useState(false);
  const [initData, setInitData] = useState<string | undefined>(undefined);
  const [userMsgValue, setUserMsgValue] = useState("");

  const navigate = useNavigate();
  const [refreshSamples, { isLoading: isRefreshLoading }] =
    useRefreshSamplesMutation();

  const handleOpenSurvey = () => {
    tg.HapticFeedback.impactOccurred("medium");
    
    if (hasActiveSubscription) {
      // Если есть подписка, открываем ближайшую тренировку
      navigate(`../train-page/${firstTrainPageId}?openFirstTrain=true`);
    } else {
      // Если нет подписки, перенаправляем на страницу тарифов
      navigate("/subscription");
    }
  };

  const handleBack = () => {
    tg.HapticFeedback.impactOccurred("medium");
    setIsShowTextarea(false);
  };

  const handleNext = () => {
    tg.HapticFeedback.impactOccurred("medium");
    setIsShowTextarea(true);
  };

  const handleAdapteSample = async () => {
    if (!initData) return;
    tg.HapticFeedback.impactOccurred("medium");

    try {
      const result = await refreshSamples({
        init: initData,
        userMsg: userMsgValue,
      });

      if (!result.error && !isRefreshLoading) {

        setUserMsgValue("");
        setIsShowTextarea(false);
        setTimeout(() => {
          toast.success("Программа обновлена");
          navigate("/trains");
        }, 2000);
      } else {
        toast.error("Ошибка при обновлении");
      }
    } catch (error) {
      toast.error("Произошла ошибка");
      console.error("Ошибка при завершении адаптации:", error);
    }
  };

  useEffect(() => {
    if (!initData) {
      setInitData(tg?.initData);
    }
  }, [initData]);

  if (isRefreshLoading) {
    return <PreloaderCat />;
  }

  return (
    <div className={classNames(styles.modal, { [styles.active]: isOpen })}>
      {isShowTextarea && (
        <textarea
          name="adaptiveTrain"
          id="adaptiveTrain"
          placeholder="Расскажите, что вам не понравилось и что стоит поменять. Искусственный интеллект составит вам новую программу тренировок"
          className="w-full my-4 py-2 px-5 border-none outline-none min-h-[140px] rounded-[10px] resize-none text-[--color-black-light]"
          value={userMsgValue}
          onChange={(e) => setUserMsgValue(e.target.value)}
        />
      )}

      <div className={styles.buttonGroup}>
        {isShowTextarea && (
          <button className={cn(styles.closeButton)} onClick={handleBack}>
            <img src={BackArrow} alt="BackArrow" />
            <span className="ml-1">Назад</span>
          </button>
        )}
        {isShowTextarea && (
          <button
            className={cn(styles.closeButton, styles.restartButton)}
            onClick={handleAdapteSample}
          >
            <img src={StartIcon} alt="RestartIcon" />
            <span className="ml-1">Далее</span>
          </button>
        )}
        {!isShowTextarea && (
          <button
            className={cn(styles.closeButton, styles.restartButton)}
            onClick={handleNext}
          >
            <img src={SparklesIcon} alt="SparklesIcon" />
            <span className="ml-1">Перегенерировать</span>
          </button>
        )}

        {!isShowTextarea && (
          <button className={styles.openButton} onClick={handleOpenSurvey}>
            <img src={StartIcon} alt="Running shoes" />
            Старт
          </button>
        )}
      </div>
    </div>
  );
};
