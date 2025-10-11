import { InputHTMLAttributes } from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { cn } from "@/shared/utils";
import IconError from "@/assets/icons/error-circle.svg";
import cls from "./input.module.scss";

type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  className?: string;
  size?: "default" | "small";
  iconSrc?: string;
  clearErrors?: (name: string) => void;
  beforeChange?: (value: string) => string;
};

export type InputProps<T extends FieldValues> = UseControllerProps<T> &
  BaseInputProps;

export const Input = <T extends FieldValues>(props: InputProps<T>) => {
  const {
    name,
    control,
    rules,
    className = "",
    size = "default",
    iconSrc,
    clearErrors,
    beforeChange,
    disabled,
    ...rest
  } = props;

  const { field, fieldState } = useController<T>({ name, control, rules });

  const handleChange = (value: string) => {
    const newValue = beforeChange ? beforeChange(value) : value;
    field.onChange(newValue);
  };

  const handleClear = () => {
    field.onChange("");
    clearErrors?.(name);
  };

  return (
    <div className={cn(cls.root, className)}>
      <div className={cls.container}>
        <input
          id={name}
          value={field.value || ""}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          className={cn(cls.input, cls[`input_size-${size}`])}
          {...rest}
        />

        <div className={cn(cls["input-icon"], cls[`input-icon_size-${size}`])}>
          {fieldState.error ? (
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled}
              className="w-[16px] h-[16px] flex items-center justify-center"
            >
              <img src={IconError} alt="Ошибка" className={cls["icon-error"]} />
            </button>
          ) : iconSrc ? (
            <img
              src={iconSrc}
              alt="Иконка"
              className={cn(
                cls.icon,
                disabled ? cls["icon_disabled"] : undefined
              )}
            />
          ) : null}
        </div>
      </div>

      {fieldState.error && (
        <p
          className={cn(cls["error-message"], "line-clamp-1")}
          title={fieldState.error.message}
        >
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
};
