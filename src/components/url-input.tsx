interface URLInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function URLInput(props: URLInputProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label htmlFor={props.id} className="flex flex-col gap-2 w-full">
        <span>{props.label}</span>
        <input
          id={props.id}
          name={props.id}
          type="url"
          value={props.value}
          className="border border-slate-200 drop-shadow-sm rounded-md p-2 focus:outline focus:outline-sky-200"
          onChange={props.onChange}
        />
      </label>
    </div>
  );
}
