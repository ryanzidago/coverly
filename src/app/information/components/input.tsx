export default function Input({
  id,
  label,
  value,
  required = false,
  placeholder,
  inputType,
  displayLabel = true,
  onChange,
  onKeyDown,
  onScroll,
  onFocus,
}) {
  return (
    <div className="flex flex-col gap-4 text-slate-700">
      {displayLabel && <label>{label}</label>}
      <div>
        <input
          className="flex p-2 appearance-none outline-none w-96 rounded border-b-4 bg-transparent placeholder:text-slate-700 placeholder:opacity-50"
          id={id}
          type={inputType}
          required={required}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onScroll={onScroll}
          onFocus={onFocus}
        />
      </div>
    </div>
  );
}
