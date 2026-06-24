-- AlterTable: add rich lesson content fields.
ALTER TABLE "Lesson"
    ADD COLUMN "content" TEXT,
    ADD COLUMN "aiPrompts" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN "checklist" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN "warnings" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
