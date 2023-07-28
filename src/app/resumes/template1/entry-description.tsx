type EntryDescriptionProps = {
  descriptions: string[];
  index: number;
};

export default function EntryDescription(props: EntryDescriptionProps) {
  console.log("PROPS", props);

  return (
    <ul className="p-4">
      {props.descriptions.map((description: string, index: number) => (
        <li key={index + props.index} className="text-justify">
          {description}
        </li>
      ))}
    </ul>
  );
}
