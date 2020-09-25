DROP TABLE IF EXISTS "public"."Employee";
DROP TABLE IF EXISTS "public"."Desk";

CREATE TABLE "public"."Employee" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE "public"."Desk" (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  "employeeId" INTEGER,
  FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"(id)
);

-- create tables, create prisma schema, create prisma client

--  psql -h ec2-54-247-107-109.eu-west-1.compute.amazonaws.com -d d8khjf0ftqs39l -U detovnbispqqpo -f schema.sql

--  npx prisma introspect

-- npx prisma generate

