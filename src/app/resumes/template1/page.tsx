const DUMMY_DATA = {
  firstName: "Ryan",
  lastName: "Zidago",
  email: "ryanzidago@coverly.com",
  // tbd
  lastTitle: "Software Engineer",
  phoneNumber: {
    countryCode: "+49",
    number: "123 456 78 909",
  },
  // tbd
  location: {
    country: "Germany",
    city: "Cologne",
    street: "Leipzigerstraße 1",
    postalCode: "50123",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
  workEntries: [
    {
      title: "Fullstack Software Engineer",
      companyName: "Sona",
      website: "https://www.getsona.com/",
      startDate: "may 2022",
      endDate: "now",
      description: [
        "Making the experience of working with shifts easier for frontline and deskless workers in health, social care, retail, hospitality, and the voluntary sector by programming Sona's people operating system",
      ],
      location: "Remote",
    },
    {
      title: "Software Engineer",
      companyName: "JobValley",
      website: "https://jobvalley.com/en-de/",
      startDate: "september 2020",
      endDate: "april 2022",
      description: [
        "Building the next generation of staffing software specialized for working students and recent graduate. I was responsible for automating and improving human ressources, legal and other business processes by proposing, developing, testing and deploying new features.Building the next generation of staffing software specialized for working students and recent graduate. I was responsible for automating and improving human ressources, legal and other business processes by proposing, developing, testing and deploying new features.",
      ],
      location: "Remote",
    },
    {
      title: "Software Engineer Trainee",
      companyName: "JobValley",
      website: "https://jobvalley.com/en-de/",
      startDate: "august 2020",
      endDate: "november 2019",
      description: [],
      location: "Cologne, Germany",
    },
  ],
  educationEntries: [
    {
      degree: "Bootcamp",
      institutionName: "The Hacking Project",
      website: "https://www.thehackingproject.org/",
      startDate: "july 2015",
      endDate: "may 2019",
      description: [
        "11-week intensive coding bootcamp; teaching methodology based on peer-learning and pair-programming",
        "Tech stack: Ruby, Ruby on Rails, Python, OpenCV, PostgreSQL, Heroku",
      ],
      location: "Paris, France",
    },
  ],
};

const SECTION_TITLE_CLASS =
  "text-xl font-light w-full divide border-b border-slate-20 mb-4";

const LINK_CLASS = "text-sky-500 font-light hover:text-sky-400 duration-150";

export default function Page() {
  const resume = DUMMY_DATA;
  console.log(resume.workEntries[0]);

  return (
    <div className="flex flex-col gap-2 text-zinc-800 w-[70vh] drop-shadow-sm shadow print:shadow-none rounded-sm p-10 text-sm">
      {/* // contact section */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl text-zinc-700 font-semibold">
            {resume.firstName} {resume.lastName}
          </h1>
          <h2 className="text-md">{resume.lastTitle}</h2>
        </div>
        <div className="flex flex-col items-center mt-2 gap-2">
          <div className="flex flex-row space-x-8">
            <a className={LINK_CLASS} href={`mailto:${resume.email}`}>
              {resume.email}
            </a>
            <a
              className={LINK_CLASS}
              href={`tel:${resume.phoneNumber.countryCode} ${resume.phoneNumber.number}`}
            >
              {resume.phoneNumber.countryCode} {resume.phoneNumber.number}
            </a>
          </div>
          <p>
            {resume.location.city}, {resume.location.country}
          </p>
        </div>
      </div>
      {/* work section*/}
      <div className="flex flex-col gap-2 w-full">
        <h2 className={SECTION_TITLE_CLASS}>Work Experience</h2>
        {resume.workEntries.map((work, index) => (
          // work entry container
          <div key={index}>
            {/* work header */}
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-1">
                <div className="font-medium">{work.title}</div>
                <a className={LINK_CLASS} href={work.website} target="_blank">
                  {work.companyName}
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <div>
                  {work.startDate} - {work.endDate}
                </div>
                <div className="self-end">{work.location}</div>
              </div>
            </div>
            {/* work description container */}
            <ul className="p-4 indent-4">
              {work.description.map((description, index) => (
                <li key={`${index}-work-description`} className="text-justify">
                  {description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* education section */}
      <div className="flex flex-col gap-2 w-full">
        <h2 className={SECTION_TITLE_CLASS}>Education</h2>
        {resume.educationEntries.map((education, index) => (
          // education container
          <div key={index}>
            {/* education header */}
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-1">
                <div className="font-medium">{education.degree}</div>
                <a
                  href={education.website}
                  className={LINK_CLASS}
                  target="_blank"
                >
                  {education.institutionName}
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <div className="">
                  {education.startDate} - {education.endDate}
                </div>
                <div className="self-end">{education.location} </div>
              </div>
            </div>

            {/* work description container */}
            <ul className="p-4 indent-4">
              {education.description.map((description, inner_index) => (
                <>
                  <li key={index + inner_index} className="text-justify">
                    {description}
                  </li>
                </>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
