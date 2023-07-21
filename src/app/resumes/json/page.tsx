const DUMMY_DATA = {
  firstName: "Jean",
  lastName: "Jacques",
  email: "jean.jacques@email.fr",
  workEntries: [
    {
      title: "Senior Software Engineer",
      companyName: "Some Corp",
      startDate: "august 2015",
      endDate: "august ",
      description: "- Did lots of work there\n- It was fun",
      location: "Remote",
    },
  ],
  educationEntries: [
    {
      degree: "Bootcamp",
      institutionName: "The Hacking Project",
      startDate: "july 2015",
      endDate: "may 2019",
      description: "- Released some cool code",
      location: "Paris",
    },
  ],
};

export default function Page() {
  return <pre>{JSON.stringify(DUMMY_DATA, null, 2)}</pre>;
}
