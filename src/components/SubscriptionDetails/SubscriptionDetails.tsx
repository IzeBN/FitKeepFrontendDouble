import React from 'react';

type SubscriptionDetailsProps = {
  serviceTitle: string;
  startDate?: string;
  endDate?: string | null;
};

export const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  serviceTitle,
  startDate,
  endDate
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '16px',
      margin: '8px 0',
      borderRadius: '12px',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '12px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#362f41'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#01bb16',
          marginRight: '8px'
        }} />
        {serviceTitle}
      </div>
      
      <div style={{ fontSize: '14px', color: '#666' }}>
        {startDate && (
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: '500' }}>Начало:</span> {formatDate(startDate)}
          </div>
        )}
        {endDate ? (
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: '500' }}>До:</span> {formatDate(endDate)}
          </div>
        ) : (
          <div style={{ 
            marginBottom: '8px',
            color: '#01bb16',
            fontWeight: '500'
          }}>
            Безлимитная подписка
          </div>
        )}
      </div>
    </div>
  );
};
