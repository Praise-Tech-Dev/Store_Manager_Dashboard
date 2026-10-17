import type { RadioGroupProps } from "@/types/shared/radio.types";


export const RadioGroup = <T extends string>({
  label,
  name,
  options,
  value,
  onChange,
  error,
}: RadioGroupProps<T>) => (
  <fieldset className="space-y-2">
    {label && (
      <legend className="text-sm font-medium text-text-default">{label}</legend>
    )}
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center gap-2 text-sm text-text-default"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="h-4 w-4 cursor-pointer accent-[#4F46E5]"
          />
          {option.label}
        </label>
      ))}
    </div>
    {error && <p className="text-xs text-danger">{error}</p>}
  </fieldset>
);
