export default function EntryAchievements(props: any) {
  return (
    <ul className="p-4">
      {props.achievements
        .filter((achievement: any) => achievement.displayed)
        .map((achievement: any, index: number) => (
          <li key={index + props.index} className="text-justify">
            {achievement.description}
          </li>
        ))}
    </ul>
  );
}
