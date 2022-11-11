--
-- Create database
--
DROP DATABASE IF EXISTS "coffee-app";
CREATE DATABASE "coffee-app";

--
-- Set up custom enums
--
CREATE TYPE public.brew_method AS ENUM (
    'espresso',
    'filter',
    'any'
);

CREATE TYPE public.origin AS ENUM (
    'single origin',
    'blend',
    'unknown'
);

CREATE TYPE public.roast AS ENUM (
    'dark',
    'medium',
    'light',
    'unknown'
);

--
-- Create custom functions & triggers
--
CREATE FUNCTION public.update_coffee_review_totals() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN 
	UPDATE coffee
	SET 
		avg_rating = (SELECT avg(rating) FROM review WHERE coffee_id = NEW.coffee_id),
		num_reviews = (SELECT count(rating) FROM review WHERE coffee_id = NEW.coffee_id)
	WHERE id = NEW.coffee_id;
	RETURN NEW;
END$$;

--
-- Create tables
--
CREATE TABLE public.coffee (
    id integer NOT NULL,
    name text NOT NULL,
    roaster_id integer NOT NULL,
    url text,
    photo text,
    avg_rating numeric DEFAULT 0,
    num_reviews integer DEFAULT 0,
    roast_type public.roast DEFAULT 'unknown'::public.roast NOT NULL,
    best_for public.brew_method DEFAULT 'any'::public.brew_method NOT NULL,
    origin public.origin DEFAULT 'unknown'::public.origin NOT NULL,
    country text DEFAULT 'unknown'::text NOT NULL,
    tasting_notes text DEFAULT 'No tasting notes available'::text NOT NULL,
    created_by integer,
    created timestamp without time zone
);

ALTER TABLE public.coffee ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.coffee_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.review (
    id integer NOT NULL,
    coffee_id integer NOT NULL,
    user_id integer NOT NULL,
    rating numeric NOT NULL,
    review text,
    created timestamp without time zone DEFAULT now(),
    flagged boolean DEFAULT false NOT NULL
);

ALTER TABLE public.review ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.roaster (
    id integer NOT NULL,
    name text NOT NULL,
    url text,
    photo text,
    country text DEFAULT 'unknown'::text NOT NULL,
    created_by integer,
    created timestamp without time zone DEFAULT now()
);

ALTER TABLE public.roaster ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.roaster_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    photo text,
    country text DEFAULT 'unknown'::text NOT NULL,
    created timestamp without time zone DEFAULT now(),
    last_login timestamp without time zone
);

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- Set up primary keys
--

ALTER TABLE ONLY public.coffee
    ADD CONSTRAINT coffee_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.roaster
    ADD CONSTRAINT roaster_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Set up foreign keys & constraints
--

CREATE INDEX fki_coffee_fkey_createdby ON public.coffee USING btree (created_by);
CREATE INDEX fki_coffee_roaster_fkey ON public.coffee USING btree (roaster_id);
CREATE INDEX fki_review_fkey_coffee ON public.review USING btree (coffee_id);
CREATE INDEX fki_review_fkey_user ON public.review USING btree (user_id);
CREATE INDEX fki_roaster_fkey_createdby ON public.roaster USING btree (created_by);

CREATE TRIGGER update_coffee_rating AFTER INSERT ON public.review FOR EACH ROW EXECUTE FUNCTION public.update_coffee_review_totals();

ALTER TABLE ONLY public.coffee
    ADD CONSTRAINT coffee_fkey_createdby FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;

ALTER TABLE ONLY public.coffee
    ADD CONSTRAINT coffee_fkey_roaster FOREIGN KEY (roaster_id) REFERENCES public.roaster(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_fkey_coffee FOREIGN KEY (coffee_id) REFERENCES public.coffee(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_fkey_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;

ALTER TABLE ONLY public.roaster
    ADD CONSTRAINT roaster_fkey_createdby FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;
