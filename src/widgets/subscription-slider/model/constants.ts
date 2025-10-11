import { Tarif } from "./types";

export const baseTarifs = [
  "Вход в закрытое сообщество тренирующихся",
  "Участие в Челленджах",
  "Регулярная мотивация",
  "Полный доступ к базе тренировок",
  "Доступ к ИИ тренеру",
];

export const subscriptionsList: Tarif[] = [
  {
    id: 4,
    tarif_type: "Pro Trial",
    prev_price: "3990 ₽ за год.",
    price: 250,
    features: ["Программа питания на базе ваших предпочтений"],
    period: "Год",
    pricePerTime: "2990 ₽ за год.",
    is_trial: true,
    trial_price: 1,
    trial_period: "3 дня",
  },
  {
    id: 1,
    tarif_type: "Start",
    prev_price: "1990 ₽ за 3 мес.",
    price: 330,
    features: [],
    period: "Три месяца",
    pricePerTime: "990 ₽ за 3 мес.",
  },
  {
    id: 2,
    tarif_type: "Pro",
    prev_price: "3990 ₽ за год.",
    price: 250,
    features: ["Программа питания на базе ваших предпочтений"],
    period: "Год",
    pricePerTime: "2990 ₽ за год.",
  },
  {
    id: 3,
    tarif_type: "VIP",
    prev_price: "5990 ₽",
    price: 3990,
    features: [
      "Программа питания на базе ваших предпочтений",
      "Регулярные созвоны с участниками программы и реальным тренером",
    ],
    period: "Безлимит",
    pricePerTime: "",
  },
];
