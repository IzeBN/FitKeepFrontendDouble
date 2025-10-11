import styles from "./Preloader.module.scss";
import CatPreloader from "@/assets/cat-preloader.gif";
// import { useGetFreeTrainingsQuery } from "@/store/trainingsApi";
import {  TestimonialsWidget } from "./ui";
import { testimonialsArray } from "./model";
import { ShortcutAlertBanner } from "@/widgets";

export const PreloaderCat = ({ hasMenu }: { hasMenu?: boolean }) => {
  // const { data: trainings = [] } = useGetFreeTrainingsQuery();

  return (
    <div
      className={styles.root}
      style={{
        zIndex: hasMenu ? "-1" : "1",
        flexDirection: "column",
        gap: "10px",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <ShortcutAlertBanner className="!absolute !top-0 !z-[15]" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: "0 auto",
        }}
        className="!mt-[65px]"
      >
        <img src={CatPreloader} className={styles.cat} alt="cat" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ color: "#a186dd", marginBottom: "10px" }}>
            Идет адаптация шаблона
          </h3>
          <span>Пожалуйста, не закрывайте приложение</span>
        </div>
      </div>

      {/* <FreeTrainsWidget trainings={trainings} /> */}
      <TestimonialsWidget testimonials={testimonialsArray} />
    </div>
  );
};
