import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Menu, Preloader, RecomendTrainCard } from "@/components";
import { tg } from "@/constants";

import { ReactComponent as BackArrow } from "@/assets/img/back-arrow.svg";

import style from "./RecomentTemplatePage.module.scss";
import { useGetUserMutation, useSelectSampleMutation } from "@/store/usersApi";
import { SelectSample, User } from "@/entities/user";
import toast from "react-hot-toast";
import SparkleIcon from "@/assets/sparkles.png";
import NoImage from "@/assets/no-image.jpg";
import LeftArrow from "@/assets/img/train-cards/left-arrow.svg";
import LessArrow from "@/assets/left-arrow.png";
import { ActionButton } from "@/shared/ui";

const DEFAULT_DESCRIPTION_LENGTH = 180;

export const RecomendTemplatePage = () => {
  const { id } = useParams<{ id: string }>();
  const userID: number = Number(id);
  const [initData, setInitData] = useState<string>();
  const [currentSampleId, setCurrentSampleId] = useState<number>();
  const [createUser, { isLoading: isUserLoading }] = useGetUserMutation();
  const [createTemplate, { isLoading: isTemplateLoading }] =
    useSelectSampleMutation();
  const [user, setUser] = useState<User | null>(null);
  const [descriptionLength, setDescriptionLength] = useState(
    DEFAULT_DESCRIPTION_LENGTH
  );

  const index = useMemo(() => {
    return id ? Number(id) - 1 : -1;
  }, [userID]);

  const navigate = useNavigate();

  const sampleTitle = useMemo(() => {
    if (
      !user?.select_samples ||
      typeof user.select_samples === "string" ||
      index < 0 ||
      index >= user.select_samples.length
    ) {
      return "";
    }
    return user.select_samples[index]?.sample_title || "";
  }, [user, index]);

  const handleCreateUser = async () => {
    if (!initData) return;

    try {
      const result = await createUser({ init: initData }).unwrap();
      setUser(result || null);
    } catch (err) {
      console.error("Error:", err);
      setUser(null);
    }
  };

  useEffect(() => {
    if (!initData && tg?.initData) {
      setInitData(tg.initData);
    }
  }, [initData]);

  useEffect(() => {
    if (initData) {
      handleCreateUser();
    }
  }, [initData]);

  const trainings = useMemo(() => {
    if (!user?.select_samples || !id) return [];
    if (typeof user.select_samples === "string") return [];

    const index = Number(id) - 1;
    if (index < 0 || index >= user.select_samples.length) return [];

    return user.select_samples[index]?.trainings || [];
  }, [user, id]);

  const currentUser: SelectSample | null = useMemo(() => {
    if (!user?.select_samples || !id) return null;
    if (typeof user.select_samples === "string") return null;

    const index = Number(id) - 1;
    if (index < 0 || index >= user.select_samples.length) return null;

    return user.select_samples[index] ?? null;
  }, [user, id]);

  const chooseTemplate = async (sampleId: number) => {
    if (!initData) return;

    try {
      const result = await createTemplate({
        init: initData,
        sample_id: sampleId,
      }).unwrap();
      if (!result.error) {
        setCurrentSampleId(sampleId);
        toast.success("Шаблон адаптирован");
        navigate(`/equipments?adaptiveMode=true`);
      }
    } catch (err) {
      console.error("Error:", err);
      setUser(null);
    }
  };

  if (isUserLoading) {
    return (
      <div>
        <Menu active={1} />
        <Preloader hasMenu />
      </div>
    );
  }

  // Текущий пользователь загружен

  return (
    <div>
      <div
        className="flex jcsb aic"
        style={{ padding: "15px 20px", paddingBottom: 0 }}
      >
        <Link
          to={"/trains"}
          className={style.root__arrow}
          onClick={() => tg.HapticFeedback.impactOccurred("medium")}
        >
          <BackArrow />
        </Link>
        <h2
          className="trains__title"
          style={{
            color: "#362f41",
            fontSize: "16px",
            paddingLeft: "0",
            textAlign: "center",
          }}
        >
          {sampleTitle || ``}
        </h2>
        <div style={{ width: "40px" }}></div>
      </div>

      <div className={style.btn__plaque}>
        <button
          className={style.chooseButton}
          disabled={isTemplateLoading}
          onClick={() => {
            if (
              user?.select_samples &&
              typeof user.select_samples !== "string" &&
              index >= 0 &&
              index < user.select_samples.length
            ) {
              chooseTemplate(user.select_samples[index].sample_id);
            }
          }}
          style={{
            opacity: isTemplateLoading ? 0.3 : 1,
            pointerEvents: isTemplateLoading ? "none" : "auto",
          }}
        >
          <img
            className="w-[20px] invert-[1]"
            src={SparkleIcon}
            alt="SparkleIcon"
          />
          <span>Адаптировать под себя</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {currentUser !== null && (
        <div className={style.recomentTemplateDesc}>
          {trainings.length > 0 ? (
            <img
              src={trainings[0].title_photo}
              alt="Recomend Template"
              className={style.trainingsImage}
            />
          ) : (
            <img src={NoImage} alt="NoImage" className={style.trainingsImage} />
          )}

          <p className={style.meta}>
            Тренировок: {currentUser?.total_trainings ?? "-"}
          </p>

          <h4 className={style.subtitle}>Обзор</h4>
          <p className={style.description}>
            {currentUser?.description
              ? currentUser.description.length > descriptionLength
                ? `${currentUser.description.slice(0, descriptionLength)}...`
                : currentUser.description
              : "-"}
          </p>

          {currentUser?.description &&
            currentUser.description.length > DEFAULT_DESCRIPTION_LENGTH && (
              <div className="flex justify-end px-3 mt-2">
                {descriptionLength < currentUser.description.length ? (
                  <ActionButton
                    iconPosition="right"
                    label="Подробнее"
                    icon={LeftArrow}
                    isWhiteIcon
                    onClick={() =>
                      setDescriptionLength(currentUser.description.length)
                    }
                  />
                ) : (
                  <ActionButton
                    iconPosition="left"
                    label="Меньше"
                    icon={LessArrow}
                    btnClassName="!bg-[#c9c9c9]"
                    onClick={() =>
                      setDescriptionLength(DEFAULT_DESCRIPTION_LENGTH)
                    }
                  />
                )}
              </div>
            )}

          {currentUser?.stages?.length ? (
            <div className={style.stages}>
              <h4 className={style.subtitle}>Этапы Training Journey</h4>
              <ul>
                {currentUser.stages.map((stage: string, stageIndex: number) => (
                  <li key={stageIndex} className={style.stageItem}>
                    {stage}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={style.stages}>
              <h4 className={style.subtitle}>Этапы</h4>
              <p>-</p>
            </div>
          )}
        </div>
      )}

      <Menu active={1} />

      <div style={{ padding: "20px" }}>
        {trainings.length > 0 &&
          trainings.map((training: any, i: number) => (
            <RecomendTrainCard
              key={training.training_id}
              index={i + 1}
              title={training.title}
              image={training.title_photo || "none"}
              describtion={`Длительность: ${training.training_duration} мин`}
              duration={`${training.training_duration}`}
              className="mb-[20px]"
              trainingId={training.training_id}
              templateId={Number(id)}
            />
          ))}
      </div>
    </div>
  );
};
