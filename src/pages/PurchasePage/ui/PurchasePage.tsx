import { Menu, TopNav } from "@/components";
import { PurchaseCard } from "./PurchaseCard";
import { useParams } from "react-router-dom";
import { subscriptionsList } from "@/widgets/subscription-slider/model/constants";
import { Tarif } from "@/widgets";
import { useEffect, useState } from "react";
import { tg } from "@/constants";
import { useAddUserActionMutation } from "@/store/usersApi";

export const PurchasePage = () => {
  const { id } = useParams();
  const currentTarifId = Number(id) || 1;
  const currentTarif: Tarif = subscriptionsList.find(tarif => tarif.id === currentTarifId) || subscriptionsList[0];
  const [initData, setInitData] = useState<string>();
  const [addUserAction] = useAddUserActionMutation();


  useEffect(() => {
    if (!initData && tg?.initData) {
      setInitData(tg.initData);
    }
  }, []);

  useEffect(() => {
    const sendAction = async () => {
      if (tg?.initData && currentTarif) {
        try {
          await addUserAction({
            init: tg.initData,
            action: `Выбрал тариф ${currentTarif.tarif_type}`
          }).unwrap();
        } catch (error) {
          console.error("Ошибка при отправке действия пользователя:", error);
        }
      }
    };

    sendAction();
  }, [addUserAction, currentTarif]);

  if (!currentTarif) {
    return (
      <div data-testid="PurchasePage">
        <TopNav
          linkPath={"/subscription"}
          handleSetActivePage={() => null}
          title={"Ошибка"}
        />
        <div className="py-6 text-center">
          <p>Тариф не найден</p>
        </div>
        <Menu active={2} />
      </div>
    );
  }

  return (
    <div data-testid="PurchasePage">
      <TopNav
        linkPath={"/subscription"}
        handleSetActivePage={() => null}
        title={"Оформление подписки"}
      />
      <div className="py-6">
        {initData ? (
          <div className="py-6">
            <PurchaseCard initData={initData} tarif={currentTarif} />
          </div>
        ) : (
          <div className="py-6 text-center">
            <p>Загрузка...</p>
          </div>
        )}
      </div>
      <Menu active={2} />
    </div>
  );
};
