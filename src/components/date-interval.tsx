import { useEffect, useState } from "react";


interface DateIntervalInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  id: string;
  fieldId?: any;
  index: number;
  onChange?: any;
}

export default function DateIntervalInput(props: DateIntervalInputProps) {
  const startYear: number = 1900;
  const currentYear: number = new Date().getFullYear();
  const yearOptions: number[] = [];

  for (let i = startYear; i <= currentYear; i++) {
    yearOptions.push(i);
  }

  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  useEffect(() => {
    if (year && month) {
      const date = new Date(year, month, 1, 0, 0, 0);
      props.onChange(props.id, date, props.index);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  return (
    <div className="flex flex-row items-end w-full gap-8">
      <label htmlFor="month" className="flex flex-col gap-2 w-full">
        <span>{props.label}</span>
        <select
          name="month"
          id="month"
          onChange={(e) => setMonth(e.target.value)}
          className="cursor-pointer appearance-none bg-white border border-slate-200 drop-shadow-sm rounded-md p-2 focus:outline focus:outline-sky-200"
        >
          {/* dates are zero-based in js */}
          {month ? null : <option></option>}
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </select>
      </label>

      <label htmlFor="year" className="flex flex-col w-full">
        <select
          name="year"
          id="year"
          onChange={(e) => setYear(e.target.value)}
          className="cursor-pointer appearance-none bg-white border border-slate-200 drop-shadow-sm rounded-md p-2 focus:outline focus:outline-sky-200"
        >
          {year ? null : <option></option>}
          {yearOptions.reverse().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
