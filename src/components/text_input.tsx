interface TextInputProps {
  label: string;
  placeholder?: string, 
  value?: string,
}

export default function TextInput(props: TextInputProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
        <label className="flex flex-col gap-2 w-full">
        <span>{props.label}</span>
        <input type="text" className="border border-slate-200 drop-shadow-sm rounded-md p-2 focus:outline focus:outline-sky-200"/>
        </label>
    </div>
    )
}