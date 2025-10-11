import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddAnswerMutation, AnswerType } from '@/store/quizApi';
import { tg } from '@/constants';
import toast from 'react-hot-toast';
import styles from './Testimonials.module.scss';

// Импорт изображений
import testimonial1 from '@/assets/testimonials/1.png';
import testimonial2 from '@/assets/testimonials/2.png';
import testimonial3 from '@/assets/testimonials/3.png';
import testimonial4 from '@/assets/testimonials/4.png';
import testimonial5 from '@/assets/testimonials/5.png';

// Данные отзывов клиентов
const testimonialsData = [
  {
    id: 1,
    image: testimonial1,
    duration: '4 недель',
    rating: 5,
    text: 'Меня всегда беспокоили мои дряблые руки и бедра. Но благодаря этому приложению я впервые вижу, как эти упрямые зоны подтягиваются!'
  },
  {
    id: 2,
    image: testimonial2,
    duration: '6 недель',
    rating: 5,
    text: 'Невероятные результаты! За 6 недель я потеряла 8 кг и чувствую себя намного увереннее. Приложение стало моим лучшим помощником.'
  },
  {
    id: 3,
    image: testimonial3,
    duration: '8 недель',
    rating: 5,
    text: 'Я никогда не думала, что смогу так быстро привести себя в форму. Тренировки стали частью моей жизни, и я люблю каждую минуту!'
  },
  {
    id: 4,
    image: testimonial4,
    duration: '3 недель',
    rating: 5,
    text: 'Потрясающее приложение! Уже через 3 недели я заметила изменения в своем теле. Рекомендую всем, кто хочет изменить свою жизнь.'
  },
  {
    id: 5,
    image: testimonial5,
    duration: '5 недель',
    rating: 5,
    text: 'Лучшее приложение для фитнеса! Персонализированные тренировки и мотивация помогли мне достичь невероятных результатов.'
  }
];

interface TestimonialsProps {
  onHide: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onHide }) => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [quizAnswer] = useAddAnswerMutation();

  // Автоматическое переключение отзывов каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = async () => {
    if (!tg?.initData) {
      toast.error('Ошибка инициализации приложения');
      return;
    }

    try {
      // Отправляем запрос на /quiz/answer/add
      await quizAnswer({
        init: tg.initData,
        question_id: 2001,
        answer: 'next',
        answer_type: AnswerType.ONE_BUTTON
      }).unwrap();

      onHide(); // Скрываем отзывы
      navigate('/trains');
    } catch (error) {
      console.error('Ошибка при отправке ответа:', error);
      toast.error('Произошла ошибка при отправке ответа');
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentTestimonial(index);
  };

  const handlePrevious = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
  };

  // Обработка свайпов
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextTestimonial();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  const currentData = testimonialsData[currentTestimonial];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.timeAndUser}>
          <span className={styles.time}>23:26</span>
          <div className={styles.userIcon}>👤</div>
        </div>
        <div className={styles.statusBar}>
          <div className={styles.signal}>📶</div>
          <div className={styles.wifi}>📶</div>
          <div className={styles.battery}>
            <span>11</span>
            <div className={styles.batteryIcon}>🔋</div>
          </div>
        </div>
      </div>

      {/* Back Arrow */}
      <div className={styles.backArrow}>
        <button className={styles.backButton}>←</button>
      </div>

      {/* Title */}
      <h1 className={styles.title}>
        ОСТАВАЙТЕСЬ МОТИВИРОВАННЫМИ БЛАГОДАРЯ ИСТОРИЯМ УСПЕХА
      </h1>

      {/* Testimonial Card with Swipe Support */}
      <div 
        className={styles.testimonialCard}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.imageContainer}>
          <img 
            src={currentData.image} 
            alt={`Отзыв ${currentData.id}`}
            className={styles.testimonialImage}
          />
          
          {/* Navigation Arrows - positioned over the image */}
          <button 
            className={styles.navButton} 
            onClick={handlePrevious}
            style={{ left: '10px' }}
          >
            ‹
          </button>
          <button 
            className={styles.navButton} 
            onClick={handleNextTestimonial}
            style={{ right: '10px' }}
          >
            ›
          </button>
        </div>
        
        <p className={styles.testimonialText}>
          {currentData.text}
        </p>
      </div>

      {/* Pagination Dots */}
      <div className={styles.pagination}>
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentTestimonial ? styles.activeDot : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>

      {/* Next Button */}
      <button className={styles.nextButton} onClick={handleNext}>
        СЛЕДУЮЩИЕ
      </button>
    </div>
  );
};
