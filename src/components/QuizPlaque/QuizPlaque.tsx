import style from "./QuizPlaque.module.scss";
export const QuizPlaque = () => {
  return (
    <div className={style.root}>
      <div className={style.root__title}>
        16-часовое ежедневное голодание. <br />
        Вы сделали это?
      </div>
      <div className={style.root__btns}>
        <button className={style.root__btn + " green-btn"}>
          😇<span>Да</span>
        </button>
        <button className={style.root__btn + " red-btn"}>
          😳<span>Нет</span>
        </button>
      </div>
    </div>
  );
};
