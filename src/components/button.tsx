import Link from "next/link"

interface ButtonProps {
  children: React.ReactNode,
  href: string,
}

export default function Button({children, href}: ButtonProps) {
  return (
        <Link href={href}>
          <button className="border border-slate-200 bg-sky-400 hover:bg-sky-500 transition duration-200 rounded-md text-white p-2 w-28">
                {children}
          </button>
        </Link>
  )
}