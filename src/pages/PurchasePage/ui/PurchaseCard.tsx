import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/shared/ui";
import { Tarif } from "@/widgets/subscription-slider/model/types";
import { baseTarifs } from "@/widgets/subscription-slider/model/constants";

import styles from "./PurchaseCard.module.scss";
import IconDone from "@/assets/done.png";
import BadgeIcon from "@/assets/badge.png";
import { cn } from "@/shared/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { Service } from "../model/enums";
import { useCreatePaymentMutation } from "@/store/paymentApi";

type PurchaseCardProps = {
  tarif: Tarif;
  initData: string;
};

type FormValues = {
  email: string;
};

export const PurchaseCard: FC<PurchaseCardProps> = ({ tarif, initData }) => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<FormValues>();
  const [createPayment] = useCreatePaymentMutation();

  if (!tarif) return null;

  const serviceMap: Record<number, Service> = {
    1: Service.ThreeMonths,
    2: Service.Year,
    3: Service.NoLimit,
    4: Service.Year, // Pro Trial использует тот же сервис что и Pro
  };

  const service = serviceMap[tarif.id];

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await createPayment({
        init: initData,
        email: data.email,
        service,
        is_trial: tarif.is_trial || false,
      }).unwrap();

      const { payment_url } = response;

      if (payment_url) {
        window.location.href = payment_url;
      } else {
        console.error("payment_url отсутствует в ответе");
      }
    } catch (error) {
      console.error("Ошибка при создании платежа:", error);
    }
  };

  return (
    <div className={`${styles.slide} ${tarif.is_trial ? styles.trialSlide : ''}`}>
      <h3 className={styles.title}>
        {tarif.tarif_type}
        {tarif.is_trial && (
          <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
            ПРОБНЫЙ
          </span>
        )}
      </h3>
      <p className="text-[14px] text-[#7E7E7E] font-[400] my-0">
        {tarif.is_trial ? `${tarif.trial_period} за ${tarif.trial_price} ₽` : tarif.period}
      </p>

      <ul>
        {tarif.features.map((feature, i) => (
          <li key={i} className="flex gap-3 items-center my-4 text-[#292929]">
            <img className="w-[20px]" src={BadgeIcon} alt="BadgeIcon" />
            <span>{feature}</span>
          </li>
        ))}
        {baseTarifs.map((feature, i) => (
          <li key={i} className="flex gap-3 items-center my-4 text-[#696969]">
            <img className="w-[20px]" src={IconDone} alt="IconDone" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <h4 className={styles.price}>
        {tarif.is_trial 
          ? `${tarif.trial_price} ₽ за ${tarif.trial_period}`
          : tarif.id === 3 ? `${tarif.price} ₽` : tarif.pricePerTime
        }
      </h4>
      
      {tarif.is_trial && (
        <div className={styles.trialInfo}>
          <p className={styles.trialPrice}>
            Затем {tarif.pricePerTime}
          </p>
          <p className={styles.autoRenewal}>
            Автопродление можно отменить в любой момент
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <Input
          name="email"
          control={control}
          type="email"
          placeholder="Ваш e-mail"
          rules={{
            required: "Поле обязательно",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Некорректный e-mail",
            },
          }}
        />
        <button
          type="submit"
          className={cn(
            "text-white w-full font-[700] text-[20px] py-[10px] px-[20px] rounded-[36px] transition duration-300 ease-in-out active:bg-[#01BB16]/40",
            tarif.is_trial 
              ? "bg-green-500 hover:bg-green-600" 
              : "bg-[#01BB16]"
          )}
        >
          {tarif.is_trial ? "Начать пробный период" : "Перейти к оплате"}
        </button>
      </form>
    </div>
  );
};
