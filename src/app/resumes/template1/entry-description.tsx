export default function EntryDescription(props) {
  return (
    <ul className="p-4 indent-4">
      {props.descriptions.map((description, index) => (
        <>
          <li key={index + props.index} className="text-justify">
            {description}
          </li>
        </>
      ))}
    </ul>
  );
}
