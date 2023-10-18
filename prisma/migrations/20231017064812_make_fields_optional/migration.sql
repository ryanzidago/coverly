-- AlterTable
ALTER TABLE "contact_entries" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "education_achievements" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "education_entries" ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "domain" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "organisations" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "project_achievements" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "project_entries" ALTER COLUMN "startDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "resumes" ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "work_achievements" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "work_entries" ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "employmentType" DROP NOT NULL;
