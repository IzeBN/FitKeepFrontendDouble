import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuizFindAnswerMutation } from '@/store/usersApi';
import { tg } from '@/constants';

export const useRequiredReviewsCheck = () => {
  const [shouldShowTestimonials, setShouldShowTestimonials] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quizFindAnswer] = useQuizFindAnswerMutation();
  const location = useLocation();

  useEffect(() => {
    const checkRequiredReviews = async () => {
      // Проверяем, что мы находимся на странице /trains
      if (location.pathname !== '/trains') {
        setShouldShowTestimonials(false);
        setIsLoading(false);
        return;
      }

      if (!tg?.initData) {
        setIsLoading(false);
        return;
      }

      try {
        const result = await quizFindAnswer({
          init: tg.initData,
          data_type: ['required_reviews']
        }).unwrap();

        // Если required_reviews равен null, показываем отзывы
        const shouldShow = result.answers?.required_reviews === null;
        setShouldShowTestimonials(shouldShow);
      } catch (error) {
        console.error('Ошибка при проверке обязательных отзывов:', error);
        setShouldShowTestimonials(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkRequiredReviews();
  }, [quizFindAnswer, location.pathname]);

  const hideTestimonials = () => {
    setShouldShowTestimonials(false);
  };

  return {
    shouldShowTestimonials,
    isLoading,
    hideTestimonials
  };
};
