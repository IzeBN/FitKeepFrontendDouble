import React, { useState, useEffect } from "react";
import styles from "./GriphSizes.module.scss";
import { ReactComponent as GrayGriph } from "../../assets/img/griph-gray.svg";
import { ReactComponent as GreenGriph } from "../../assets/img/griph-green.svg";
import {
  useGetUpdatedEquipmentsMutation,
  useUpdateEquipmentsMutation,
} from "../../store/equipmentsApi";
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

interface GriphSizesProps {
  details: Detail[];
}

interface InputData {
  init: string | undefined;
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

const tg = window.Telegram.WebApp;

export const GriphSizes: React.FC<GriphSizesProps> = ({ details }) => {
  const [initData, setInitData] = useState<string | undefined>(undefined);
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [inputData, setInputData] = useState<InputData>({
    init: undefined,
    equipments: [],
  });

  const [updateEquipments] = useUpdateEquipmentsMutation();
  const [getUpdatedEquipments] = useGetUpdatedEquipmentsMutation();

  // Устанавливаем initData только один раз
  useEffect(() => {
    if (!initData) {
      tg.ready();
      setInitData(tg?.initData);
    }
  }, [initData]);

  // Получаем обновленные данные о выбранных опциях
  const handleGetUpdatedEquipments = async () => {
    if (!initData) return;

    try {
      const response = await getUpdatedEquipments({ init: initData }).unwrap();
      if (response?.choices) {
        const indices = response.choices.map((choice: Choice) =>
          details[1].options.findIndex(
            (option) => option.id === choice.option_id
          )
        );
        if (JSON.stringify(indices) !== JSON.stringify(activeIndexes)) {
          setActiveIndexes(indices);
        }
      }
    } catch (error) {
      console.error("Get updated equipment error:", error);
    }
  };

  // Обновляем данные на сервере
  const handleUpdate = async () => {
    try {
      const response = await updateEquipments(inputData).unwrap();
      if (response?.choices) {
        const indices = response.choices.map((choice: Choice) =>
          details[1].options.findIndex(
            (option) => option.id === choice.option_id
          )
        );
        setActiveIndexes(indices);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // Обработчик кликов
  const handleClick = (index: number, size: Size) => {
    const isAlreadyActive = activeIndexes.includes(index);

    // Показываем тост перед обновлением состояния
    if (isAlreadyActive) {
      toast("Удалено");
    } else {
      toast.success("Добавлено");
    }

    // Обновляем активные индексы
    setActiveIndexes((prev) =>
      isAlreadyActive ? prev.filter((i) => i !== index) : [...prev, index]
    );

    // Обновляем inputData
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

  // Получаем обновления при изменении initData
  useEffect(() => {
    handleGetUpdatedEquipments();
  }, [initData]);

  // Отправляем данные при изменении inputData
  useEffect(() => {
    if (inputData.equipments.length > 0 && inputData.equipments[0].option_id) {
      handleUpdate();
    }
  }, [inputData]);

  return (
    <div className={styles.root}>
      {details && <h2 className="main-title">{details[1].name}</h2>}
      {details &&
        details[1].options.map((item, index) => {
          const isActive = activeIndexes.includes(index);
          return (
            <div
              key={index}
              className={`${styles.root__item} ${
                isActive ? styles.root_active : ""
              }`}
              onClick={() => handleClick(index, item)}
            >
              <span>{item.value}</span>
              {isActive ? <GreenGriph /> : <GrayGriph />}
            </div>
          );
        })}
    </div>
  );
};
