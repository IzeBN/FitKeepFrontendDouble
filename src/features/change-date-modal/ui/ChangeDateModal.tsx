import styles from "./ChangeDateModal.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import changeDateIcon from "@/assets/clock.png";
import loadIcon from "@/assets/change.png";

type ChangeDateModalProps = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  onClose: () => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const ChangeDateModal: React.FC<ChangeDateModalProps> = ({
  selectedDate,
  setSelectedDate,
  onClose,
  onSubmit,
  isLoading,
}) => (
  <>
    <div className={styles.overlay} onClick={onClose}></div>
    <div className={styles.modal}>
      <h3>Новая дата</h3>
      <form onSubmit={onSubmit} className={styles.modal__form}>
        <div className={styles.modal__line}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className={styles.datePicker}
            placeholderText="Выберите дату"
            customInput={<input readOnly />}
          />
          <button
            type="submit"
            className={styles.saveBtn}
            disabled={!selectedDate}
          >
            {isLoading ? (
              <img
                src={loadIcon}
                className={styles.root__button__icon + " " + styles.loadIcon}
                alt=""
              />
            ) : (
              <img
                src={changeDateIcon}
                className={styles.root__button__icon}
                alt=""
              />
            )}
            <span>Сохранить</span>
          </button>
        </div>
      </form>
    </div>
  </>
);
