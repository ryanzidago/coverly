export default function Section(props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-xl font-light w-full divide border-b border-slate-20 mb-4">
        {props.title}
      </h2>
      {props.children}
    </div>
  );
}
