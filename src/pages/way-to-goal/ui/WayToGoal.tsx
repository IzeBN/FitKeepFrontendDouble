import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BackArrow from "@/shared/assets/icons/back-arrow.png";
import { Graph } from "./Graph";
import { Input } from "@/shared/ui/input";
import toast from "react-hot-toast";
import { Preloader } from "@/components";
import { useQuizFindAnswerMutation, useCalculateWeightLossDateMutation } from "@/store/usersApi";
import { tg } from "@/constants";

type FormData = {
  age: number | undefined;
  weight: number | undefined;
  height: number | undefined;
};

type CalculationResult = {
  date_to_goal?: string | null;
  muscle_gain?: number | null;
  target_weight?: number | null;
  chartData?: Array<{
    date: string;
    weight: number;
  }>;
};

// Функция для преобразования выбора формы тела в процент жира
const getCurrentBodyFatPercentage = (bodyFormSelection: number): number => {
  // Маппинг выбора формы тела на процент жира
  const bodyFatMapping = {
    1: 5,   // 4%~6% - берем среднее
    2: 8.5, // 7%~10% - берем среднее
    3: 13,  // 11%~15% - берем среднее
    4: 19.5, // 16%~23% - берем среднее
    5: 27,  // 24%~30% - берем среднее
    6: 35.5, // 31%~40% - берем среднее
    7: 45,  // >40% - берем примерное значение
  };
  
  return bodyFatMapping[bodyFormSelection as keyof typeof bodyFatMapping] || 20;
};

// Функция для преобразования выбора желаемой формы тела в процент жира
const getDesiredBodyFatPercentage = (bodyFormSelection: number): number => {
  // Маппинг выбора формы тела на процент жира (аналогично текущему)
  const bodyFatMapping = {
    1: 5,   // 4%~6% - берем среднее
    2: 8.5, // 7%~10% - берем среднее
    3: 13,  // 11%~15% - берем среднее
    4: 19.5, // 16%~23% - берем среднее
    5: 27,  // 24%~30% - берем среднее
    6: 35.5, // 31%~40% - берем среднее
    7: 45,  // >40% - берем примерное значение
  };
  
  return bodyFatMapping[bodyFormSelection as keyof typeof bodyFatMapping] || 20;
};

// Функция для генерации данных графика
const generateChartData = (currentWeight: number, targetWeight: number, dateToGoal: string): Array<{
  date: string;
  weight: number;
}> => {
  const startDate = new Date();
  const endDate = new Date(dateToGoal);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const weightLoss = currentWeight - targetWeight;
  const dailyWeightLoss = weightLoss / totalDays;
  
  const chartData: Array<{
    date: string;
    weight: number;
  }> = [];
  const milestones = [0, 0.25, 0.5, 0.75, 1]; // 0%, 25%, 50%, 75%, 100% прогресса
  
  milestones.forEach((progress, index) => {
    const daysPassed = Math.round(totalDays * progress);
    const date = new Date(startDate);
    date.setDate(date.getDate() + daysPassed);
    
    const weightAtProgress = currentWeight - (weightLoss * progress);
    
    chartData.push({
      date: index === 0 ? "Сегодня" : 
            index === milestones.length - 1 ? "Цель" :
            date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      weight: Math.round(weightAtProgress * 10) / 10
    });
  });
  
  return chartData;
};

export const WayToGoal = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [desiredBodyFat, setDesiredBodyFat] = useState<number | null>(null);
  
  const [quizFindAnswer] = useQuizFindAnswerMutation();
  const [calculateWeightLossDate] = useCalculateWeightLossDateMutation();
  
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      age: undefined,
      weight: undefined,
      height: undefined,
    }
  });

  // Загрузка данных пользователя с бэкенда
  useEffect(() => {
    const loadUserData = async () => {
      if (!tg?.initData) {
        toast.error('Ошибка инициализации приложения');
        return;
      }

      try {
        const userData = await quizFindAnswer({ 
          init: tg.initData, 
          data_type: ['age', 'height', 'weight', 'desired_fat_percentage'] 
        }).unwrap();
        
        if (userData.answers) {
          const age = Number(userData.answers.age);
          const weight = Number(userData.answers.weight);
          const height = Number(userData.answers.height);
          const desiredFatPercentage = Number(userData.answers.desired_fat_percentage);
          
          if (age && weight && height) {
            setValue('age', age);
            setValue('weight', weight);
            setValue('height', height);
            
            // Устанавливаем желаемый процент жира, если он есть
            if (desiredFatPercentage && desiredFatPercentage > 0) {
              // Преобразуем выбор формы тела в процент жира
              const desiredFatPercent = getDesiredBodyFatPercentage(desiredFatPercentage);
              setDesiredBodyFat(desiredFatPercent);
            }
          } else {
            toast.error('Неполные данные пользователя');
          }
        } else {
          toast.error('Данные пользователя не найдены');
        }
      } catch (error) {
        console.error('Ошибка загрузки данных пользователя:', error);
        toast.error('Ошибка загрузки данных пользователя');
      }
    };

    loadUserData();
  }, [setValue, quizFindAnswer]);

  const onSubmit = async (data: FormData) => {
    if (!tg?.initData) {
      toast.error('Ошибка инициализации приложения');
      return;
    }

    // Проверяем, что все поля заполнены
    if (!data.age || !data.weight || !data.height) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    // Проверяем, что желаемый процент жира загружен
    if (!desiredBodyFat) {
      toast.error('Данные о желаемом проценте жира не найдены. Пожалуйста, пройдите опрос о форме тела.');
      return;
    }

    setIsLoading(true);
    try {
      // Получаем текущий процент жира из ответов пользователя
      const userAnswers = await quizFindAnswer({ 
        init: tg.initData, 
        data_type: ['current_fat_percentage'] 
      }).unwrap();
      
      if (!userAnswers.answers || !userAnswers.answers['current_fat_percentage']) {
        toast.error('Данные о текущем проценте жира не найдены');
        return;
      }

      const bodyFormSelection = Number(userAnswers.answers['current_fat_percentage']);
      const currentBodyFat = getCurrentBodyFatPercentage(bodyFormSelection);
      
      const result = await calculateWeightLossDate({
        init: tg.initData,
        age: data.age,
        weight: data.weight,
        height: data.height,
        current_fat_percentage: Math.round(currentBodyFat),
        desired_fat_percentage: Math.round(desiredBodyFat),
      }).unwrap();
      
      if (!result.date_to_goal || !result.target_weight) {
        toast.error('Неполные данные расчета');
        return;
      }
      
      // Генерируем данные для графика
      const chartData = generateChartData(data.weight, result.target_weight, result.date_to_goal);
      
      setCalculationResult({
        ...result,
        chartData
      });
      setShowForm(false);
      toast.success("Расчет завершен!");
    } catch (error) {
      console.error('Ошибка расчета:', error);
      toast.error('Ошибка при расчете');
    } finally {
      setIsLoading(false);
    }
  };

  const finishOnboarding = () => {
    navigate("/trains");
    toast.success("Вперед к цели!");
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="flex flex-col gap-3 pt-10 w-[90%] mx-auto max-w-[600px]">
      <header className="flex items-center gap-3 justify-between mb-6">
        <Link to="/onboarding?step=6">
          <img
            src={BackArrow}
            className="w-[20px] cursor-pointer"
            alt="backArrow"
          />
        </Link>

        {/* 4 заполненных степ-лайна */}
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              key={index}
              className="w-10 h-[3px] bg-[#4E7EFB] rounded-full"
            ></span>
          ))}
        </div>

        <div></div>
      </header>

      <main>
        {showForm ? (
          <div>
            <h3 className="text-[28px] leading-[38px] mb-6">
              Давайте рассчитаем ваш путь к цели
            </h3>
            <p className="text-[18px] text-[#525252] mb-8">
              Введите ваши данные для более точного расчета
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-[16px] font-medium text-[#3c3c3c] mb-2">
                  Возраст (лет)
                </label>
                <Input
                  name="age"
                  control={control}
                  type="number"
                  placeholder="Введите ваш возраст"
                  rules={{
                    required: "Возраст обязателен",
                    validate: (value) => {
                      if (!value) return "Возраст обязателен";
                      if (value < 16) return "Минимальный возраст 16 лет";
                      if (value > 100) return "Максимальный возраст 100 лет";
                      return true;
                    }
                  }}
                />
                {errors.age && (
                  <p className="text-red-500 text-[14px] mt-1">{errors.age.message}</p>
                )}
              </div>

              <div>
                <label className="block text-[16px] font-medium text-[#3c3c3c] mb-2">
                  Вес (кг)
                </label>
                <Input
                  name="weight"
                  control={control}
                  type="number"
                  step="0.1"
                  placeholder="Введите ваш вес"
                  rules={{
                    required: "Вес обязателен",
                    validate: (value) => {
                      if (!value) return "Вес обязателен";
                      if (value < 30) return "Минимальный вес 30 кг";
                      if (value > 300) return "Максимальный вес 300 кг";
                      return true;
                    }
                  }}
                />
                {errors.weight && (
                  <p className="text-red-500 text-[14px] mt-1">{errors.weight.message}</p>
                )}
              </div>

              <div>
                <label className="block text-[16px] font-medium text-[#3c3c3c] mb-2">
                  Рост (см)
                </label>
                <Input
                  name="height"
                  control={control}
                  type="number"
                  placeholder="Введите ваш рост"
                  rules={{
                    required: "Рост обязателен",
                    validate: (value) => {
                      if (!value) return "Рост обязателен";
                      if (value < 120) return "Минимальный рост 120 см";
                      if (value > 250) return "Максимальный рост 250 см";
                      return true;
                    }
                  }}
                />
                {errors.height && (
                  <p className="text-red-500 text-[14px] mt-1">{errors.height.message}</p>
                )}
              </div>

              {/* Информация о желаемом проценте жира */}
              {desiredBodyFat && (
                <div className="bg-blue-100 rounded-[16px] py-4 px-6 mb-6">
                  <div className="text-[16px] flex gap-2 items-center">
                    <span className="pt-1">Ваш желаемый процент жира в теле: <strong>{desiredBodyFat}%</strong></span>
                  </div>
                </div>
              )}

              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="
                    bg-gradient-to-l from-gray-800 to-gray-500 
                    text-white py-3 rounded-full text-center px-16 text-[22px]
                    shadow-md hover:shadow-lg 
                    active:scale-95 active:brightness-90
                    transition-all duration-200
                  "
                >
                  Рассчитать
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <p className="mb-3 text-[20px]">
              Более точное предсказание готово! <br />
              Вы достигнете цели
            </p>
            {calculationResult?.date_to_goal && (
              <h3 className="text-[28px] leading-[38px] mb-3">
                <span className="text-[#3164e3]">
                  {new Date(calculationResult.date_to_goal).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </h3>
            )}
            
            {calculationResult?.target_weight && (
              <div className="bg-blue-100 rounded-[16px] py-4 px-6 mb-6">
                <h4 className="text-[18px] font-medium text-[#3c3c3c] mb-2">
                  Целевой вес
                </h4>
                <p className="text-[24px] font-bold text-[#3164e3]">
                  {Math.round(calculationResult.target_weight * 10) / 10} кг
                </p>
              </div>
            )}
            
            {calculationResult?.muscle_gain && (
              <div className="bg-green-100 rounded-[16px] py-4 px-6 mb-6">
                <h4 className="text-[18px] font-medium text-[#3c3c3c] mb-2">
                  Прирост мышечной массы
                </h4>
                <p className="text-[24px] font-bold text-green-600">
                  +{Math.round(calculationResult.muscle_gain * 10) / 10} кг
                </p>
              </div>
            )}
            
            {calculationResult?.chartData && calculationResult.chartData.length > 0 && (
              <div className="mb-6">
                <Graph data={calculationResult.chartData} />
              </div>
            )}
            
            <p className="text-[20px] text-[#525252] text-center mt-3">
              С персонализировнным планом у тебя есть большой потенциал достичь
              целей в установленные сроки!
            </p>
            
            {/* Научные основы расчетов */}
            <div className="bg-gray-50 rounded-[16px] py-4 px-6 mb-6 mt-6">
              <h4 className="text-[18px] font-medium text-[#3c3c3c] mb-3">
                Научные основы расчетов:
              </h4>
              <ul className="space-y-2 text-[14px] text-[#525252]">
                <li className="flex items-start gap-2">
                  <span className="text-[#3164e3] font-bold">•</span>
                  <span>
                    <strong>Формула Миффлина-Сан Жеора (1990):</strong> National Library of Medicine
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3164e3] font-bold">•</span>
                  <span>
                    <strong>Метаболические расчеты:</strong> AJP Endocrinology
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3164e3] font-bold">•</span>
                  <span>
                    <strong>Системы подсчета калорий:</strong> CEUR Workshop
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => finishOnboarding()}
                className="
        bg-gradient-to-l from-gray-800 to-gray-500 
        text-white py-3 rounded-full text-center mt-3 px-16 text-[22px]
        shadow-md hover:shadow-lg 
        active:scale-95 active:brightness-90
        transition-all duration-200
      "
              >
                Следующие
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
