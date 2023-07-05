interface TextAreaInputProps {
  label: string;
  placeholder?: string, 
  value?: string,
}



export default function TextAreaInput(props: TextAreaInputProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
        <label className="flex flex-col gap-2 w-full">
          <span>{props.label}</span>
          <textarea className="border border-slate-200 drop-shadow-sm p-2 rounded-md focus:outline focus:outline-sky-200" />
        </label>
    </div>
    )
}