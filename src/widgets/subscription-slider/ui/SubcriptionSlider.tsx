import { FC, useRef, useState } from "react";

import styles from "./SubcriptionSlider.module.scss";
import { SubscriptionSliderProps } from "../model/types";
import { SubcriptionSlide } from "./SubcriptionSlide";

export const SubscriptionSlider: FC<SubscriptionSliderProps> = ({
  subscriptions,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    if (sliderRef.current && subscriptions.length > 0) {
      const slideWidth = sliderRef.current.children[0].clientWidth;
      const nextIndex = (currentIndex + 1) % subscriptions.length;

      if (nextIndex === 0) {
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        setCurrentIndex(0);
      } else {
        sliderRef.current.scrollBy({ left: slideWidth, behavior: "smooth" });
        setCurrentIndex(nextIndex);
      }
    }
  };

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.sliderContainer} ref={sliderRef}>
        {subscriptions.map((tarif, index) => (
          <SubcriptionSlide
            tarif={tarif}
            index={index}
            currentIndex={currentIndex}
          />
        ))}
      </div>
      <button className={styles.nextButton} onClick={goToNextSlide}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};
