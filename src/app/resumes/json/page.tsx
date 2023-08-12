const DUMMY_DATA = require("@/data/db.json");
export default function Page() {
  return (
    <div className="grid grid-cols-3 text-sm">
      <div />
      <pre className="p-10 overflow-auto shadow-xl rounded">
        {JSON.stringify(DUMMY_DATA, null, 2)}
      </pre>
      <div />
    </div>
  );
}
