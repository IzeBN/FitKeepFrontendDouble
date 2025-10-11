import styles from "../../Trains.module.scss";

import { TrainCard } from "@/components/Trains/TrainCard/";

import { Training } from "../../model";
import { Link } from "react-router-dom";

import { ReactComponent as BackArrow } from "@/assets/img/back-arrow.svg";
import { tg } from "@/constants";
import style from "./FreeTrains.module.scss";
import { FreeTrainCard } from "../../FreeTrainCard";

type FreeTrainsProps = {
  trainings: Training[];
};

const today = new Date();

export const FreeTrains: React.FC<FreeTrainsProps> = ({ trainings }) => {
  return (
    <div className={styles.root}>
      <div className="flex jcsb aic" style={{ padding: "15px 20px" }}>
        <Link
          to={"/"}
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
          Ваши <span style={{ color: "rgb(1 187 22)" }}>бесплатныеd</span>{" "}
          <br /> тренировки
        </h2>
        <div style={{ width: "40px" }}></div>
      </div>
      {trainings && trainings.length > 0 && (
        <>
          <div style={{ marginBottom: "60px" }}>
            {trainings.map((train, index) => (
              <div key={index}>
                <FreeTrainCard
                  index={train.id}
                  image={String(train.title_photo)}
                  describtion="Описание"
                  duration={String(train.training_sample_id)}
                  title={train.title}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
