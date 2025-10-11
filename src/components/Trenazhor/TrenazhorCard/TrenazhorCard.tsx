import { useState, useEffect } from "react";

import { useUpdateEquipmentsMutation } from "@/store/equipmentsApi";
import styles from "./TrenazhorCard.module.scss";
import RemoveIcon from "@/assets/close.png";
import AddIcon from "@/assets/plus-icon.png";
import SpinnerIcon from "@/assets/change2.png";
import toast from "react-hot-toast";

type Sizes = {
  id: number;
  equipment_id: number;
  detail_id: number;
  value: string;
};

interface TrenazhorCardProps {
  picture: string;
  title: string;
  sizes: Sizes[];
  activeIndexes: number[];
  initData?: string;
  selectedDetailsWithoutWeights: number[];
  detailId: number;
  onUpdateSuccess?: () => void; // callback для обновления родителя
}

export const TrenazhorCard: React.FC<TrenazhorCardProps> = ({
  picture,
  title,
  sizes,
  activeIndexes,
  initData,
  selectedDetailsWithoutWeights,
  detailId,
  onUpdateSuccess,
}) => {
  const [activeSizes, setActiveSizes] = useState<boolean[]>(
    Array(sizes.length).fill(false)
  );
  const [updateEquipments] = useUpdateEquipmentsMutation();

  // Локальное состояние для отображения спиннера на конкретной кнопке
  const [loadingButton, setLoadingButton] = useState<"add" | "remove" | null>(
    null
  );

  const isCardSelectedWithoutWeights =
    selectedDetailsWithoutWeights.includes(detailId);

  useEffect(() => {
    setActiveSizes(sizes.map((_, idx) => activeIndexes.includes(idx)));
  }, [activeIndexes, sizes]);

  const handleActiveSizes = async (index: number, size: Sizes) => {
    const updated = activeSizes.map((active, i) =>
      i === index ? !active : active
    );
    setActiveSizes(updated);

    if (initData) {
      const hasActive = updated[index];
      if (hasActive) {
        toast.success("Добавлено");
      } else {
        toast("Удалено");
      }

      try {
        await updateEquipments({
          init: initData,
          equipments: [
            {
              equipment_id: size.equipment_id,
              detail_id: size.detail_id,
              option_id: size.id,
            },
          ],
        }).unwrap();

        onUpdateSuccess?.();
      } catch (err) {
        console.error("Update error:", err);
      }
    }
  };

  // Обновленная функция для добавления/удаления с option_id: null и detail_id текущий
  const handleActive = async (add: boolean) => {
    if (!initData) return;
    if (add) {
      toast.success("Добавлено");
    } else {
      toast("Удалено");
    }

    setLoadingButton(add ? "add" : "remove");

    try {
      await updateEquipments({
        init: initData,
        equipments: [
          {
            equipment_id: 2,
            detail_id: detailId,
            option_id: null,
          },
        ],
      }).unwrap();

      await new Promise((resolve) => setTimeout(resolve, 50));
      onUpdateSuccess?.();
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setTimeout(() => {
        setLoadingButton(null);
      }, 350);
    }
  };

  const hasActiveWeights = activeSizes.some((v) => v);

  return (
    <div className={styles.root}>
      <div className={styles.root__top}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            onClick={() => handleActive(true)}
            className={`${styles.root__picture} ${
              isCardSelectedWithoutWeights ? styles.root__selected : ""
            }`}
            style={{ position: "relative" }} // Чтобы кнопки можно было позиционировать
          >
            <img src={picture} alt="Фото тренажера" />
          </div>
          <div className={styles.root__title}>{title}</div>
        </div>
        <div className={styles.root__buttons}>
          {!hasActiveWeights && !isCardSelectedWithoutWeights && (
            <button
              className={styles.addButton}
              onClick={() => handleActive(true)}
              title="Добавить"
              type="button"
              disabled={loadingButton !== null}
            >
              {loadingButton === "add" ? (
                <img
                  src={SpinnerIcon}
                  alt="Загрузка"
                  className={styles.spinner}
                />
              ) : (
                <img src={AddIcon} alt="Добавить" />
              )}
            </button>
          )}
          {isCardSelectedWithoutWeights && (
            <button
              className={styles.removeButton}
              onClick={() => handleActive(false)}
              title="Удалить"
              type="button"
              disabled={loadingButton !== null}
            >
              {loadingButton === "remove" ? (
                <img
                  src={SpinnerIcon}
                  alt="Загрузка"
                  className={styles.spinner}
                />
              ) : (
                <img src={RemoveIcon} alt="Удалить" />
              )}
            </button>
          )}
        </div>
      </div>
      <div className={styles.root__sizes}>
        {sizes.map((item, key) => (
          <div
            key={key}
            className={`${styles.root__size} ${
              activeSizes[key] ? styles.root_active : ""
            }`}
            onClick={() => handleActiveSizes(key, item)}
          >
            {item.value.split(" ")[0]}
          </div>
        ))}
      </div>
      <span className={styles.root__text}>Шаг веса в тренажере</span>
    </div>
  );
};
