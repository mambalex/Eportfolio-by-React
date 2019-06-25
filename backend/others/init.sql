-- Method to use
-- Open terminal in current directory
-- $ createdb comp9900
-- $ psql comp9900 -s
-- $ \i init.sql
-- and all tables will be create

-- ver-0.5

CREATE TABLE courses
(
    code character(8) NOT NULL,
    course_name text NOT NULL,
    PRIMARY KEY (code)
);

CREATE TABLE skills
(
    skill_id uuid NOT NULL,
    skill_name text NOT NULL,
    PRIMARY KEY (skill_id)
);

CREATE TABLE job_title
(
    job_id uuid NOT NULL,
    job_name text NOT NULL,
    PRIMARY KEY (job_id)
);

CREATE TABLE course_and_skill
(
    code character(8) NOT NULL,
    skill_id uuid NOT NULL,
    relevance double precision,
    PRIMARY KEY (code, skill_id)
);

CREATE TABLE job_and_skill
(
    job_id uuid NOT NULL,
    skill_id uuid NOT NULL,
    relevance double precision,
    PRIMARY KEY (job_id, skill_id)
);

CREATE TABLE user_info
(
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
    photo text,
    PRIMARY KEY (username)
);

CREATE TABLE personal_skill
(
    student_id text NOT NULL,
    skill_data text NOT NULL,
    PRIMARY KEY (student_id)
);

CREATE TABLE education_exp
(
    education_exp_uuid uuid NOT NULL,
    student_id text NOT NULL,
    major text,
    university text,
    degree character varying(10),
    time_during text,
    PRIMARY KEY (education_exp_uuid)
);

CREATE TABLE course_list
(
    student_id text NOT NULL,
    code character(8) NOT NULL,
    certificat float NOT NULL,
    PRIMARY KEY (student_id, code)
);

CREATE TABLE skill_list
(
    student_id text NOT NULL,
    skill_id uuid NOT NULL,
    course_code character(8) NOT NULL,
    skill_type text NOT NULL,
    skill_from integer NOT NULL,
    proficiency integer NOT NULL,
    PRIMARY KEY (student_id, skill_id, course_code)
);

CREATE TABLE resume
(
    resume_id uuid NOT NULL,
    student_id text NOT NULL,
    address text NOT NULL,
    PRIMARY KEY (resume_id)
);

CREATE TABLE enrolment
(
    enrol_id uuid NOT NULL,
    student_id text NOT NULL,
    company_id text NOT NULL,
    resume_id uuid NOT NULL,
    PRIMARY KEY (enrol_id)
);
-- TODO job type location
CREATE TABLE job_info
(
    job_info_id uuid NOT NULL,
    job_id uuid NOT NULL,
    company_id text NOT NULL,
    description text,
    job_type text,
    salary text,
    location text,
    address text NOT NULL,
    PRIMARY KEY (job_info_id)
);

CREATE TABLE interviews
(
    interview_uuid uuid NOT NULL,
    job_info_id uuid,
    student_id text NOT NULL,
    company_id text NOT NULL,
    interview_time text,
    location text,
    status uuid NOT NULL,
    type integer,
    PRIMARY KEY (interview_uuid)
);

CREATE TABLE save_list
(
    user_id text NOT NULL,
    job_info_id uuid NOT NULL
);

CREATE TABLE saved_user
(
    master_id text NOT NULL,
    user_id text NOT NULL
);

CREATE TABLE working_exp
(
    working_exp_uuid uuid NOT NULL,
    user_id text NOT NULL,
    name text NOT NULL,
    description character varying(200),
    link text,
    exp_type integer NOT NULL,
    PRIMARY KEY (working_exp_uuid)
);

CREATE TABLE targets
(
    target_uuid uuid NOT NULL,
    name text NOT NULL,
    type integer NOT NULL,
    PRIMARY KEY (target_uuid)
);

CREATE TABLE target_list
(
    item_id text NOT NULL,
    target_uuid uuid NOT NULL
);

CREATE TABLE recommend
(
    master_id text NOT NULL,
    item_id text NOT NULL,
    base_mark integer,
    bonus integer,
    referrer text NOT NULL,
    ref_username text NOT NULL,
    recommend_type integer NOT NULL
);

CREATE TABLE interview_status
(
    status_uuid uuid NOT NULL,
    name text NOT NULL,
    PRIMARY KEY (status_uuid)
);

insert into interview_status values ('2b128e58-cdd3-11e8-894f-4c3275989ef5', 'Start');
insert into interview_status values ('53e3baf0-cdd3-11e8-b600-4c3275989ef5', 'First Interview');
insert into interview_status values ('7413af9c-cdd3-11e8-b71a-4c3275989ef5', 'Tests');
insert into interview_status values ('827f3f10-cdd3-11e8-a548-4c3275989ef5', 'Second Interview');
insert into interview_status values ('2d4cbd28-cdd4-11e8-a778-4c3275989ef5', 'Offer');
insert into interview_status values ('529520de-cdd4-11e8-b7b2-4c3275989ef5', 'Engaged');
insert into interview_status values ('75a8bfe2-cdd4-11e8-a454-4c3275989ef5', 'Fail');
