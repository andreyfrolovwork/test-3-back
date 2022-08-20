--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE test_4;
--
-- Name: test_4; Type: DATABASE; Schema: -; Owner: andrey
--

CREATE DATABASE test_4 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';


ALTER DATABASE test_4 OWNER TO andrey;

\connect test_4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_artists_deleted; Type: TYPE; Schema: public; Owner: andrey
--

CREATE TYPE public.enum_artists_deleted AS ENUM (
    'true',
    'false'
);


ALTER TYPE public.enum_artists_deleted OWNER TO andrey;

--
-- Name: enum_tracks_mix_upload; Type: TYPE; Schema: public; Owner: andrey
--

CREATE TYPE public.enum_tracks_mix_upload AS ENUM (
    'true',
    'false'
);


ALTER TYPE public.enum_tracks_mix_upload OWNER TO andrey;

--
-- Name: enum_tracks_rao; Type: TYPE; Schema: public; Owner: andrey
--

CREATE TYPE public.enum_tracks_rao AS ENUM (
    'true',
    'false'
);


ALTER TYPE public.enum_tracks_rao OWNER TO andrey;

--
-- Name: enum_tracks_voice; Type: TYPE; Schema: public; Owner: andrey
--

CREATE TYPE public.enum_tracks_voice AS ENUM (
    'true',
    'false'
);


ALTER TYPE public.enum_tracks_voice OWNER TO andrey;

--
-- Name: enum_tracks_zaicev; Type: TYPE; Schema: public; Owner: andrey
--

CREATE TYPE public.enum_tracks_zaicev AS ENUM (
    'true',
    'false'
);


ALTER TYPE public.enum_tracks_zaicev OWNER TO andrey;

--
-- Name: roles; Type: TYPE; Schema: public; Owner: andrey
--

CREATE TYPE public.roles AS ENUM (
    'admin',
    'admin_not_activated',
    'artist'
);


ALTER TYPE public.roles OWNER TO andrey;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: andrey
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO andrey;

--
-- Name: contacts; Type: TABLE; Schema: public; Owner: andrey
--

CREATE TABLE public.contacts (
    id_contact integer NOT NULL,
    fk_id_user integer,
    name character varying,
    phone character varying,
    "updatedAt" date DEFAULT now(),
    "createdAt" date DEFAULT now()
);


ALTER TABLE public.contacts OWNER TO andrey;

--
-- Name: table_name_id_contacts_seq; Type: SEQUENCE; Schema: public; Owner: andrey
--

CREATE SEQUENCE public.table_name_id_contacts_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.table_name_id_contacts_seq OWNER TO andrey;

--
-- Name: table_name_id_contacts_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andrey
--

ALTER SEQUENCE public.table_name_id_contacts_seq OWNED BY public.contacts.id_contact;


--
-- Name: tokens; Type: TABLE; Schema: public; Owner: andrey
--

CREATE TABLE public.tokens (
    fk_user_id integer NOT NULL,
    refresh_token text
);


ALTER TABLE public.tokens OWNER TO andrey;

--
-- Name: users; Type: TABLE; Schema: public; Owner: andrey
--

CREATE TABLE public.users (
    id_user integer NOT NULL,
    email character varying(255),
    password text,
    "createdAt" date DEFAULT now(),
    deleted boolean DEFAULT false,
    role public.roles DEFAULT 'artist'::public.roles,
    "updatedAt" date DEFAULT now()
);


ALTER TABLE public.users OWNER TO andrey;

--
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: andrey
--

CREATE SEQUENCE public.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_user_seq OWNER TO andrey;

--
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andrey
--

ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;


--
-- Name: contacts id_contact; Type: DEFAULT; Schema: public; Owner: andrey
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id_contact SET DEFAULT nextval('public.table_name_id_contacts_seq'::regclass);


--
-- Name: users id_user; Type: DEFAULT; Schema: public; Owner: andrey
--

ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: andrey
--

COPY public."SequelizeMeta" (name) FROM stdin;
20220621074858-rename_name_fields.js
20220621102423-create-table-releases.js
20220621112546-create-table-acts.js
20220621112911-create-table-tracks.js
20220621121230-create-table-vidoclips.js
20220621122414-create-table-albums.js
20220621122853-create-releations.js
20220624114026-add-fields-tracks.js
20220624115750-add-fields-name-track.js
20220626065538-rename-field-fk-id-artist-in-tables.js
20220628141905-put_delete_field_in_artist_table.js
20220705053204-add_delete_no_action.js
20220705101339-on_delete_set_null_on_update_no_action.js
20220707075706-add_primary_keys_for_all_tables.js
20220707084449-add_cs_user_has_one_artist.js
20220707093234-user_has_many_tracks.js
20220707093235-user_has_many_acts.js
20220707093236-user_has_many_albums.js
20220707093237-user_has_many_releases.js
20220707093238-user_has_many_videoclips.js
20220707093239-artist_has_many_tracks.js
20220707093240-artist_has_many_acts.js
20220707093241-artist_has_many_albums.js
20220707093242-artist_has_many_releases.js
20220707093243-artist_has_many_videoclips.js
2022070709324-tracks_has_one_videoclips.js
20220707093244-act_has_many_tracks.js
20220707093244-act_has_many_videoclips.js
20220707093245-releases_has_many_videoclips.js
20220707093246-releases_has_many_tracks.js
20220707093247-albums_has_many_tracks.js
20220707093248-albums_has_many_videoclips.js
20220707093249-user_has_one_token.js
20220707093250-delete_bollean_fields_in_tracks.js
20220707093251-change_tracks_bollean_fields_to_enum.js
20220707093252-change_tracks_bollean_fields_to_enum.js
20220707093253-change_tracks_date_of_reg_field.js
20220711073050-add_record_path_field_in_tracks_table.js
20220711114152-add_field_dist_ids_in_track_table.js
20220711140752-add_field_performers_to_tracks.js
20220711142959-change_field_share_of_related_right_in_tracks.js
20220717142122-add_field_path_to_mp3_path_to_wav_path_to_cover_on_track_table.js
20220807120808-add_fields_in_track_table.js
20220807124018-add_table_track_owners.js
\.


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: andrey
--

COPY public.contacts (id_contact, fk_id_user, name, phone, "updatedAt", "createdAt") FROM stdin;
2	97	Андрей2	89123124252	2022-08-20	2022-08-20
3	97	Алексей	812931231234	2022-08-21	2022-08-20
10	97	Андрей	891231234252	2022-08-21	2022-08-21
12	97	Алексей	89515753543	2022-08-21	2022-08-21
13	99	Олег	8951538435153	2022-08-21	2022-08-21
14	99	Алена	895154343544	2022-08-21	2022-08-21
\.


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: andrey
--

COPY public.tokens (fk_user_id, refresh_token) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: andrey
--

COPY public.users (id_user, email, password, "createdAt", deleted, role, "updatedAt") FROM stdin;
95	iobox420@gmail.com	$2b$04$a3eqnl8wsgSxsWYTBMxcEesuL1ei87Z05DqA3Tr7zMavLjp.d7s66	2022-08-20	f	admin	2022-08-20
1	test3@gmail.com	$2b$04$WvHll2x8fAPfhJ.J2dVjOut539mvtuld6P/58YU8ndjDErkZHXN16	2022-08-19	f	admin_not_activated	2022-08-20
96	iobox423@gmail.com	$2b$04$b..HS32DLbLUWQcOqHDcGOGhcjnscsIh6ycBfbzEQ/H0bDEP4EpMW	2022-08-20	f	admin	2022-08-20
97	test44@gmail.com	$2b$04$DtWrashNimWrcHh9rCvQ/.mqeS024U2xiwZvwPUltc3jHLVFP0lpO	2022-08-20	f	admin	2022-08-20
98	iobox421@gmail.com	$2b$04$Dun3BIm1JkZR8XqZuw6Cju3J6o90o4nZYY8HY12apjrH/buw8Ook6	2022-08-20	f	admin	2022-08-20
99	test123@gmail.com	$2b$04$atgE.LGijGX7QYeQC0YOheg0RYUKNzJTYtHionq.WHleZtAn3Pd9m	2022-08-21	f	admin	2022-08-21
\.


--
-- Name: table_name_id_contacts_seq; Type: SEQUENCE SET; Schema: public; Owner: andrey
--

SELECT pg_catalog.setval('public.table_name_id_contacts_seq', 14, true);


--
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: andrey
--

SELECT pg_catalog.setval('public.users_id_user_seq', 99, true);


--
-- Name: users id_user_pk; Type: CONSTRAINT; Schema: public; Owner: andrey
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT id_user_pk PRIMARY KEY (id_user);


--
-- Name: contacts table_name_pk; Type: CONSTRAINT; Schema: public; Owner: andrey
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT table_name_pk PRIMARY KEY (id_contact);


--
-- Name: fk_user_id; Type: INDEX; Schema: public; Owner: andrey
--

CREATE INDEX fk_user_id ON public.tokens USING btree (fk_user_id);


--
-- Name: contacts contacts_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: andrey
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_users_fk FOREIGN KEY (fk_id_user) REFERENCES public.users(id_user) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: tokens user_has_one_token; Type: FK CONSTRAINT; Schema: public; Owner: andrey
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT user_has_one_token FOREIGN KEY (fk_user_id) REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

