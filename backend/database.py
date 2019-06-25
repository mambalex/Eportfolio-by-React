# ver-0.5

import database_lib
import uuid

language_skill = ['c', 'c++', 'java', 'python', 'javascript', 'sql', 'golang']


def check_username(username):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select count(*) from user_info where username = '{}';".format(username)
    result = database_object.search(sql)
    database_object.close()
    if result[0][0] == 0:
        return True
    else:
        return False


def create_user(user_profile):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into user_info values ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}');".format(
        user_profile["username"], user_profile.get("name", user_profile["username"]), user_profile["password"],
        user_profile["email"],
        user_profile.get("gender", "Unknown"), user_profile.get("dob", '01/01/2000'), user_profile.get("phone", "None"),
        user_profile.get("location", "Sydney"), user_profile["role"],
        user_profile.get("description", "Nothing to show."), user_profile.get("link", "None"),
        user_profile.get("photo", "None"))
    database_object.update(sql)
    database_object.close()


def get_user_info_by_username(username):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from user_info where username = '{}';".format(username)
    result = database_object.search(sql)
    database_object.close()
    result = convert_user_info(result)
    return result


def get_user_info_by_name(uname):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from user_info where uname like '%{}%' and role = 'candidate';".format(uname)
    result = database_object.search(sql)
    database_object.close()
    result = convert_user_info(result)
    return result


def get_candidate_list():
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from user_info where role = 'candidate';"
    result = database_object.search(sql)
    database_object.close()
    result = convert_user_info(result)
    return result


def get_user_password(username):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select password from user_info where username = '{}';".format(
        username)
    result = database_object.search(sql)
    database_object.close()
    result = result[0][0]
    result.rstrip()
    return result

def load_user(username):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from user_info where username = '{}';".format(username)
    result = database_object.search(sql)
    database_object.close()
    passwd = result[0][2]
    result = convert_user_info(result)
    result[0]['passwd'] = passwd
    return result

def change_user_info(username, field, new_data):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "update user_info set {} = '{}' where username = '{}';".format(
        field, new_data, username)
    database_object.update(sql)
    database_object.close()


def change_user_password(username, new_password):
    change_user_info(username, "password", new_password)


def change_user_name(username, new_uname):
    change_user_info(username, "uname", new_uname)


def change_user_email(username, new_email):
    change_user_info(username, "email", new_email)


def change_user_gender(username, new_gender):
    change_user_info(username, "gender", new_gender)


def change_user_dob(username, new_dob):
    change_user_info(username, "dob", new_dob)


def change_user_phone(username, new_phone):
    change_user_info(username, "phone", new_phone)


def change_user_role(username, new_role):
    change_user_info(username, "role", new_role)


def change_user_link(username, new_link):
    change_user_info(username, "link", new_link)


def change_user_photo(username, photo_addr):
    change_user_info(username, "photo", photo_addr)


def change_user_location(username, new_location):
    change_user_info(username, "location", new_location)


def change_user_description(username, new_description):
    change_user_info(username, "description", new_description)


def create_skill(uuid, skill_name):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into skills values ('{}', '{}');".format(uuid, skill_name)
    database_object.update(sql)
    database_object.close()


def get_skill_name(uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from skills where skill_id = '{}';".format(uuid)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['id', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def get_all_skill():
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from skills;"
    result = database_object.search(sql)
    database_object.close()
    key_list = ['id', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def search_skill(skill_name):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from skills where skill_name like '%{}%';".format(
        skill_name)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['id', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def create_course(code, course_name):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into courses values ('{}', '{}');".format(code, course_name)
    database_object.update(sql)
    database_object.close()


def get_course_name(code):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from courses where code = '{}';".format(code)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['code', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def search_course(course_name):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from courses where course_name like '%{}%';".format(
        course_name)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['code', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def create_course_and_skill_link(course_code, skill_uuid, relevance=1.0):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into course_and_skill values ('{}', '{}', {});".format(
        course_code, skill_uuid, relevance)
    database_object.update(sql)
    database_object.close()


def search_skill_by_course_code(course_code):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select s.* from course_and_skill cs, skills s where cs.code = '{}' and cs.skill_id = s.skill_id;".format(
        course_code)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['id', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def search_course_by_skill_uuid(skill_uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select c.* from course_and_skill cs, courses c where cs.skill_id = '{}' and cs.code = c.code;".format(
        skill_uuid)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['code', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def search_skill_by_course_name(name):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select s.* from course_and_skill cs, skills s, courses c \
    where c.course_name like '%{}%' and c.code = cs.code and cs.skill_id = s.skill_id;".format(name)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['id', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def search_course_by_skill_name(name):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select c.* from course_and_skill cs, skills s, courses c \
    where s.skill_name like '%{}%' and c.code = cs.code and cs.skill_id = s.skill_id;".format(name)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['code', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def add_skill_to_list(username, skill_name, proficiency):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select count(*) from skills where skill_name = '{}';".format(skill_name)
    result = database_object.search(sql)
    if result[0][0] == 0:
        skill_id = uuid.uuid1()
        sql = "insert into skills values ('{}', '{}');".format(skill_id, skill_name)
        database_object.update(sql)
        sql = "insert into skill_list values ('{}', '{}', 'None', 'other', 1, {});".format(username, skill_id,
                                                                                           proficiency)
        database_object.update(sql)
    else:
        sql = "select * from skills where skill_name = '{}';".format(skill_name)
        result = database_object.search(sql)
        key_list = ['id', 'name']
        result = convert_result_to_dict(result, key_list)
        sql = "insert into skill_list values ('{}', '{}', 'None', 'other', 1, {});".format(username, result[0]['id'],
                                                                                           proficiency)
        database_object.update(sql)
    database_object.close()


def delete_skill_from_list(username, skill_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "delete from skill_list where student_id = '{}' and skill_id = '{}' and skill_from = 1;".format(username,
                                                                                                          skill_id)
    database_object.update(sql)
    database_object.close()


def change_skill_list(username, skill_id, proficiency):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "update skill_list set proficiency = {} where student_id = '{}' and skill_id = '{}' and skill_from = 1;".format(
        proficiency, username,
        skill_id)
    database_object.update(sql)
    database_object.close()


def get_self_skill_list(username):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select s.*, s_l.proficiency from skills s, skill_list s_l where s_l.student_id = '{}' and s_l.skill_id = s.skill_id and s_l.skill_from = 1;".format(
        username)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['id', 'name', 'proficiency']
    result = convert_result_to_dict(result, key_list)
    return result


def create_job_and_skill_link(job_uuid, skill_uuid, relevance=1.0):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into job_and_skill values ('{}', '{}', {});".format(
        job_uuid, skill_uuid, relevance)
    database_object.update(sql)
    database_object.close()


def search_skill_by_job_uuid(job_uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select s.* from job_and_skill js, skills s where js.job_id = '{}' and js.skill_id = s.skill_id;".format(
        job_uuid)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['id', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def search_job_by_skill_uuid(skill_uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select j.* from job_and_skill js, job_title j where js.skill_id = '{}' and js.job_id = j.job_id;".format(
        skill_uuid)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['id', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def search_skill_by_job_title(name):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select s.* from job_and_skill js, skills s, job_title j \
    where j.job_name like '%{}%' and j.job_id = js.job_id and js.skill_id = s.skill_id;".format(name)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['id', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def search_job_by_skill_name(name):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select j.* from job_and_skill js, skills s, job_title j \
    where s.skill_name like '%{}%' and j.job_id = js.job_id and js.skill_id = s.skill_id;".format(name)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['id', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def add_course_to_list(username, code, certificat=1):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into course_list values ('{}', '{}', {});".format(
        username, code, certificat)
    database_object.update(sql)
    sql = "select s.* from course_and_skill cs, skills s where cs.code = '{}' and cs.skill_id = s.skill_id;".format(
        code)
    skill_result = database_object.search(sql)
    key_list = ['id', 'name']
    skill_result = convert_result_to_dict(skill_result, key_list)
    for skill in skill_result:
        if skill['name'] in language_skill:
            sql = "insert into skill_list values ('{}', '{}', '{}', 'language', 0, 70);".format(username, skill['id'],
                                                                                                code)
        else:
            sql = "insert into skill_list values ('{}', '{}', '{}', 'other', 0, 70);".format(username, skill['id'],
                                                                                             code)
        database_object.update(sql)
    database_object.close()


def get_course_list(username):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select c.* from course_list sl, courses c where sl.student_id = '{}' and sl.code = c.code;".format(
        username)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['code', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def delete_course_from_list(username, code):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "delete from course_list where student_id = '{}' and code = '{}';".format(
        username, code)
    database_object.update(sql)
    sql = "select s.* from course_and_skill cs, skills s where cs.code = '{}' and cs.skill_id = s.skill_id;".format(
        code)
    skill_result = database_object.search(sql)
    database_object.close()
    key_list = ['id', 'name']
    skill_result = convert_result_to_dict(skill_result, key_list)
    for skill in skill_result:
        sql = "delete from skill_list where student_id = '{}' and skill_id = '{}' and course_code = '{}' and skill_from = 0;".format(
            username, skill['id'], code)
        database_object.update(sql)
    database_object.close()


def create_resume(resume_uuid, username, address):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into resume values ('{}', '{}', '{}');".format(
        resume_uuid, username, address)
    database_object.update(sql)
    database_object.close()


def get_self_resume(username):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from resume where student_id = '{}';".format(username)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['id', 'username', 'address']
    result = convert_result_to_dict(result, key_list)
    return result


# TODO unfinished function


def search_resume():
    pass


def delete_resume(resume_uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "delete from resume where resume_id = '{}';".format(resume_uuid)
    database_object.update(sql)
    database_object.close()


def create_job_title(uuid, name):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into job_title values ('{}', '{}');".format(uuid, name)
    database_object.update(sql)
    database_object.close()


def search_job_title(name):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from job_title where job_name like '%{}%';".format(name)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['id', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def get_all_job_title():
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from job_title;"
    result = database_object.search(sql)
    database_object.close()
    key_list = ['id', 'name']
    result = convert_result_to_dict(result, key_list)
    return result


def get_job_info_by_job_uuid(job_uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select j.job_name, ui.uname, ji.* from job_title j, job_info ji, user_info ui where j.job_id = '{}' and j.job_id = ji.job_id and ji.company_id = ui.username;".format(
        job_uuid)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['job_title', 'company_name', 'job_info_id', 'job_id', 'company_id', 'description', 'job_type', 'salary',
                'location', 'address']
    result = convert_result_to_dict(result, key_list)
    return result


def get_job_info(job_info_uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select j.job_name, ui.uname, ji.* from job_title j, job_info ji, user_info ui where ji.job_info_id = '{}' and j.job_id = ji.job_id and ji.company_id = ui.username;".format(
        job_info_uuid)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['job_title', 'company_name', 'job_info_id', 'job_id', 'company_id', 'description', 'job_type', 'salary',
                'location', 'address']
    result = convert_result_to_dict(result, key_list)
    return result


def get_job_info_by_job_name(job_name):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select j.job_name, ui.uname, ji.* from job_title j, job_info ji, user_info ui where j.job_name ~ '{}' and j.job_id = ji.job_id and ji.company_id = ui.username;".format(
        job_name)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['job_title', 'company_name', 'job_info_id', 'job_id', 'company_id', 'description', 'job_type', 'salary',
                'location', 'address']
    result = convert_result_to_dict(result, key_list)
    return result


def get_job_info_list():
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select j.job_name, ui.uname, ji.* from job_title j, job_info ji, user_info ui where j.job_id = ji.job_id and ji.company_id = ui.username;"
    result = database_object.search(sql)
    database_object.close()
    key_list = ['job_title', 'company_name', 'job_info_id', 'job_id', 'company_id', 'description', 'job_type', 'salary',
                'location', 'address']
    result = convert_result_to_dict(result, key_list)
    return result

def create_job_info(info_uuid, job_uuid, company_id, address, job_type="Full time", description="None", salary=0,
                    location="Sydney"):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into job_info values ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}');".format(
        info_uuid, job_uuid, company_id, description, job_type, salary, location, address)
    database_object.update(sql)
    database_object.close()


def change_job_info_address(info_uuid, new_address):
    change_job_info(info_uuid, "address", new_address)


def change_job_type(info_uuid, new_type):
    change_job_info(info_uuid, "job_type", new_type)


def change_job_location(info_uuid, new_location):
    change_job_info(info_uuid, "location", new_location)


def change_job_info_title(info_uuid, new_title_uuid):
    change_job_info(info_uuid, "job_id", new_title_uuid)


def change_job_info_description(info_uuid, new_description):
    change_job_info(info_uuid, "description", new_description)


def change_job_info_salary(info_uuid, new_salary):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "update job_info set salary = '{}' where job_info_id = '{}';".format(new_salary, info_uuid)
    database_object.update(sql)
    database_object.close()


def change_job_info(info_uuid, field, new_data):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "update job_info set {} = '{}' where job_info_id = '{}';".format(
        field, new_data, info_uuid)
    database_object.update(sql)
    database_object.close()


def get_self_job_info(company_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select j.job_name, ui.uname, ji.* from job_title j, job_info ji, user_info ui where ji.company_id = '{}' and j.job_id = ji.job_id and ji.company_id = ui.username;".format(
        company_id)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['job_title', 'company_name', 'job_info_id', 'job_id', 'company_id', 'description', 'job_type', 'salary',
                'location', 'address']
    result = convert_result_to_dict(result, key_list)
    return result


def delete_job_info(info_uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "delete from job_info where job_info_id = '{}';".format(info_uuid)
    database_object.update(sql)
    database_object.close()


def send_resume(enrol_id, student_id, company_id, resume_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into enrolment values ('{}', '{}', '{}', '{}');".format(
        enrol_id, student_id, company_id, resume_id)
    database_object.update(sql)
    database_object.close()


def transfer_resume_to_interview(student_id, company_id, resume_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "delete from enrolment where student_id = '{}' and company_id = '{}' and resume_id = '{}';".format(student_id, company_id, resume_id)
    database_object.update(sql)
    database_object.close()


def get_job_info_resume(job_info_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select e.enrol_id, e.student_id, j_i.job_info_id, j_t.job_name from enrolment e, job_info j_i, job_title j_t where e.resume_id = '{}'\
and e.resume_id = j_i.job_info_id and j_i.job_id = j_t.job_id;".format(
        job_info_id)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['enrol_id', 'student_id', 'job_info_id', 'job_name']
    result = convert_result_to_dict(result, key_list)
    return result


def get_sent_resume(student_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select e.enrol_id, e.company_id, j_i.job_info_id, j_t.job_name from enrolment e, job_info j_i, job_title j_t where e.student_id = '{}'\
and e.resume_id = j_i.job_info_id and j_i.job_id = j_t.job_id;".format(
        student_id)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['enrol_id', 'company_id', 'job_info_id', 'job_name']
    result = convert_result_to_dict(result, key_list)
    return result


def cancel_resume_send(enrol_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "delete from enrolment where enrol_id = '{}';".format(enrol_id)
    database_object.update(sql)
    database_object.close()


def get_resume_list(company_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select e.enrol_id, e.student_id, j_i.job_info_id, j_t.job_name from enrolment e, job_info j_i, job_title j_t where e.company_id = '{}'\
and e.resume_id = j_i.job_info_id and j_i.job_id = j_t.job_id;".format(
        company_id)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['enrol_id', 'student_id', 'job_info_id', 'job_name']
    result = convert_result_to_dict(result, key_list)
    return result


def create_education_exp(education_exp_uuid, student_id, major, university, degree, time_during='None'):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into education_exp values ('{}', '{}', '{}', '{}', '{}', '{}');".format(education_exp_uuid,
                                                                                          student_id,
                                                                                          major, university, degree,
                                                                                          time_during)
    database_object.update(sql)
    database_object.close()


def get_education_exp(student_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from education_exp where student_id = '{}';".format(
        student_id)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['education_exp_uuid', 'student_id', 'major', 'university', 'degree', 'time_during']
    result = convert_result_to_dict(result, key_list)
    return result


def get_single_education_exp(education_exp_uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from education_exp where education_exp_uuid = '{}';".format(
        education_exp_uuid)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['education_exp_uuid', 'student_id', 'major', 'university', 'degree', 'time_during']
    result = convert_result_to_dict(result, key_list)
    return result


def change_major(education_exp_uuid, new_major):
    change_education_exp(education_exp_uuid, "major", new_major)


def change_university(education_exp_uuid, new_university):
    change_education_exp(education_exp_uuid, "university", new_university)


def change_degree(education_exp_uuid, new_degree):
    change_education_exp(education_exp_uuid, "degree", new_degree)


def change_education_exp(education_exp_uuid, field, new_data):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "update education_exp set {} = '{}' where education_exp_uuid = '{}';".format(
        field, new_data, education_exp_uuid)
    database_object.update(sql)
    database_object.close()


def delete_education_exp(education_exp_uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "delete from education_exp where education_exp_uuid = '{}';".format(education_exp_uuid)
    database_object.update(sql)
    database_object.close()


# 12/09/2018 add functions


def create_interview(interview_uuid, job_info_id, student_id, company_id, interview_time="Null", location="None",
                     status_uuid="Null", interview_type=1):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into interviews values ('{}', '{}', '{}', '{}', '{}', '{}', '{}', {});".format(
        interview_uuid, job_info_id, student_id, company_id, interview_time, location, status_uuid, interview_type)
    database_object.update(sql)
    database_object.close()


def change_interview_info(interview_uuid, field, new_data):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "update interviews set {} = '{}' where interview_uuid = '{}';".format(
        field, new_data, interview_uuid)
    database_object.update(sql)
    database_object.close()


def change_interview_time(interview_uuid, new_time):
    change_interview_info(interview_uuid, "interview_time", new_time)


def change_interview_location(interview_uuid, new_location):
    change_interview_info(interview_uuid, "location", new_location)


def change_interview_status(interview_uuid, new_status_uuid):
    change_interview_info(interview_uuid, "status", new_status_uuid)


def delete_interview(interview_uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "delete from interviews where interview_uuid = '{}';".format(
        interview_uuid)
    database_object.update(sql)
    database_object.close()


def get_spec_interview(interview_uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select i.interview_uuid, j_i.job_info_id, j_t.job_name, i.student_id, u_i.uname, i.company_id, i.interview_time, i.location,\
     i_s.name as status from interviews i, interview_status i_s, user_info u_i, job_info j_i, job_title j_t where i.interview_uuid\
     = '{}' and i.status = i_s.status_uuid and i.student_id = u_i.username and i.job_info_id = j_i.job_info_id and j_i.job_id = j_t.job_id;".format(
        interview_uuid)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['interview_uuid', 'job_info_id', 'job_name', 'student_id',
                'student_name', 'company_id', 'interview_time', 'location', 'status']
    result = convert_result_to_dict(result, key_list)
    return result[0]


def create_interview_model(interview_uuid, company_id, location="None"):
    create_interview(interview_uuid, "Null", "Null", company_id,
                     "Null", location, "Null", 0)


def delete_interview_model(interview_uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "delete from interviews where interview_uuid = '{}';".format(
        interview_uuid)
    database_object.update(sql)
    database_object.close()


def get_interview_by_company_id(company_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select i.interview_uuid, j_i.job_info_id, j_t.job_name, i.student_id, u_i.uname, i.company_id, i.interview_time, i.location,\
     i_s.name as status from interviews i, interview_status i_s, user_info u_i, job_info j_i, job_title j_t where i.company_id\
     = '{}' and i.status = i_s.status_uuid and i.student_id = u_i.username and i.job_info_id = j_i.job_info_id and j_i.job_id = j_t.job_id;".format(
        company_id)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['interview_uuid', 'job_info_id', 'job_name', 'student_id',
                'student_name', 'company_id', 'interview_time', 'location', 'status']
    result = convert_result_to_dict(result, key_list)
    return result


def get_job_info_interview(job_info_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select i.interview_uuid, j_i.job_info_id, j_t.job_name, i.student_id, u_i.uname, i.company_id, i.interview_time, i.location,\
     i_s.name as status from interviews i, interview_status i_s, user_info u_i, job_info j_i, job_title j_t where i.job_info_id\
     = '{}' and i.status = i_s.status_uuid and i.student_id = u_i.username and i.job_info_id = j_i.job_info_id and j_i.job_id = j_t.job_id;".format(
        job_info_id)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['interview_uuid', 'job_info_id', 'job_name', 'student_id',
                'student_name', 'company_id', 'interview_time', 'location', 'status']
    result = convert_result_to_dict(result, key_list)
    return result


def get_interview_by_student_id(student_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select i.interview_uuid, j_i.job_info_id, j_t.job_name, i.student_id, u_i.uname, i.company_id, i.interview_time, i.location,\
     i_s.name as status from interviews i, interview_status i_s, user_info u_i, job_info j_i, job_title j_t where i.student_id\
     = '{}' and i.status = i_s.status_uuid and i.company_id = u_i.username and i.job_info_id = j_i.job_info_id and j_i.job_id = j_t.job_id;".format(
        student_id)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['interview_uuid', 'job_info_id', 'job_name', 'student_id',
                'company_name', 'company_id', 'interview_time', 'location', 'status']
    result = convert_result_to_dict(result, key_list)
    return result


def create_interview_status(status_uuid, status_name):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into interview_status values ('{}', '{}');".format(
        status_uuid, status_name)
    database_object.update(sql)
    database_object.close()


def get_interview_status_list():
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from interview_status;"
    result = database_object.search(sql)
    database_object.close()
    key_list = ['status_uuid', 'status_name']
    result = convert_result_to_dict(result, key_list)
    return result


# 13/09/2018 add functions


def add_saved_job(user_id, job_info_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into save_list values ('{}', '{}');".format(
        user_id, job_info_id)
    database_object.update(sql)
    database_object.close()


def get_saved_job_list(user_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select j_t.job_name, j_i.*, u_i.uname from save_list s_l, job_info j_i, job_title j_t, user_info u_i \
    where s_l.user_id = '{}' and s_l.job_info_id = j_i.job_info_id and j_i.job_id = j_t.job_id and u_i.username = j_i.company_id;".format(
        user_id)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['job_name', 'job_info_id', 'job_id',
                'company_id', 'description', 'job_type', 'salary', 'location', 'address', 'company_name']
    result = convert_result_to_dict(result, key_list)
    return result


def delete_saved_job(user_id, job_info_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "delete from save_list where user_id = '{}' and job_info_id = '{}';".format(
        user_id, job_info_id)
    database_object.update(sql)
    database_object.close()


def create_working_exp(working_exp_uuid, user_id, name, description="Null", link="Null", exp_type=1):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into working_exp values ('{}', '{}', '{}', '{}', '{}', {});".format(
        working_exp_uuid, user_id, name, description, link, exp_type)
    database_object.update(sql)
    database_object.close()


def get_working_exp_by_uuid(working_exp_uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from working_exp where working_exp_uuid = '{}';".format(
        working_exp_uuid)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['working_exp_uuid', 'user_id', 'name', 'description', 'link', 'exp_type']
    result = convert_result_to_dict(result, key_list)
    return result


def get_working_exp_list_by_user_id(user_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from working_exp where user_id = '{}';".format(user_id)
    result = database_object.search(sql)
    database_object.close()
    key_list = ['working_exp_uuid', 'user_id', 'name', 'description', 'link', 'exp_type']
    result = convert_result_to_dict(result, key_list)
    return result


def change_working_exp_info(working_exp_uuid, field, new_data):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "update working_exp set {} = '{}' where working_exp_uuid = '{}';".format(
        field, new_data, working_exp_uuid)
    database_object.update(sql)
    database_object.close()


def change_working_exp_name(working_exp_uuid, new_name):
    change_working_exp_info(working_exp_uuid, "name", new_name)


def change_working_exp_description(working_exp_uuid, new_description):
    change_working_exp_info(working_exp_uuid, "description", new_description)


def change_working_exp_link(working_exp_uuid, new_link):
    change_working_exp_info(working_exp_uuid, "link", new_link)


def delete_working_exp(working_exp_uuid):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "delete from working_exp where working_exp_uuid = '{}';".format(
        working_exp_uuid)
    database_object.update(sql)
    database_object.close()


def add_saved_user(user_id, saved_user_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into saved_user values ('{}', '{}');".format(
        user_id, saved_user_id)
    database_object.update(sql)
    database_object.close()


def get_saved_user_list(user_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select u_i.username, u_i.uname, u_i.email, u_i.role, u_i.location from user_info u_i, saved_user s_u where s_u.master_id = '{}' and s_u.user_id = u_i.username;".format(
        user_id)
    result = database_object.search(sql)
    database_object.close()
    key_list = ["username", "name", "email", "role", "location"]
    result = convert_result_to_dict(result, key_list)
    return result


def delete_saved_user(user_id, saved_user_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "delete from saved_user where master_id = '{}' and user_id = '{}';".format(
        user_id, saved_user_id)
    database_object.update(sql)
    database_object.close()


def add_personal_skill(username, skill_data='Nothing here'):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into personal_skill values ('{}', '{}');".format(
        username, skill_data)
    database_object.update(sql)
    database_object.close()


def get_personal_skill(username):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select skill_data from personal_skill where student_id = '{}';".format(
        username)
    result = database_object.search(sql)
    database_object.close()
    result = result[0][0].split('|')
    return result


def update_personal_skill(username, skill_data):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "update personal_skill set skill_data = '{}' where student_id = '{}';".format(
        skill_data, username)
    database_object.update(sql)
    database_object.close()


def get_all_target():
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from targets;"
    result = database_object.search(sql)
    database_object.close()
    keys_list = ["target_uuid", "name", "type"]
    result = convert_result_to_dict(result, keys_list)
    return result

def get_item_target(item_id):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select t.* from targets t, target_list t_l where t.target_uuid = t_l.target_uuid and t_l.item_id = '{}';".format(item_id)
    result = database_object.search(sql)
    database_object.close()
    keys_list = ["target_uuid", "name", "type"]
    result = convert_result_to_dict(result, keys_list)
    return result


def convert_result_to_dict(temp_result, key_list):
    result = list()
    for tuples in temp_result:
        temp_dict = {}
        for i in range(len(tuples)):
            if isinstance(tuples[i], int):
                temp_dict[key_list[i]] = tuples[i]
            elif tuples[i] is None:
                temp_dict[key_list[i]] = "None"
            else:
                temp_dict[key_list[i]] = tuples[i].rstrip()
        result.append(temp_dict)
    return result


def convert_user_info(temp_result):
    result = list()
    for temp_tuple in temp_result:
        temp_dict = {}
        temp_dict["username"] = temp_tuple[0].rstrip()
        temp_dict["name"] = temp_tuple[1].rstrip()
        temp_dict["email"] = temp_tuple[3].rstrip()
        temp_dict['gender'] = temp_tuple[4]
        temp_dict['dob'] = temp_tuple[5]
        temp_dict["phone"] = temp_tuple[6]
        temp_dict["location"] = temp_tuple[7]
        temp_dict["role"] = temp_tuple[8]
        temp_dict["description"] = temp_tuple[9]
        temp_dict["link"] = temp_tuple[10]
        temp_dict["photo"] = temp_tuple[11]
        result.append(temp_dict)
    return result


def create_test_data():
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into user_info values ('candidate1', 'Alex', '123456', 'candidate1@gmail.com', 'male', '01/01/1993', '8888888888', 'Sydney', 'candidate', 'I have lots of Python and Java experience.', 'http://github.com', 'None');\
            insert into personal_skill values ('candidate1', 'Strong analytical and problem solving skills|Excellent communication skills: verbal and written|Disciplined, organized, punctual and caring attitude');\
            insert into education_exp values ('ab180d42-cd5d-11e8-bb98-4c3275989ef5', 'candidate1', 'IT', 'UNSW', 'Master', '09/2016-06/2018');\
            insert into education_exp values ('81c032c0-cd5e-11e8-a01d-4c3275989ef5', 'candidate1', 'IT', 'UTS', 'Bachelor', '09/2013-06/2016');\
            insert into working_exp values ('51d43d08-cd5f-11e8-b912-4c3275989ef5', 'candidate1', 'COMP9323 Project', '{\"description\": \"This is a project about website and chatbot\", \"techs\": [\"Java\", \"Python\"]}', 'http://github.com', 1);\
            insert into working_exp values ('2beb7078-cdfc-11e8-817c-4c3275989ef5', 'candidate1', 'Self employed', 'Date: 09/2017 - 01/18\nI did some project and task from other company, like an outsourcing.', 'http://github.com', 0);\
            insert into skill_list values ('candidate1', 'd841aee0-cc22-3fd4-b084-36f16171022c', 'None', 'other', 1, 80);\
            insert into skill_list values ('candidate1', 'eae51a28-cdf1-11e8-9a88-4c3275989ef5', 'None', 'other', 1, 75);\
            insert into skill_list values ('candidate1', '50e3c66a-d1a5-3972-bb3f-9eedbdf8b731', 'None', 'other', 1, 70);\
            insert into skill_list values ('candidate1', 'ec658a2c-b151-3fad-b95c-8b552e8d319e', 'None', 'other', 1, 65);\
            insert into skill_list values ('candidate1', 'c9f8b609-b81e-3c95-8188-914324e741c8', 'None', 'other', 1, 80);\
            insert into course_list values ('candidate1', 'comp9021', 1.0);\
            insert into course_list values ('candidate1', 'comp9024', 1.0);\
            insert into course_list values ('candidate1', 'comp9311', 1.0);\
            insert into course_list values ('candidate1', 'comp9331', 1.0);\
            insert into course_list values ('candidate1', 'gsoe9820', 1.0);\
            insert into course_list values ('candidate1', 'comp9041', 1.0);\
            insert into course_list values ('candidate1', 'comp9020', 1.0);\
            insert into course_list values ('candidate1', 'comp9321', 1.0);\
            insert into course_list values ('candidate1', 'comp9334', 1.0);\
            insert into course_list values ('candidate1', 'comp6714', 1.0);\
            insert into course_list values ('candidate1', 'comp9313', 1.0);\
            insert into course_list values ('candidate1', 'comp9315', 1.0);\
            insert into course_list values ('candidate1', 'comp9318', 1.0);\
            insert into course_list values ('candidate1', 'comp9417', 1.0);\
            insert into course_list values ('candidate1', 'comp9323', 1.0);\
            insert into course_list values ('candidate1', 'comp9900', 1.0);\
            insert into user_info values ('candidate2', 'Emma', '123456', 'candidate2@gmail.com', 'female', '01/03/1993', '1111111111', 'Sydney', 'candidate', 'I graduated from UNSW and learn lots of mechine learning and deep learning.', 'http://github.com', 'None');\
            insert into personal_skill values ('candidate2', 'Strong analytical and problem solving skills|Excellent communication skills: verbal and written|Disciplined, organized, punctual and caring attitude');\
            insert into education_exp values ('f3d08582-cd5d-11e8-b30f-4c3275989ef5', 'candidate2', 'IT', 'UNSW', 'Master', '09/2016-06/2018');\
            insert into education_exp values ('b173c040-cd5e-11e8-8d2c-4c3275989ef5', 'candidate2', 'CS', 'USYD', 'Bachelor', '09/2013-06/2016');\
            insert into working_exp values ('64003680-cd5f-11e8-8593-4c3275989ef5', 'candidate2', 'COMP9417 Project', '{\"description\": \"This is a project about implement mechine learning algorithm\", \"techs\": [\"Java\", \"Python\"]}', 'http://github.com', 1);\
            insert into skill_list values ('candidate2', 'd841aee0-cc22-3fd4-b084-36f16171022c', 'None', 'other', 1, 65);\
            insert into skill_list values ('candidate2', 'eae51a28-cdf1-11e8-9a88-4c3275989ef5', 'None', 'other', 1, 60);\
            insert into skill_list values ('candidate2', '50e3c66a-d1a5-3972-bb3f-9eedbdf8b731', 'None', 'other', 1, 75);\
            insert into skill_list values ('candidate2', 'ec658a2c-b151-3fad-b95c-8b552e8d319e', 'None', 'other', 1, 80);\
            insert into skill_list values ('candidate2', 'c9f8b609-b81e-3c95-8188-914324e741c8', 'None', 'other', 1, 90);\
            insert into course_list values ('candidate2', 'comp9021', 1.0);\
            insert into course_list values ('candidate2', 'comp9024', 1.0);\
            insert into course_list values ('candidate2', 'comp9311', 1.0);\
            insert into course_list values ('candidate2', 'comp9331', 1.0);\
            insert into course_list values ('candidate2', 'gsoe9820', 1.0);\
            insert into course_list values ('candidate2', 'comp9414', 1.0);\
            insert into course_list values ('candidate2', 'comp9417', 1.0);\
            insert into course_list values ('candidate2', 'comp9418', 1.0);\
            insert into course_list values ('candidate2', 'comp9444', 1.0);\
            insert into course_list values ('candidate2', 'comp9517', 1.0);\
            insert into course_list values ('candidate2', 'comp9318', 1.0);\
            insert into course_list values ('candidate2', 'comp9313', 1.0);\
            insert into course_list values ('candidate2', 'comp9323', 1.0);\
            insert into course_list values ('candidate2', 'comp6714', 1.0);\
            insert into course_list values ('candidate2', 'comp9020', 1.0);\
            insert into course_list values ('candidate2', 'comp9900', 1.0);\
            insert into user_info values ('candidate3', 'Allen', '123456', 'candidate3@gmail.com', 'male', '01/05/1995', '2222222222', 'Sydney', 'candidate', 'I am proficient in C++ and wanna find a job with C/C++.', 'http://github.com', 'None');\
            insert into personal_skill values ('candidate3', 'Nothing here');\
            insert into education_exp values ('0ae54636-cd5e-11e8-8491-4c3275989ef5', 'candidate3', 'IT', 'UNSW', 'Master', '09/2016-06/2018');\
            insert into education_exp values ('d0d6add0-cd5e-11e8-804a-4c3275989ef5', 'candidate3', 'EE', 'MIT', 'Bachelor', '09/2013-06/2016');\
            insert into working_exp values ('9f6ef06c-cd5f-11e8-84b1-4c3275989ef5', 'candidate3', 'COMP9334 Project', '{\"description\": \"This is a project about implementing a simulation system for system performance analysis\", \"techs\": [\"Java\", \"Python\"]}', 'http://github.com', 1);\
            insert into skill_list values ('candidate3', 'd841aee0-cc22-3fd4-b084-36f16171022c', 'None', 'other', 1, 50);\
            insert into skill_list values ('candidate3', 'eae51a28-cdf1-11e8-9a88-4c3275989ef5', 'None', 'other', 1, 55);\
            insert into skill_list values ('candidate3', '50e3c66a-d1a5-3972-bb3f-9eedbdf8b731', 'None', 'other', 1, 65);\
            insert into skill_list values ('candidate3', 'ec658a2c-b151-3fad-b95c-8b552e8d319e', 'None', 'other', 1, 90);\
            insert into skill_list values ('candidate3', 'c9f8b609-b81e-3c95-8188-914324e741c8', 'None', 'other', 1, 80);\
            insert into course_list values ('candidate3', 'comp9021', 1.0);\
            insert into course_list values ('candidate3', 'comp9024', 1.0);\
            insert into course_list values ('candidate3', 'comp9311', 1.0);\
            insert into course_list values ('candidate3', 'comp9331', 1.0);\
            insert into course_list values ('candidate3', 'gsoe9820', 1.0);\
            insert into course_list values ('candidate3', 'comp9315', 1.0);\
            insert into course_list values ('candidate3', 'comp9334', 1.0);\
            insert into course_list values ('candidate3', 'comp9020', 1.0);\
            insert into course_list values ('candidate3', 'comp9101', 1.0);\
            insert into course_list values ('candidate3', 'comp6771', 1.0);\
            insert into course_list values ('candidate3', 'comp9153', 1.0);\
            insert into course_list values ('candidate3', 'comp9201', 1.0);\
            insert into course_list values ('candidate3', 'comp9242', 1.0);\
            insert into course_list values ('candidate3', 'comp9243', 1.0);\
            insert into course_list values ('candidate3', 'comp9900', 1.0);\
            insert into course_list values ('candidate3', 'comp9041', 1.0);\
            insert into user_info values ('candidate4', 'Kevin', '123456', 'candidate4@gmail.com', 'male', '01/01/1993', '3333333333', 'Sydney', 'candidate', 'My major is IT and look a backend developer job.', 'http://github.com', 'None');\
            insert into personal_skill values ('candidate4', 'Strong analytical and problem solving skills|Excellent communication skills: verbal and written');\
            insert into education_exp values ('359f73c6-cd5e-11e8-a5e7-4c3275989ef5', 'candidate4', 'IT', 'UNSW', 'Master', '09/2016-06/2018');\
            insert into education_exp values ('e6b90846-cd5e-11e8-91da-4c3275989ef5', 'candidate4', 'IT', 'UNSW', 'Bachelor', '09/2013-06/2016');\
            insert into working_exp values ('d66e4ec8-cd5f-11e8-a5ed-4c3275989ef5', 'candidate4', 'COMP9321 Project', '{\"description\": \"This is a project about implementing a Social networking site and I finished backend part\", \"techs\": [\"Java\", \"Python\"]}', 'http://github.com', 1);\
            insert into skill_list values ('candidate4', 'd841aee0-cc22-3fd4-b084-36f16171022c', 'None', 'other', 1, 90);\
            insert into skill_list values ('candidate4', 'eae51a28-cdf1-11e8-9a88-4c3275989ef5', 'None', 'other', 1, 85);\
            insert into skill_list values ('candidate4', '50e3c66a-d1a5-3972-bb3f-9eedbdf8b731', 'None', 'other', 1, 70);\
            insert into skill_list values ('candidate4', 'ec658a2c-b151-3fad-b95c-8b552e8d319e', 'None', 'other', 1, 65);\
            insert into skill_list values ('candidate4', 'c9f8b609-b81e-3c95-8188-914324e741c8', 'None', 'other', 1, 50);\
            insert into course_list values ('candidate4', 'comp9021', 1.0);\
            insert into course_list values ('candidate4', 'comp9024', 1.0);\
            insert into course_list values ('candidate4', 'comp9311', 1.0);\
            insert into course_list values ('candidate4', 'comp9331', 1.0);\
            insert into course_list values ('candidate4', 'gsoe9820', 1.0);\
            insert into course_list values ('candidate4', 'comp9041', 1.0);\
            insert into course_list values ('candidate4', 'comp9102', 1.0);\
            insert into course_list values ('candidate4', 'comp9321', 1.0);\
            insert into course_list values ('candidate4', 'comp9315', 1.0);\
            insert into course_list values ('candidate4', 'comp9318', 1.0);\
            insert into course_list values ('candidate4', 'comp9319', 1.0);\
            insert into course_list values ('candidate4', 'comp9417', 1.0);\
            insert into course_list values ('candidate4', 'comp9323', 1.0);\
            insert into course_list values ('candidate4', 'comp4141', 1.0);\
            insert into course_list values ('candidate4', 'comp9322', 1.0);\
            insert into course_list values ('candidate4', 'comp9900', 1.0);\
            insert into user_info values ('candidate5', 'Rose', '123456', 'candidate5@gmail.com', 'female', '01/01/1993', '4444444444', 'Melbourne', 'candidate', 'I working on Python and Java for a long time and look for programmer job.', 'http://github.com', 'None');\
            insert into personal_skill values ('candidate5', 'Strong analytical and problem solving skills|Excellent communication skills: verbal and written|Disciplined, organized, punctual and caring attitude');\
            insert into education_exp values ('47ea1ce6-cd5e-11e8-8bfa-4c3275989ef5', 'candidate5', 'IT', 'UNSW', 'Master', '09/2016-06/2018');\
            insert into working_exp values ('ff70eb6e-cd5f-11e8-8254-4c3275989ef5', 'candidate5', 'COMP9900 Project', '{\"description\": \"This is a project about booking air ticket application\", \"techs\": [\"Java\", \"Python\"]}', 'http://github.com', 1);\
            insert into skill_list values ('candidate5', 'd841aee0-cc22-3fd4-b084-36f16171022c', 'None', 'other', 1, 70);\
            insert into skill_list values ('candidate5', 'eae51a28-cdf1-11e8-9a88-4c3275989ef5', 'None', 'other', 1, 85);\
            insert into skill_list values ('candidate5', '50e3c66a-d1a5-3972-bb3f-9eedbdf8b731', 'None', 'other', 1, 65);\
            insert into skill_list values ('candidate5', 'ec658a2c-b151-3fad-b95c-8b552e8d319e', 'None', 'other', 1, 50);\
            insert into skill_list values ('candidate5', 'c9f8b609-b81e-3c95-8188-914324e741c8', 'None', 'other', 1, 75);\
            insert into course_list values ('candidate5', 'comp9021', 1.0);\
            insert into course_list values ('candidate5', 'comp9024', 1.0);\
            insert into course_list values ('candidate5', 'comp9311', 1.0);\
            insert into course_list values ('candidate5', 'comp9331', 1.0);\
            insert into course_list values ('candidate5', 'gsoe9820', 1.0);\
            insert into course_list values ('candidate5', 'comp9334', 1.0);\
            insert into course_list values ('candidate5', 'comp6714', 1.0);\
            insert into course_list values ('candidate5', 'comp9321', 1.0);\
            insert into course_list values ('candidate5', 'comp9313', 1.0);\
            insert into course_list values ('candidate5', 'comp9318', 1.0);\
            insert into course_list values ('candidate5', 'comp9444', 1.0);\
            insert into course_list values ('candidate5', 'comp9323', 1.0);\
            insert into course_list values ('candidate5', 'comp9332', 1.0);\
            insert into course_list values ('candidate5', 'comp9517', 1.0);\
            insert into course_list values ('candidate5', 'comp9041', 1.0);\
            insert into course_list values ('candidate5', 'comp9900', 1.0);\
            insert into user_info values ('employer1', 'Google', '123456', 'employer1@gmail.com', 'Unknown', '04/09/1998', '9999999999', 'Sydney', 'employer', 'As a industry leading company, look for candidate who study ML', 'www.google.com.au', 'None');\
            insert into job_info values ('a3312d80-cd61-11e8-8574-4c3275989ef5', '4c3a4ee0-26be-30ff-94a3-d58e0d98299a', 'employer1', 'This is a job that need candidate familiar with machine learning algorithms', 'full_time', 100000, 'Sydney', '{\"responsibility\": [\"Familiar with mainstream machine learning frameworks\"], \"itskill\": [\"Strong web development experience (Java, Scala, Python)\", \"Responsive design experience\"], \"personal_strength\": [\"To be able to work Autonomously\", \"Service oriented and passionate about helping clients\", \"Strong analytical and problem solving skills\", \"Disciplined, organized, punctual and caring attitude\"], \"others\": [\"Career development and advancement will be continuously on offer within this ever growing organisation!\"], \"date\": \"2018-10-13 21:50:30\"}');\
            insert into job_info values ('ee0cb82e-cd61-11e8-b040-4c3275989ef5', '4c3a4ee0-26be-30ff-94a3-d58e0d98299a', 'employer1', 'This is a part time job that welcome students who want to learn machine learning', 'part_time', 30000, 'Sydney', '{\"responsibility\": [\"Familiar with mainstream machine learning frameworks\"], \"itskill\": [\"Strong web development experience (Java, Scala, Python)\", \"Responsive design experience\"], \"personal_strength\": [\"To be able to work Autonomously\", \"Service oriented and passionate about helping clients\", \"Strong analytical and problem solving skills\", \"Disciplined, organized, punctual and caring attitude\"], \"others\": [\"Career development and advancement will be continuously on offer within this ever growing organisation!\"], \"date\": \"2018-10-13 21:50:30\"}');\
            insert into job_info values ('3eef2e48-cd62-11e8-9a1a-4c3275989ef5', '1b8b3d18-dd4c-3948-a570-4e0de39b14dd', 'employer1', 'This is a job that need web developer who familiar with java and python', 'full_time', 60000, 'Sydney', '{\"responsibility\": [\"Significant experience with UI Design and Development\", \"Working on Angular 4 or 5 frameworks\", \"Demonstrated ability (portfolio) in producing high quality web and mobile user interfaces\", \"Proficient in creating interactive wireframes, prototypes, storyboards and userflows\", \"Hands on experience working within Agile project teams\"], \"itskill\": [\"Strong web development experience (Python, Javascript / HTML5, CSS)\", \"Responsive design experience\", \"React / Redux experience\", \"React / Redux experience\"], \"personal_strength\": [\"To be able to work Autonomously\", \"Service oriented and passionate about helping clients\", \"Strong analytical and problem solving skills\", \"Disciplined, organized, punctual and caring attitude\"], \"others\": [\"Career development and advancement will be continuously on offer within this ever growing organisation!\"], \"date\": \"2018-10-13 21:50:30\"}');\
            insert into user_info values ('employer2', 'Amazon', '123456', 'employer2@gmail.com', 'Unknown', '05/07/1994', '7777777777', 'Melbourne', 'employer', 'As a industry leading company, look for backend developer', 'www.amazon.com.au', 'None');\
            insert into job_info values ('8b550dd4-cd62-11e8-b73e-4c3275989ef5', '1b8b3d18-dd4c-3948-a570-4e0de39b14dd', 'employer2', 'This job need a senior frontend developer who familiar with java and javascript', 'full_time', 60000, 'Sydney', '{\"responsibility\": [\"Significant experience with UI Design and Development\", \"Working on Angular 4 or 5 frameworks\", \"Demonstrated ability (portfolio) in producing high quality web and mobile user interfaces\", \"Proficient in creating interactive wireframes, prototypes, storyboards and userflows\", \"Hands on experience working within Agile project teams\"], \"itskill\": [\"Strong web development experience (Javascript / HTML5, CSS)\", \"Responsive design experience\", \"React / Redux experience\", \"React / Redux experience\"], \"personal_strength\": [\"To be able to work Autonomously\", \"Service oriented and passionate about helping clients\", \"Strong analytical and problem solving skills\", \"Disciplined, organized, punctual and caring attitude\"], \"others\": [\"Career development and advancement will be continuously on offer within this ever growing organisation!\"], \"date\": \"2018-10-13 21:50:30\"}');\
            insert into job_info values ('e4b2b408-cd62-11e8-a2dc-4c3275989ef5', '1b8b3d18-dd4c-3948-a570-4e0de39b14dd', 'employer2', 'This job need a senior backend developer who familiar with python and information retrieval', 'full_time', 70000, 'Sydney', '{\"responsibility\": [\"Familiar with mainstream machine learning frameworks\"], \"itskill\": [\"Strong web development experience (Java, Scala, Python)\", \"Responsive design experience\"], \"personal_strength\": [\"To be able to work Autonomously\", \"Service oriented and passionate about helping clients\", \"Strong analytical and problem solving skills\", \"Disciplined, organized, punctual and caring attitude\"], \"others\": [\"Career development and advancement will be continuously on offer within this ever growing organisation!\"], \"date\": \"2018-10-13 21:50:30\"}');\
            insert into job_info values ('ed575474-cd62-11e8-a63c-4c3275989ef5', '1b8b3d18-dd4c-3948-a570-4e0de39b14dd', 'employer2', 'This job need a senior backend developer who familiar with java and javascript', 'full_time', 55000, 'Melbourne', '{\"responsibility\": [\"Significant experience with UI Design and Development\", \"Working on Angular 4 or 5 frameworks\", \"Demonstrated ability (portfolio) in producing high quality web and mobile user interfaces\", \"Proficient in creating interactive wireframes, prototypes, storyboards and userflows\", \"Hands on experience working within Agile project teams\"], \"itskill\": [\"Strong web development experience (Javascript / HTML5, CSS)\", \"Responsive design experience\", \"React / Redux experience\", \"React / Redux experience\"], \"personal_strength\": [\"To be able to work Autonomously\", \"Service oriented and passionate about helping clients\", \"Strong analytical and problem solving skills\", \"Disciplined, organized, punctual and caring attitude\"], \"others\": [\"Career development and advancement will be continuously on offer within this ever growing organisation!\"], \"date\": \"2018-10-13 21:50:30\"}');\
            insert into job_info values ('f5483ebe-cd62-11e8-9b83-4c3275989ef5', '1b8b3d18-dd4c-3948-a570-4e0de39b14dd', 'employer2', 'This job need a senior frontend developer who familiar with java and javascript', 'full_time', 60000, 'Melbourne', '{\"responsibility\": [\"Significant experience with UI Design and Development\", \"Working on Angular 4 or 5 frameworks\", \"Demonstrated ability (portfolio) in producing high quality web and mobile user interfaces\", \"Proficient in creating interactive wireframes, prototypes, storyboards and userflows\", \"Hands on experience working within Agile project teams\"], \"itskill\": [\"Strong web development experience (Javascript / HTML5, CSS)\", \"Responsive design experience\", \"React / Redux experience\", \"React / Redux experience\"], \"personal_strength\": [\"To be able to work Autonomously\", \"Service oriented and passionate about helping clients\", \"Strong analytical and problem solving skills\", \"Disciplined, organized, punctual and caring attitude\"], \"others\": [\"Career development and advancement will be continuously on offer within this ever growing organisation!\"], \"date\": \"2018-10-13 21:50:30\"}');\
            insert into user_info values ('instructor1','UNSW','123456','instructor1@gmail.com', 'Unknown', '01/03/1949','6666666666','Sydney','instructor', 'UNSW Sydney account','www.unsw.edu.au','None');\
            insert into save_list values ('candidate1', 'e4b2b408-cd62-11e8-a2dc-4c3275989ef5');\
            insert into saved_user values ('employer1', 'candidate1');\
            insert into saved_user values ('employer1', 'candidate2');\
            insert into saved_user values ('instructor1', 'candidate1');\
            insert into saved_user values ('instructor1', 'candidate2');\
            insert into save_list values ('instructor1', 'e4b2b408-cd62-11e8-a2dc-4c3275989ef5');\
            insert into save_list values ('instructor1', 'a3312d80-cd61-11e8-8574-4c3275989ef5');\
            insert into enrolment values ('ae750864-cdd5-11e8-ac21-4c3275989ef5', 'candidate2', 'employer1', 'a3312d80-cd61-11e8-8574-4c3275989ef5');\
            insert into enrolment values ('2468789e-ced0-11e8-a89f-4c3275989ef5', 'candidate5', 'employer1', 'a3312d80-cd61-11e8-8574-4c3275989ef5');\
            insert into enrolment values ('f8f99228-cdd4-11e8-b29f-4c3275989ef5', 'candidate1', 'employer2', 'e4b2b408-cd62-11e8-a2dc-4c3275989ef5');\
            insert into interviews values ('4f5cf110-cdd6-11e8-a3d1-4c3275989ef5', 'a3312d80-cd61-11e8-8574-4c3275989ef5', 'candidate1', 'employer1', '22/10/2018 15:00', '9-13 Hay St, Haymarket NSW 2000', '53e3baf0-cdd3-11e8-b600-4c3275989ef5', 1);\
            insert into interviews values ('48fcd970-ced0-11e8-9b9c-4c3275989ef5', 'ee0cb82e-cd61-11e8-b040-4c3275989ef5', 'candidate2', 'employer1', '22/10/2018 15:30', '9-13 Hay St, Haymarket NSW 2000', '7413af9c-cdd3-11e8-b71a-4c3275989ef5', 1);\
            insert into interviews values ('4f8cbeb8-ced0-11e8-a092-4c3275989ef5', 'a3312d80-cd61-11e8-8574-4c3275989ef5', 'candidate3', 'employer1', '22/10/2018 16:00', '9-13 Hay St, Haymarket NSW 2000', '827f3f10-cdd3-11e8-a548-4c3275989ef5', 1);\
            insert into interviews values ('5586348c-ced0-11e8-973e-4c3275989ef5', 'a3312d80-cd61-11e8-8574-4c3275989ef5', 'candidate4', 'employer1', '22/10/2018 10:00', '9-13 Hay St, Haymarket NSW 2000', '2d4cbd28-cdd4-11e8-a778-4c3275989ef5', 1);\
            insert into interviews values ('dbe24338-cdd6-11e8-96a9-4c3275989ef5', '8b550dd4-cd62-11e8-b73e-4c3275989ef5', 'candidate5', 'employer2', '22/10/2018 15:00', '9-13 Hay St, Haymarket NSW 2000', '529520de-cdd4-11e8-b7b2-4c3275989ef5', 1);"
    database_object.update(sql)
    database_object.close()


if __name__ == "__main__":
    create_test_data()
