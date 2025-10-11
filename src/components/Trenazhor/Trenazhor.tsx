import { useEffect, useState } from "react";
import { Preloader, TrenazhorCard } from "../";
import {
  useGetEquipmentsQuery,
  useGetUpdatedEquipmentsMutation,
} from "../../store/equipmentsApi";
import { tg } from "@/constants";

type Choice = {
  equipment_id: number;
  detail_id: number;
  option_id: number | null;
};

interface Detail {
  id: number;
  equipment_id: number;
  title_photo: string | null;
  name: string;
  type: string;
  options: Size[];
}

interface Size {
  id: number;
  equipment_id: number;
  detail_id: number;
  value: string;
}

export const Trenazhor = () => {
  const { data } = useGetEquipmentsQuery({});
  const [selectedDetailsWithoutWeights, setSelectedDetailsWithoutWeights] =
    useState<number[]>([]);
  const [getUpdatedEquipments] = useGetUpdatedEquipmentsMutation();
  const trenazhors = data?.equipments?.[1];
  const details = trenazhors?.details ?? [];

  const [initData, setInitData] = useState<string | undefined>();
  const [activeSizeIndexesMap, setActiveSizeIndexesMap] = useState<
    Record<number, number[]>
  >({});
  const [isShowPreloader, togglePreloader] = useState(true);

  useEffect(() => {
    if (!initData && tg?.initData) {
      tg.ready();
      setInitData(tg.initData);
    }
  }, [initData]);

  // Функция обновления данных из API, которую будем вызывать по завершении мутаций
  const refreshData = async () => {
    if (!initData) return;

    try {
      const response = await getUpdatedEquipments({
        init: initData,
      }).unwrap();

      if (response?.choices) {
        const map: Record<number, number[]> = {};
        const selectedWithoutWeights: number[] = [];

        response.choices.forEach((choice: Choice) => {
          if (choice.option_id === null) {
            selectedWithoutWeights.push(choice.detail_id);
            return;
          }

          const detail = details.find((d: Detail) => d.id === choice.detail_id);
          if (!detail || !detail.options) return;

          const index = detail.options.findIndex(
            (s: Size) => s.id === choice.option_id
          );
          if (index !== -1) {
            if (!map[detail.id]) map[detail.id] = [];
            map[detail.id].push(index);
          }
        });

        setSelectedDetailsWithoutWeights(selectedWithoutWeights);
        setActiveSizeIndexesMap(map);
      }
    } catch (err) {
      console.error("Ошибка при получении выбранных размеров", err);
    }
  };

  // Загрузка данных при инициализации
  useEffect(() => {
    if (initData && data) {
      refreshData();
    }
  }, [initData, data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      togglePreloader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="trenazhor">
      {isShowPreloader && <Preloader />}
      {details.map((item: Detail, key: number) => (
        <TrenazhorCard
          key={key}
          picture={String(item.title_photo)}
          title={item.name}
          sizes={item.options ?? []}
          activeIndexes={activeSizeIndexesMap[item.id] ?? []}
          initData={initData}
          selectedDetailsWithoutWeights={selectedDetailsWithoutWeights}
          detailId={item.id}
          onUpdateSuccess={refreshData}
        />
      ))}
    </div>
  );
};
