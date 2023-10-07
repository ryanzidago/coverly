// type EntryAchievementsProps = {
//   achievements: string[];
//   index: number;
// };

export default function EntryAchievements(props) {
  return (
    <ul className="p-4">
      {props.achievements.map((achievement, index: number) => (
        <li key={index + props.index} className="text-justify">
          {achievement.description}
        </li>
      ))}
    </ul>
  );
}
