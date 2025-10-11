import { FC, useRef, useState } from "react";
import styles from "./Slider.module.scss";
import { SelectSample } from "@/entities/user";
import { Link } from "react-router-dom";
import SparkleIcon from "@/assets/sparkles.png";

type SliderProps = {
  templates: SelectSample[] | undefined | "Required ancet" | "Selected";
  chooseTemplate: (sampleId: number) => void;
  isTemplateLoading: boolean;
  slidesTotal: number;
};

export const Slider: FC<SliderProps> = (props) => {
  const { templates, chooseTemplate, isTemplateLoading } = props;
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded((prev) => !prev);

  const goToNextSlide = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.children[0].clientWidth;
      const nextIndex = templates ? (currentIndex + 1) % templates.length : 0;

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
      {templates &&
        templates !== "Required ancet" &&
        templates !== "Selected" &&
        templates.map((item, index) => (
          <div key={index} className={styles.slide}>
            <Link to={`/recomend-template/${index + 1}`}>
              <img
                src={item.trainings[0]?.title_photo}
                alt={String(item.sample_title)}
                className={styles.image}
              />

              <h3 className={styles.title}>{item.sample_title}</h3>
              <p
                className={`${styles.trunky_description} ${
                  isExpanded ? styles.expanded : styles.masked
                }`}
                onClick={handleToggle}
              >
                {item.description}
              </p>
            </Link>

            <button
              className={styles.chooseButton}
              disabled={isTemplateLoading}
              onClick={() => chooseTemplate(item.sample_id)}
            >
              <img
                className="w-[20px] invert-[1]"
                src={SparkleIcon}
                alt="SparkleIcon"
              />
              <span>Адаптировать под себя</span>
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
