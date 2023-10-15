"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUser() {
  return await prisma.user.findMany();
}

export async function getResume() {
  const resume = await prisma.resume.findUnique({
    where: {
      id: "bba71748-52e4-4e91-8d28-df3529768254",
    },
    include: {
      author: true,
      contactEntry: true,
      workEntries: {
        include: {
          organisation: true,
          achievements: true,
        },
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

export async function updateResume(updatedResume) {
  const resume = await prisma.resume.update({
    where: {
      id: "bba71748-52e4-4e91-8d28-df3529768254",
    },
    data: {
      title: updatedResume.title,
    },
  });

  return resume;
}

export async function updateWorkEntry(workEntry) {
  const {
    id,
    employmentType,
    position,
    startDate,
    endDate,
    location,
    organisationId,
    organisation,
  } = workEntry;
  return await prisma.workEntry.update({
    where: {
      id: workEntry.id,
    },
    data: {
      employmentType: employmentType,
      position: position,
      startDate: startDate,
      endDate: endDate,
      location: location,
      organisationId: organisationId,
    },
  });
}

export async function getWorkEntryById(id) {
  return await prisma.workEntry.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
}