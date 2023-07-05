import TextInput from "@/components/text_input"
import Button from "@/components/button"
import MonthInput from "@/components/date_interval"
import DateIntervalInput from "@/components/date_interval"
import TextAreaInput from "@/components/text_area_input"
import Link from "next/link"

export default function Contact() {

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full max-w-xl text-slate-700">
      <h1 className="text-xl">Work Experience</h1>
      <TextInput label="Title" />
      <TextInput label="Company name" />
      <TextInput label="Location" />
      <DateIntervalInput label="Start date"/>
      <DateIntervalInput label="End date"/>
      <TextAreaInput label="Description"/>
      <Link href="/work_experience" className="transition duration-200 hover:text-slate-500">Add work experience</Link>
      <div className="flex w-full justify-between">
      <Button href="/contact">{"<"} Previous</Button>
      <Button href="/work_experience">Next {">"}</Button>
      </div>
    </div>
  )
}