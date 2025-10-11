import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Menu, Preloader, TrainCard, Trains } from "@/components";
import { useCreateTrainingMutation } from "@/store/trainingsApi";
import { useSelectSampleMutation, useGetUserMutation } from "@/store/usersApi";
import { Training } from "@/components/Trains/model";
import { User } from "@/entities/user";
import { Slider } from "@/components/Main/Slider";
import weekCalendar from "@/assets/week-calendar.png";
import style from "./TrainsPage.module.scss";
import {
  AdaptiveAttachedMenu,
  InterpretationPlaque,
  UserAgreementLink,
} from "@/widgets";

const NO_PROGRESS_MESSAGE = "У вас еще нет прогресса";
const GET_PROGRAM_BUTTON_TEXT = "Получить программу";
const TRAINING_SAMPLE_LINK = "https://t.me/FitGuid_bot?start=getTrainingSample";

type TrainsPageProps = {
  initData: string;
  user: User;
};

export enum UserStatus {
  REQUIRED_ANCET = "Required ancet",
  SELECTED = "Selected",
}

export const TrainsPage: FC<TrainsPageProps> = (props) => {
  const { initData, user } = props;
  const [isReady, setIsReady] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(user);

  const [interpretation, setInterpretation] = useState<string>("");
  const [trainings, setTrainings] = useState<Training[] | null>(null);
  const [isShowTemplates, setShowTemplates] = useState<boolean>(true);

  const navigate = useNavigate();

  // Проверяем есть ли у пользователя активная подписка
  const hasActiveSubscription = Boolean(currentUser?.user?.subscription && (
    currentUser.user.subscription.end_date === null || // безлимитная подписка
    new Date(currentUser.user.subscription.end_date) > new Date() // подписка с датой окончания
  ));


  const [createTraining, { isLoading: isTrainLoading }] =
    useCreateTrainingMutation();
  const [createTemplate, { isLoading: isTemplateLoading }] =
    useSelectSampleMutation();
  const [getUser] = useGetUserMutation();

  const getTraings = async () => {
    if (!initData) {
      return;
    }

    try {
      // Обновляем данные пользователя для получения актуальной информации о подписке
      const userResult = await getUser({ init: initData }).unwrap();
      setCurrentUser(userResult || user);
      
      setShowTemplates(userResult?.select_samples !== "Selected");

      if (
        userResult?.select_samples === UserStatus.REQUIRED_ANCET ||
        Array.isArray(userResult?.select_samples)
      ) {
        setTrainings(null);
        setIsReady(true);
        return;
      }

      const trainResult = await createTraining({ init: initData }).unwrap();
      setTrainings(trainResult.trainings || []);
      setInterpretation(trainResult.interpretation || "");
      setIsReady(true);
    } catch (err) {
      console.error("Error init:", err);
      setTrainings([]);
      setShowTemplates(true);
      setIsReady(true);
    }
  };

  useEffect(() => {
    if (initData) {
      getTraings();
    }
  }, [initData]);

  const openResume = () => {
    window.open(TRAINING_SAMPLE_LINK, "_self");
    window.Telegram.WebApp.close();
  };

  const chooseTemplate = async (sampleId: number) => {
    if (!initData) return;

    try {
      const result = await createTemplate({
        init: initData,
        sample_id: sampleId,
      }).unwrap();

      if (!result.error) {
        toast.success("Выберите оборудование");
        navigate(`/equipments?adaptiveMode=true`);
      } else {
        toast.error("Произошла ошибка");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Произошла ошибка");
    }
  };

  if (!isReady || isTrainLoading) {
    return (
      <>
        <Menu active={1} />
        <Preloader hasMenu />
      </>
    );
  }

  return (
    <div className="container !mb-[100px]">
      {interpretation && (
        <InterpretationPlaque interpretation={interpretation} />
      )}

      {currentUser?.select_samples === "Selected" && trainings && (
        <AdaptiveAttachedMenu
          isOpen={true}
          firstTrainPageId={
            (() => {
              // Найти ближайшую тренировку (по дате >= сегодня)
              const today = new Date();
              const upcoming = trainings.find(
                (train) => new Date(train.schedule) >= today
              );
              return upcoming?.id || 0;
            })()
          }
          hasActiveSubscription={hasActiveSubscription}
        />
      )}

      <Menu active={1} />

      {isShowTemplates && !trainings ? (
        currentUser?.select_samples === UserStatus.REQUIRED_ANCET ? (
          <div>
            <div
              className={style.weekCalendar}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <img src={weekCalendar} alt="week-calendar-icon" />
                <h3>{NO_PROGRESS_MESSAGE}</h3>
              </div>
              <div>
                <button
                  className={style.weekCalendar__btn}
                  onClick={openResume}
                >
                  {GET_PROGRAM_BUTTON_TEXT}
                </button>
              </div>
            </div>

            <h2
              className="trains__title"
              style={{ color: "#362f41", paddingTop: "30px" }}
            >
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
          </div>
        ) : (
          <div>
            <h2 className="trains__title" style={{ color: "#362f41" }}>
              {currentUser?.select_samples?.length} рекомендованные программы
            </h2>
            <Slider
              chooseTemplate={chooseTemplate}
              templates={currentUser?.select_samples}
              isTemplateLoading={isTemplateLoading}
              slidesTotal={currentUser?.select_samples?.length || 1}
            />
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
          </div>
        )
      ) : (
        trainings && <Trains trainings={trainings} hasActiveSubscription={hasActiveSubscription} />
      )}

      <UserAgreementLink />
    </div>
  );
};
