import React from 'react';
import { useRequiredReviewsCheck } from '@/shared/hooks/useRequiredReviewsCheck';
import { Testimonials } from '../Testimonials';
import { Preloader } from '@/components';

interface TestimonialsWrapperProps {
  children: React.ReactNode;
}

export const TestimonialsWrapper: React.FC<TestimonialsWrapperProps> = ({ children }) => {
  const { shouldShowTestimonials, isLoading, hideTestimonials } = useRequiredReviewsCheck();

  if (isLoading) {
    return <Preloader />;
  }

  // Если нужно показать отзывы, показываем их вместо дочерних компонентов
  if (shouldShowTestimonials) {
    return <Testimonials onHide={hideTestimonials} />;
  }

  // Иначе показываем обычное содержимое
  return <>{children}</>;
};
