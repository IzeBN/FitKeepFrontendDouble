import React, { useState, useEffect } from "react";
import styles from "./BarbellSizes.module.scss";
import {
  useGetUpdatedEquipmentsMutation,
  useUpdateEquipmentsMutation,
} from "../../../store/equipmentsApi";
import toast from "react-hot-toast";

// Тип для вложенного объекта options
interface Size {
  id: number;
  equipment_id: number;
  detail_id: number;
  value: string;
}

// Тип для основного объекта details
interface Detail {
  id: number;
  equipment_id: number;
  title_photo: string | null; // Если фото отсутствует, оно null
  name: string;
  type: string;
  options: Size[]; // Вложенный массив с типом Size
}

// Тип для пропсов компонента
interface BarbellSizesProps {
  details: Detail[]; // Массив объектов с типом Detail
}

// Тип для структуры inputData
interface InputData {
  init: any;
  equipments: {
    equipment_id: number;
    detail_id: number;
    option_id: number | null;
  }[];
}

// Тип для полученного ответа
interface Choice {
  option_id: number;
}

const tg = window.Telegram.WebApp;

export const BarbellSizes: React.FC<BarbellSizesProps> = ({ details }) => {
  const [initData, setInitData] = useState<string | undefined>(undefined);
  const [updateEquipments] = useUpdateEquipmentsMutation();
  const [getUpdatedEquipments] = useGetUpdatedEquipmentsMutation();
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [inputData, setInputData] = useState<InputData>({
    init: undefined,
    equipments: [],
  });

  // Установка initData только один раз
  useEffect(() => {
    if (!initData) {
      tg.ready();
      setInitData(tg?.initData);
    }
  }, [initData]);

  // Функция для обновления выбранных размеров
  const handleUpdate = async () => {
    try {
      const response = await updateEquipments(inputData).unwrap();
      if (response?.choices) {
        const indices = response.choices.map((choice: Choice) =>
          details[0].options.findIndex(
            (option) => option.id === choice.option_id
          )
        );
        setActiveIndexes(indices);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // Функция для получения данных о выбранных размерах
  const handleGetUpdatedEquipments = async () => {
    if (!initData) return; // Не вызываем до готовности initData

    try {
      const response = await getUpdatedEquipments({ init: initData }).unwrap();
      if (response?.choices) {
        const indices = response.choices.map((choice: Choice) =>
          details[0].options.findIndex(
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

  // Обработчик клика для выбора/снятия выбора размера
  const handleClick = (index: number, size: Size) => {
    const isAlreadyActive = activeIndexes.includes(index);

    // Показываем нужный тост
    if (isAlreadyActive) {
      toast("Удалено");
    } else {
      toast.success("Добавлено");
    }

    // Обновляем список активных индексов
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

  // Получение обновленных размеров при изменении initData
  useEffect(() => {
    if (initData) {
      handleGetUpdatedEquipments();
    }
  }, [initData]);

  // Обновление размеров при изменении inputData
  useEffect(() => {
    if (
      inputData.equipments.length > 0 &&
      inputData.equipments[0].option_id &&
      inputData.init
    ) {
      handleUpdate();
    }
  }, [inputData]);

  // Получены детали оборудования

  return (
    <div className={styles.root}>
      {details && <h2 className="main-title">{details[0].name}</h2>}
      {details &&
        details[0].options.map((weight, index) => (
          <div className={styles.root__circle} key={index}>
            <div
              className={`${styles.root__item} ${
                activeIndexes.includes(index) ? "active" : ""
              }`}
              onClick={() => handleClick(index, weight)}
            ></div>
            {weight.value}
          </div>
        ))}
    </div>
  );
};
