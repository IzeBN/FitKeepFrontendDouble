import { useEffect } from "react";
import { Menu, TopNav } from "@/components";
import { SubscriptionGrid, subscriptionsList } from "@/widgets";
import { useAddUserActionMutation } from "@/store/usersApi";
import { tg } from "@/constants";

export const SubscriptionPage = () => {
  const [addUserAction] = useAddUserActionMutation();

  useEffect(() => {
    const sendAction = async () => {
      if (tg?.initData) {
        try {
          await addUserAction({
            init: tg.initData,
            action: "Открыл страницу тарифов"
          }).unwrap();
        } catch (error) {
          console.error("Ошибка при отправке действия пользователя:", error);
        }
      }
    };

    sendAction();
  }, [addUserAction]);

  return (
    <div data-testid="SubscriptionPage">
      <TopNav
        linkPath={"/more"}
        handleSetActivePage={() => null}
        title={"Тарифы"}
      />
      <SubscriptionGrid subscriptions={subscriptionsList} />
      <Menu active={2} />
    </div>
  );
};
