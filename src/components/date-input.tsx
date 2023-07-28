import { DateSimple } from "@/types/date-simple";
import { useEffect, useState } from "react";

interface DateInputProps {
  label: string;
  placeholder?: string;
  value: DateSimple;
  id: string;
  fieldId?: any;
  index: number;
  className?: string;
  currentPosition?: boolean;
  disabled?: boolean;
  onChange?: any;
}

export default function DateInput({
  label,
  placeholder,
  value,
  id,
  fieldId,
  index,
  className,
  currentPosition,
  disabled,
  onChange,
}: DateInputProps) {
  const startYear: number = 1900;
  const currentYear: number = new Date().getFullYear();
  const yearOptions: number[] = [];

  for (let i = startYear; i <= currentYear; i++) {
    yearOptions.push(i);
  }

  const [month, setMonth] = useState<string>(value.month);
  const [year, setYear] = useState<string>(value.year);

  useEffect(() => {
    if (year && month) {
      const date = { year: year, month: month };
      onChange(id, date, index);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  return (
    <div className={"flex flex-row items-end w-full gap-8" + " " + className}>
      <label htmlFor="month" className="flex flex-col gap-2 w-full">
        <span>{label}</span>
        <select
          value={month}
          disabled={disabled}
          name="month"
          id="month"
          onChange={(e) => setMonth(e.target.value)}
          className="cursor-pointer disabled:cursor-not-allowed appearance-none bg-white border border-slate-200 drop-shadow-sm rounded-md p-2 focus:outline focus:outline-sky-200"
        >
          {/* dates are zero-based in js */}
          {month ? null : <option></option>}
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </label>

      <label htmlFor="year" className="flex flex-col w-full">
        <input
          type="number"
          name="year"
          id="year"
          value={year}
          disabled={disabled}
          onChange={(e) => setYear(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key !== "Backspace" &&
              e.key !== "Enter" &&
              !/[0-9]/.test(e.key)
            ) {
              e.preventDefault();
            }
          }}
          className="cursor-pointer disabled:cursor-not-allowed appearance-none bg-white border border-slate-200 drop-shadow-sm rounded-md p-2 focus:outline focus:outline-sky-200"
        />
      </label>
    </div>
  );
}
