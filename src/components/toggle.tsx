export default function Toggle(props) {
  console.log(props.checked);
  
  return (
    <label className="self-start relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={props.onChange}
        checked={props.checked}
      />
      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
      <span className="ml-3 text-sm font-medium text-slate-700">
        {props.label}
      </span>
    </label>
  );
}
