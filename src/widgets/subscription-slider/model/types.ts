export type Tarif = {
  tarif_type: string;
  prev_price: string;
  price: number;
  features: string[];
  period: string;
  pricePerTime: string;
  id: number;
  is_trial?: boolean;
  trial_price?: number;
  trial_period?: string;
};

export type SubscriptionSliderProps = {
  subscriptions: Tarif[];
};
