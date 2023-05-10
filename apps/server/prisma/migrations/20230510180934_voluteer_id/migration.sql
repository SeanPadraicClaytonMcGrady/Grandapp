-- AlterTable
CREATE SEQUENCE senior_id_seq;
ALTER TABLE "Senior" ALTER COLUMN "id" SET DEFAULT nextval('senior_id_seq');
ALTER SEQUENCE senior_id_seq OWNED BY "Senior"."id";

-- AlterTable
CREATE SEQUENCE volunteer_id_seq;
ALTER TABLE "Volunteer" ALTER COLUMN "id" SET DEFAULT nextval('volunteer_id_seq');
ALTER SEQUENCE volunteer_id_seq OWNED BY "Volunteer"."id";
