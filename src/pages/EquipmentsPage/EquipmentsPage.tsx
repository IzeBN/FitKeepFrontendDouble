import { FC, useEffect, useState } from "react";
import { Preloader, TopNav } from "../../components";
import { useGetEquipmentsQuery } from "../../store/equipmentsApi";
import pageComponents, { tg } from "@/constants/";
import { ActionButton } from "@/shared/ui";
import SparklesIcon from "@/assets/sparkles.png";
import { useRefreshSamplesMutation, useQuizFindAnswerMutation } from "@/store/usersApi";
import { PreloaderCat } from "@/components/Preloader/PreloaderCat";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { User } from "@/entities/user";
import { UserStatus } from "../TrainsPage/TrainsPage";

type EquipmentsPageProps = {
  user: User;
};

export const EquipmentsPage: FC<EquipmentsPageProps> = (props) => {
  const { user } = props;


  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(location.search);
  const adaptiveMode = urlParams.has("adaptiveMode");

  const [initData, setInitData] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      tg.expand();
    }

    if (!initData) {
      tg.expand();
      tg.ready();
      setInitData(tg?.initData);
    }
  }, [initData]);

  const { data, isLoading } = useGetEquipmentsQuery({});
  const [refreshSamples, { isLoading: isRefreshLoading }] =
    useRefreshSamplesMutation();
  const [quizFindAnswer] = useQuizFindAnswerMutation();
  const [activePage, setActivePage] = useState(0);

  const handleSetActivePage = (page: number) => {
    setActivePage(page);
  };

  const handleRefreshSamples = async () => {
    if (!initData) return;

    try {
      // Сначала проверяем дополнительные вопросы
      const userData = await quizFindAnswer({ 
        init: initData, 
        data_type: ['additional_questions', 'gender'] 
      }).unwrap();

      if (userData.answers) {
        const additionalQuestions = userData.answers['additional_questions'];
        const gender = userData.answers['gender'];

        if (additionalQuestions === null || additionalQuestions === undefined) {
          refreshSamples({ init: initData });
          const bodyFormPage = gender === 'Ж' ? '/girl-body-form' : '/body-form';
          navigate(bodyFormPage);
          toast.success("Адаптация запущена! Пока она идет, давайте заполним дополнительные вопросы.");
          return; // Выходим, не показывая PreloaderCat
        } else {
          // Если дополнительные вопросы уже заполнены, запускаем адаптацию и показываем PreloaderCat
          await refreshSamples({ init: initData });
          
          setTimeout(() => {
            navigate("/trains");
            toast.success("Адаптация завершена!");
          }, 2000);
        }
      } else {
        refreshSamples({ init: initData });
        navigate("/body-form");
        toast.success("Адаптация запущена! Пока она идет, давайте заполним дополнительные вопросы.");
      }
    } catch (error) {
      console.error("Ошибка при проверке дополнительных вопросов:", error);
      // В случае ошибки все равно редиректим на страницу выбора формы
      navigate("/body-form");
      toast.success("Адаптация запущена! Пока она идет, давайте заполним дополнительные вопросы.");
    }
  };

  const handleSkipRefreshSamples = async () => {
    toast.success("Выбор оборудования пропущен!");
    await handleRefreshSamples();
  };

  if (isLoading) return <Preloader />;
  if (isRefreshLoading) return <PreloaderCat />;

  const { equipments } = data;

  return (
    <div className="equipments-page">
      <div className="container">
        <TopNav
          activePage={activePage}
          linkPath={"/more"}
          handleSetActivePage={handleSetActivePage}
          backArrowNoAvailable={adaptiveMode}
          title={
            activePage === 0
              ? "Настройки оборудования"
              : equipments[activePage - 1]?.title || "Неизвестная страница"
          }
        />
        {pageComponents(handleSetActivePage, equipments)[activePage]}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          position: "sticky",
          bottom: "0px",
          padding: "20px 0 10px",
          backgroundColor: "rgb(245 245 245 / 85%)",
          flexDirection: "column",
        }}
      >
        {adaptiveMode && (
          <ActionButton
            label="Пропустить"
            isBig
            isWhiteIcon
            onClick={handleSkipRefreshSamples}
            btnClassName="!bg-transparent !text-[--color-black] w-[173px] text-center flex items-center justify-center !border-[1px] !border-solid !border-[--color-black] transition-all active:bg-[#1bd730] hover:text-[--color-white] !py-[16px]"
          />
        )}
        <ActionButton
          label="Адаптировать"
          icon={SparklesIcon}
          isBig
          onClick={handleRefreshSamples}
          btnClassName="!py-[16px]"
        />

        <span className="text-[12px] text-[--color-unimportant] text-center mt-3 !px-[16px] max-w-[300px]">
          *Выберите оборудование, которое у вас есть и в самом конце нажмите
          кнопку <span className="text-[#1bd730]">Адаптировать</span>.{" "}
          {adaptiveMode && "Либо вы можете пропустить этот этап"}
        </span>
      </div>
    </div>
  );
};
