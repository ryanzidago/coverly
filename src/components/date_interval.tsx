interface DateIntervalInputProps {
  label: string;
  placeholder?: string;
  value?: string;
}

export default function DateIntervalInput(props: DateIntervalInputProps) {
  const startYear: number = 1900;
  const currentYear: number = new Date().getFullYear();
  const yearOptions: number[] = [];
  for (let i = startYear; i <= currentYear; i++) {
    yearOptions.push(i);
  }

  return (
    <div className="flex flex-row items-end w-full gap-8">
      <label className="flex flex-col gap-2 w-full">
        <span>{props.label}</span>
        <select
          name="month_interval"
          id="month_interval"
          className="cursor-pointer appearance-none bg-white border border-slate-200 drop-shadow-sm rounded-md p-2 focus:outline focus:outline-sky-200"
        >
          <option value="january">January</option>
          <option value="february">February</option>
          <option value="march">March</option>
          <option value="april">April</option>
          <option value="may">May</option>
          <option value="june">June</option>
          <option value="july">July</option>
          <option value="august">August</option>
          <option value="september">September</option>
          <option value="october">October</option>
          <option value="november">November</option>
          <option value="december">December</option>
        </select>
      </label>

      <label className="flex flex-col w-full">
        <select
          name="year_interval"
          id="year_interval"
          className="cursor-pointer appearance-none bg-white border border-slate-200 drop-shadow-sm rounded-md p-2 focus:outline focus:outline-sky-200"
        >
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
