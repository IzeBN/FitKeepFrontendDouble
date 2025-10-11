import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

import AnswerOne from "@/shared/assets/onboarding/onboarding-1.png";
import AnswerTwo from "@/shared/assets/onboarding/onboarding-2.png";
import AnswerThree from "@/shared/assets/onboarding/onboarding-3.png";
import DeclineIcon from "@/shared/assets/icons/decline-icon.png";
import DoneIcon from "@/shared/assets/icons/done-icon.png";
import BackArrow from "@/shared/assets/icons/back-arrow.png";
import RewardOne from "@/shared/assets/onboarding/reward-1.png";
import RewardTwo from "@/shared/assets/onboarding/reward-2.png";
import RewardThree from "@/shared/assets/onboarding/reward-3.png";
import RewardFour from "@/shared/assets/onboarding/reward-4.png";

import { AnswerType, useAddAnswerMutation } from "@/store/quizApi";
import { Preloader } from "@/components";

// шаги 1–3
const answerImages = [AnswerOne, AnswerTwo, AnswerThree];
// шаг 4
const rewardImages = [RewardOne, RewardTwo, RewardThree, RewardFour];

// Вопросы о питании (шаги 5-6)
const nutritionQuestions = [
  {
    id: 5,
    question: "Готовы ли вы придерживаться дефицита/профицита калорий?",
    description: "Это необходимо для достижения ваших целей"
  },
  {
    id: 6,
    question: "Нужна ли вам помощь в составлении персональной программы питания?",
    description: "Питание неразрывно влияет на эффективность тренировок"
  }
];

type OnboardingPageProps = {
  initData: string;
};

export const OnboardingPage = ({ initData }: OnboardingPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = Number(searchParams.get("step")) || 1;

  const navigate = useNavigate();

  const [addAnswer, { isLoading }] = useAddAnswerMutation();

  // если параметра нет → редиректим на step=1
  useEffect(() => {
    if (!searchParams.get("step")) {
      setSearchParams({ step: "1" }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const sendAnswerAndNext = async (answer: string) => {
    try {
      await addAnswer({
        init: initData,
        question_id: 1000 + step,
        answer,
        answer_type: AnswerType.ONE_BUTTON,
      }).unwrap();

      if (step < answerImages.length + 1) {
        setSearchParams({ step: String(step + 1) });
      } else if (step < answerImages.length + 1 + nutritionQuestions.length) {
        setSearchParams({ step: String(step + 1) });
      } else {
        toast.success("Онбординг завершён!");
        navigate("/way-to-goal"); // или куда нужно
      }
    } catch (err) {
      console.error("Ошибка отправки", err);
      toast.error("Ошибка отправки");
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="flex flex-col gap-3 pt-10 w-[90%] mx-auto max-w-[600px]">
      <header className="flex items-center gap-3 justify-between mb-6">
        <img
          src={BackArrow}
          className="w-[20px] cursor-pointer"
          alt="backArrow"
          onClick={() => {
            if (step > 1) {
              setSearchParams({ step: String(step - 1) });
            } else {
              navigate("/body-form");
            }
          }}
        />

        <div className="flex gap-1">
          {[...answerImages, "step4", ...nutritionQuestions].map((_, index) => (
            <span
              key={index}
              className={`w-10 h-[3px] rounded-full transition-colors duration-300 ${
                index < step - 1 ? "bg-[#4E7EFB]" : "bg-[#c0c0c0]"
              }`}
            ></span>
          ))}
        </div>

        <div></div>
      </header>

      <main>
        {step < 4 ? (
          <>
            <h3 className="text-[25px] leading-[35px]">
              Согласны с нижеследующим утверждением?
            </h3>
            <img src={answerImages[step - 1]} alt={`answer-${step}`} />
            <div className="flex gap-3">
              <button
                onClick={() => sendAnswerAndNext("0")} // Нет
                className="flex flex-col items-center gap-2 bg-white w-1/2 h-[200px] text-[20px] rounded-[16px] justify-center 
                   shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                <img className="w-[20px]" src={DeclineIcon} alt="close" />
                <span>Нет</span>
              </button>

              <button
                onClick={() => sendAnswerAndNext("1")} // Да
                className="flex flex-col items-center gap-2 bg-white w-1/2 h-[200px] text-[20px] rounded-[16px] justify-center 
                   shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                <img className="w-[20px]" src={DoneIcon} alt="check" />
                <span>Да</span>
              </button>
            </div>
          </>
        ) : step === 4 ? (
          <>
            <h3 className="text-[25px] leading-[35px] mb-4">
              Как вы собираетесь себя наградить после достижения ваших целей?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {rewardImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => sendAnswerAndNext(String(idx + 1))}
                  className="bg-white rounded-[16px] overflow-hidden shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  <img
                    src={img}
                    alt={`reward-${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3 className="text-[25px] leading-[35px] mb-2">
              {nutritionQuestions[step - 5].question}
            </h3>
            <p className="text-[16px] text-gray-600 mb-6">
              {nutritionQuestions[step - 5].description}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => sendAnswerAndNext("0")} // Нет
                className="flex flex-col items-center gap-2 bg-white w-1/2 h-[200px] text-[20px] rounded-[16px] justify-center 
                   shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                <img className="w-[20px]" src={DeclineIcon} alt="close" />
                <span>Нет</span>
              </button>

              <button
                onClick={() => sendAnswerAndNext("1")} // Да
                className="flex flex-col items-center gap-2 bg-white w-1/2 h-[200px] text-[20px] rounded-[16px] justify-center 
                   shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                <img className="w-[20px]" src={DoneIcon} alt="check" />
                <span>Да</span>
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
