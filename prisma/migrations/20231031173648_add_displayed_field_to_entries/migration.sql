-- AlterTable
ALTER TABLE "education_entries" ADD COLUMN     "displayed" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "work_entries" ADD COLUMN     "displayed" BOOLEAN NOT NULL DEFAULT true;
