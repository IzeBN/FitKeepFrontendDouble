import React, { useState, useEffect } from "react";
import styles from "./InventoryPlace.module.scss";
import {
  useGetUpdatedEquipmentsMutation,
  useUpdateEquipmentsMutation,
} from "../../../store/equipmentsApi";
import toast from "react-hot-toast";

interface InventoryItem {
  id: number;
  name: string;
  title_photo: string;
}

interface InventoryProps {
  items: InventoryItem[];
}

const tg = window.Telegram.WebApp;

export const InventoryPlace: React.FC<InventoryProps> = ({ items }) => {
  const [initData, setInitData] = useState<string | undefined>(undefined);
  const [activeItems, setActiveItems] = useState<number[]>([]); // Состояние активных элементов
  const [getUpdatedEquipments] = useGetUpdatedEquipmentsMutation();
  const [updateEquipments] = useUpdateEquipmentsMutation();

  useEffect(() => {
    tg.ready();

    // Устанавливаем initData, если оно ещё не задано
    if (!initData && tg?.initData) {
      setInitData(tg.initData);
    }
  }, [initData]);

  useEffect(() => {
    if (!initData) return; // Ждём, пока initData инициализируется

    const fetchUpdatedEquipments = async () => {
      try {
        const response = await getUpdatedEquipments({
          init: initData,
        }).unwrap();

        if (response?.choices) {
          const activeIds = response.choices.map(
            (choice: { detail_id: number }) => choice.detail_id
          );
          setActiveItems(activeIds);
        }
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchUpdatedEquipments();
  }, [initData, getUpdatedEquipments]);

  const handleToggleItem = async (id: number) => {
    const isActive = activeItems.includes(id);
    if (isActive) {
      toast("Удалено");
    } else {
      toast.success("Добавлено");
    }
    setActiveItems((prev) =>
      isActive ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );

    try {
      const updatedInputData = {
        init: initData,
        equipments: [
          {
            equipment_id: 1,
            detail_id: id,
            option_id: null,
          },
        ],
      };

      await updateEquipments(updatedInputData).unwrap();

      // Показываем toast в зависимости от активности
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  return (
    <div className={styles.root}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`${styles.root__item} ${
            activeItems.includes(item.id) ? styles.root_active : ""
          }`}
          onClick={() => handleToggleItem(item.id)}
        >
          <div className={styles.root__picture}>
            <img src={item.title_photo} alt={item.name} />
          </div>
          <span className={styles.root__title}>{item.name}</span>
        </div>
      ))}
    </div>
  );
};
