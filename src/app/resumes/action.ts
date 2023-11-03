"use server";

import prisma from "../../../prisma/client";
import {
  EducationAchievement,
  EducationEntry,
  Resume,
  WorkAchievement,
  WorkEntry,
} from "@prisma/client";

import { redirect } from "next/navigation";
import { EmploymentType } from "@prisma/client";

export async function allResumesForUserId(userId: string) {
  const resumes = await prisma.resume.findMany({
    where: {
      authorId: userId,
    },
    orderBy: { updatedAt: "desc" },
  });

  return resumes;
}

export async function getResume(authorId: string, resumeId: string) {
  const resume = await prisma.resume.findUnique({
    where: {
      id: resumeId,
      authorId: authorId,
    },
    include: {
      author: true,
      contactEntry: true,
      workEntries: {
        include: {
          organisation: true,
          achievements: { orderBy: { insertedAt: "desc" } },
        },
        orderBy: { startDate: "desc" },
      },
      educationEntries: {
        include: {
          organisation: true,
          achievements: { orderBy: { insertedAt: "desc" } },
        },
      },
      projectEntries: {
        include: {
          achievements: { orderBy: { insertedAt: "desc" } },
        },
      },
    },
  });

  return resume;
}

export async function getLatestUpdatedResume(authorId: string) {
  const resumeId = await prisma.resume.findFirst({
    where: {
      authorId: authorId,
    },
    orderBy: { updatedAt: "desc" },
  });

  return resumeId;
}

export async function createEmptyResume(authorId: string) {
  const data = {
    title: "My resume",
    authorId: authorId,
    contactEntry: {
      create: {},
    },
  };

  const resume = await prisma.resume.create({ data: data });
  return resume;
}

export async function updateResume(formData) {
  const id = formData.get("resumeId");
  const title = formData.get("resumeTitle");

  return await prisma.resume.update({
    where: {
      id: id,
    },
    data: { title: title },
  });
}

export async function duplicateResume(resume: Resume) {
  // Create a new resume record with a new UUID
  const newResume = await prisma.resume.create({
    data: {
      title: "Copy of " + resume.title,
      label: resume.label,
      authorId: resume.authorId,
    },
  });

  // Create new associated records for the new resume
  const newContactEntry = await prisma.contactEntry.create({
    data: {
      firstName: resume.contactEntry.firstName,
      lastName: resume.contactEntry.lastName,
      email: resume.contactEntry.email,
      phoneNumber: resume.contactEntry.phoneNumber,
      location: resume.contactEntry.location,
      externalLinks: resume.contactEntry.externalLinks,
      resumeId: newResume.id,
    },
  });

  const newEducationEntries = await Promise.all(
    resume.educationEntries.map(async (educationEntry) => {
      const newEducationEntry = await prisma.educationEntry.create({
        data: {
          startDate: educationEntry.startDate,
          endDate: educationEntry.endDate,
          location: educationEntry.location,
          domain: educationEntry.domain,
          type: educationEntry.type,
          organisationId: educationEntry.organisationId,
          resumeId: newResume.id,
        },
      });

      const newEducationAchievements = await Promise.all(
        educationEntry.achievements.map(async (achievement) => {
          return prisma.educationAchievement.create({
            data: {
              description: achievement.description,
              educationEntryId: newEducationEntry.id,
            },
          });
        }),
      );

      return {
        ...newEducationEntry,
        achievements: newEducationAchievements,
      };
    }),
  );

  const newProjectEntries = await Promise.all(
    resume.projectEntries.map(async (projectEntry) => {
      const newProjectEntry = await prisma.projectEntry.create({
        data: {
          startDate: projectEntry.startDate,
          endDate: projectEntry.endDate,
          website: projectEntry.website,
          resumeId: newResume.id,
        },
      });

      const newProjectAchievements = await Promise.all(
        projectEntry.achievements.map(async (achievement) => {
          return prisma.projectAchievement.create({
            data: {
              description: achievement.description,
              projectEntryId: newProjectEntry.id,
            },
          });
        }),
      );

      return {
        ...newProjectEntry,
        achievements: newProjectAchievements,
      };
    }),
  );

  const newWorkEntries = await Promise.all(
    resume.workEntries.map(async (workEntry) => {
      const newWorkEntry = await prisma.workEntry.create({
        data: {
          position: workEntry.position,
          startDate: workEntry.startDate,
          endDate: workEntry.endDate,
          location: workEntry.location,
          organisationId: workEntry.organisationId,
          employmentType: workEntry.employmentType,
          resumeId: newResume.id,
        },
      });

      const newWorkAchievements = await Promise.all(
        workEntry.achievements.map(async (achievement) => {
          return prisma.workAchievement.create({
            data: {
              description: achievement.description,
              workEntryId: newWorkEntry.id,
            },
          });
        }),
      );

      return {
        ...newWorkEntry,
        achievements: newWorkAchievements,
      };
    }),
  );

  redirect(`/resumes/${newResume.id}`);

  // Return the new resume and associated records
  // return {
  //   ...newResume,
  //   contactEntry: newContactEntry,
  //   educationEntries: newEducationEntries,
  //   projectEntries: newProjectEntries,
  //   workEntries: newWorkEntries,
  // };
}

export async function deleteResume(resume: Resume) {
  return await prisma.resume.delete({ where: { id: resume.id } });
}

export async function updateContactEntry(formData: any) {
  const id = formData.get("contactEntryId");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const countryCode = formData.get("countryCode");
  const number = formData.get("number");
  const city = formData.get("city");
  const country = formData.get("country");

  const data = {
    firstName,
    lastName,
    email,
    phoneNumber: { countryCode, number },
    location: { city, country },
  };

  const contactEntry = await prisma.contactEntry.update({
    where: { id },
    data: data,
  });

  return contactEntry;
}

export async function updateDisplayWorkEntry(
  workEntry: WorkEntry,
  displayed: boolean,
) {
  const updatedWorkEntry = await prisma.workEntry.update({
    where: { id: workEntry.id },
    data: { displayed: displayed },
  });

  return updatedWorkEntry;
}

export async function createEmptyWorkAchievement(workEntryId: string) {
  const emptyWorkAchievement = await prisma.workAchievement.create({
    data: { workEntryId },
  });

  return emptyWorkAchievement;
}

export async function updateDisplayWorkAchievement(
  workAchievement: WorkAchievement,
  displayed: boolean,
) {
  const updatedWorkAchievement = await prisma.workAchievement.update({
    where: { id: workAchievement.id },
    data: { displayed },
  });

  return updatedWorkAchievement;
}

export async function createEmptyEducationAchievement(
  educationEntryId: string,
) {
  const emptyEducationAchievement = await prisma.educationAchievement.create({
    data: { educationEntryId },
  });

  return emptyEducationAchievement;
}

export async function updateDisplayEducationEntry(
  educationEntry: EducationEntry,
  displayed: boolean,
) {
  const updatedEducationEntry = await prisma.educationEntry.update({
    where: { id: educationEntry.id },
    data: { displayed: displayed },
  });

  return updatedEducationEntry;
}

export async function updateDisplayEducationAchievement(
  educationAchievement: EducationAchievement,
  displayed: boolean,
) {
  const updatedEducationAchievement = await prisma.educationAchievement.update({
    where: { id: educationAchievement.id },
    data: { displayed },
  });

  return updatedEducationAchievement;
}

export async function updateWorkEntry(formData: any) {
  const id = formData.get("workEntryId");
  const resumeId = formData.get("resumeId");
  const position = formData.get("position");
  const organisationName = formData.get("organisationName");
  const organisationWebsite = formData.get("organisationWebsite");
  const startMonth = formData.get("startMonth");
  const startYear = formData.get("startYear");
  const endMonth = formData.get("endMonth");
  const endYear = formData.get("endYear");
  const city = formData.get("city");
  const country = formData.get("country");
  const remote = formData.get("remote");
  const currentWork = formData.get("currentWork");
  const employmentType = EmploymentType.SelfEmployed;

  let organisation = await prisma.organisation.findFirst({
    where: { name: organisationName },
  });

  if (!organisation) {
    organisation = await prisma.organisation.create({
      data: { name: organisationName, website: organisationWebsite },
    });
  }

  const data = {
    position,
    startDate: new Date(startYear, startMonth),
    endDate: currentWork ? null : new Date(endYear, endMonth),
    location: { city, country, remote },
    employmentType,
    organisationId: organisation.id,
    resumeId,
  };

  let workEntry;
  if (id === "empty_work_entry") {
    workEntry = await prisma.workEntry.create({ data: data });
  } else {
    workEntry = await prisma.workEntry.update({ where: { id }, data: data });
  }

  return workEntry;
}

export async function updateEducationEntry(formData: any) {
  const id = formData.get("educationEntryId");
  const resumeId = formData.get("resumeId");
  const domain = formData.get("domain");
  const type = formData.get("studyType");
  const organisationName = formData.get("organisationName");
  const organisationWebsite = formData.get("organisationWebsite");
  const startMonth = formData.get("startMonth");
  const startYear = formData.get("startYear");
  const endMonth = formData.get("endMonth");
  const endYear = formData.get("endYear");
  const city = formData.get("city");
  const country = formData.get("country");
  const remote = formData.get("remote");
  const currentEducation = formData.get("currentEducation");

  let organisation = await prisma.organisation.findFirst({
    where: { name: organisationName },
  });

  if (!organisation) {
    organisation = await prisma.organisation.create({
      data: { name: organisationName, website: organisationWebsite },
    });
  }

  const data = {
    domain,
    type,
    startDate: new Date(startYear, startMonth),
    endDate: currentEducation ? null : new Date(endYear, endMonth),
    location: { city, country, remote },
    organisationId: organisation.id,
    resumeId,
  };

  let educationEntry;
  if (id === "empty_education_entry") {
    educationEntry = await prisma.educationEntry.create({ data: data });
  } else {
    educationEntry = await prisma.educationEntry.update({
      where: { id },
      data: data,
    });
  }

  return educationEntry;
}

export async function deleteWorkEntry(workEntryId: string) {
  return await prisma.workEntry.delete({ where: { id: workEntryId } });
}

export async function deleteEducationEntry(educationEntryId: string) {
  return await prisma.educationEntry.delete({
    where: { id: educationEntryId },
  });
}

export async function updateWorkAchievement(formData: any) {
  const workAchievementId = formData.get("workAchievementId");
  const description = formData.get("description");
  const displayed = formData.get("displayed") == "on" ? true : false;

  const workAchievement = await prisma.workAchievement.update({
    where: { id: workAchievementId },
    data: { description, displayed },
  });

  return workAchievement;
}

export async function updateEducationAchievement(formData: any) {
  const educationAchievementId = formData.get("educationAchievementId");
  const description = formData.get("description");
  const displayed = formData.get("displayed");

  const educationAchievement = await prisma.educationAchievement.update({
    where: { id: educationAchievementId },
    data: { description, displayed: Boolean(displayed) },
  });

  return educationAchievement;
}

export async function deleteWorkAchievement(id: string) {
  return await prisma.workAchievement.delete({
    where: { id },
  });
}

export async function deleteEducationAchievement(id: string) {
  return await prisma.educationAchievement.delete({ where: { id } });
}