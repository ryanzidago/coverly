export default function Link(props: any) {
  return (
    <a
      className="text-sky-500 font-light hover:text-sky-300 duration-200"
      href={props.href.length === 0 ? "#" : props.href}
      target={props.target || "_blank"}
    >
      {props.children}
    </a>
  );
}
