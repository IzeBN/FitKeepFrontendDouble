import { FC, useState } from "react";
import LightBulbIcon from "assets/light-bulb.png";
import { ActionButton } from "@/shared/ui";
import LeftArrow from "@/assets/img/train-cards/left-arrow.svg";
import CloseIcon from "@/assets/close.png";
import LessArrow from "@/assets/left-arrow.png";

const DEFAULT_INTERPRETATION_LENGTH = 120;

type InterpretationPlaqueProps = {
  interpretation: string;
};

export const InterpretationPlaque: FC<InterpretationPlaqueProps> = (props) => {
  const { interpretation } = props;

  const [isShowBanner, setShowBanner] = useState(true);
  const [interpretationLength, setInterpretationLength] = useState(
    DEFAULT_INTERPRETATION_LENGTH
  );

  const handleBanner = () => {
    setShowBanner(false);
  };

  const handleMoreInfo = () => {
    setInterpretationLength(interpretation.length);
  };

  if (!isShowBanner) {
    return null;
  }

  return (
    <div className="bg-gray-100 p-4 rounded-[16px] shadow-md px-5 py-3 my-4 mx-2 relative pt-6">
      <button onClick={handleBanner} className="absolute top-4 right-3">
        <img
          src={CloseIcon}
          alt="close icon"
          className="w-[7px] h-[7px] opacity-50"
        />
      </button>
      <h4 className="text-[14px] text-[#292929] font-[400] mb-1 flex items-center gap-2">
        <img className="w-[30px]" src={LightBulbIcon} alt="LightBulbIcon" />
        <span>Сообщение об интерпретации</span>
      </h4>
      <span className="text-[14px] text-[#7E7E7E]">
        {interpretation.length > interpretationLength
          ? `${interpretation.slice(0, interpretationLength)}...`
          : interpretation}
      </span>
      {interpretation.length > interpretationLength ? (
        <div className="flex justify-end">
          <ActionButton
            iconPosition="right"
            label={"Подробнее"}
            icon={LeftArrow}
            isWhiteIcon
            onClick={handleMoreInfo}
          />
        </div>
      ) : (
        <div className="flex justify-end">
          <ActionButton
            iconPosition="left"
            label={"Меньше"}
            icon={LessArrow}
            btnClassName="!bg-[#c9c9c9]"
            onClick={() =>
              setInterpretationLength(DEFAULT_INTERPRETATION_LENGTH)
            }
          />
        </div>
      )}
    </div>
  );
};
