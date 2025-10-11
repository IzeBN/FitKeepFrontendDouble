import styles from "./Equipments.module.scss";

interface EquipmentsProps {
  equipments: any;
  handleSetActivePage: (page: number) => void;
}

export const Equipments: React.FC<EquipmentsProps> = ({
  equipments,
  handleSetActivePage,
}) => {
  return (
    <div className={styles.root}>
      {equipments?.map((equipment: any, index: number) => (
        <div
          key={index}
          className={styles.root__item}
          onClick={() => handleSetActivePage(index + 1)}
        >
          <div className={styles.root__picture}>
            <img src={equipment.title_photo} alt="Гантеля" />
          </div>
          <span>{equipment.title}</span>
        </div>
      ))}
    </div>
  );
};
