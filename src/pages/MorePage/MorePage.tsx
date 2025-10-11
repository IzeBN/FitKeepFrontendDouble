import { useEffect, useState } from "react";
import { Menu, MorePageMenu, Plaque, SubscriptionDetails } from "@/components";
import { useGetUserMutation } from "@/store/usersApi";
import { tg } from "@/constants";
import { SelectSample } from "@/entities/user";

const MENU_ACTIVE_ITEM = 2;
const SUBSCRIPTION_LINK = "/subscription";

export const MorePage = () => {
  const [getUser, { isLoading }] = useGetUserMutation();

  const [userSubscription, setUserSubscription] = useState<string>("...");
  const [subscriptionInfo, setSubscriptionInfo] = useState<{
    hasActiveSubscription: boolean;
    serviceTitle?: string;
    startDate?: string;
    endDate?: string | null;
  }>({ hasActiveSubscription: false });
  const [isSubscriptionExpanded, setIsSubscriptionExpanded] = useState<boolean>(false);
  const [selectSamples, setSelectSamples] = useState<
    "Selected" | "Required ancet" | SelectSample[] | null
  >(null);
  const [initData, setInitData] = useState<string | null>(null);

  useEffect(() => {
    tg.ready();
    setInitData(tg.initData || null);
  }, []);

  useEffect(() => {
    const handleCreateUser = async () => {
      if (!initData) return;

      try {
        const result = await getUser({ init: initData }).unwrap();

        setSelectSamples(result?.select_samples ?? null);

        const subscription = result?.user?.subscription;
        if (subscription) {
          // Проверяем, есть ли активная подписка
          const hasActiveSubscription = subscription && (
            subscription.end_date === null || // безлимитная подписка
            new Date(subscription.end_date) > new Date() // подписка с датой окончания
          );
          
          // Сохраняем информацию о подписке
          setSubscriptionInfo({
            hasActiveSubscription,
            serviceTitle: subscription.service_title,
            startDate: subscription.start_date,
            endDate: subscription.end_date
          });
          
          if (hasActiveSubscription) {
            setUserSubscription(subscription.service_title);
          } else {
            setUserSubscription("Нет активной подписки");
          }
        } else {
          setSubscriptionInfo({ hasActiveSubscription: false });
          setUserSubscription("Нет подписки");
        }

      } catch (err) {
        console.error("Ошибка получения пользователя:", err);
        setSelectSamples(null);
      }
    };

    handleCreateUser();
  }, [initData, getUser]);

  const isNotSelected = isLoading || Array.isArray(selectSamples);

  // Функция для форматирования даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Обработчик клика по блоку подписки
  const handleSubscriptionClick = () => {
    if (subscriptionInfo.hasActiveSubscription) {
      setIsSubscriptionExpanded(!isSubscriptionExpanded);
    }
  };

  return (
    <div className="more-page">
      <Menu active={MENU_ACTIVE_ITEM} />
      
      {/* Блок подписки */}
      <div>
        <Plaque
          link={subscriptionInfo.hasActiveSubscription ? "" : SUBSCRIPTION_LINK}
          title="Подписка"
          text={userSubscription}
          onClick={subscriptionInfo.hasActiveSubscription ? handleSubscriptionClick : undefined}
        />
        
        {/* Детальная информация о подписке */}
        {subscriptionInfo.hasActiveSubscription && isSubscriptionExpanded && subscriptionInfo.serviceTitle && (
          <SubscriptionDetails
            serviceTitle={subscriptionInfo.serviceTitle}
            startDate={subscriptionInfo.startDate}
            endDate={subscriptionInfo.endDate}
          />
        )}
      </div>
      
      <MorePageMenu disabled={isNotSelected} />
    </div>
  );
};
