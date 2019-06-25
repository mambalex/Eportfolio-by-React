--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: course_and_skill; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.course_and_skill (
    code character(8) NOT NULL,
    skill_id uuid NOT NULL,
    relevance double precision
);


--
-- Name: course_list; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.course_list (
    student_id text NOT NULL,
    code character(8) NOT NULL,
    certificat double precision NOT NULL
);


--
-- Name: courses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.courses (
    code character(8) NOT NULL,
    course_name text NOT NULL
);


--
-- Name: education_exp; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.education_exp (
    education_exp_uuid uuid NOT NULL,
    student_id text NOT NULL,
    major text,
    university text,
    degree character varying(10),
    time_during text
);


--
-- Name: enrolment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.enrolment (
    enrol_id uuid NOT NULL,
    student_id text NOT NULL,
    company_id text NOT NULL,
    resume_id uuid NOT NULL
);


--
-- Name: interview_status; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.interview_status (
    status_uuid uuid NOT NULL,
    name text NOT NULL
);


--
-- Name: interviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.interviews (
    interview_uuid uuid NOT NULL,
    job_info_id uuid,
    student_id text NOT NULL,
    company_id text NOT NULL,
    interview_time text,
    location text,
    status uuid NOT NULL,
    type integer
);


--
-- Name: job_and_skill; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_and_skill (
    job_id uuid NOT NULL,
    skill_id uuid NOT NULL,
    relevance double precision
);


--
-- Name: job_info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_info (
    job_info_id uuid NOT NULL,
    job_id uuid NOT NULL,
    company_id text NOT NULL,
    description text,
    job_type text,
    salary text,
    location text,
    address text NOT NULL
);


--
-- Name: job_title; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_title (
    job_id uuid NOT NULL,
    job_name text NOT NULL
);


--
-- Name: personal_skill; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.personal_skill (
    student_id text NOT NULL,
    skill_data text NOT NULL
);


--
-- Name: recommend; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recommend (
    master_id text NOT NULL,
    item_id text NOT NULL,
    base_mark integer,
    bonus integer,
    referrer text NOT NULL,
    ref_username text NOT NULL,
    recommend_type integer NOT NULL
);


--
-- Name: resume; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.resume (
    resume_id uuid NOT NULL,
    student_id text NOT NULL,
    address text NOT NULL
);


--
-- Name: save_list; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.save_list (
    user_id text NOT NULL,
    job_info_id uuid NOT NULL
);


--
-- Name: saved_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.saved_user (
    master_id text NOT NULL,
    user_id text NOT NULL
);


--
-- Name: skill_list; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skill_list (
    student_id text NOT NULL,
    skill_id uuid NOT NULL,
    course_code character(8) NOT NULL,
    skill_type text NOT NULL,
    skill_from integer NOT NULL,
    proficiency integer NOT NULL
);


--
-- Name: skills; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skills (
    skill_id uuid NOT NULL,
    skill_name text NOT NULL
);


--
-- Name: target_list; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.target_list (
    item_id text NOT NULL,
    target_uuid uuid NOT NULL
);


--
-- Name: targets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.targets (
    target_uuid uuid NOT NULL,
    name text NOT NULL,
    type integer NOT NULL
);


--
-- Name: user_info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_info (
    username text NOT NULL,
    uname text,
    password text NOT NULL,
    email text NOT NULL,
    gender text NOT NULL,
    dob text NOT NULL,
    phone text,
    location text,
    role text NOT NULL,
    description text,
    link text,
    photo text
);


--
-- Name: working_exp; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.working_exp (
    working_exp_uuid uuid NOT NULL,
    user_id text NOT NULL,
    name text NOT NULL,
    description character varying(200),
    link text,
    exp_type integer NOT NULL
);


--
-- Data for Name: course_and_skill; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.course_and_skill (code, skill_id, relevance) FROM stdin;
comp9020	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
comp9020	357c99ad-186d-3685-9257-03ad6451a3aa	1
comp9021	c9f8b609-b81e-3c95-8188-914324e741c8	1
comp9021	19a48b54-b53d-3ea5-bd62-5c40b4141a18	1
comp9032	b5341ec2-5844-3ff4-a6e0-223cd91b53e3	1
comp9032	d841aee0-cc22-3fd4-b084-36f16171022c	1
comp9032	6c640f18-7b22-342b-9bf7-e2e4ea19693e	1
comp9311	87f15f4f-5a93-33a6-9c66-d3c87ee3e0be	1
comp9311	1c6d1adc-d540-33c3-957b-ce27baf0ab6d	1
comp9414	69089e61-a58d-3c15-a133-3f2b766f20b6	1
comp9414	bbd0dcf2-2d6e-3ae7-a0f3-f5b4dced5262	1
comp9814	69089e61-a58d-3c15-a133-3f2b766f20b6	1
comp9814	bbd0dcf2-2d6e-3ae7-a0f3-f5b4dced5262	1
comp9511	cb04113a-8fe9-3aa2-b37a-0263c77db241	1
comp9511	da917db6-801c-34e3-bb9c-8d512cb592a9	1
comp4418	d5c2d6da-f9c8-3911-b2c2-9fa5e0800b34	1
comp4418	ec7ef635-1b41-3699-8592-eca99cd9346e	1
comp9024	22a8bbf1-7366-3fc5-8876-94f70935a8eb	1
comp9024	351a6212-43d8-390f-9d6c-39f352325693	1
comp9041	e7275f8c-3729-37eb-888e-61f93c989d85	1
comp9041	a70c7d1f-ed10-3f1d-b5a7-723379c68ea8	1
comp9041	fb724217-4ae8-3f54-8487-5e799591b0d7	1
comp9041	eae51a28-cdf1-11e8-9a88-4c3275989ef5	1
comp6324	60cdf775-9f42-3d68-9f43-f0e561e7dbb9	1
comp9101	56c0b67f-e8f2-353b-8a56-0d3a6f540eae	1
comp9801	45a287f8-ca08-3435-b46a-c9768c325236	1
comp9222	a1564b97-0ea9-37d1-95e2-f49dc45f0a80	1
comp9321	3760acfe-fffa-34d5-9ff2-9657c8f92f4f	1
comp9321	c9f8b609-b81e-3c95-8188-914324e741c8	1
comp9321	57f67dab-30e3-3535-8633-1bdb0fb688ee	1
comp9321	eae51a28-cdf1-11e8-9a88-4c3275989ef5	1
comp9322	dcefea28-4f07-3b94-ac03-741e6433aff0	1
comp9322	9d19517a-c5e3-3721-be4d-93ce7433557c	1
comp9322	f1908179-97c1-3adb-a302-a78a080d14fa	1
comp9322	62bebfd9-8146-3ee8-b361-978cde4cd730	1
comp9331	b1dd4ae4-515a-373a-84d2-0e1f72e897a5	1
comp9331	068f4abb-6a6d-386a-8989-88f13ce7527e	1
comp9331	49f53673-6fc7-3ef5-874e-240a6aaf16f4	1
comp9334	191288e8-1cc7-3f07-a41f-4a66c6f5dfd3	1
comp9334	7402455f-1081-3fb6-a926-30126948e110	1
comp9415	898bc4e9-c21c-3d48-8024-d7c095896d80	1
comp9415	67ea51b3-fe07-3ad7-b5c9-75d9eed3adbe	1
comp9447	d07ede95-fb83-3ef5-8dee-4fc0cc89d278	1
comp4141	4c61d575-8b29-36d9-8e95-a2b4fdb4378c	1
comp4161	52bcfa9b-af04-3401-a43f-a5181656f6bf	1
comp6441	3fbbdd7f-7ab8-3da0-b30a-c3542c1cd080	1
comp6441	6de987cf-a2c3-30db-9b4e-9456c18c8ce3	1
comp6714	d5fab82d-6f7a-3755-81ab-f7b19d8c75b6	1
comp6733	3115020d-cf10-3c4b-957e-44af12454c11	1
comp6733	2625f88e-082a-38f4-b64d-72020757e6c1	1
comp6733	c9f8b609-b81e-3c95-8188-914324e741c8	1
comp6714	c9f8b609-b81e-3c95-8188-914324e741c8	1
comp6733	0ae95e05-7a4c-30d0-91fb-01facfba8724	1
comp6733	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	1
comp9024	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	1
comp6752	081e1acc-e2b4-3264-9899-e7d6201ca1d5	1
comp6771	ec658a2c-b151-3fad-b95c-8b552e8d319e	1
comp6841	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	1
comp6841	3fbbdd7f-7ab8-3da0-b30a-c3542c1cd080	1
comp6841	6de987cf-a2c3-30db-9b4e-9456c18c8ce3	1
comp9102	848900da-4e32-3321-897e-013d89c56431	1
comp9102	0ac30d98-3ba4-3e67-bc41-b202ecf85c02	1
comp9102	3cc2e3e2-1c0c-32de-9219-89c5a8a6e98b	1
comp9151	c4f1f228-2ecb-3ca8-a1cb-0ff5a9e19ed3	1
comp9151	6e72c1a4-bb00-3ad4-88ae-853fb41b3a2e	1
comp9153	7de9dde7-88fd-3c47-b973-3a7ec4d9b07d	1
comp9153	8b3d1a26-29eb-3a78-b951-bf009270ba7c	1
comp9201	60bfe473-3267-36e5-9a4c-c6f2ecd223e0	1
comp9283	46703081-b63c-3706-b989-23a85f4a82be	1
comp9211	be86777d-ba51-3ce0-a21a-5a4ce16a6f6f	1
comp9313	26fa4c6f-5e0c-37bd-aa63-89c2be801134	1
comp9313	0ae95e05-7a4c-30d0-91fb-01facfba8724	1
comp9313	2c00af02-8e97-3ceb-b686-3312db7744a1	1
comp9313	ef1cd4dd-d4f2-3d02-b085-05a95166f734	1
comp9315	08397f7b-fbcb-326c-a698-544043088399	1
comp9315	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	1
comp9318	cbffd579-ce58-3404-922e-c095bec015fb	1
comp9318	8e64b92f-7ecd-3d58-aa39-a7f1fd142d02	1
comp9313	8e64b92f-7ecd-3d58-aa39-a7f1fd142d02	1
comp9313	731fde50-9da1-3b17-96e6-6c35e0c5ee6a	1
comp9319	f4dcc9ba-fa98-3e02-8c86-aa16d80a1a3f	1
comp9332	1f114cd6-b9c5-3ea2-891d-211ce40a81f7	1
comp9333	2747482d-96e5-3522-801c-848ee5c6c2a0	1
comp9336	df1992e5-30f6-3eb4-a4d0-9e491234e5ae	1
comp9336	e2b02e9f-86d9-3c35-9993-11d24c7ca068	1
comp9336	0ae95e05-7a4c-30d0-91fb-01facfba8724	1
comp9337	72d862bd-09af-3953-bdd5-b555be62ff3e	1
comp9337	dec9d4b4-8375-307d-b9c4-bd3ee3238908	1
comp9337	58f54dd2-48a3-3b65-a626-ea9a3cd6a3c7	1
comp9417	5a965597-6922-3209-8ed5-fe852c49a462	1
comp9417	8e64b92f-7ecd-3d58-aa39-a7f1fd142d02	1
comp9431	5aa3e29f-f7b5-320a-9e31-9018e1b2d827	1
comp9431	7d3d4da6-ab46-3c51-8bc0-670ff3d56662	1
comp9444	a50d2753-f331-3adf-8566-dd284bb31a18	1
comp9444	c9a63803-7215-3914-9e98-9a3005b2d90c	1
comp9517	faab44d2-5b65-352e-8bf7-51cc93a69431	1
comp4121	72856a63-a110-3fda-8855-e9759c9d846f	1
comp6443	f14b4e97-fa21-3cd7-b29b-2263da5810e4	1
comp6445	3a25d948-becb-37e9-804e-197856988e05	1
comp6447	e787e2af-deca-3e00-83cc-3ef24d7ab0fa	1
comp6447	d1066795-fb00-3480-8db2-ad7b79597e12	1
comp6447	3fbbdd7f-7ab8-3da0-b30a-c3542c1cd080	1
comp6448	d07ede95-fb83-3ef5-8dee-4fc0cc89d278	1
comp6448	d1066795-fb00-3480-8db2-ad7b79597e12	1
comp6448	3fbbdd7f-7ab8-3da0-b30a-c3542c1cd080	1
comp6741	b59f600f-bed6-31f7-b6bb-8c03816b03f4	1
comp6741	d35b070c-2cf8-37ed-aea5-25a1b16af52c	1
comp6843	9999f509-b41a-3fac-b8ef-fa452db63be9	1
comp6843	f14b4e97-fa21-3cd7-b29b-2263da5810e4	1
comp6843	3fbbdd7f-7ab8-3da0-b30a-c3542c1cd080	1
comp6845	f11f1ce2-adf7-3230-886e-c0f26445aa81	1
comp9242	cc7abdcb-e066-362a-ba3a-78d536db3af1	1
comp9242	46703081-b63c-3706-b989-23a85f4a82be	1
comp9242	f1ac423d-c20a-390b-9af8-6f058ead0ac1	1
comp9243	6e462100-0fb5-3f95-af7d-0ba2966b22a5	1
comp9323	77fbed7a-063a-369c-b23c-4b02ae251c7a	1
comp9323	8b572158-3550-36db-988e-b2c6bad4df23	1
comp9323	eae51a28-cdf1-11e8-9a88-4c3275989ef5	1
comp9418	5a965597-6922-3209-8ed5-fe852c49a462	1
comp9418	350440d4-a409-322f-9322-4f2c964685d6	1
\.


--
-- Data for Name: course_list; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.course_list (student_id, code, certificat) FROM stdin;
candidate1	comp9021	1
candidate1	comp9024	1
candidate1	comp9311	1
candidate1	comp9331	1
candidate1	gsoe9820	1
candidate1	comp9041	1
candidate1	comp9020	1
candidate1	comp9321	1
candidate1	comp9334	1
candidate1	comp6714	1
candidate1	comp9313	1
candidate1	comp9315	1
candidate1	comp9318	1
candidate1	comp9417	1
candidate1	comp9323	1
candidate1	comp9900	1
candidate2	comp9021	1
candidate2	comp9024	1
candidate2	comp9311	1
candidate2	comp9331	1
candidate2	gsoe9820	1
candidate2	comp9414	1
candidate2	comp9417	1
candidate2	comp9418	1
candidate2	comp9444	1
candidate2	comp9517	1
candidate2	comp9318	1
candidate2	comp9313	1
candidate2	comp9323	1
candidate2	comp6714	1
candidate2	comp9020	1
candidate2	comp9900	1
candidate3	comp9021	1
candidate3	comp9024	1
candidate3	comp9311	1
candidate3	comp9331	1
candidate3	gsoe9820	1
candidate3	comp9315	1
candidate3	comp9334	1
candidate3	comp9020	1
candidate3	comp9101	1
candidate3	comp6771	1
candidate3	comp9153	1
candidate3	comp9201	1
candidate3	comp9242	1
candidate3	comp9243	1
candidate3	comp9900	1
candidate3	comp9041	1
candidate4	comp9021	1
candidate4	comp9024	1
candidate4	comp9311	1
candidate4	comp9331	1
candidate4	gsoe9820	1
candidate4	comp9041	1
candidate4	comp9102	1
candidate4	comp9321	1
candidate4	comp9315	1
candidate4	comp9318	1
candidate4	comp9319	1
candidate4	comp9417	1
candidate4	comp9323	1
candidate4	comp4141	1
candidate4	comp9322	1
candidate4	comp9900	1
candidate5	comp9021	1
candidate5	comp9024	1
candidate5	comp9311	1
candidate5	comp9331	1
candidate5	gsoe9820	1
candidate5	comp9334	1
candidate5	comp6714	1
candidate5	comp9321	1
candidate5	comp9313	1
candidate5	comp9318	1
candidate5	comp9444	1
candidate5	comp9323	1
candidate5	comp9332	1
candidate5	comp9517	1
candidate5	comp9041	1
candidate5	comp9900	1
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.courses (code, course_name) FROM stdin;
gsoe9820	engineering project management
comp9900	information technology project
comp9020	foundations of computer science
comp9021	principles of programming
comp9032	microprocessors and interfacing
comp9311	database systems
comp9414	artificial intelligence
comp9814	extended artificial intelligence
comp9511	human computer interaction
comp4418	knowledge representation and reasoning
comp6324	internet of things service design and engineering
comp9024	data structures and algorithms
comp9041	software construction: techniques and tools
comp9101	design & analysis of algorithms
comp9801	extended design & analysis of algorithms
comp9222	digital circuits and systems
comp9321	data services engineering
comp9322	software service design and engineering
comp9331	computer networks and applications
comp9334	system capacity planning
comp9415	computer graphics
comp9447	security engineering workshop
comp4141	theory of computation
comp4161	advanced topics in software verification
comp6441	security engineering and cyber security
comp6714	information retrieval and web search
comp6733	internet of things experimental design studio
comp6752	modelling concurrent systems
comp6771	advanced c++ programming
comp6841	extended security engineering and cyber security
comp9102	programming languages and compilers
comp9151	foundations of concurrency
comp9161	concepts of programming languages
comp9153	algorithmic verification
comp9201	operating systems
comp9283	extended operating systems
comp9211	computer architecture
comp9313	big data management
comp9315	database systems implementation
comp9318	data warehousing and data mining
comp9319	web data compression and search
comp9332	network routing and switching
comp9333	advanced computer networks
comp9336	mobile data networking
comp9337	securing wireless networks
comp9417	machine learning and data mining
comp9431	robotic software architecture
comp9444	neural networks
comp9517	computer vision
comp4121	advanced and parallel algorithms
comp6443	web application security testing
comp6445	digital forensics
comp6447	system and software security assessment
comp6448	security engineering masterclass
comp6741	parameterized and exact computation
comp6843	extended web application security and testing
comp6845	extended digital forensics and incident response
comp9242	advanced operating systems
comp9243	distributed systems
comp9323	software as a service project
comp9418	advanced topics in statistical machine learning
\.


--
-- Data for Name: education_exp; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.education_exp (education_exp_uuid, student_id, major, university, degree, time_during) FROM stdin;
ab180d42-cd5d-11e8-bb98-4c3275989ef5	candidate1	IT	UNSW	Master	09/2016-06/2018
81c032c0-cd5e-11e8-a01d-4c3275989ef5	candidate1	IT	UTS	Bachelor	09/2013-06/2016
f3d08582-cd5d-11e8-b30f-4c3275989ef5	candidate2	IT	UNSW	Master	09/2016-06/2018
b173c040-cd5e-11e8-8d2c-4c3275989ef5	candidate2	CS	USYD	Bachelor	09/2013-06/2016
0ae54636-cd5e-11e8-8491-4c3275989ef5	candidate3	IT	UNSW	Master	09/2016-06/2018
d0d6add0-cd5e-11e8-804a-4c3275989ef5	candidate3	EE	MIT	Bachelor	09/2013-06/2016
359f73c6-cd5e-11e8-a5e7-4c3275989ef5	candidate4	IT	UNSW	Master	09/2016-06/2018
e6b90846-cd5e-11e8-91da-4c3275989ef5	candidate4	IT	UNSW	Bachelor	09/2013-06/2016
47ea1ce6-cd5e-11e8-8bfa-4c3275989ef5	candidate5	IT	UNSW	Master	09/2016-06/2018
\.


--
-- Data for Name: enrolment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.enrolment (enrol_id, student_id, company_id, resume_id) FROM stdin;
ae750864-cdd5-11e8-ac21-4c3275989ef5	candidate2	employer1	a3312d80-cd61-11e8-8574-4c3275989ef5
2468789e-ced0-11e8-a89f-4c3275989ef5	candidate5	employer1	a3312d80-cd61-11e8-8574-4c3275989ef5
f8f99228-cdd4-11e8-b29f-4c3275989ef5	candidate1	employer2	e4b2b408-cd62-11e8-a2dc-4c3275989ef5
\.


--
-- Data for Name: interview_status; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.interview_status (status_uuid, name) FROM stdin;
2b128e58-cdd3-11e8-894f-4c3275989ef5	Start
53e3baf0-cdd3-11e8-b600-4c3275989ef5	First Interview
7413af9c-cdd3-11e8-b71a-4c3275989ef5	Tests
827f3f10-cdd3-11e8-a548-4c3275989ef5	Second Interview
2d4cbd28-cdd4-11e8-a778-4c3275989ef5	Offer
529520de-cdd4-11e8-b7b2-4c3275989ef5	Engaged
75a8bfe2-cdd4-11e8-a454-4c3275989ef5	Fail
\.


--
-- Data for Name: interviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.interviews (interview_uuid, job_info_id, student_id, company_id, interview_time, location, status, type) FROM stdin;
4f5cf110-cdd6-11e8-a3d1-4c3275989ef5	a3312d80-cd61-11e8-8574-4c3275989ef5	candidate1	employer1	22/10/2018 15:00	9-13 Hay St, Haymarket NSW 2000	53e3baf0-cdd3-11e8-b600-4c3275989ef5	1
48fcd970-ced0-11e8-9b9c-4c3275989ef5	ee0cb82e-cd61-11e8-b040-4c3275989ef5	candidate2	employer1	22/10/2018 15:30	9-13 Hay St, Haymarket NSW 2000	7413af9c-cdd3-11e8-b71a-4c3275989ef5	1
4f8cbeb8-ced0-11e8-a092-4c3275989ef5	a3312d80-cd61-11e8-8574-4c3275989ef5	candidate3	employer1	22/10/2018 16:00	9-13 Hay St, Haymarket NSW 2000	827f3f10-cdd3-11e8-a548-4c3275989ef5	1
5586348c-ced0-11e8-973e-4c3275989ef5	a3312d80-cd61-11e8-8574-4c3275989ef5	candidate4	employer1	22/10/2018 10:00	9-13 Hay St, Haymarket NSW 2000	2d4cbd28-cdd4-11e8-a778-4c3275989ef5	1
dbe24338-cdd6-11e8-96a9-4c3275989ef5	8b550dd4-cd62-11e8-b73e-4c3275989ef5	candidate5	employer2	22/10/2018 15:00	9-13 Hay St, Haymarket NSW 2000	529520de-cdd4-11e8-b7b2-4c3275989ef5	1
\.


--
-- Data for Name: job_and_skill; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job_and_skill (job_id, skill_id, relevance) FROM stdin;
b756d5a1-376c-3a96-9836-d225cced3e87	08397f7b-fbcb-326c-a698-544043088399	1
b756d5a1-376c-3a96-9836-d225cced3e87	87f15f4f-5a93-33a6-9c66-d3c87ee3e0be	1
b756d5a1-376c-3a96-9836-d225cced3e87	1c6d1adc-d540-33c3-957b-ce27baf0ab6d	1
b756d5a1-376c-3a96-9836-d225cced3e87	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
b756d5a1-376c-3a96-9836-d225cced3e87	69089e61-a58d-3c15-a133-3f2b766f20b6	1
b756d5a1-376c-3a96-9836-d225cced3e87	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	1
b756d5a1-376c-3a96-9836-d225cced3e87	ec658a2c-b151-3fad-b95c-8b552e8d319e	1
b756d5a1-376c-3a96-9836-d225cced3e87	22a8bbf1-7366-3fc5-8876-94f70935a8eb	1
b756d5a1-376c-3a96-9836-d225cced3e87	0ae95e05-7a4c-30d0-91fb-01facfba8724	1
6181ab05-a151-30fc-ba53-604416ad8399	72856a63-a110-3fda-8855-e9759c9d846f	1
6181ab05-a151-30fc-ba53-604416ad8399	69089e61-a58d-3c15-a133-3f2b766f20b6	1
6181ab05-a151-30fc-ba53-604416ad8399	351a6212-43d8-390f-9d6c-39f352325693	1
6181ab05-a151-30fc-ba53-604416ad8399	22a8bbf1-7366-3fc5-8876-94f70935a8eb	1
6181ab05-a151-30fc-ba53-604416ad8399	45a287f8-ca08-3435-b46a-c9768c325236	1
6181ab05-a151-30fc-ba53-604416ad8399	0ae95e05-7a4c-30d0-91fb-01facfba8724	1
6181ab05-a151-30fc-ba53-604416ad8399	19a48b54-b53d-3ea5-bd62-5c40b4141a18	1
6181ab05-a151-30fc-ba53-604416ad8399	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
964ea73b-e273-330e-b1e9-adb3ab054aca	72856a63-a110-3fda-8855-e9759c9d846f	1
964ea73b-e273-330e-b1e9-adb3ab054aca	69089e61-a58d-3c15-a133-3f2b766f20b6	1
964ea73b-e273-330e-b1e9-adb3ab054aca	351a6212-43d8-390f-9d6c-39f352325693	1
964ea73b-e273-330e-b1e9-adb3ab054aca	22a8bbf1-7366-3fc5-8876-94f70935a8eb	1
964ea73b-e273-330e-b1e9-adb3ab054aca	45a287f8-ca08-3435-b46a-c9768c325236	1
964ea73b-e273-330e-b1e9-adb3ab054aca	19a48b54-b53d-3ea5-bd62-5c40b4141a18	1
964ea73b-e273-330e-b1e9-adb3ab054aca	c9f8b609-b81e-3c95-8188-914324e741c8	1
964ea73b-e273-330e-b1e9-adb3ab054aca	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
5decd670-1b32-38fb-8e2e-633785e6315b	72856a63-a110-3fda-8855-e9759c9d846f	1
5decd670-1b32-38fb-8e2e-633785e6315b	69089e61-a58d-3c15-a133-3f2b766f20b6	1
5decd670-1b32-38fb-8e2e-633785e6315b	351a6212-43d8-390f-9d6c-39f352325693	1
5decd670-1b32-38fb-8e2e-633785e6315b	22a8bbf1-7366-3fc5-8876-94f70935a8eb	1
5decd670-1b32-38fb-8e2e-633785e6315b	45a287f8-ca08-3435-b46a-c9768c325236	1
5decd670-1b32-38fb-8e2e-633785e6315b	19a48b54-b53d-3ea5-bd62-5c40b4141a18	1
5decd670-1b32-38fb-8e2e-633785e6315b	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	1
5decd670-1b32-38fb-8e2e-633785e6315b	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
3c8a7b8e-b795-3b2e-8cd3-ba2a72b7be56	72856a63-a110-3fda-8855-e9759c9d846f	1
3c8a7b8e-b795-3b2e-8cd3-ba2a72b7be56	69089e61-a58d-3c15-a133-3f2b766f20b6	1
3c8a7b8e-b795-3b2e-8cd3-ba2a72b7be56	351a6212-43d8-390f-9d6c-39f352325693	1
3c8a7b8e-b795-3b2e-8cd3-ba2a72b7be56	22a8bbf1-7366-3fc5-8876-94f70935a8eb	1
3c8a7b8e-b795-3b2e-8cd3-ba2a72b7be56	45a287f8-ca08-3435-b46a-c9768c325236	1
3c8a7b8e-b795-3b2e-8cd3-ba2a72b7be56	19a48b54-b53d-3ea5-bd62-5c40b4141a18	1
3c8a7b8e-b795-3b2e-8cd3-ba2a72b7be56	ec658a2c-b151-3fad-b95c-8b552e8d319e	1
3c8a7b8e-b795-3b2e-8cd3-ba2a72b7be56	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
dea7cabe-514b-3893-9d41-b18431987e4d	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	1
dea7cabe-514b-3893-9d41-b18431987e4d	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
dea7cabe-514b-3893-9d41-b18431987e4d	351a6212-43d8-390f-9d6c-39f352325693	1
dea7cabe-514b-3893-9d41-b18431987e4d	6c640f18-7b22-342b-9bf7-e2e4ea19693e	1
dea7cabe-514b-3893-9d41-b18431987e4d	22a8bbf1-7366-3fc5-8876-94f70935a8eb	1
dea7cabe-514b-3893-9d41-b18431987e4d	d841aee0-cc22-3fd4-b084-36f16171022c	1
dea7cabe-514b-3893-9d41-b18431987e4d	19a48b54-b53d-3ea5-bd62-5c40b4141a18	1
dea7cabe-514b-3893-9d41-b18431987e4d	3cc2e3e2-1c0c-32de-9219-89c5a8a6e98b	1
dea7cabe-514b-3893-9d41-b18431987e4d	a1564b97-0ea9-37d1-95e2-f49dc45f0a80	1
bac63bb7-e032-360d-9fc9-68e800aef1cb	72856a63-a110-3fda-8855-e9759c9d846f	1
bac63bb7-e032-360d-9fc9-68e800aef1cb	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
bac63bb7-e032-360d-9fc9-68e800aef1cb	351a6212-43d8-390f-9d6c-39f352325693	1
bac63bb7-e032-360d-9fc9-68e800aef1cb	7402455f-1081-3fb6-a926-30126948e110	1
bac63bb7-e032-360d-9fc9-68e800aef1cb	3fbbdd7f-7ab8-3da0-b30a-c3542c1cd080	1
bac63bb7-e032-360d-9fc9-68e800aef1cb	f4dcc9ba-fa98-3e02-8c86-aa16d80a1a3f	1
bac63bb7-e032-360d-9fc9-68e800aef1cb	22a8bbf1-7366-3fc5-8876-94f70935a8eb	1
bac63bb7-e032-360d-9fc9-68e800aef1cb	068f4abb-6a6d-386a-8989-88f13ce7527e	1
bac63bb7-e032-360d-9fc9-68e800aef1cb	49f53673-6fc7-3ef5-874e-240a6aaf16f4	1
bac63bb7-e032-360d-9fc9-68e800aef1cb	df1992e5-30f6-3eb4-a4d0-9e491234e5ae	1
bac63bb7-e032-360d-9fc9-68e800aef1cb	58f54dd2-48a3-3b65-a626-ea9a3cd6a3c7	1
bac63bb7-e032-360d-9fc9-68e800aef1cb	2747482d-96e5-3522-801c-848ee5c6c2a0	1
bac63bb7-e032-360d-9fc9-68e800aef1cb	1f114cd6-b9c5-3ea2-891d-211ce40a81f7	1
bac63bb7-e032-360d-9fc9-68e800aef1cb	b1dd4ae4-515a-373a-84d2-0e1f72e897a5	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	72856a63-a110-3fda-8855-e9759c9d846f	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	7de9dde7-88fd-3c47-b973-3a7ec4d9b07d	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	62bebfd9-8146-3ee8-b361-978cde4cd730	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	351a6212-43d8-390f-9d6c-39f352325693	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	ec658a2c-b151-3fad-b95c-8b552e8d319e	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	9d19517a-c5e3-3721-be4d-93ce7433557c	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	22a8bbf1-7366-3fc5-8876-94f70935a8eb	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	45a287f8-ca08-3435-b46a-c9768c325236	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	0ae95e05-7a4c-30d0-91fb-01facfba8724	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	191288e8-1cc7-3f07-a41f-4a66c6f5dfd3	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	19a48b54-b53d-3ea5-bd62-5c40b4141a18	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	c9f8b609-b81e-3c95-8188-914324e741c8	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	e7275f8c-3729-37eb-888e-61f93c989d85	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	77fbed7a-063a-369c-b23c-4b02ae251c7a	1
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	d1066795-fb00-3480-8db2-ad7b79597e12	1
7738c4a5-5604-37f6-8b59-8d754dcfb052	72856a63-a110-3fda-8855-e9759c9d846f	1
7738c4a5-5604-37f6-8b59-8d754dcfb052	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
7738c4a5-5604-37f6-8b59-8d754dcfb052	351a6212-43d8-390f-9d6c-39f352325693	1
7738c4a5-5604-37f6-8b59-8d754dcfb052	7402455f-1081-3fb6-a926-30126948e110	1
7738c4a5-5604-37f6-8b59-8d754dcfb052	3fbbdd7f-7ab8-3da0-b30a-c3542c1cd080	1
7738c4a5-5604-37f6-8b59-8d754dcfb052	f4dcc9ba-fa98-3e02-8c86-aa16d80a1a3f	1
7738c4a5-5604-37f6-8b59-8d754dcfb052	22a8bbf1-7366-3fc5-8876-94f70935a8eb	1
7738c4a5-5604-37f6-8b59-8d754dcfb052	068f4abb-6a6d-386a-8989-88f13ce7527e	1
7738c4a5-5604-37f6-8b59-8d754dcfb052	49f53673-6fc7-3ef5-874e-240a6aaf16f4	1
7738c4a5-5604-37f6-8b59-8d754dcfb052	df1992e5-30f6-3eb4-a4d0-9e491234e5ae	1
7738c4a5-5604-37f6-8b59-8d754dcfb052	58f54dd2-48a3-3b65-a626-ea9a3cd6a3c7	1
7738c4a5-5604-37f6-8b59-8d754dcfb052	2747482d-96e5-3522-801c-848ee5c6c2a0	1
7738c4a5-5604-37f6-8b59-8d754dcfb052	1f114cd6-b9c5-3ea2-891d-211ce40a81f7	1
7738c4a5-5604-37f6-8b59-8d754dcfb052	b1dd4ae4-515a-373a-84d2-0e1f72e897a5	1
7ce737f5-ee12-31c9-9834-6dce5b88fae1	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
7ce737f5-ee12-31c9-9834-6dce5b88fae1	351a6212-43d8-390f-9d6c-39f352325693	1
7ce737f5-ee12-31c9-9834-6dce5b88fae1	3fbbdd7f-7ab8-3da0-b30a-c3542c1cd080	1
7ce737f5-ee12-31c9-9834-6dce5b88fae1	e787e2af-deca-3e00-83cc-3ef24d7ab0fa	1
7ce737f5-ee12-31c9-9834-6dce5b88fae1	3a25d948-becb-37e9-804e-197856988e05	1
7ce737f5-ee12-31c9-9834-6dce5b88fae1	6de987cf-a2c3-30db-9b4e-9456c18c8ce3	1
7ce737f5-ee12-31c9-9834-6dce5b88fae1	f11f1ce2-adf7-3230-886e-c0f26445aa81	1
7ce737f5-ee12-31c9-9834-6dce5b88fae1	9999f509-b41a-3fac-b8ef-fa452db63be9	1
7ce737f5-ee12-31c9-9834-6dce5b88fae1	068f4abb-6a6d-386a-8989-88f13ce7527e	1
7ce737f5-ee12-31c9-9834-6dce5b88fae1	58f54dd2-48a3-3b65-a626-ea9a3cd6a3c7	1
7ce737f5-ee12-31c9-9834-6dce5b88fae1	d07ede95-fb83-3ef5-8dee-4fc0cc89d278	1
7ce737f5-ee12-31c9-9834-6dce5b88fae1	d1066795-fb00-3480-8db2-ad7b79597e12	1
7ce737f5-ee12-31c9-9834-6dce5b88fae1	f14b4e97-fa21-3cd7-b29b-2263da5810e4	1
7ce737f5-ee12-31c9-9834-6dce5b88fae1	dec9d4b4-8375-307d-b9c4-bd3ee3238908	1
1b8b3d18-dd4c-3948-a570-4e0de39b14dd	72856a63-a110-3fda-8855-e9759c9d846f	1
1b8b3d18-dd4c-3948-a570-4e0de39b14dd	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
1b8b3d18-dd4c-3948-a570-4e0de39b14dd	62bebfd9-8146-3ee8-b361-978cde4cd730	1
1b8b3d18-dd4c-3948-a570-4e0de39b14dd	351a6212-43d8-390f-9d6c-39f352325693	1
1b8b3d18-dd4c-3948-a570-4e0de39b14dd	3760acfe-fffa-34d5-9ff2-9657c8f92f4f	1
1b8b3d18-dd4c-3948-a570-4e0de39b14dd	57f67dab-30e3-3535-8633-1bdb0fb688ee	1
1b8b3d18-dd4c-3948-a570-4e0de39b14dd	7402455f-1081-3fb6-a926-30126948e110	1
1b8b3d18-dd4c-3948-a570-4e0de39b14dd	e787e2af-deca-3e00-83cc-3ef24d7ab0fa	1
1b8b3d18-dd4c-3948-a570-4e0de39b14dd	9999f509-b41a-3fac-b8ef-fa452db63be9	1
1b8b3d18-dd4c-3948-a570-4e0de39b14dd	8b572158-3550-36db-988e-b2c6bad4df23	1
1b8b3d18-dd4c-3948-a570-4e0de39b14dd	f14b4e97-fa21-3cd7-b29b-2263da5810e4	1
1b8b3d18-dd4c-3948-a570-4e0de39b14dd	f1908179-97c1-3adb-a302-a78a080d14fa	1
17b916a8-7477-33db-a8b2-d4475a6122e0	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
17b916a8-7477-33db-a8b2-d4475a6122e0	62bebfd9-8146-3ee8-b361-978cde4cd730	1
17b916a8-7477-33db-a8b2-d4475a6122e0	351a6212-43d8-390f-9d6c-39f352325693	1
17b916a8-7477-33db-a8b2-d4475a6122e0	26fa4c6f-5e0c-37bd-aa63-89c2be801134	1
17b916a8-7477-33db-a8b2-d4475a6122e0	f4dcc9ba-fa98-3e02-8c86-aa16d80a1a3f	1
17b916a8-7477-33db-a8b2-d4475a6122e0	8e64b92f-7ecd-3d58-aa39-a7f1fd142d02	1
17b916a8-7477-33db-a8b2-d4475a6122e0	9d19517a-c5e3-3721-be4d-93ce7433557c	1
17b916a8-7477-33db-a8b2-d4475a6122e0	22a8bbf1-7366-3fc5-8876-94f70935a8eb	1
17b916a8-7477-33db-a8b2-d4475a6122e0	cbffd579-ce58-3404-922e-c095bec015fb	1
17b916a8-7477-33db-a8b2-d4475a6122e0	08397f7b-fbcb-326c-a698-544043088399	1
17b916a8-7477-33db-a8b2-d4475a6122e0	87f15f4f-5a93-33a6-9c66-d3c87ee3e0be	1
17b916a8-7477-33db-a8b2-d4475a6122e0	c9a63803-7215-3914-9e98-9a3005b2d90c	1
17b916a8-7477-33db-a8b2-d4475a6122e0	6e462100-0fb5-3f95-af7d-0ba2966b22a5	1
17b916a8-7477-33db-a8b2-d4475a6122e0	45a287f8-ca08-3435-b46a-c9768c325236	1
17b916a8-7477-33db-a8b2-d4475a6122e0	2c00af02-8e97-3ceb-b686-3312db7744a1	1
17b916a8-7477-33db-a8b2-d4475a6122e0	d5fab82d-6f7a-3755-81ab-f7b19d8c75b6	1
17b916a8-7477-33db-a8b2-d4475a6122e0	1c6d1adc-d540-33c3-957b-ce27baf0ab6d	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	ec7ef635-1b41-3699-8592-eca99cd9346e	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	7de9dde7-88fd-3c47-b973-3a7ec4d9b07d	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	62bebfd9-8146-3ee8-b361-978cde4cd730	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	bbd0dcf2-2d6e-3ae7-a0f3-f5b4dced5262	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	69089e61-a58d-3c15-a133-3f2b766f20b6	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	898bc4e9-c21c-3d48-8024-d7c095896d80	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	faab44d2-5b65-352e-8bf7-51cc93a69431	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	8e64b92f-7ecd-3d58-aa39-a7f1fd142d02	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	c9a63803-7215-3914-9e98-9a3005b2d90c	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	56c0b67f-e8f2-353b-8a56-0d3a6f540eae	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	45a287f8-ca08-3435-b46a-c9768c325236	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	67ea51b3-fe07-3ad7-b5c9-75d9eed3adbe	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	2c00af02-8e97-3ceb-b686-3312db7744a1	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	5a965597-6922-3209-8ed5-fe852c49a462	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	357c99ad-186d-3685-9257-03ad6451a3aa	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	a50d2753-f331-3adf-8566-dd284bb31a18	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	191288e8-1cc7-3f07-a41f-4a66c6f5dfd3	1
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	ef1cd4dd-d4f2-3d02-b085-05a95166f734	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	cc7abdcb-e066-362a-ba3a-78d536db3af1	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	72856a63-a110-3fda-8855-e9759c9d846f	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	7de9dde7-88fd-3c47-b973-3a7ec4d9b07d	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	62bebfd9-8146-3ee8-b361-978cde4cd730	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	b5341ec2-5844-3ff4-a6e0-223cd91b53e3	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	351a6212-43d8-390f-9d6c-39f352325693	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	a70c7d1f-ed10-3f1d-b5a7-723379c68ea8	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	0ac30d98-3ba4-3e67-bc41-b202ecf85c02	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	6c640f18-7b22-342b-9bf7-e2e4ea19693e	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	d841aee0-cc22-3fd4-b084-36f16171022c	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	46703081-b63c-3706-b989-23a85f4a82be	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	60bfe473-3267-36e5-9a4c-c6f2ecd223e0	1
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	b59f600f-bed6-31f7-b6bb-8c03816b03f4	1
139fba48-21ca-3747-aa06-99d0c312d73d	b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	1
139fba48-21ca-3747-aa06-99d0c312d73d	e2b02e9f-86d9-3c35-9993-11d24c7ca068	1
139fba48-21ca-3747-aa06-99d0c312d73d	62bebfd9-8146-3ee8-b361-978cde4cd730	1
139fba48-21ca-3747-aa06-99d0c312d73d	351a6212-43d8-390f-9d6c-39f352325693	1
139fba48-21ca-3747-aa06-99d0c312d73d	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	1
139fba48-21ca-3747-aa06-99d0c312d73d	a70c7d1f-ed10-3f1d-b5a7-723379c68ea8	1
139fba48-21ca-3747-aa06-99d0c312d73d	be86777d-ba51-3ce0-a21a-5a4ce16a6f6f	1
139fba48-21ca-3747-aa06-99d0c312d73d	6c640f18-7b22-342b-9bf7-e2e4ea19693e	1
139fba48-21ca-3747-aa06-99d0c312d73d	6e462100-0fb5-3f95-af7d-0ba2966b22a5	1
139fba48-21ca-3747-aa06-99d0c312d73d	2625f88e-082a-38f4-b64d-72020757e6c1	1
139fba48-21ca-3747-aa06-99d0c312d73d	60cdf775-9f42-3d68-9f43-f0e561e7dbb9	1
139fba48-21ca-3747-aa06-99d0c312d73d	3115020d-cf10-3c4b-957e-44af12454c11	1
139fba48-21ca-3747-aa06-99d0c312d73d	df1992e5-30f6-3eb4-a4d0-9e491234e5ae	1
b6400800-d14a-11e8-8ddf-4c3275989ef5	eae51a28-cdf1-11e8-9a88-4c3275989ef5	1
7e967958-d14b-11e8-b8e7-4c3275989ef5	eae51a28-cdf1-11e8-9a88-4c3275989ef5	1
2d285552-d14c-11e8-979d-4c3275989ef5	1c6d1adc-d540-33c3-957b-ce27baf0ab6d	1
2d285552-d14c-11e8-979d-4c3275989ef5	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	1
2d285552-d14c-11e8-979d-4c3275989ef5	eae51a28-cdf1-11e8-9a88-4c3275989ef5	1
fbf56968-d14c-11e8-b56d-4c3275989ef5	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	1
f255d1fa-d14d-11e8-8e40-4c3275989ef5	0ae95e05-7a4c-30d0-91fb-01facfba8724	1
c0125ce4-d14e-11e8-8b23-4c3275989ef5	c9f8b609-b81e-3c95-8188-914324e741c8	1
c0125ce4-d14e-11e8-8b23-4c3275989ef5	eae51a28-cdf1-11e8-9a88-4c3275989ef5	1
749ad73a-d153-11e8-9fec-4c3275989ef5	1c6d1adc-d540-33c3-957b-ce27baf0ab6d	1
\.


--
-- Data for Name: job_info; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job_info (job_info_id, job_id, company_id, description, job_type, salary, location, address) FROM stdin;
a3312d80-cd61-11e8-8574-4c3275989ef5	4c3a4ee0-26be-30ff-94a3-d58e0d98299a	employer1	This is a job that need candidate familiar with machine learning algorithms	full_time	100000	Sydney	{"responsibility": ["Familiar with mainstream machine learning frameworks"], "itskill": ["Strong web development experience (Java, Scala, Python)", "Responsive design experience"], "personal_strength": ["To be able to work Autonomously", "Service oriented and passionate about helping clients", "Strong analytical and problem solving skills", "Disciplined, organized, punctual and caring attitude"], "others": ["Career development and advancement will be continuously on offer within this ever growing organisation!"], "date": "2018-10-13 21:50:30"}
ee0cb82e-cd61-11e8-b040-4c3275989ef5	4c3a4ee0-26be-30ff-94a3-d58e0d98299a	employer1	This is a part time job that welcome students who want to learn machine learning	part_time	30000	Sydney	{"responsibility": ["Familiar with mainstream machine learning frameworks"], "itskill": ["Strong web development experience (Java, Scala, Python)", "Responsive design experience"], "personal_strength": ["To be able to work Autonomously", "Service oriented and passionate about helping clients", "Strong analytical and problem solving skills", "Disciplined, organized, punctual and caring attitude"], "others": ["Career development and advancement will be continuously on offer within this ever growing organisation!"], "date": "2018-10-13 21:50:30"}
3eef2e48-cd62-11e8-9a1a-4c3275989ef5	1b8b3d18-dd4c-3948-a570-4e0de39b14dd	employer1	This is a job that need web developer who familiar with java and python	full_time	60000	Sydney	{"responsibility": ["Significant experience with UI Design and Development", "Working on Angular 4 or 5 frameworks", "Demonstrated ability (portfolio) in producing high quality web and mobile user interfaces", "Proficient in creating interactive wireframes, prototypes, storyboards and userflows", "Hands on experience working within Agile project teams"], "itskill": ["Strong web development experience (Python, Javascript / HTML5, CSS)", "Responsive design experience", "React / Redux experience", "React / Redux experience"], "personal_strength": ["To be able to work Autonomously", "Service oriented and passionate about helping clients", "Strong analytical and problem solving skills", "Disciplined, organized, punctual and caring attitude"], "others": ["Career development and advancement will be continuously on offer within this ever growing organisation!"], "date": "2018-10-13 21:50:30"}
8b550dd4-cd62-11e8-b73e-4c3275989ef5	1b8b3d18-dd4c-3948-a570-4e0de39b14dd	employer2	This job need a senior frontend developer who familiar with java and javascript	full_time	60000	Sydney	{"responsibility": ["Significant experience with UI Design and Development", "Working on Angular 4 or 5 frameworks", "Demonstrated ability (portfolio) in producing high quality web and mobile user interfaces", "Proficient in creating interactive wireframes, prototypes, storyboards and userflows", "Hands on experience working within Agile project teams"], "itskill": ["Strong web development experience (Javascript / HTML5, CSS)", "Responsive design experience", "React / Redux experience", "React / Redux experience"], "personal_strength": ["To be able to work Autonomously", "Service oriented and passionate about helping clients", "Strong analytical and problem solving skills", "Disciplined, organized, punctual and caring attitude"], "others": ["Career development and advancement will be continuously on offer within this ever growing organisation!"], "date": "2018-10-13 21:50:30"}
e4b2b408-cd62-11e8-a2dc-4c3275989ef5	1b8b3d18-dd4c-3948-a570-4e0de39b14dd	employer2	This job need a senior backend developer who familiar with python and information retrieval	full_time	70000	Sydney	{"responsibility": ["Familiar with mainstream machine learning frameworks"], "itskill": ["Strong web development experience (Java, Scala, Python)", "Responsive design experience"], "personal_strength": ["To be able to work Autonomously", "Service oriented and passionate about helping clients", "Strong analytical and problem solving skills", "Disciplined, organized, punctual and caring attitude"], "others": ["Career development and advancement will be continuously on offer within this ever growing organisation!"], "date": "2018-10-13 21:50:30"}
ed575474-cd62-11e8-a63c-4c3275989ef5	1b8b3d18-dd4c-3948-a570-4e0de39b14dd	employer2	This job need a senior backend developer who familiar with java and javascript	full_time	55000	Melbourne	{"responsibility": ["Significant experience with UI Design and Development", "Working on Angular 4 or 5 frameworks", "Demonstrated ability (portfolio) in producing high quality web and mobile user interfaces", "Proficient in creating interactive wireframes, prototypes, storyboards and userflows", "Hands on experience working within Agile project teams"], "itskill": ["Strong web development experience (Javascript / HTML5, CSS)", "Responsive design experience", "React / Redux experience", "React / Redux experience"], "personal_strength": ["To be able to work Autonomously", "Service oriented and passionate about helping clients", "Strong analytical and problem solving skills", "Disciplined, organized, punctual and caring attitude"], "others": ["Career development and advancement will be continuously on offer within this ever growing organisation!"], "date": "2018-10-13 21:50:30"}
f5483ebe-cd62-11e8-9b83-4c3275989ef5	1b8b3d18-dd4c-3948-a570-4e0de39b14dd	employer2	This job need a senior frontend developer who familiar with java and javascript	full_time	60000	Melbourne	{"responsibility": ["Significant experience with UI Design and Development", "Working on Angular 4 or 5 frameworks", "Demonstrated ability (portfolio) in producing high quality web and mobile user interfaces", "Proficient in creating interactive wireframes, prototypes, storyboards and userflows", "Hands on experience working within Agile project teams"], "itskill": ["Strong web development experience (Javascript / HTML5, CSS)", "Responsive design experience", "React / Redux experience", "React / Redux experience"], "personal_strength": ["To be able to work Autonomously", "Service oriented and passionate about helping clients", "Strong analytical and problem solving skills", "Disciplined, organized, punctual and caring attitude"], "others": ["Career development and advancement will be continuously on offer within this ever growing organisation!"], "date": "2018-10-13 21:50:30"}
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6400800-d14a-11e8-8ddf-4c3275989ef5	employer3	Working with a great team that builds market leading Video on Demand applications for just about any and every conceivable device you will play a lead / mentoring role. In addition to your strong Javascript, HTML, CSS skills you will be able to support product development design and technical execution, and support more junior team members.	Full-time	100k+	Sydney CBD, Inner West & Eastern Suburbs	{"responsibility": ["You will be motivated to Create, Develop, Collaborate, Contribute and Engage with our existing and new products development and drive innovation with a sensitivity to design."], "itskill": ["complex web development", "low latency systems", "HTML5", "Javascript", "React.js framework"], "personal_strength": ["To be able to work Autonomously"], "others": ["We provide you with a platform to grow your career, amazing growth opportunities, experience leveraging the latest technologies in one of the fastest growing market spaces."], "date": "2018-10-17 00:52:25"}
7e951bf6-d14b-11e8-856e-4c3275989ef5	7e967958-d14b-11e8-b8e7-4c3275989ef5	employer3	We need a smart, creative Full Stack Developer in our Melbourne CBD team to work on the ongoing development of C-Sight and its associated data insights platform and dashboards. 	Full-time	70-80k	Melbourne CBD & Inner Suburbs	{"responsibility": ["We\\u2019re a small, fast-moving team, so you\\u2019ll need to be flexible and have a keen appetite to take on new and diverse challenges."], "itskill": ["JavaScript", "single-page web apps", "React and AngularJS", "RDBMS", "NoSQL"], "personal_strength": ["Good teamwork skills", "Strong problem-solving skills"], "others": ["Offering a competitive remuneration package commensurate with skills and experience.", "Opportunity to work from outside the office for some of the time, if desired, but we try for at least a few \\u201cteam days\\u201d in the office each week."], "date": "2018-10-17 00:58:01"}
2d26d41e-d14c-11e8-9514-4c3275989ef5	2d285552-d14c-11e8-979d-4c3275989ef5	employer3	Due to high growth they are expanding their team. The ideal candidate will have an IT background, be focused on delivery and methodical in their approach. Join a great team with awesome culture. 	Full-time	80-90k	Sydney CBD, Inner West & Eastern Suburbs	{"responsibility": ["Analysis, design, development and implementation of business systems", "Web and application development and support", "Ensure integrity of data and compliance to legislative and organisational frameworks", "Review and improve the integration of systems to improve productivity", "Provide solutions to business unit requirements through the development and use of technology."], "itskill": ["sql", "RDBMS", "C#", "css", "JavaScript"], "personal_strength": ["Excellent attention to detail", "Clear communication skills"], "others": ["Opportunity to work at home for some of the time"], "date": "2018-10-17 01:02:54"}
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fbf56968-d14c-11e8-b56d-4c3275989ef5	employer4	This Brisbane CBD based software house is currently looking to expand their dev team with C# Developer to work on a greenfield desktop solution. This solution will be used by major international clients across the world and will be the flagship desktop product, which will be heavily integrated with the Microsoft Office suite. This role will see you working across the full software development lifecycle.	Full-time	70-80k	Brisbane CBD & Inner Suburbs	{"responsibility": ["Work on a greenfield desktop solution."], "itskill": ["C#", "MVC", "MVVM", "VSTO"], "personal_strength": ["To be able to work Autonomously"], "others": ["Candidates MUST be located in Brisbane and be able to start. ", "This is a 1-year contract with ASAP start."], "date": "2018-10-17 01:08:40"}
f2547628-d14d-11e8-b320-4c3275989ef5	f255d1fa-d14d-11e8-8e40-4c3275989ef5	employer4	Our client is a leading in its industry and understands that banking is moving towards digital platforms. They use technology as a catalyst to bring people together.\nThey want to revolutionise the entire financial services industry by allowing customers to access their banking needs at any stage.\nAs a technologist you will have the opportunity to develop new applications and help design, implement and maintain Java applications.	Full-time	80-90k	Sydney	{"responsibility": ["Build sophisticated software platforms that are data driven and that power user-centric mobile and web channels", "Explain the technical trade-offs and risk of different development approaches in a concise and informative manner", "Integrate with vendors and third party providers through a variety of API\\u2019S and integration methods", "Create REST based web services and APIs for consumption by mobile and web platforms"], "itskill": ["Java", "Agile projects", "Spring frameworks", "AngularJS", "Maven"], "personal_strength": ["Disciplined, organized, punctual and caring attitude"], "others": ["This is a fantastic opportunity to work in an environment that really supports people."], "date": "2018-10-17 01:15:34"}
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c0125ce4-d14e-11e8-8b23-4c3275989ef5	employer4	This is an opportunity to work on a range of web applications for the resources, education and healthcare sectors plus consumer-facing websites.\nThe successful applicant will understand the need to achieve a balance between innovation and the most appropriate solution for our commercial clients. While much of your time will be devoted to hands-on coding, you will also be involved in scoping, estimating and client contact and planning the effective and efficient execution of our projects.	Full-time	60-70k	Perth CBD, Inner & Western Suburbs	{"responsibility": ["Assist Project Manager & Lead Developer to formulate project objectives, functional requirements & technical specifications", "Monitor projects to ensure they are delivered to the expected standard & on time & budget", " Contribute to the design & implementation of technical requirements & project processes"], "itskill": ["python", "Django", "PostgreSQL", "MySQL", "RDBMS", "JavaScript"], "personal_strength": ["Attention to detail to make sure it\\u2019s right", "Always look for new & better ways", "Work closely with your peers to guide the technical direction of projects"], "others": ["We are always open to new ideas and encourage proactivity. If you were to have recommendations on how we can improve our approach, processes or technology, we will welcome them."], "date": "2018-10-17 01:21:19"}
3588ae0c-d151-11e8-b843-4c3275989ef5	358a263a-d151-11e8-b4cd-4c3275989ef5	employer4	My client, one of the largest cloud computing platforms worldwide are seeking to hire multiple contract Network Engineers to join their Network Engineering and Operations teams in Sydney. This will be a 3 month contract with a view to perm. The Network Engineers will be giving the opportunity to work on one of the most advanced networks in the world\n	Full-time	70-80k	Sydney CBD, Inner West & Eastern Suburbs	{"responsibility": ["The Network Engineering and Operations engineers are responsible for operating and maintaining the organisations network.", "The Engineer will be working to fix any bugs that arise with the Network"], "itskill": ["IP networking fundamentals", "Linux", "Ideally CCNP certified"], "personal_strength": ["To be able to work Autonomously"], "others": ["Candidates MUST be located in Sydney"], "date": "2018-10-17 01:38:55"}
74997d9c-d153-11e8-b007-4c3275989ef5	749ad73a-d153-11e8-9fec-4c3275989ef5	employer5	This Global Defence Integrator has a requirement for a number of Server Engineers to join a major project on an initial 12 month contract.	Full-time	50-60k	ACT	{"responsibility": ["You will be responsible for the implementation, automation, documentation and maintenance of the server environment.", "You will also be responsible for automating some processes using Powershell and ensuring the system is up and running."], "itskill": ["Windows Server 2012 R2", "Hyper-V", "Powershell", "SQL"], "personal_strength": ["Always look for new & better ways"], "others": ["This role will give you an opportunity to work in a driven team within a high profile project. "], "date": "2018-10-17 01:55:00"}
0ee5b386-d154-11e8-bef8-4c3275989ef5	0ee71102-d154-11e8-b173-4c3275989ef5	employer5	We are searching for a dedicated Engineer with outstanding Network experience to join our operations team and service our Cloud and Managed Services customers. Not only will you work within a team that is very supportive and close knit, but you will also be exposed to the wide variety of technologies that exist within our own environment and the impressive group of customers we service so passionately. 	Full-time	50-60k	Sydney North Shore & Northern Beaches	{"responsibility": ["Service our Cloud and Managed Services customers"], "itskill": ["Network technologies", "MPLS networks ", "clustered network environments", "VMWare NSX", "Cisco CCNP/CCNA Certification"], "personal_strength": ["Always look for new & better ways"], "others": ["This is an incredible opportunity for an individual who is looking to work with exciting technology in a new office with exceptional facilities, with a team of great people."], "date": "2018-10-17 01:59:19"}
\.


--
-- Data for Name: job_title; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job_title (job_id, job_name) FROM stdin;
4c3a4ee0-26be-30ff-94a3-d58e0d98299a	ai engineer
5decd670-1b32-38fb-8e2e-633785e6315b	c developer/programmer
3c8a7b8e-b795-3b2e-8cd3-ba2a72b7be56	c++ developer/programmer
17b916a8-7477-33db-a8b2-d4475a6122e0	data science
b756d5a1-376c-3a96-9836-d225cced3e87	database development & administration
dea7cabe-514b-3893-9d41-b18431987e4d	engineering - hardware
bac63bb7-e032-360d-9fc9-68e800aef1cb	engineering - network
1ee54e5c-53cb-35fb-9f7d-02a07dac771f	engineering - software
139fba48-21ca-3747-aa06-99d0c312d73d	iot engineer
6181ab05-a151-30fc-ba53-604416ad8399	java developer/programmer
7738c4a5-5604-37f6-8b59-8d754dcfb052	networks & systems administration
dcd1ef50-4cb6-3668-9741-8e5e3d11a655	os engineer
964ea73b-e273-330e-b1e9-adb3ab054aca	python developer/programmer
7ce737f5-ee12-31c9-9834-6dce5b88fae1	security engineer
1b8b3d18-dd4c-3948-a570-4e0de39b14dd	web developer/programmer
b6400800-d14a-11e8-8ddf-4c3275989ef5	senior front-end javascript developer
7e967958-d14b-11e8-b8e7-4c3275989ef5	full-stack developer
2d285552-d14c-11e8-979d-4c3275989ef5	junior application developer
fbf56968-d14c-11e8-b56d-4c3275989ef5	c# developer
f255d1fa-d14d-11e8-8e40-4c3275989ef5	senior java developer
c0125ce4-d14e-11e8-8b23-4c3275989ef5	python developer
358a263a-d151-11e8-b4cd-4c3275989ef5	network engineer
0b86fdda-d152-11e8-9c38-4c3275989ef5	cloud noc administrator
2c4af008-d152-11e8-9b96-4c3275989ef5	cloud noc administrator
a2aedec6-d152-11e8-8558-4c3275989ef5	cloud noc administrator
ad0e5bb4-d152-11e8-a755-4c3275989ef5	cloud noc administrator
bc6ea058-d152-11e8-9dc4-4c3275989ef5	cloud noc administrator
749ad73a-d153-11e8-9fec-4c3275989ef5	server engineer
0ee71102-d154-11e8-b173-4c3275989ef5	network engineer
\.


--
-- Data for Name: personal_skill; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.personal_skill (student_id, skill_data) FROM stdin;
candidate1	Strong analytical and problem solving skills|Excellent communication skills: verbal and written|Disciplined, organized, punctual and caring attitude
candidate2	Strong analytical and problem solving skills|Excellent communication skills: verbal and written|Disciplined, organized, punctual and caring attitude
candidate3	Nothing here
candidate4	Strong analytical and problem solving skills|Excellent communication skills: verbal and written
candidate5	Strong analytical and problem solving skills|Excellent communication skills: verbal and written|Disciplined, organized, punctual and caring attitude
employer3	Nothing here
employer4	Nothing here
employer5	Nothing here
\.


--
-- Data for Name: recommend; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recommend (master_id, item_id, base_mark, bonus, referrer, ref_username, recommend_type) FROM stdin;
a3312d80-cd61-11e8-8574-4c3275989ef5	candidate2	40	0	System	System	1
a3312d80-cd61-11e8-8574-4c3275989ef5	candidate1	30	0	System	System	1
a3312d80-cd61-11e8-8574-4c3275989ef5	candidate5	28	0	System	System	1
a3312d80-cd61-11e8-8574-4c3275989ef5	candidate3	22	0	System	System	1
a3312d80-cd61-11e8-8574-4c3275989ef5	candidate4	20	0	System	System	1
ee0cb82e-cd61-11e8-b040-4c3275989ef5	candidate2	40	0	System	System	1
ee0cb82e-cd61-11e8-b040-4c3275989ef5	candidate1	30	0	System	System	1
ee0cb82e-cd61-11e8-b040-4c3275989ef5	candidate5	28	0	System	System	1
ee0cb82e-cd61-11e8-b040-4c3275989ef5	candidate3	22	0	System	System	1
ee0cb82e-cd61-11e8-b040-4c3275989ef5	candidate4	20	0	System	System	1
3eef2e48-cd62-11e8-9a1a-4c3275989ef5	candidate1	40	0	System	System	1
3eef2e48-cd62-11e8-9a1a-4c3275989ef5	candidate4	40	0	System	System	1
3eef2e48-cd62-11e8-9a1a-4c3275989ef5	candidate5	33	0	System	System	1
3eef2e48-cd62-11e8-9a1a-4c3275989ef5	candidate2	20	0	System	System	1
3eef2e48-cd62-11e8-9a1a-4c3275989ef5	candidate3	20	0	System	System	1
8b550dd4-cd62-11e8-b73e-4c3275989ef5	candidate1	40	0	System	System	1
8b550dd4-cd62-11e8-b73e-4c3275989ef5	candidate4	40	0	System	System	1
8b550dd4-cd62-11e8-b73e-4c3275989ef5	candidate5	33	0	System	System	1
8b550dd4-cd62-11e8-b73e-4c3275989ef5	candidate2	20	0	System	System	1
8b550dd4-cd62-11e8-b73e-4c3275989ef5	candidate3	20	0	System	System	1
e4b2b408-cd62-11e8-a2dc-4c3275989ef5	candidate1	40	0	System	System	1
e4b2b408-cd62-11e8-a2dc-4c3275989ef5	candidate4	40	0	System	System	1
e4b2b408-cd62-11e8-a2dc-4c3275989ef5	candidate5	33	0	System	System	1
e4b2b408-cd62-11e8-a2dc-4c3275989ef5	candidate2	20	0	System	System	1
e4b2b408-cd62-11e8-a2dc-4c3275989ef5	candidate3	20	0	System	System	1
ed575474-cd62-11e8-a63c-4c3275989ef5	candidate1	40	0	System	System	1
ed575474-cd62-11e8-a63c-4c3275989ef5	candidate4	40	0	System	System	1
ed575474-cd62-11e8-a63c-4c3275989ef5	candidate5	33	0	System	System	1
ed575474-cd62-11e8-a63c-4c3275989ef5	candidate2	20	0	System	System	1
ed575474-cd62-11e8-a63c-4c3275989ef5	candidate3	20	0	System	System	1
f5483ebe-cd62-11e8-9b83-4c3275989ef5	candidate1	40	0	System	System	1
f5483ebe-cd62-11e8-9b83-4c3275989ef5	candidate4	40	0	System	System	1
f5483ebe-cd62-11e8-9b83-4c3275989ef5	candidate5	33	0	System	System	1
f5483ebe-cd62-11e8-9b83-4c3275989ef5	candidate2	20	0	System	System	1
f5483ebe-cd62-11e8-9b83-4c3275989ef5	candidate3	20	0	System	System	1
b63e5906-d14a-11e8-a8ad-4c3275989ef5	candidate1	40	0	System	System	1
b63e5906-d14a-11e8-a8ad-4c3275989ef5	candidate4	40	0	System	System	1
b63e5906-d14a-11e8-a8ad-4c3275989ef5	candidate5	40	0	System	System	1
b63e5906-d14a-11e8-a8ad-4c3275989ef5	candidate2	20	0	System	System	1
b63e5906-d14a-11e8-a8ad-4c3275989ef5	candidate3	20	0	System	System	1
7e951bf6-d14b-11e8-856e-4c3275989ef5	candidate1	40	0	System	System	1
7e951bf6-d14b-11e8-856e-4c3275989ef5	candidate4	40	0	System	System	1
7e951bf6-d14b-11e8-856e-4c3275989ef5	candidate5	40	0	System	System	1
7e951bf6-d14b-11e8-856e-4c3275989ef5	candidate2	20	0	System	System	1
7e951bf6-d14b-11e8-856e-4c3275989ef5	candidate3	20	0	System	System	1
2d26d41e-d14c-11e8-9514-4c3275989ef5	candidate1	40	0	System	System	1
2d26d41e-d14c-11e8-9514-4c3275989ef5	candidate4	40	0	System	System	1
2d26d41e-d14c-11e8-9514-4c3275989ef5	candidate5	33	0	System	System	1
2d26d41e-d14c-11e8-9514-4c3275989ef5	candidate3	27	0	System	System	1
2d26d41e-d14c-11e8-9514-4c3275989ef5	candidate2	20	0	System	System	1
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	candidate1	40	0	System	System	1
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	candidate3	40	0	System	System	1
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	candidate4	40	0	System	System	1
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	candidate2	20	0	System	System	1
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	candidate5	20	0	System	System	1
f2547628-d14d-11e8-b320-4c3275989ef5	candidate1	40	0	System	System	1
f2547628-d14d-11e8-b320-4c3275989ef5	candidate2	40	0	System	System	1
f2547628-d14d-11e8-b320-4c3275989ef5	candidate5	40	0	System	System	1
c0110a38-d14e-11e8-a8d8-4c3275989ef5	candidate1	40	0	System	System	1
c0110a38-d14e-11e8-a8d8-4c3275989ef5	candidate5	40	0	System	System	1
c0110a38-d14e-11e8-a8d8-4c3275989ef5	candidate4	35	0	System	System	1
c0110a38-d14e-11e8-a8d8-4c3275989ef5	candidate2	25	0	System	System	1
c0110a38-d14e-11e8-a8d8-4c3275989ef5	candidate3	20	0	System	System	1
74997d9c-d153-11e8-b007-4c3275989ef5	candidate1	40	0	System	System	1
74997d9c-d153-11e8-b007-4c3275989ef5	candidate2	40	0	System	System	1
74997d9c-d153-11e8-b007-4c3275989ef5	candidate3	40	0	System	System	1
74997d9c-d153-11e8-b007-4c3275989ef5	candidate4	40	0	System	System	1
74997d9c-d153-11e8-b007-4c3275989ef5	candidate5	40	0	System	System	1
candidate1	a3312d80-cd61-11e8-8574-4c3275989ef5	40	0	System	System	0
candidate1	ee0cb82e-cd61-11e8-b040-4c3275989ef5	40	0	System	System	0
candidate1	8b550dd4-cd62-11e8-b73e-4c3275989ef5	32	0	System	System	0
candidate1	2d26d41e-d14c-11e8-9514-4c3275989ef5	32	0	System	System	0
candidate1	3eef2e48-cd62-11e8-9a1a-4c3275989ef5	32	0	System	System	0
candidate1	c0110a38-d14e-11e8-a8d8-4c3275989ef5	32	0	System	System	0
candidate1	e4b2b408-cd62-11e8-a2dc-4c3275989ef5	32	0	System	System	0
candidate1	ed575474-cd62-11e8-a63c-4c3275989ef5	32	0	System	System	0
candidate1	f5483ebe-cd62-11e8-9b83-4c3275989ef5	32	0	System	System	0
candidate1	7e951bf6-d14b-11e8-856e-4c3275989ef5	25	0	System	System	0
candidate1	b63e5906-d14a-11e8-a8ad-4c3275989ef5	25	0	System	System	0
candidate1	fbf40e76-d14c-11e8-b4b0-4c3275989ef5	22	0	System	System	0
candidate1	74997d9c-d153-11e8-b007-4c3275989ef5	20	0	System	System	0
candidate1	f2547628-d14d-11e8-b320-4c3275989ef5	20	0	System	System	0
\.


--
-- Data for Name: resume; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.resume (resume_id, student_id, address) FROM stdin;
\.


--
-- Data for Name: save_list; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.save_list (user_id, job_info_id) FROM stdin;
candidate1	e4b2b408-cd62-11e8-a2dc-4c3275989ef5
instructor1	e4b2b408-cd62-11e8-a2dc-4c3275989ef5
instructor1	a3312d80-cd61-11e8-8574-4c3275989ef5
\.


--
-- Data for Name: saved_user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.saved_user (master_id, user_id) FROM stdin;
employer1	candidate1
employer1	candidate2
instructor1	candidate1
instructor1	candidate2
\.


--
-- Data for Name: skill_list; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.skill_list (student_id, skill_id, course_code, skill_type, skill_from, proficiency) FROM stdin;
candidate1	d841aee0-cc22-3fd4-b084-36f16171022c	None    	other	1	80
candidate1	eae51a28-cdf1-11e8-9a88-4c3275989ef5	None    	other	1	75
candidate1	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	None    	other	1	70
candidate1	ec658a2c-b151-3fad-b95c-8b552e8d319e	None    	other	1	65
candidate1	c9f8b609-b81e-3c95-8188-914324e741c8	None    	other	1	80
candidate2	d841aee0-cc22-3fd4-b084-36f16171022c	None    	other	1	65
candidate2	eae51a28-cdf1-11e8-9a88-4c3275989ef5	None    	other	1	60
candidate2	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	None    	other	1	75
candidate2	ec658a2c-b151-3fad-b95c-8b552e8d319e	None    	other	1	80
candidate2	c9f8b609-b81e-3c95-8188-914324e741c8	None    	other	1	90
candidate3	d841aee0-cc22-3fd4-b084-36f16171022c	None    	other	1	50
candidate3	eae51a28-cdf1-11e8-9a88-4c3275989ef5	None    	other	1	55
candidate3	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	None    	other	1	65
candidate3	ec658a2c-b151-3fad-b95c-8b552e8d319e	None    	other	1	90
candidate3	c9f8b609-b81e-3c95-8188-914324e741c8	None    	other	1	80
candidate4	d841aee0-cc22-3fd4-b084-36f16171022c	None    	other	1	90
candidate4	eae51a28-cdf1-11e8-9a88-4c3275989ef5	None    	other	1	85
candidate4	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	None    	other	1	70
candidate4	ec658a2c-b151-3fad-b95c-8b552e8d319e	None    	other	1	65
candidate4	c9f8b609-b81e-3c95-8188-914324e741c8	None    	other	1	50
candidate5	d841aee0-cc22-3fd4-b084-36f16171022c	None    	other	1	70
candidate5	eae51a28-cdf1-11e8-9a88-4c3275989ef5	None    	other	1	85
candidate5	50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	None    	other	1	65
candidate5	ec658a2c-b151-3fad-b95c-8b552e8d319e	None    	other	1	50
candidate5	c9f8b609-b81e-3c95-8188-914324e741c8	None    	other	1	75
\.


--
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.skills (skill_id, skill_name) FROM stdin;
cc7abdcb-e066-362a-ba3a-78d536db3af1	advanced operating systems
72856a63-a110-3fda-8855-e9759c9d846f	advanced parallel algorithms
ec7ef635-1b41-3699-8592-eca99cd9346e	ai logics
b2fdd3d7-7ab2-3b63-97ea-b67a98b67ea9	algorithm basis
7de9dde7-88fd-3c47-b973-3a7ec4d9b07d	algorithmic verification
e2b02e9f-86d9-3c35-9993-11d24c7ca068	android
62bebfd9-8146-3ee8-b361-978cde4cd730	api development
bbd0dcf2-2d6e-3ae7-a0f3-f5b4dced5262	artificial intelligence basis
69089e61-a58d-3c15-a133-3f2b766f20b6	artificial intelligence programming language
b5341ec2-5844-3ff4-a6e0-223cd91b53e3	assembly programming
8b3d1a26-29eb-3a78-b951-bf009270ba7c	automatic verification techniques
351a6212-43d8-390f-9d6c-39f352325693	basic algorithm
3760acfe-fffa-34d5-9ff2-9657c8f92f4f	basic web development
57f67dab-30e3-3535-8633-1bdb0fb688ee	basic web framework development
26fa4c6f-5e0c-37bd-aa63-89c2be801134	big data
50e3c66a-d1a5-3972-bb3f-9eedbdf8b731	c
ec658a2c-b151-3fad-b95c-8b552e8d319e	c++
0f1becca-cdf2-11e8-ac6f-4c3275989ef5	c#
7402455f-1081-3fb6-a926-30126948e110	capacity planning
a70c7d1f-ed10-3f1d-b5a7-723379c68ea8	command languages
0ac30d98-3ba4-3e67-bc41-b202ecf85c02	compilers
be86777d-ba51-3ce0-a21a-5a4ce16a6f6f	computer architecture
898bc4e9-c21c-3d48-8024-d7c095896d80	computer graphics
6c640f18-7b22-342b-9bf7-e2e4ea19693e	computer hardware programming
3fbbdd7f-7ab8-3da0-b30a-c3542c1cd080	computer security
a1564b97-0ea9-37d1-95e2-f49dc45f0a80	computer systems and digital circuits
faab44d2-5b65-352e-8bf7-51cc93a69431	computer vision
6e72c1a4-bb00-3ad4-88ae-853fb41b3a2e	concepts of programming languages
e787e2af-deca-3e00-83cc-3ef24d7ab0fa	cyber attack and defence
f4dcc9ba-fa98-3e02-8c86-aa16d80a1a3f	data compression
8e64b92f-7ecd-3d58-aa39-a7f1fd142d02	data mining
9d19517a-c5e3-3721-be4d-93ce7433557c	data modeling
22a8bbf1-7366-3fc5-8876-94f70935a8eb	data structures
cbffd579-ce58-3404-922e-c095bec015fb	data warehouse
08397f7b-fbcb-326c-a698-544043088399	database
87f15f4f-5a93-33a6-9c66-d3c87ee3e0be	dbms
c9a63803-7215-3914-9e98-9a3005b2d90c	deep learning
56c0b67f-e8f2-353b-8a56-0d3a6f540eae	design and analysis of algorithms
3a25d948-becb-37e9-804e-197856988e05	digital forensics
6e462100-0fb5-3f95-af7d-0ba2966b22a5	distributed systems
6de987cf-a2c3-30db-9b4e-9456c18c8ce3	engineering secure systems
45a287f8-ca08-3435-b46a-c9768c325236	extended design & analysis of algorithms
f11f1ce2-adf7-3230-886e-c0f26445aa81	extended digital forensics
9999f509-b41a-3fac-b8ef-fa452db63be9	extended web application security 
c4f1f228-2ecb-3ca8-a1cb-0ff5a9e19ed3	foundations of concurrency
068f4abb-6a6d-386a-8989-88f13ce7527e	fundamental network security
49f53673-6fc7-3ef5-874e-240a6aaf16f4	fundamental wireless networks
67ea51b3-fe07-3ad7-b5c9-75d9eed3adbe	graphic programming
2c00af02-8e97-3ceb-b686-3312db7744a1	hadoop
f1ac423d-c20a-390b-9af8-6f058ead0ac1	implementation of os components
d5fab82d-6f7a-3755-81ab-f7b19d8c75b6	information retrieval
5aa3e29f-f7b5-320a-9e31-9018e1b2d827	intelligent agent design
72d862bd-09af-3953-bdd5-b555be62ff3e	internet architecture and protocols
2625f88e-082a-38f4-b64d-72020757e6c1	iot system architecture
60cdf775-9f42-3d68-9f43-f0e561e7dbb9	iot technologies
3115020d-cf10-3c4b-957e-44af12454c11	iot technology
0ae95e05-7a4c-30d0-91fb-01facfba8724	java
eae51a28-cdf1-11e8-9a88-4c3275989ef5	javascript
d5c2d6da-f9c8-3911-b2c2-9fa5e0800b34	knowledge representation and reasoning
d841aee0-cc22-3fd4-b084-36f16171022c	machine language
5a965597-6922-3209-8ed5-fe852c49a462	machine learning
357c99ad-186d-3685-9257-03ad6451a3aa	mathematical basis
52bcfa9b-af04-3401-a43f-a5181656f6bf	mechanical proof assistants
df1992e5-30f6-3eb4-a4d0-9e491234e5ae	mobile data networking
58f54dd2-48a3-3b65-a626-ea9a3cd6a3c7	mobile security
081e1acc-e2b4-3264-9899-e7d6201ca1d5	modelling concurrent systems
cb04113a-8fe9-3aa2-b37a-0263c77db241	models of interaction
2747482d-96e5-3522-801c-848ee5c6c2a0	network quality of service(qos)
1f114cd6-b9c5-3ea2-891d-211ce40a81f7	network routing and switching
b1dd4ae4-515a-373a-84d2-0e1f72e897a5	networking technology
a50d2753-f331-3adf-8566-dd284bb31a18	neural networks
d35b070c-2cf8-37ed-aea5-25a1b16af52c	np-hard computational problems
46703081-b63c-3706-b989-23a85f4a82be	operating systems
60bfe473-3267-36e5-9a4c-c6f2ecd223e0	operating systems basis
b59f600f-bed6-31f7-b6bb-8c03816b03f4	parameterized and exact computation
191288e8-1cc7-3f07-a41f-4a66c6f5dfd3	performance evaluation
848900da-4e32-3321-897e-013d89c56431	principles in programming languages
19a48b54-b53d-3ea5-bd62-5c40b4141a18	program design
c9f8b609-b81e-3c95-8188-914324e741c8	python
2ede0fe8-cdf2-11e8-8f98-4c3275989ef5	r
731fde50-9da1-3b17-96e6-6c35e0c5ee6a	recommendation system
3cc2e3e2-1c0c-32de-9219-89c5a8a6e98b	regular expressions
7d3d4da6-ab46-3c51-8bc0-670ff3d56662	robotic software architecture
d07ede95-fb83-3ef5-8dee-4fc0cc89d278	security engineering
dcefea28-4f07-3b94-ac03-741e6433aff0	service oriented architecture
77fbed7a-063a-369c-b23c-4b02ae251c7a	service project
e7275f8c-3729-37eb-888e-61f93c989d85	software system decomposition and design
ef1cd4dd-d4f2-3d02-b085-05a95166f734	spark
1c6d1adc-d540-33c3-957b-ce27baf0ab6d	sql
350440d4-a409-322f-9322-4f2c964685d6	statistical machine learning
da917db6-801c-34e3-bb9c-8d512cb592a9	strategies for and process of design
d1066795-fb00-3480-8db2-ad7b79597e12	system and software security 
4c61d575-8b29-36d9-8e95-a2b4fdb4378c	theory of computation
fb724217-4ae8-3f54-8487-5e799591b0d7	version control
8b572158-3550-36db-988e-b2c6bad4df23	web application
f14b4e97-fa21-3cd7-b29b-2263da5810e4	web application security
f1908179-97c1-3adb-a302-a78a080d14fa	web service composition techniques
dec9d4b4-8375-307d-b9c4-bd3ee3238908	wireless security
\.


--
-- Data for Name: target_list; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.target_list (item_id, target_uuid) FROM stdin;
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6cf6036-d14a-11e8-9e0b-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6d09302-d14a-11e8-b9f3-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6d1bae8-d14a-11e8-b43c-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6d2ec24-d14a-11e8-a8c7-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6d418b0-d14a-11e8-9df9-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6d5610c-d14a-11e8-95fc-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6d6955e-d14a-11e8-978f-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6d7ba06-d14a-11e8-a422-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6d8f9e8-d14a-11e8-a2b5-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6da3274-d14a-11e8-9a5a-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6db6b06-d14a-11e8-92b8-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6dcd018-d14a-11e8-ad93-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6de373a-d14a-11e8-9caf-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6e17e62-d14a-11e8-a70b-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6e3394c-d14a-11e8-9ae3-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6e55d00-d14a-11e8-a2b7-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6e6ab74-d14a-11e8-ad32-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6e8b0ae-d14a-11e8-9dc8-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6eaca42-d14a-11e8-9a9a-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6ed48da-d14a-11e8-8df8-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6ef2592-d14a-11e8-ae60-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6f114c6-d14a-11e8-8083-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6f34ad2-d14a-11e8-b0d4-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6f56dda-d14a-11e8-90e7-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6f7475e-d14a-11e8-8325-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6f8d0ec-d14a-11e8-b84f-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6fb039e-d14a-11e8-b072-4c3275989ef5
b63e5906-d14a-11e8-a8ad-4c3275989ef5	b6fd110c-d14a-11e8-845c-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6cf6036-d14a-11e8-9e0b-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6d09302-d14a-11e8-b9f3-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6d1bae8-d14a-11e8-b43c-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6d2ec24-d14a-11e8-a8c7-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6d418b0-d14a-11e8-9df9-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6d5610c-d14a-11e8-95fc-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6d6955e-d14a-11e8-978f-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6d7ba06-d14a-11e8-a422-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6d8f9e8-d14a-11e8-a2b5-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6da3274-d14a-11e8-9a5a-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6db6b06-d14a-11e8-92b8-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6dcd018-d14a-11e8-ad93-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6de373a-d14a-11e8-9caf-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6e17e62-d14a-11e8-a70b-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6e3394c-d14a-11e8-9ae3-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6e55d00-d14a-11e8-a2b7-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6e6ab74-d14a-11e8-ad32-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6e8b0ae-d14a-11e8-9dc8-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6eaca42-d14a-11e8-9a9a-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6ed48da-d14a-11e8-8df8-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6ef2592-d14a-11e8-ae60-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6f114c6-d14a-11e8-8083-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6f34ad2-d14a-11e8-b0d4-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6f56dda-d14a-11e8-90e7-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6f7475e-d14a-11e8-8325-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6f8d0ec-d14a-11e8-b84f-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6fb039e-d14a-11e8-b072-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	b6fd110c-d14a-11e8-845c-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7ef8ebb8-d14b-11e8-92ef-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7ef9fccc-d14b-11e8-84fc-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7efb0114-d14b-11e8-bdf2-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7efc206c-d14b-11e8-8144-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7efd2ff4-d14b-11e8-8ebb-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7efe3d0c-d14b-11e8-945d-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7eff45a8-d14b-11e8-958b-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7f00525e-d14b-11e8-b1ca-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7f0176ac-d14b-11e8-bd63-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7f0287a4-d14b-11e8-90fd-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7f03a936-d14b-11e8-9883-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7f04b4a2-d14b-11e8-a0e6-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7f05c28c-d14b-11e8-aac0-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7f06d306-d14b-11e8-a53b-4c3275989ef5
7e951bf6-d14b-11e8-856e-4c3275989ef5	7f07dcc2-d14b-11e8-825c-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6cf6036-d14a-11e8-9e0b-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6d09302-d14a-11e8-b9f3-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6d1bae8-d14a-11e8-b43c-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6d2ec24-d14a-11e8-a8c7-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6d418b0-d14a-11e8-9df9-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6d5610c-d14a-11e8-95fc-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6d6955e-d14a-11e8-978f-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6d7ba06-d14a-11e8-a422-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6d8f9e8-d14a-11e8-a2b5-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6da3274-d14a-11e8-9a5a-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6db6b06-d14a-11e8-92b8-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6dcd018-d14a-11e8-ad93-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6de373a-d14a-11e8-9caf-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6e17e62-d14a-11e8-a70b-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6e3394c-d14a-11e8-9ae3-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6e55d00-d14a-11e8-a2b7-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6e6ab74-d14a-11e8-ad32-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6e8b0ae-d14a-11e8-9dc8-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6eaca42-d14a-11e8-9a9a-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6ed48da-d14a-11e8-8df8-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6ef2592-d14a-11e8-ae60-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6f114c6-d14a-11e8-8083-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6f34ad2-d14a-11e8-b0d4-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6f56dda-d14a-11e8-90e7-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6f7475e-d14a-11e8-8325-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6f8d0ec-d14a-11e8-b84f-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6fb039e-d14a-11e8-b072-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	b6fd110c-d14a-11e8-845c-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7ef8ebb8-d14b-11e8-92ef-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7ef9fccc-d14b-11e8-84fc-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7efb0114-d14b-11e8-bdf2-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7efc206c-d14b-11e8-8144-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7efd2ff4-d14b-11e8-8ebb-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7efe3d0c-d14b-11e8-945d-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7eff45a8-d14b-11e8-958b-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7f00525e-d14b-11e8-b1ca-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7f0176ac-d14b-11e8-bd63-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7f0287a4-d14b-11e8-90fd-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7f03a936-d14b-11e8-9883-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7f04b4a2-d14b-11e8-a0e6-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7f05c28c-d14b-11e8-aac0-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7f06d306-d14b-11e8-a53b-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	7f07dcc2-d14b-11e8-825c-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	2d90e55e-d14c-11e8-86b8-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	2d920ac6-d14c-11e8-b535-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	2d932fd0-d14c-11e8-a1e8-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	2d945b1c-d14c-11e8-83bd-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	2d9582c6-d14c-11e8-b949-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	2d96aaf4-d14c-11e8-bd25-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	2d97e03e-d14c-11e8-904d-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	2d990f5e-d14c-11e8-a23a-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	2d9a6318-d14c-11e8-b92a-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	2d9b8c3e-d14c-11e8-9618-4c3275989ef5
2d26d41e-d14c-11e8-9514-4c3275989ef5	2d9cc608-d14c-11e8-ae18-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6cf6036-d14a-11e8-9e0b-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6d09302-d14a-11e8-b9f3-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6d1bae8-d14a-11e8-b43c-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6d2ec24-d14a-11e8-a8c7-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6d418b0-d14a-11e8-9df9-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6d5610c-d14a-11e8-95fc-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6d6955e-d14a-11e8-978f-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6d7ba06-d14a-11e8-a422-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6d8f9e8-d14a-11e8-a2b5-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6da3274-d14a-11e8-9a5a-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6db6b06-d14a-11e8-92b8-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6dcd018-d14a-11e8-ad93-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6de373a-d14a-11e8-9caf-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6e17e62-d14a-11e8-a70b-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6e3394c-d14a-11e8-9ae3-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6e55d00-d14a-11e8-a2b7-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6e6ab74-d14a-11e8-ad32-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6e8b0ae-d14a-11e8-9dc8-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6eaca42-d14a-11e8-9a9a-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6ed48da-d14a-11e8-8df8-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6ef2592-d14a-11e8-ae60-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6f114c6-d14a-11e8-8083-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6f34ad2-d14a-11e8-b0d4-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6f56dda-d14a-11e8-90e7-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6f7475e-d14a-11e8-8325-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6f8d0ec-d14a-11e8-b84f-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6fb039e-d14a-11e8-b072-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	b6fd110c-d14a-11e8-845c-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7ef8ebb8-d14b-11e8-92ef-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7ef9fccc-d14b-11e8-84fc-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7efb0114-d14b-11e8-bdf2-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7efc206c-d14b-11e8-8144-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7efd2ff4-d14b-11e8-8ebb-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7efe3d0c-d14b-11e8-945d-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7eff45a8-d14b-11e8-958b-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7f00525e-d14b-11e8-b1ca-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7f0176ac-d14b-11e8-bd63-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7f0287a4-d14b-11e8-90fd-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7f03a936-d14b-11e8-9883-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7f04b4a2-d14b-11e8-a0e6-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7f05c28c-d14b-11e8-aac0-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7f06d306-d14b-11e8-a53b-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	7f07dcc2-d14b-11e8-825c-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	2d90e55e-d14c-11e8-86b8-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	2d920ac6-d14c-11e8-b535-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	2d932fd0-d14c-11e8-a1e8-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	2d945b1c-d14c-11e8-83bd-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	2d9582c6-d14c-11e8-b949-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	2d96aaf4-d14c-11e8-bd25-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	2d97e03e-d14c-11e8-904d-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	2d990f5e-d14c-11e8-a23a-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	2d9a6318-d14c-11e8-b92a-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	2d9b8c3e-d14c-11e8-9618-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	2d9cc608-d14c-11e8-ae18-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc58eba2-d14c-11e8-86e7-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc5a1766-d14c-11e8-ab4b-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc5b30f6-d14c-11e8-adc5-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc5c4646-d14c-11e8-9d62-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc5d73fa-d14c-11e8-8d97-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc5ea128-d14c-11e8-8839-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc5fc4e2-d14c-11e8-a9d1-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc60e37a-d14c-11e8-a7e1-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc620b7e-d14c-11e8-a982-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc6328ba-d14c-11e8-a378-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc64454c-d14c-11e8-b6e2-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc65699a-d14c-11e8-89ea-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc6678a8-d14c-11e8-bfe4-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc67974c-d14c-11e8-b6f5-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc68b500-d14c-11e8-b4ae-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc69def8-d14c-11e8-9b5a-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc6af00c-d14c-11e8-9239-4c3275989ef5
fbf40e76-d14c-11e8-b4b0-4c3275989ef5	fc6c0c78-d14c-11e8-b1e3-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6cf6036-d14a-11e8-9e0b-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6d09302-d14a-11e8-b9f3-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6d1bae8-d14a-11e8-b43c-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6d2ec24-d14a-11e8-a8c7-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6d418b0-d14a-11e8-9df9-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6d5610c-d14a-11e8-95fc-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6d6955e-d14a-11e8-978f-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6d7ba06-d14a-11e8-a422-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6d8f9e8-d14a-11e8-a2b5-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6da3274-d14a-11e8-9a5a-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6db6b06-d14a-11e8-92b8-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6dcd018-d14a-11e8-ad93-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6de373a-d14a-11e8-9caf-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6e17e62-d14a-11e8-a70b-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6e3394c-d14a-11e8-9ae3-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6e55d00-d14a-11e8-a2b7-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6e6ab74-d14a-11e8-ad32-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6e8b0ae-d14a-11e8-9dc8-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6eaca42-d14a-11e8-9a9a-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6ed48da-d14a-11e8-8df8-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6ef2592-d14a-11e8-ae60-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6f114c6-d14a-11e8-8083-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6f34ad2-d14a-11e8-b0d4-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6f56dda-d14a-11e8-90e7-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6f7475e-d14a-11e8-8325-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6f8d0ec-d14a-11e8-b84f-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6fb039e-d14a-11e8-b072-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	b6fd110c-d14a-11e8-845c-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7ef8ebb8-d14b-11e8-92ef-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7ef9fccc-d14b-11e8-84fc-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7efb0114-d14b-11e8-bdf2-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7efc206c-d14b-11e8-8144-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7efd2ff4-d14b-11e8-8ebb-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7efe3d0c-d14b-11e8-945d-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7eff45a8-d14b-11e8-958b-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7f00525e-d14b-11e8-b1ca-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7f0176ac-d14b-11e8-bd63-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7f0287a4-d14b-11e8-90fd-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7f03a936-d14b-11e8-9883-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7f04b4a2-d14b-11e8-a0e6-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7f05c28c-d14b-11e8-aac0-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7f06d306-d14b-11e8-a53b-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	7f07dcc2-d14b-11e8-825c-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	2d90e55e-d14c-11e8-86b8-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	2d920ac6-d14c-11e8-b535-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	2d932fd0-d14c-11e8-a1e8-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	2d945b1c-d14c-11e8-83bd-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	2d9582c6-d14c-11e8-b949-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	2d96aaf4-d14c-11e8-bd25-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	2d97e03e-d14c-11e8-904d-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	2d990f5e-d14c-11e8-a23a-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	2d9a6318-d14c-11e8-b92a-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	2d9b8c3e-d14c-11e8-9618-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	2d9cc608-d14c-11e8-ae18-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc58eba2-d14c-11e8-86e7-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc5a1766-d14c-11e8-ab4b-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc5b30f6-d14c-11e8-adc5-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc5c4646-d14c-11e8-9d62-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc5d73fa-d14c-11e8-8d97-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc5ea128-d14c-11e8-8839-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc5fc4e2-d14c-11e8-a9d1-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc60e37a-d14c-11e8-a7e1-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc620b7e-d14c-11e8-a982-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc6328ba-d14c-11e8-a378-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc64454c-d14c-11e8-b6e2-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc65699a-d14c-11e8-89ea-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc6678a8-d14c-11e8-bfe4-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc67974c-d14c-11e8-b6f5-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc68b500-d14c-11e8-b4ae-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc69def8-d14c-11e8-9b5a-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc6af00c-d14c-11e8-9239-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	fc6c0c78-d14c-11e8-b1e3-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2bc39f4-d14d-11e8-928b-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2bd55a8-d14d-11e8-a05b-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2be787a-d14d-11e8-af72-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2bf9f18-d14d-11e8-870a-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2c0d7ac-d14d-11e8-9c4b-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2c206e2-d14d-11e8-9565-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2c32368-d14d-11e8-9c7f-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2c45d46-d14d-11e8-90a4-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2c56d62-d14d-11e8-99c2-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2c6c180-d14d-11e8-acb9-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2c807c0-d14d-11e8-a4c8-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2c96806-d14d-11e8-af5d-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2ca76e2-d14d-11e8-ac33-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2cbfda8-d14d-11e8-a898-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2cd258c-d14d-11e8-8aeb-4c3275989ef5
f2547628-d14d-11e8-b320-4c3275989ef5	f2ce5026-d14d-11e8-8223-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6cf6036-d14a-11e8-9e0b-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6d09302-d14a-11e8-b9f3-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6d1bae8-d14a-11e8-b43c-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6d2ec24-d14a-11e8-a8c7-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6d418b0-d14a-11e8-9df9-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6d5610c-d14a-11e8-95fc-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6d6955e-d14a-11e8-978f-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6d7ba06-d14a-11e8-a422-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6d8f9e8-d14a-11e8-a2b5-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6da3274-d14a-11e8-9a5a-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6db6b06-d14a-11e8-92b8-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6dcd018-d14a-11e8-ad93-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6de373a-d14a-11e8-9caf-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6e17e62-d14a-11e8-a70b-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6e3394c-d14a-11e8-9ae3-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6e55d00-d14a-11e8-a2b7-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6e6ab74-d14a-11e8-ad32-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6e8b0ae-d14a-11e8-9dc8-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6eaca42-d14a-11e8-9a9a-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6ed48da-d14a-11e8-8df8-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6ef2592-d14a-11e8-ae60-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6f114c6-d14a-11e8-8083-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6f34ad2-d14a-11e8-b0d4-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6f56dda-d14a-11e8-90e7-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6f7475e-d14a-11e8-8325-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6f8d0ec-d14a-11e8-b84f-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6fb039e-d14a-11e8-b072-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	b6fd110c-d14a-11e8-845c-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7ef8ebb8-d14b-11e8-92ef-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7ef9fccc-d14b-11e8-84fc-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7efb0114-d14b-11e8-bdf2-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7efc206c-d14b-11e8-8144-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7efd2ff4-d14b-11e8-8ebb-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7efe3d0c-d14b-11e8-945d-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7eff45a8-d14b-11e8-958b-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7f00525e-d14b-11e8-b1ca-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7f0176ac-d14b-11e8-bd63-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7f0287a4-d14b-11e8-90fd-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7f03a936-d14b-11e8-9883-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7f04b4a2-d14b-11e8-a0e6-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7f05c28c-d14b-11e8-aac0-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7f06d306-d14b-11e8-a53b-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	7f07dcc2-d14b-11e8-825c-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	2d90e55e-d14c-11e8-86b8-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	2d920ac6-d14c-11e8-b535-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	2d932fd0-d14c-11e8-a1e8-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	2d945b1c-d14c-11e8-83bd-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	2d9582c6-d14c-11e8-b949-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	2d96aaf4-d14c-11e8-bd25-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	2d97e03e-d14c-11e8-904d-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	2d990f5e-d14c-11e8-a23a-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	2d9a6318-d14c-11e8-b92a-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	2d9b8c3e-d14c-11e8-9618-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	2d9cc608-d14c-11e8-ae18-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc58eba2-d14c-11e8-86e7-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc5a1766-d14c-11e8-ab4b-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc5b30f6-d14c-11e8-adc5-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc5c4646-d14c-11e8-9d62-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc5d73fa-d14c-11e8-8d97-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc5ea128-d14c-11e8-8839-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc5fc4e2-d14c-11e8-a9d1-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc60e37a-d14c-11e8-a7e1-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc620b7e-d14c-11e8-a982-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc6328ba-d14c-11e8-a378-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc64454c-d14c-11e8-b6e2-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc65699a-d14c-11e8-89ea-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc6678a8-d14c-11e8-bfe4-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc67974c-d14c-11e8-b6f5-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc68b500-d14c-11e8-b4ae-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc69def8-d14c-11e8-9b5a-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc6af00c-d14c-11e8-9239-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	fc6c0c78-d14c-11e8-b1e3-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2bc39f4-d14d-11e8-928b-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2bd55a8-d14d-11e8-a05b-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2be787a-d14d-11e8-af72-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2bf9f18-d14d-11e8-870a-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2c0d7ac-d14d-11e8-9c4b-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2c206e2-d14d-11e8-9565-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2c32368-d14d-11e8-9c7f-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2c45d46-d14d-11e8-90a4-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2c56d62-d14d-11e8-99c2-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2c6c180-d14d-11e8-acb9-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2c807c0-d14d-11e8-a4c8-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2c96806-d14d-11e8-af5d-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2ca76e2-d14d-11e8-ac33-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2cbfda8-d14d-11e8-a898-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2cd258c-d14d-11e8-8aeb-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	f2ce5026-d14d-11e8-8223-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c074fc28-d14e-11e8-9daf-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c0761874-d14e-11e8-be30-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c0772f98-d14e-11e8-9774-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c0784af4-d14e-11e8-afc9-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c079546c-d14e-11e8-b612-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c07a6690-d14e-11e8-a0bf-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c07b6b08-d14e-11e8-8575-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c07c7668-d14e-11e8-aa94-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c07d8328-d14e-11e8-966a-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c07e8bda-d14e-11e8-bb95-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c07f94e4-d14e-11e8-8666-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c0809fd8-d14e-11e8-9a20-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c081bef4-d14e-11e8-b248-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c082c664-d14e-11e8-96b2-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c083cf46-d14e-11e8-8ff5-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c084eb42-d14e-11e8-9578-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c085f226-d14e-11e8-888e-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c0870a30-d14e-11e8-81c2-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c08814ca-d14e-11e8-b5a5-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c08921da-d14e-11e8-a0f1-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c08a339a-d14e-11e8-9aa5-4c3275989ef5
c0110a38-d14e-11e8-a8d8-4c3275989ef5	c08b4852-d14e-11e8-b02c-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	b6e17e62-d14a-11e8-a70b-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	fc64454c-d14c-11e8-b6e2-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	360592b6-d151-11e8-85b1-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	3606c05a-d151-11e8-8629-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	3607e962-d151-11e8-a796-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	7f06d306-d14b-11e8-a53b-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	36091768-d151-11e8-b1f5-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	360a3de8-d151-11e8-a983-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	360b70a8-d151-11e8-930a-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	360c9c98-d151-11e8-a7b7-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	360ddb92-d151-11e8-ada4-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	360f0334-d151-11e8-a31e-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	b6d09302-d14a-11e8-b9f3-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	36103478-d151-11e8-b94b-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	361140e8-d151-11e8-9d2c-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	36129558-d151-11e8-a19f-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	f2cbfda8-d14d-11e8-a898-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	36139fbe-d151-11e8-a667-4c3275989ef5
3588ae0c-d151-11e8-b843-4c3275989ef5	fc65699a-d14c-11e8-89ea-4c3275989ef5
74997d9c-d153-11e8-b007-4c3275989ef5	7512b086-d153-11e8-abe6-4c3275989ef5
74997d9c-d153-11e8-b007-4c3275989ef5	7513ce1c-d153-11e8-9b73-4c3275989ef5
74997d9c-d153-11e8-b007-4c3275989ef5	7514df64-d153-11e8-8362-4c3275989ef5
74997d9c-d153-11e8-b007-4c3275989ef5	7515fb92-d153-11e8-b378-4c3275989ef5
74997d9c-d153-11e8-b007-4c3275989ef5	75171858-d153-11e8-bfde-4c3275989ef5
74997d9c-d153-11e8-b007-4c3275989ef5	751841e2-d153-11e8-a6d0-4c3275989ef5
74997d9c-d153-11e8-b007-4c3275989ef5	360c9c98-d151-11e8-a7b7-4c3275989ef5
74997d9c-d153-11e8-b007-4c3275989ef5	fc620b7e-d14c-11e8-a982-4c3275989ef5
74997d9c-d153-11e8-b007-4c3275989ef5	c08b4852-d14e-11e8-b02c-4c3275989ef5
74997d9c-d153-11e8-b007-4c3275989ef5	75196462-d153-11e8-b50e-4c3275989ef5
74997d9c-d153-11e8-b007-4c3275989ef5	361140e8-d151-11e8-9d2c-4c3275989ef5
74997d9c-d153-11e8-b007-4c3275989ef5	360a3de8-d151-11e8-a983-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	7512b086-d153-11e8-abe6-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	7513ce1c-d153-11e8-9b73-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	7514df64-d153-11e8-8362-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	7515fb92-d153-11e8-b378-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	75171858-d153-11e8-bfde-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	751841e2-d153-11e8-a6d0-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	360c9c98-d151-11e8-a7b7-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	fc620b7e-d14c-11e8-a982-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	c08b4852-d14e-11e8-b02c-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	75196462-d153-11e8-b50e-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	361140e8-d151-11e8-9d2c-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	360a3de8-d151-11e8-a983-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f4a8714-d154-11e8-9b04-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f4bac70-d154-11e8-b7e0-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f4cba98-d154-11e8-9d1e-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	360b70a8-d151-11e8-930a-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f4de576-d154-11e8-92b9-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	b6e17e62-d14a-11e8-a70b-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f4f1874-d154-11e8-8d4a-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	b6d09302-d14a-11e8-b9f3-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	3606c05a-d151-11e8-8629-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f503df8-d154-11e8-b086-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f516e26-d154-11e8-afec-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	f2c6c180-d14d-11e8-acb9-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	b6d1bae8-d14a-11e8-b43c-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f52a32c-d154-11e8-bbeb-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f53c2a2-d154-11e8-bb6d-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f54e1c8-d154-11e8-8223-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f55fa0c-d154-11e8-889f-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	f2bf9f18-d14d-11e8-870a-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f571928-d154-11e8-9122-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f5832a6-d154-11e8-a3e4-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f595a34-d154-11e8-aba7-4c3275989ef5
0ee5b386-d154-11e8-bef8-4c3275989ef5	0f5a88da-d154-11e8-990f-4c3275989ef5
\.


--
-- Data for Name: targets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.targets (target_uuid, name, type) FROM stdin;
b6cf6036-d14a-11e8-9e0b-4c3275989ef5	great	0
b6d09302-d14a-11e8-b9f3-4c3275989ef5	team	0
b6d1bae8-d14a-11e8-b43c-4c3275989ef5	that	0
b6d2ec24-d14a-11e8-a8c7-4c3275989ef5	market	0
b6d418b0-d14a-11e8-9df9-4c3275989ef5	video	0
b6d5610c-d14a-11e8-95fc-4c3275989ef5	demand	0
b6d6955e-d14a-11e8-978f-4c3275989ef5	application	0
b6d7ba06-d14a-11e8-a422-4c3275989ef5	conceivable	0
b6d8f9e8-d14a-11e8-a2b5-4c3275989ef5	device	0
b6da3274-d14a-11e8-9a5a-4c3275989ef5	lead	0
b6db6b06-d14a-11e8-92b8-4c3275989ef5	mentoring	0
b6dcd018-d14a-11e8-ad93-4c3275989ef5	role	0
b6de373a-d14a-11e8-9caf-4c3275989ef5	addition	0
b6e17e62-d14a-11e8-a70b-4c3275989ef5	-PRON-	0
b6e3394c-d14a-11e8-9ae3-4c3275989ef5	strong	0
b6e55d00-d14a-11e8-a2b7-4c3275989ef5	javascript	0
b6e6ab74-d14a-11e8-ad32-4c3275989ef5	html	0
b6e8b0ae-d14a-11e8-9dc8-4c3275989ef5	css	0
b6eaca42-d14a-11e8-9a9a-4c3275989ef5	skill	0
b6ed48da-d14a-11e8-8df8-4c3275989ef5	able	0
b6ef2592-d14a-11e8-ae60-4c3275989ef5	product	0
b6f114c6-d14a-11e8-8083-4c3275989ef5	development	0
b6f34ad2-d14a-11e8-b0d4-4c3275989ef5	design	0
b6f56dda-d14a-11e8-90e7-4c3275989ef5	technical	0
b6f7475e-d14a-11e8-8325-4c3275989ef5	execution	0
b6f8d0ec-d14a-11e8-b84f-4c3275989ef5	more	0
b6fb039e-d14a-11e8-b072-4c3275989ef5	junior	0
b6fd110c-d14a-11e8-845c-4c3275989ef5	member	0
7ef8ebb8-d14b-11e8-92ef-4c3275989ef5	smart	0
7ef9fccc-d14b-11e8-84fc-4c3275989ef5	creative	0
7efb0114-d14b-11e8-bdf2-4c3275989ef5	full	0
7efc206c-d14b-11e8-8144-4c3275989ef5	stack	0
7efd2ff4-d14b-11e8-8ebb-4c3275989ef5	developer	0
7efe3d0c-d14b-11e8-945d-4c3275989ef5	melbourne	0
7eff45a8-d14b-11e8-958b-4c3275989ef5	cbd	0
7f00525e-d14b-11e8-b1ca-4c3275989ef5	ongoing	0
7f0176ac-d14b-11e8-bd63-4c3275989ef5	c	0
7f0287a4-d14b-11e8-90fd-4c3275989ef5	sight	0
7f03a936-d14b-11e8-9883-4c3275989ef5	associated	0
7f04b4a2-d14b-11e8-a0e6-4c3275989ef5	data	0
7f05c28c-d14b-11e8-aac0-4c3275989ef5	insight	0
7f06d306-d14b-11e8-a53b-4c3275989ef5	platform	0
7f07dcc2-d14b-11e8-825c-4c3275989ef5	dashboard	0
2d90e55e-d14c-11e8-86b8-4c3275989ef5	high	0
2d920ac6-d14c-11e8-b535-4c3275989ef5	growth	0
2d932fd0-d14c-11e8-a1e8-4c3275989ef5	ideal	0
2d945b1c-d14c-11e8-83bd-4c3275989ef5	candidate	0
2d9582c6-d14c-11e8-b949-4c3275989ef5	it	0
2d96aaf4-d14c-11e8-bd25-4c3275989ef5	background	0
2d97e03e-d14c-11e8-904d-4c3275989ef5	delivery	0
2d990f5e-d14c-11e8-a23a-4c3275989ef5	methodical	0
2d9a6318-d14c-11e8-b92a-4c3275989ef5	approach	0
2d9b8c3e-d14c-11e8-9618-4c3275989ef5	awesome	0
2d9cc608-d14c-11e8-ae18-4c3275989ef5	culture	0
fc58eba2-d14c-11e8-86e7-4c3275989ef5	brisbane	0
fc5a1766-d14c-11e8-ab4b-4c3275989ef5	software	0
fc5b30f6-d14c-11e8-adc5-4c3275989ef5	house	0
fc5c4646-d14c-11e8-9d62-4c3275989ef5	dev	0
fc5d73fa-d14c-11e8-8d97-4c3275989ef5	#	0
fc5ea128-d14c-11e8-8839-4c3275989ef5	greenfield	0
fc5fc4e2-d14c-11e8-a9d1-4c3275989ef5	desktop	0
fc60e37a-d14c-11e8-a7e1-4c3275989ef5	solution	0
fc620b7e-d14c-11e8-a982-4c3275989ef5	major	0
fc6328ba-d14c-11e8-a378-4c3275989ef5	international	0
fc64454c-d14c-11e8-b6e2-4c3275989ef5	client	0
fc65699a-d14c-11e8-89ea-4c3275989ef5	world	0
fc6678a8-d14c-11e8-bfe4-4c3275989ef5	flagship	0
fc67974c-d14c-11e8-b6f5-4c3275989ef5	which	0
fc68b500-d14c-11e8-b4ae-4c3275989ef5	microsoft	0
fc69def8-d14c-11e8-9b5a-4c3275989ef5	office	0
fc6af00c-d14c-11e8-9239-4c3275989ef5	suite	0
fc6c0c78-d14c-11e8-b1e3-4c3275989ef5	lifecycle	0
f2bc39f4-d14d-11e8-928b-4c3275989ef5	industry	0
f2bd55a8-d14d-11e8-a05b-4c3275989ef5	banking	0
f2be787a-d14d-11e8-af72-4c3275989ef5	digital	0
f2bf9f18-d14d-11e8-870a-4c3275989ef5	technology	0
f2c0d7ac-d14d-11e8-9c4b-4c3275989ef5	catalyst	0
f2c206e2-d14d-11e8-9565-4c3275989ef5	people	0
f2c32368-d14d-11e8-9c7f-4c3275989ef5	entire	0
f2c45d46-d14d-11e8-90a4-4c3275989ef5	financial	0
f2c56d62-d14d-11e8-99c2-4c3275989ef5	service	0
f2c6c180-d14d-11e8-acb9-4c3275989ef5	customer	0
f2c807c0-d14d-11e8-a4c8-4c3275989ef5	need	0
f2c96806-d14d-11e8-af5d-4c3275989ef5	stage	0
f2ca76e2-d14d-11e8-ac33-4c3275989ef5	technologist	0
f2cbfda8-d14d-11e8-a898-4c3275989ef5	opportunity	0
f2cd258c-d14d-11e8-8aeb-4c3275989ef5	new	0
f2ce5026-d14d-11e8-8223-4c3275989ef5	java	0
c074fc28-d14e-11e8-9daf-4c3275989ef5	range	0
c0761874-d14e-11e8-be30-4c3275989ef5	web	0
c0772f98-d14e-11e8-9774-4c3275989ef5	resource	0
c0784af4-d14e-11e8-afc9-4c3275989ef5	education	0
c079546c-d14e-11e8-b612-4c3275989ef5	healthcare	0
c07a6690-d14e-11e8-a0bf-4c3275989ef5	sector	0
c07b6b08-d14e-11e8-8575-4c3275989ef5	consumer	0
c07c7668-d14e-11e8-aa94-4c3275989ef5	website	0
c07d8328-d14e-11e8-966a-4c3275989ef5	successful	0
c07e8bda-d14e-11e8-bb95-4c3275989ef5	applicant	0
c07f94e4-d14e-11e8-8666-4c3275989ef5	balance	0
c0809fd8-d14e-11e8-9a20-4c3275989ef5	innovation	0
c081bef4-d14e-11e8-b248-4c3275989ef5	appropriate	0
c082c664-d14e-11e8-96b2-4c3275989ef5	commercial	0
c083cf46-d14e-11e8-8ff5-4c3275989ef5	much	0
c084eb42-d14e-11e8-9578-4c3275989ef5	time	0
c085f226-d14e-11e8-888e-4c3275989ef5	hand	0
c0870a30-d14e-11e8-81c2-4c3275989ef5	coding	0
c08814ca-d14e-11e8-b5a5-4c3275989ef5	contact	0
c08921da-d14e-11e8-a0f1-4c3275989ef5	effective	0
c08a339a-d14e-11e8-9aa5-4c3275989ef5	efficient	0
c08b4852-d14e-11e8-b02c-4c3275989ef5	project	0
360592b6-d151-11e8-85b1-4c3275989ef5	large	0
3606c05a-d151-11e8-8629-4c3275989ef5	cloud	0
3607e962-d151-11e8-a796-4c3275989ef5	computing	0
36091768-d151-11e8-b1f5-4c3275989ef5	multiple	0
360a3de8-d151-11e8-a983-4c3275989ef5	contract	0
360b70a8-d151-11e8-930a-4c3275989ef5	network	0
360c9c98-d151-11e8-a7b7-4c3275989ef5	engineers	0
360ddb92-d151-11e8-ada4-4c3275989ef5	engineering	0
360f0334-d151-11e8-a31e-4c3275989ef5	operations	0
36103478-d151-11e8-b94b-4c3275989ef5	sydney	0
361140e8-d151-11e8-9d2c-4c3275989ef5	month	0
36129558-d151-11e8-a19f-4c3275989ef5	view	0
36139fbe-d151-11e8-a667-4c3275989ef5	advanced	0
7512b086-d153-11e8-abe6-4c3275989ef5	global	0
7513ce1c-d153-11e8-9b73-4c3275989ef5	defence	0
7514df64-d153-11e8-8362-4c3275989ef5	integrator	0
7515fb92-d153-11e8-b378-4c3275989ef5	requirement	0
75171858-d153-11e8-bfde-4c3275989ef5	number	0
751841e2-d153-11e8-a6d0-4c3275989ef5	server	0
75196462-d153-11e8-b50e-4c3275989ef5	initial	0
0f4a8714-d154-11e8-9b04-4c3275989ef5	dedicated	0
0f4bac70-d154-11e8-b7e0-4c3275989ef5	engineer	0
0f4cba98-d154-11e8-9d1e-4c3275989ef5	outstanding	0
0f4de576-d154-11e8-92b9-4c3275989ef5	experience	0
0f4f1874-d154-11e8-8d4a-4c3275989ef5	operation	0
0f503df8-d154-11e8-b086-4c3275989ef5	managed	0
0f516e26-d154-11e8-afec-4c3275989ef5	services	0
0f52a32c-d154-11e8-bbeb-4c3275989ef5	supportive	0
0f53c2a2-d154-11e8-bb6d-4c3275989ef5	close	0
0f54e1c8-d154-11e8-8223-4c3275989ef5	wide	0
0f55fa0c-d154-11e8-889f-4c3275989ef5	variety	0
0f571928-d154-11e8-9122-4c3275989ef5	own	0
0f5832a6-d154-11e8-a3e4-4c3275989ef5	environment	0
0f595a34-d154-11e8-aba7-4c3275989ef5	impressive	0
0f5a88da-d154-11e8-990f-4c3275989ef5	group	0
\.


--
-- Data for Name: user_info; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_info (username, uname, password, email, gender, dob, phone, location, role, description, link, photo) FROM stdin;
candidate1	Alex	123456	candidate1@gmail.com	male	01/01/1993	8888888888	Sydney	candidate	I have lots of Python and Java experience.	http://github.com	None
candidate2	Emma	123456	candidate2@gmail.com	female	01/03/1993	1111111111	Sydney	candidate	I graduated from UNSW and learn lots of mechine learning and deep learning.	http://github.com	None
candidate3	Allen	123456	candidate3@gmail.com	male	01/05/1995	2222222222	Sydney	candidate	I am proficient in C++ and wanna find a job with C/C++.	http://github.com	None
candidate4	Kevin	123456	candidate4@gmail.com	male	01/01/1993	3333333333	Sydney	candidate	My major is IT and look a backend developer job.	http://github.com	None
candidate5	Rose	123456	candidate5@gmail.com	female	01/01/1993	4444444444	Melbourne	candidate	I working on Python and Java for a long time and look for programmer job.	http://github.com	None
employer1	Google	123456	employer1@gmail.com	Unknown	04/09/1998	9999999999	Sydney	employer	As a industry leading company, look for candidate who study ML	www.google.com.au	None
employer2	Amazon	123456	employer2@gmail.com	Unknown	05/07/1994	7777777777	Melbourne	employer	As a industry leading company, look for backend developer	www.amazon.com.au	None
instructor1	UNSW	123456	instructor1@gmail.com	Unknown	01/03/1949	6666666666	Sydney	instructor	UNSW Sydney account	www.unsw.edu.au	None
employer3	Alphabet	123456	employer3@gmail.com	Unknown	01/01/2000	None	Sydney	employer	Nothing to show.	None	None
employer4	Oracle	123456	employer4@gmail.com	Unknown	01/01/2000	None	Sydney	employer	Nothing to show.	None	None
employer5	Microsoft	123456	employer5@gmail.com	Unknown	01/01/2000	None	Sydney	employer	Nothing to show.	None	None
\.


--
-- Data for Name: working_exp; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.working_exp (working_exp_uuid, user_id, name, description, link, exp_type) FROM stdin;
51d43d08-cd5f-11e8-b912-4c3275989ef5	candidate1	COMP9323 Project	{"description": "This is a project about website and chatbot", "techs": ["Java", "Python"]}	http://github.com	1
2beb7078-cdfc-11e8-817c-4c3275989ef5	candidate1	Self employed	09/2017 - 01/18\nI did some project and task from other company, like an outsourcing.	http://github.com	0
64003680-cd5f-11e8-8593-4c3275989ef5	candidate2	COMP9417 Project	{"description": "This is a project about implement mechine learning algorithm", "techs": ["Java", "Python"]}	http://github.com	1
9f6ef06c-cd5f-11e8-84b1-4c3275989ef5	candidate3	COMP9334 Project	{"description": "This is a project about implementing a simulation system for system performance analysis", "techs": ["Java", "Python"]}	http://github.com	1
d66e4ec8-cd5f-11e8-a5ed-4c3275989ef5	candidate4	COMP9321 Project	{"description": "This is a project about implementing a Social networking site and I finished backend part", "techs": ["Java", "Python"]}	http://github.com	1
ff70eb6e-cd5f-11e8-8254-4c3275989ef5	candidate5	COMP9900 Project	{"description": "This is a project about booking air ticket application", "techs": ["Java", "Python"]}	http://github.com	1
\.


--
-- Name: course_and_skill course_and_skill_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course_and_skill
    ADD CONSTRAINT course_and_skill_pkey PRIMARY KEY (code, skill_id);


--
-- Name: course_list course_list_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course_list
    ADD CONSTRAINT course_list_pkey PRIMARY KEY (student_id, code);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (code);


--
-- Name: education_exp education_exp_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.education_exp
    ADD CONSTRAINT education_exp_pkey PRIMARY KEY (education_exp_uuid);


--
-- Name: enrolment enrolment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enrolment
    ADD CONSTRAINT enrolment_pkey PRIMARY KEY (enrol_id);


--
-- Name: interview_status interview_status_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interview_status
    ADD CONSTRAINT interview_status_pkey PRIMARY KEY (status_uuid);


--
-- Name: interviews interviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interviews
    ADD CONSTRAINT interviews_pkey PRIMARY KEY (interview_uuid);


--
-- Name: job_and_skill job_and_skill_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_and_skill
    ADD CONSTRAINT job_and_skill_pkey PRIMARY KEY (job_id, skill_id);


--
-- Name: job_info job_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_info
    ADD CONSTRAINT job_info_pkey PRIMARY KEY (job_info_id);


--
-- Name: job_title job_title_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_title
    ADD CONSTRAINT job_title_pkey PRIMARY KEY (job_id);


--
-- Name: personal_skill personal_skill_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_skill
    ADD CONSTRAINT personal_skill_pkey PRIMARY KEY (student_id);


--
-- Name: resume resume_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resume
    ADD CONSTRAINT resume_pkey PRIMARY KEY (resume_id);


--
-- Name: skill_list skill_list_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_list
    ADD CONSTRAINT skill_list_pkey PRIMARY KEY (student_id, skill_id, course_code);


--
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (skill_id);


--
-- Name: targets targets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.targets
    ADD CONSTRAINT targets_pkey PRIMARY KEY (target_uuid);


--
-- Name: user_info user_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (username);


--
-- Name: working_exp working_exp_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.working_exp
    ADD CONSTRAINT working_exp_pkey PRIMARY KEY (working_exp_uuid);


--
-- PostgreSQL database dump complete
--

