import { useEffect, useMemo, useState } from "react";
import { Menu } from "@/components";
import styles from "./Dashboard.module.scss";
import { ReactComponent as BackArrow } from "@/assets/img/back-arrow.svg";
import { Link } from "react-router-dom";
import { useGetAnalyticMutation } from "@/store/usersApi";
import { tg } from "@/constants";
import { AnalyticPeriod } from "@/store/usersApi";
import { CustomFunnelChart } from "@/widgets/";
import { SelectMultiple } from "@/shared/ui";
import { SelectOption } from "@/shared/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type StepData = {
  step: string;
  users_count: number;
};

// Функция для форматирования даты в YYYY-MM-DD
const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // месяцы с 0
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const DashboardPage = () => {
  const [initData, setInitData] = useState<string | undefined>(undefined);
  const [allSteps, setAllSteps] = useState<StepData[]>([]);
  const [selectedSteps, setSelectedSteps] = useState<StepData[]>([]);
  const [period, setPeriod] = useState<AnalyticPeriod>(
    AnalyticPeriod.ThreeMonths
  );

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [getAnalytic, { isLoading }] = useGetAnalyticMutation();

  const fetchAnalytic = (
    init: string,
    selectedPeriod: AnalyticPeriod,
    start?: Date | null,
    end?: Date | null
  ) => {
    getAnalytic({
      init,
      period: selectedPeriod,
      start_date: start ? formatDate(start) : undefined,
      end_date: end ? formatDate(end) : undefined,
    })
      .unwrap()
      .then((data) => {
        setAllSteps(data);
        setSelectedSteps((prevSelected) => {
          if (data.length === 0) return [];
          const filteredSelected = prevSelected.filter((step) =>
            data.some((d) => d.step === step.step)
          );
          return filteredSelected.length === 0 ? [data[0]] : filteredSelected;
        });
      })
      .catch((err) => {
        console.error("Ошибка при получении аналитики:", err);
        if (err?.status === 403) window.location.href = "/";
      });
  };

  useEffect(() => {
    if (!initData) {
      tg.ready?.();
      setInitData(tg?.initData);
    }

    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, [initData]);

  useEffect(() => {
    if (initData) {
      fetchAnalytic(initData, period, startDate, endDate);
    }
  }, [initData, period, startDate, endDate]);

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value as AnalyticPeriod);
  };

  const periodOptions: { label: string; value: AnalyticPeriod }[] = [
    { label: "Все", value: AnalyticPeriod.All },
    { label: "Неделя", value: AnalyticPeriod.Week },
    { label: "Месяц", value: AnalyticPeriod.Month },
    { label: "3 месяца", value: AnalyticPeriod.ThreeMonths },
    { label: "6 месяцев", value: AnalyticPeriod.SixMonths },
    { label: "Год", value: AnalyticPeriod.Year },
  ];

  const options: SelectOption[] = useMemo(() => {
    const baseOptions = allSteps.map((step) => ({
      label: step.step,
      value: step.step,
    }));
    return [{ label: "Все", value: "all" }, ...baseOptions];
  }, [allSteps]);

  const selectedOptions: SelectOption[] = useMemo(() => {
    const base = selectedSteps.map((step) => ({
      label: step.step,
      value: step.step,
    }));
    const isAllSelected =
      selectedSteps.length === allSteps.length && allSteps.length > 0;
    return isAllSelected ? [{ label: "Все", value: "all" }, ...base] : base;
  }, [selectedSteps, allSteps]);

  const handleStepChange = (option: SelectOption) => {
    if (option.value === "all") {
      const isAllSelected =
        selectedSteps.length === allSteps.length && allSteps.length > 0;
      setSelectedSteps(isAllSelected ? [] : allSteps);
      return;
    }
    const exists = selectedSteps.find((s) => s.step === option.value);
    const newSelection = exists
      ? selectedSteps.filter((s) => s.step !== option.value)
      : [...selectedSteps, allSteps.find((s) => s.step === option.value)!];
    setSelectedSteps(newSelection);
  };

  return (
    <div className={styles.container}>
      <Link to="/admin/" className={styles.backLink}>
        <BackArrow />
        <span>Назад</span>
      </Link>

      <h3 className={styles.title}>Аналитика активности</h3>

      <div className={styles.filter}>
        <label htmlFor="period">Период:</label>
        <select
          id="period"
          value={period}
          onChange={handlePeriodChange}
          className={styles.select}
        >
          {periodOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between gap-3 my-4">
        <label htmlFor="startDate">С:</label>
        <DatePicker
          id="startDate"
          selected={startDate ?? undefined}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Дата начала"
          className={styles.datePicker}
          maxDate={endDate ?? new Date()}
          isClearable
        />

        <label htmlFor="endDate">По:</label>
        <DatePicker
          id="endDate"
          selected={endDate ?? undefined}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Дата окончания"
          className={styles.datePicker}
          minDate={startDate ?? undefined}
          maxDate={new Date()}
          isClearable
        />
      </div>

      {isLoading ? (
        <div className={styles.loading}>Загрузка...</div>
      ) : allSteps.length > 0 ? (
        <>
          <div className={styles.filter}>
            <label>Шаги:</label>
            <SelectMultiple
              placeholder="Выбрать шаги"
              options={options}
              selectedOptions={selectedOptions}
              onOptionChange={handleStepChange}
              isScrollable
              isSearchable
            />
          </div>

          <div className={styles.stepsBlock} style={{ width: "100%" }}>
            <h4 className={styles.stepsTitle}>Воронка активности</h4>
            <CustomFunnelChart
              data={[...selectedSteps].sort(
                (a, b) => b.users_count - a.users_count
              )}
              width="100%"
              heightPerStep={80}
            />
          </div>
        </>
      ) : (
        <p className={styles.noData}>Нет данных по шагам.</p>
      )}

      <Menu />
    </div>
  );
};
