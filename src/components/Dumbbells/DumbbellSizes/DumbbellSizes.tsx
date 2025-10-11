import React, { useState, useEffect } from "react";
import styles from "./DumbbellSizes.module.scss";
import {
  useGetUpdatedEquipmentsMutation,
  useUpdateEquipmentsMutation,
} from "../../../store/equipmentsApi";
import toast from "react-hot-toast";

// Типы данных
interface Size {
  id: number;
  equipment_id: number;
  detail_id: number;
  value: string;
}

interface Detail {
  id: number;
  equipment_id: number;
  title_photo: string | null;
  name: string;
  type: string;
  options: Size[];
}

interface DumbbellSizesProps {
  details: Detail[];
}

interface InputData {
  init: any;
  equipments: {
    equipment_id: number;
    detail_id: number;
    option_id: number;
  }[];
}

interface Choice {
  equipment_id: number;
  detail_id: number;
  option_id: number;
}

export const DumbbellSizes: React.FC<DumbbellSizesProps> = ({ details }) => {
  const [initData, setInitData] = useState<string | undefined>(undefined);
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [inputData, setInputData] = useState<InputData | null>(null);
  const [updateEquipments] = useUpdateEquipmentsMutation();
  const [getUpdatedEquipments] = useGetUpdatedEquipmentsMutation();

  // Установка initData только один раз
  useEffect(() => {
    if (!initData && window.Telegram?.WebApp?.initData) {
      window.Telegram.WebApp.ready();
      setInitData(window.Telegram.WebApp.initData);
    }
  }, [initData]);

  // Обновление списка активных индексов при загрузке данных
  const handleGetUpdatedEquipments = async () => {
    try {
      const response = await getUpdatedEquipments({ init: initData }).unwrap();
      if (response?.choices) {
        const indices = response.choices.map((choice: Choice) =>
          details[0].options.findIndex(
            (option) => option.id === choice.option_id
          )
        );
        setActiveIndexes(indices);
      }
    } catch (error) {
      console.error("Error fetching updated equipment:", error);
    }
  };

  // Обновление активных индексов при изменении initData
  useEffect(() => {
    if (initData) {
      handleGetUpdatedEquipments();
    }
  }, [initData]);

  // Обновление данных на сервере
  const handleUpdate = async () => {
    if (inputData) {
      try {
        await updateEquipments(inputData).unwrap();
      } catch (error) {
        console.error("Error updating equipment:", error);
      }
    }
  };

  // Обновление при изменении inputData
  useEffect(() => {
    if (inputData) {
      handleUpdate();
    }
  }, [inputData]);

  // Обработчик клика
  const handleClick = (index: number, size: Size) => {
    const isAlreadyActive = activeIndexes.includes(index);

    // Показываем тост в зависимости от состояния
    if (isAlreadyActive) {
      toast("Удалено");
    } else {
      toast.success("Добавлено");
    }

    // Обновляем активные индексы
    setActiveIndexes((prev) =>
      isAlreadyActive ? prev.filter((i) => i !== index) : [...prev, index]
    );

    // Обновляем данные для отправки на сервер
    setInputData({
      init: initData,
      equipments: [
        {
          equipment_id: size.equipment_id,
          detail_id: size.detail_id,
          option_id: size.id,
        },
      ],
    });
  };

  return (
    <div className={styles.root}>
      {details && <h2 className="main-title">{details[0].name}</h2>}
      {details &&
        details[0].options.map((weight, index) => (
          <div
            key={index}
            className={`${styles.root__item} ${
              activeIndexes.includes(index) ? "active" : ""
            }`}
            onClick={() => handleClick(index, weight)}
          >
            {weight.value}
          </div>
        ))}
    </div>
  );
};
