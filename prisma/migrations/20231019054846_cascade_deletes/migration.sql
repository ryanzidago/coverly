-- DropForeignKey
ALTER TABLE "contact_entries" DROP CONSTRAINT "contact_entries_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "education_achievements" DROP CONSTRAINT "education_achievements_educationEntryId_fkey";

-- DropForeignKey
ALTER TABLE "education_entries" DROP CONSTRAINT "education_entries_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "project_achievements" DROP CONSTRAINT "project_achievements_projectEntryId_fkey";

-- DropForeignKey
ALTER TABLE "project_entries" DROP CONSTRAINT "project_entries_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "work_achievements" DROP CONSTRAINT "work_achievements_workEntryId_fkey";

-- DropForeignKey
ALTER TABLE "work_entries" DROP CONSTRAINT "work_entries_resumeId_fkey";

-- AddForeignKey
ALTER TABLE "contact_entries" ADD CONSTRAINT "contact_entries_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_entries" ADD CONSTRAINT "work_entries_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education_entries" ADD CONSTRAINT "education_entries_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_entries" ADD CONSTRAINT "project_entries_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_achievements" ADD CONSTRAINT "work_achievements_workEntryId_fkey" FOREIGN KEY ("workEntryId") REFERENCES "work_entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education_achievements" ADD CONSTRAINT "education_achievements_educationEntryId_fkey" FOREIGN KEY ("educationEntryId") REFERENCES "education_entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_achievements" ADD CONSTRAINT "project_achievements_projectEntryId_fkey" FOREIGN KEY ("projectEntryId") REFERENCES "project_entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
