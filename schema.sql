DROP TABLE IF EXISTS "public"."User" CASCADE;
DROP TABLE IF EXISTS "public"."Photo" CASCADE;
DROP TABLE IF EXISTS "public"."Comment" CASCADE;

CREATE TABLE "public"."User" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE "public"."Photo" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  imgUrl VARCHAR(255) UNIQUE NOT NULL,
  "userId" INTEGER,
  FOREIGN KEY ("userId") REFERENCES "public"."User"(id)
);

CREATE TABLE "public"."Comment" (
  id SERIAL PRIMARY KEY NOT NULL,
  text VARCHAR(255) NOT NULL,
  "photoId" INTEGER,
  FOREIGN KEY ("photoId") REFERENCES "public"."Photo"(id),
  "userId" INTEGER,
  FOREIGN KEY ("userId") REFERENCES "public"."User"(id)
);



-- create tables, create prisma schema, create prisma client

--  psql -h ec2-54-247-107-109.eu-west-1.compute.amazonaws.com -d d8khjf0ftqs39l -U detovnbispqqpo -f schema.sql

--  npx prisma introspect

-- npx prisma generate

