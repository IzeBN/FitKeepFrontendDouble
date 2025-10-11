import { FC } from 'react';

import styles from './SurveyModal.module.scss';
import StikerCat from '@/assets/img/stikers/1.webp';
import { tg } from '@/constants';
import NoteIcon from '@/assets/note.png';
import CloseIcon from '@/assets/close.png';
import classNames from "classnames";

type SurveyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SurveyModal: FC<SurveyModalProps> = (props) => {
  const { isOpen, onClose } = props;

  const handleOpenSurvey = () => {
    window.open("https://t.me/FitGuid_bot?start=getTrainingSample", "_self");
    tg.close();
  };

  return (
    <div className={classNames(styles.overlay, { [styles.active]: isOpen })}>
      <div className={classNames(styles.modal, { [styles.active]: isOpen })}>
        <h2 className={styles.title}>Кажется, вы еще не заполнили анкету</h2>
        <img src={StikerCat} alt={"cat"} />
        <div className={styles.buttonGroup}>
          <button className={styles.closeButton} onClick={onClose}>
            <img src={CloseIcon} alt="CloseIcon" />
          </button>
          <button className={styles.openButton} onClick={handleOpenSurvey}>
            <img src={NoteIcon} alt="Running shoes" />
            Заполнить
          </button>
        </div>
      </div>
    </div>
  );
};