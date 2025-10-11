import { FC } from "react";

import { Training } from "@/components/Trains";

type FreeTrainsWidgetProps = {
  trainings: Training[];
};

export const FreeTrainsWidget: FC<FreeTrainsWidgetProps> = (props) => {
  const { trainings } = props;
  return (
    <>
      <h5
        style={{
          color: "#a186dd",
          textAlign: "center",
          margin: "0 auto",
          marginBottom: "-30px",
          marginTop: "15px",
        }}
      >
        Наши бесплатные тренировки:
      </h5>
      {trainings.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            overflowX: "scroll",
            display: "flex",
            gap: "20px",
            padding: "45px 12px",
            background: "#fff",
            paddingTop: "20px",
            paddingBottom: "60px",
            width: "100%",
          }}
        >
          {trainings.map((train, index) => (
            <div
              key={index}
              style={{
                minWidth: "120px",
                height: "90px",
                borderRadius: "10px",
                background: "#eee",
                backgroundImage:
                  train.title_photo !== "none"
                    ? `url(${train.title_photo})`
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title={train.title}
            >
              <h5
                style={{
                  color: "#362f41",
                  fontSize: "12px",
                  transform: "translateY(69px)",
                }}
              >
                {train.title}
              </h5>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
