import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackArrow from "@/shared/assets/icons/back-arrow.png";
import RobotIcon from "@/shared/assets/icons/robot.png";

import BodyForm1 from "@/shared/assets/onboarding/body-form-1.jpg";
import BodyForm2 from "@/shared/assets/onboarding/body-form-2.jpg";
import BodyForm3 from "@/shared/assets/onboarding/body-form-3.jpg";
import BodyForm4 from "@/shared/assets/onboarding/body-form-4.jpg";
import BodyForm5 from "@/shared/assets/onboarding/body-form-5.jpg";
import BodyForm6 from "@/shared/assets/onboarding/body-form-6.jpg";
import BodyForm7 from "@/shared/assets/onboarding/body-form-7.jpg";
import { bodyFatGoals } from "@/entities/current-body-form";
import { cn } from "@/shared/utils";
import { AnswerType, useAddAnswerMutation } from "@/store/quizApi";
import toast from "react-hot-toast";
import { Preloader } from "@/components";

const bodyForms = [
  BodyForm1,
  BodyForm2,
  BodyForm3,
  BodyForm4,
  BodyForm5,
  BodyForm6,
  BodyForm7,
];

type BodyFormProps = {
  initData: string;
};

export const BodyForm: FC<BodyFormProps> = (props) => {
  const { initData } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSelected, setCurrentSelected] = useState(0);
  const [desiredSelected, setDesiredSelected] = useState(0);
  const navigate = useNavigate();

  const [addAnswer, { isLoading }] = useAddAnswerMutation();

  const currentGoal = bodyFatGoals[currentSelected];
  const desiredGoal = bodyFatGoals[desiredSelected];

  const handleNext = async () => {
    if (currentStep === 0) {
      // Отправляем ответ на первый вопрос (текущий процент жира)
      try {
        await addAnswer({
          init: initData,
          question_id: 1101,
          answer: String(currentSelected + 1),
          answer_type: AnswerType.ONE_BUTTON,
        }).unwrap();
        setCurrentStep(1);
      } catch (err) {
        console.error("Ошибка отправки первого ответа", err);
        toast.error("Ошибка отправки");
      }
    } else {
      // Отправляем ответ на второй вопрос (желаемый процент жира)
      try {
        await addAnswer({
          init: initData,
          question_id: 1102,
          answer: String(desiredSelected + 1),
          answer_type: AnswerType.ONE_BUTTON,
        }).unwrap();
        toast.success("Ответы отправлены!");
        navigate("/onboarding");
      } catch (err) {
        console.error("Ошибка отправки второго ответа", err);
        toast.error("Ошибка отправки");
      }
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  const isCurrentStep = currentStep === 0;
  const selected = isCurrentStep ? currentSelected : desiredSelected;
  const setSelected = isCurrentStep ? setCurrentSelected : setDesiredSelected;
  const currentGoalData = isCurrentStep ? currentGoal : desiredGoal;

  return (
    <div className="flex flex-col gap-3 pt-10 w-[90%] mx-auto max-w-[600px]">
      <header className="flex items-center gap-3 justify-between mb-6">
        <Link to="/">
          <img
            src={BackArrow}
            className="w-[20px] cursor-pointer"
            alt="backArrow"
          />
        </Link>

        <div className="flex gap-1">
          <span className="w-10 h-[3px] bg-[#4E7EFB] rounded-full"></span>
        </div>

        <div></div>
      </header>

      <main>
        <h3 className="text-[28px] leading-[38px] mb-3">
          {isCurrentStep ? "Какая форма у вас сейчас?" : "Какую форму вы хотите?"}
        </h3>
        <div className="flex justify-center mb-10">
          <img
            src={bodyForms[selected]}
            alt="bodyForm"
            className="mx-auto max-h-[280px] transition-all duration-300 object-contain"
          />
        </div>
        {/* Слайдер-переключатель */}
        <div className="relative w-full flex justify-center mb-10">
          <div className="w-[320px] h-[32px] flex items-center relative">
            {/* Линия */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[6px] bg-blue-100 rounded-full"></div>
            {/* Ползунок */}
            <div
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
              style={{
                left: `calc(${(selected / 6) * 100}% - 16px)`,
              }}
            >
              <div className="w-8 h-8 bg-[#4E7EFB] border-4 border-white rounded-full shadow-md" />
            </div>
            {/* Точки */}
            {bodyForms.map((_, i) => (
              <button
                key={i}
                className={`z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${
                    i === selected
                      ? "border-[#4E7EFB] bg-[#4E7EFB]"
                      : "border-gray-300 bg-white"
                  }
                `}
                style={{
                  position: "absolute",
                  left: `calc(${(i / (bodyForms.length - 1)) * 100}% - 12px)`,
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onClick={() => setSelected(i)}
                aria-label={`Выбрать форму ${i + 1}`}
              />
            ))}
            {/* Подписи под точками */}
            <div
              className="absolute left-0 -bottom-8 text-[15px] text-[#3c3c3c]"
              style={{ width: "100%" }}
            >
              <div className="flex justify-between w-full px-[8px]">
                <span>Стройная</span>
                <span>Пышная</span>
              </div>
            </div>
          </div>
        </div>
        {/* Описание/цель */}
        <div className="bg-blue-100 rounded-[16px] py-4 px-10 mb-10">
          <div className="text-[16px] flex gap-2 items-center">
            <img className="w-[20px]" src={RobotIcon} alt="robot" />
            <span className="pt-1">
              {isCurrentStep ? "Ваш текущий уровень жира в теле" : "Ваш целевой уровень жира в теле"}
            </span>
          </div>
          <h3
            className={cn("text-[20px] text-green-600", [
              { "text-[#DC6E26] text-[18px]": !currentGoalData.isSafe },
            ])}
          >
            {currentGoalData.range} ({currentGoalData.title})
          </h3>
          <p className="text-[14px] text-[#3c3c3c]">
            {currentGoalData.description}
          </p>
        </div>
        <div className="flex justify-center">
          <button
            className="
      bg-gradient-to-l from-gray-800 to-gray-500 
      text-white py-3 rounded-full text-center mt-3 px-16 text-[22px]
      shadow-md hover:shadow-lg 
      active:scale-95 active:brightness-90
      transition-all duration-200
     "
            onClick={handleNext}
          >
            {isCurrentStep ? "Следующие" : "Завершить"}
          </button>
        </div>
      </main>
    </div>
  );
};
