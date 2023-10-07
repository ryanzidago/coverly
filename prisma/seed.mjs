import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const sona = await prisma.organisation.create({
    data: {
      name: "Sona",
      website: "https://getsona.com",
    },
  });

  const jobvalley = await prisma.organisation.create({
    data: {
      name: "Jobvalley",
      website: "https://jobvalley.com",
    },
  });

  const theHackingProject = await prisma.organisation.create({
    data: {
      name: "The Hacking Project",
      website: "https://thehackingproject.org",
    },
  });

  console.log(sona);
  console.log(jobvalley);
  console.log(theHackingProject);

  const users = await prisma.user.create({
    data: {
      firstName: "Ryan",
      lastName: "Zidago",
      resumes: {
        create: [
          {
            title: "2023 - software engineering",
            contactEntry: {
              create: {
                firstName: "Ryan",
                lastName: "Zidago",
                email: "ryan.zidago@coverly.com",
                phoneNumber: { countryCode: "+49", number: "123 456 78909" },
                location: { city: "Cologne", country: "Germany" },
                externalLinks: [
                  {
                    name: "github",
                    url: "https://github.com/ryanzidago",
                  },
                  {
                    name: "linkedin",
                    url: "https://www.linkedin.com/in/ryan-zidago/",
                  },
                ],
              },
            },
            workEntries: {
              create: [
                {
                  employmentType: "SelfEmployed",
                  position: "Fullstack Software Engineer",
                  startDate: "2022-05-01T00:00:00.00Z",
                  endDate: null,
                  location: {
                    remote: true,
                    city: null,
                    country: null,
                  },
                  organisationId: sona.id,
                  achievements: {
                    create: [
                      {
                        description:
                          "Making the experience of working with shifts easier for frontline and deskless workers in health, social care, retail, hospitality, and the voluntary sector by programming Sona's people operating system.",
                      },
                    ],
                  },
                },
                {
                  employmentType: "Employee",
                  position: "Software Engineer",
                  startDate: "2020-09-01T00:00:00.00Z",
                  endDate: "2022-04-01T00:00:00.00Z",
                  location: {
                    remote: true,
                    city: null,
                    country: null,
                  },
                  organisationId: jobvalley.id,
                  achievements: {
                    create: [
                      {
                        description:
                          "Building the next generation of staffing software specialized for working students and recent graduate. I was responsible for automating and improving human ressources, legal and other business processes by proposing, developing, testing and deploying new features.",
                      },
                    ],
                  },
                },
                {
                  employmentType: "Trainee",
                  position: "Software Engineer",
                  startDate: "2019-11-01T00:00:00.00Z",
                  endDate: "2022-03-31T00:00:00.00Z",
                  location: {
                    remote: false,
                    city: "Cologne",
                    country: "Germany",
                  },
                  organisationId: jobvalley.id,
                },
              ],
            },
            educationEntries: {
              create: [
                {
                  startDate: "2019-05-01T00:00:00.00Z",
                  endDate: "2019-07-01T00:00:00.00Z",
                  location: {
                    remote: false,
                    city: "Paris",
                    country: "France",
                  },
                  domain: "Web Development",
                  type: "Bootcamp",
                  organisationId: theHackingProject.id,
                  achievements: {
                    create: [
                      {
                        description:
                          "During this 11-weeks intensive coding bootcamp, I was introduced to Web development. I learned how to write software, build and deploy websites with Ruby, Ruby on Rails, PostgreSQL, HTML & CSS, Heroku, Git and GitHub. I also learned and used Python and OpenCV in order to scan QR codes, as part of my team's final project.",
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
  console.log(users);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
