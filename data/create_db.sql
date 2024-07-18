CREATE TABLE communes (
  id serial4 NOT NULL,
  geom public.geometry(multipolygon, 4326) NULL,
  objectid int8 NULL,
  "name" varchar(254) NULL,
  mean2018 numeric NULL
);

CREATE TABLE maroc (
  id serial4 NOT NULL,
  geom geometry(multipolygon, 4326) NULL,
  "name" varchar(15) NULL,
  descriptio varchar(20) NULL
);
