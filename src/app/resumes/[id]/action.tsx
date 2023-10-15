"use server";

import prisma from "../../../../prisma/client";

import { EmploymentType } from "@prisma/client";

export async function getResume(id) {
  const resume = await prisma.resume.findUnique({
    where: {
      id: id,
    },
    include: {
      author: true,
      contactEntry: true,
      workEntries: {
        include: {
          organisation: true,
          achievements: true,
        },
        orderBy: { startDate: "desc" },
      },
      educationEntries: {
        include: {
          organisation: true,
          achievements: true,
        },
      },
      projectEntries: {
        include: {
          achievements: true,
        },
      },
    },
  });

  return resume;
}

export async function updateResume(formData) {
  const id = formData.get("resumeId");
  const title = formData.get("resumeTitle");

  console.log("new title", title);

  return await prisma.resume.update({
    where: {
      id: id,
    },
    data: { title: title },
  });
}

export async function updateContactEntry(formData) {
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

export async function updateWorkEntry(formData) {
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
    endDate: new Date(endYear, endMonth),
    location: { city, country, remote },
    employmentType,
    organisationId: organisation.id,
    resumeId,
  };

  let workEntry;
  if (id === "empty_work_entry") {
    workEntry = await prisma.workEntry.create({ data: data });
    console.log("workEntry created", workEntry);
  } else {
    workEntry = await prisma.workEntry.update({ where: { id }, data: data });
    console.log("workEntry updated", workEntry);
  }

  return workEntry;
}

export async function updateWorkAchievement(formData) {
  const workAchievementId = formData.get("workAchievementId");
  const workEntryId = formData.get("workEntryId");
  const description = formData.get("description");

  console.log(workAchievementId);

  let workAchievement;
  if (workAchievementId === "empty_achievement") {
    workAchievement = await prisma.workAchievement.create({
      data: { workEntryId, description },
    });
  } else {
    workAchievement = await prisma.workAchievement.update({
      where: { id: workAchievementId },
      data: { description },
    });
  }

  console.log("work achievement created/updated", workAchievement);

  return workAchievement;
}

export async function removeWorkAchievement(id) {
  const workAchievement = await prisma.workAchievement.delete({
    where: { id },
  });
  console.log("deleted workAchievement");
  return workAchievement;
}
