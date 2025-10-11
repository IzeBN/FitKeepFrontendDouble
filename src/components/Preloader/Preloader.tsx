import styles from "./Preloader.module.scss";
import loaderGif from "@/assets/img/loadingspinner.gif";

export const Preloader = ({ hasMenu }: { hasMenu?: boolean }) => {
  return (
    <div className={styles.root} style={{ zIndex: hasMenu ? "-1" : "999999" }}>
      <img
        src={loaderGif}
        className="opacity-60"
        style={{ marginTop: hasMenu ? "-10vh" : "0" }}
        alt=""
      />
    </div>
  );
};
