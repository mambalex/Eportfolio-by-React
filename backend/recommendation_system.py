import spacy
import uuid
import threading
import database_lib


class Description_process():

    nlp = None
    description = str()
    doc = None
    tokens = list()
    targets = list()
    filter_targets = list()
    filter_targets_list = list()
    exist_targets = list()
    userful_pos = ["PROPN", 'NOUN', 'ADJ']
    __target_list = list()
    __target_dict = dict()

    user_id = None
    job_info_id = None
    working_exp_uuid = None

    def __init__(self):
        self.nlp = spacy.load('en_core_web_sm')
        self.__get_all_targets()

    def load_description_from_user_info(self, user_id):
        self.user_id = user_id
        self.job_info_id = None
        self.working_exp_uuid = None
        self.__load_description(
            table="user_info", field="username", item_id=self.user_id)

    def load_description_from_job_info(self, job_info_id):
        self.job_info_id = job_info_id
        self.user_id = None
        self.working_exp_uuid = None
        self.__load_description(
            table="job_info", field="job_info_id", item_id=self.job_info_id)

    def __load_description_from_working_exp(self, working_exp_uuid):
        self.working_exp_uuid = working_exp_uuid
        self.user_id = None
        self.job_info_id = None
        self.__load_description(
            table="working_exp", field="working_exp_uuid", item_id=self.working_exp_uuid)

    def set_description(self, description):
        self.description = description

    def __load_description(self, table, field, item_id):
        dbconfig = {"dbname": "comp9900"}
        database_object = database_lib.Database_object(dbconfig)
        database_object.open()
        sql = "select description from {} where {} = '{}';".format(
            table, field, item_id)
        result = database_object.search(sql)
        database_object.close()
        self.description = result[0][0]

    def processing(self):
        self.doc = self.nlp(self.description)
        for item in self.doc:
            temp_token = {}
            temp_token["token"] = item
            temp_token["lemmatize"] = item.lemma_
            temp_token["pos"] = item.pos_
            self.tokens.append(temp_token)

    def filter_token(self):
        for token in self.tokens:
            if token["pos"] in self.userful_pos:
                self.targets.append(token)
        for target in self.targets:
            if target["lemmatize"] not in self.filter_targets_list:
                self.filter_targets.append(target)
                self.filter_targets_list.append(target["lemmatize"])
            if target["lemmatize"] not in self.__target_list:
                target_uuid = self.__save_targets(target["lemmatize"])
                self.__target_list.append(target["lemmatize"])
                self.__target_dict[target["lemmatize"]] = {
                    "target_uuid": target_uuid, "name": target["lemmatize"], "type": 0}

    def save_to_database(self):
        if self.user_id is not None:
            self.__get_exist_targets()
            self.__save_to_database(self.user_id)
        elif self.job_info_id is not None:
            self.__get_exist_targets()
            self.__save_to_database(self.job_info_id)
        elif self.working_exp_uuid is not None:
            self.__get_exist_targets()
            self.__save_to_database(self.working_exp_uuid)

    def __save_to_database(self, item_id):
        dbconfig = {"dbname": "comp9900"}
        database_object = database_lib.Database_object(dbconfig)
        database_object.open()
        for target in self.filter_targets:
            temp_target = self.__target_dict[target["lemmatize"]]
            if temp_target["target_uuid"] not in self.exist_targets:
                sql = "insert into target_list values ('{}', '{}');".format(
                    item_id, temp_target["target_uuid"])
                database_object.update(sql)
        database_object.close()

    def __get_all_targets(self):
        dbconfig = {"dbname": "comp9900"}
        database_object = database_lib.Database_object(dbconfig)
        database_object.open()
        sql = "select * from targets;"
        result = database_object.search(sql)
        database_object.close()
        keys_list = ["target_uuid", "name", "type"]
        result = self.__convert_result_to_dict(result, keys_list)
        for target in result:
            self.__target_dict[target["name"]] = target
        self.__target_list = list(self.__target_dict.keys())

    def __get_exist_targets(self):
        if self.user_id is not None:
            self.__load_exist_targets(self.user_id)
        elif self.job_info_id is not None:
            self.__load_exist_targets(self.job_info_id)
        elif self.working_exp_uuid is not None:
            self.__load_exist_targets(self.working_exp_uuid)

    def __load_exist_targets(self, item_id):
        dbconfig = {"dbname": "comp9900"}
        database_object = database_lib.Database_object(dbconfig)
        database_object.open()
        sql = "select * from target_list where item_id = '{}';".format(item_id)
        result = database_object.search(sql)
        database_object.close()
        key_list = ["item_id", "target_uuid"]
        result = self.__convert_result_to_dict(result, key_list)
        for target in result:
            self.exist_targets.append(target["target_uuid"])

    def __save_targets(self, target_name, target_type=0):
        target_uuid = uuid.uuid1()
        dbconfig = {"dbname": "comp9900"}
        database_object = database_lib.Database_object(dbconfig)
        database_object.open()
        sql = "insert into targets values ('{}', '{}', {});".format(
            target_uuid, target_name, target_type)
        database_object.update(sql)
        database_object.close()
        return target_uuid

    def clear_exist_target(self):
        if self.user_id is not None:
            self.__clear_exist_target_list(self.user_id)
        elif self.job_info_id is not None:
            self.__clear_exist_target_list(self.job_info_id)
        elif self.working_exp_uuid is not None:
            self.__clear_exist_target_list(self.working_exp_uuid)

    def __clear_exist_target_list(self, item_id):
        dbconfig = {"dbname": "comp9900"}
        database_object = database_lib.Database_object(dbconfig)
        database_object.open()
        sql = "delete from target_list where item_id = '{}';".format(item_id)
        database_object.update(sql)
        database_object.close()

    def __convert_result_to_dict(self, temp_result, key_list):
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

    def __str__(self):
        return str(self.tokens)


class Recommendation_system():

    user_id = None
    job_info_id = None

    recommendation_num = 15
    scale_zoom = 25

    def __init__(self):
        pass

    def recommend_for_user(self, user_id):
        self.user_id = user_id
        self.job_info_id = None

    def recommend_for_job(self, job_info_id):
        self.job_info_id = job_info_id
        self.user_id = None

    def get_recommend_list(self):
        if self.user_id is not None:
            return self.__get_user_recommend_list()
        elif self.job_info_id is not None:
            return self.__get_job_recommend_list()

    def __get_user_recommend_list(self):
        dbconfig = {"dbname": "comp9900"}
        database_object = database_lib.Database_object(dbconfig)
        database_object.open()
        sql = "select r.item_id, r.base_mark, r.referrer from recommend r where r.master_id = '{}' order by r.base_mark desc;".format(self.user_id)
        result = database_object.search(sql)
        key_list = ["job_info_id", "mark", "referrer"]
        result = self.__convert_result_to_dict(result, key_list)
        for job_info in result:
            sql = "select j_t.job_name, j_i.description, j_i.address from job_info j_i, job_title j_t where j_i.job_info_id = '{}' and j_i.job_id = j_t.job_id;".format(job_info["job_info_id"])
            temp_result = database_object.search(sql)
            key_list = ["job_name", "description", "address"]
            temp_result = self.__convert_result_to_dict(temp_result, key_list)
            if temp_result==[]:
                job_info.update([])
            else:
                job_info.update(temp_result[0])
        database_object.close()
        return result

    def __get_job_recommend_list(self):
        dbconfig = {"dbname": "comp9900"}
        database_object = database_lib.Database_object(dbconfig)
        database_object.open()
        sql = "select r.master_id, r.item_id, r.base_mark, r.bonus, r.referrer, r.base_mark+r.bonus as final_mark, u_i.uname, u_i.description from recommend r, user_info u_i where r.item_id = u_i.username and r.master_id = '{}';".format(
            self.job_info_id)
        result = database_object.search(sql)
        database_object.close()
        key_list = ["job_info_id", "username", "base_mark",
                    "bonus", "referrer", "final_mark", "name", "description"]
        result = self.__convert_result_to_dict(result, key_list)
        return result

    def refresh_recommendation(self):
        if self.user_id is not None:
            self.__refresh_recommendation_for_user()
        elif self.job_info_id is not None:
            self.__refresh_recommendation_for_job_info()
        else:
            pass

    def first_processing_description(self):
        if self.user_id is not None:
            pd_thread = threading.Thread(
                target=self.__first_processing_user_description(), name="pd_thread")
            pd_thread.start()
        elif self.job_info_id is not None:
            pd_thread = threading.Thread(
                target=self.__first_processing_job_info_description(), name="pd_thread")
            pd_thread.start()
        else:
            pass

    def renew_description(self):
        if self.user_id is not None:
            pd_thread = threading.Thread(
                target=self.__renew_user_description(), name="pd_thread")
            pd_thread.start()
        elif self.job_info_id is not None:
            pd_thread = threading.Thread(
                target=self.__renew_job_info_description(), name="pd_thread")
            pd_thread.start()
        else:
            pass

    def __first_processing_user_description(self):
        dp = Description_process()
        dp.load_description_from_user_info(self.user_id)
        dp.processing()
        dp.filter_token()
        dp.save_to_database()

    def __first_processing_job_info_description(self):
        dp = Description_process()
        dp.load_description_from_job_info(self.job_info_id)
        dp.processing()
        dp.filter_token()
        dp.save_to_database()

    def __renew_user_description(self):
        dp = Description_process()
        dp.load_description_from_user_info(self.user_id)
        dp.clear_exist_target()
        dp.processing()
        dp.filter_token()
        dp.save_to_database()

    def __renew_job_info_description(self):
        dp = Description_process()
        dp.load_description_from_job_info(self.job_info_id)
        dp.clear_exist_target()
        dp.processing()
        dp.filter_token()
        dp.save_to_database()

    def __refresh_recommendation_for_user(self):
        dbconfig = {"dbname": "comp9900"}
        database_object = database_lib.Database_object(dbconfig)
        database_object.open()
        sql = "select j_i.job_info_id, count(*) from job_title j_t, job_and_skill j_s, \
        skills s, course_and_skill c_s, course_list c_l, user_info u_i, job_info j_i \
        where j_i.job_id = j_t.job_id and j_t.job_id = j_s.job_id and j_s.skill_id = \
        s.skill_id and s.skill_id = c_s.skill_id and c_s.code = c_l.code and c_l.student_id \
        = u_i.username and u_i.username = '{}' group by j_i.job_info_id \
        order by count desc limit {};".format(self.user_id, self.recommendation_num)
        candidate = database_object.search(sql)
        key_list = ["job_info_id", "count"]
        candidate = self.__convert_result_to_dict(candidate, key_list)

        temp_mark_list = [item["count"] for item in candidate]
        if len(temp_mark_list) == 0:
            return
        max_x = max(temp_mark_list)
        min_x = min(temp_mark_list)

        exist_recommend = self.__get_user_recommend_list()
        exist_recommend = [job_info['job_info_id'] for job_info in exist_recommend]

        final_mark = dict()
        candidate_target_list = dict()
        for job_info in candidate:
            job_info_uuid = job_info["job_info_id"]
            if job_info_uuid not in exist_recommend:
                temp_dict = self.__get_job_info_targets(job_info_uuid)
                candidate_target_list.update(temp_dict)
                final_mark[job_info_uuid] = self.__scale(
                    job_info["count"], min_x, max_x)
            else:
                candidate.remove(job_info)

        user_targets = self.__get_user_targets(self.user_id)
        user_targets = user_targets[self.user_id]

        mark_list = dict()
        for job_info_uuid in candidate_target_list.keys():
            temp_job_target_list = candidate_target_list[job_info_uuid]
            temp_mark = 0
            for target in temp_job_target_list:
                if target in user_targets:
                    temp_mark = temp_mark + 1
            mark_list[job_info_uuid] = temp_mark

        temp_mark_list = [mark_list.values()]
        if len(temp_mark_list) == 0:
            return
        max_x = max(temp_mark_list)
        min_x = min(temp_mark_list)

        for job_info_uuid in mark_list.keys():
            final_mark[job_info_uuid] = final_mark[job_info_uuid] + \
                self.__scale(mark_list[job_info_uuid], min_x, max_x)

        for job_info_uuid in final_mark.keys():
            sql = "insert into recommend values ('{}', '{}', {}, {}, '{}', '{}', 0);".format(
                self.user_id, job_info_uuid, final_mark[job_info_uuid], 0, "System", "System")
            database_object.update(sql)

        database_object.close()

    def __refresh_recommendation_for_job_info(self):
        dbconfig = {"dbname": "comp9900"}
        database_object = database_lib.Database_object(dbconfig)
        database_object.open()
        sql = "select u_i.username, count(*) from job_title j_t, job_and_skill j_s, \
        skills s, course_and_skill c_s, course_list c_l, user_info u_i, job_info j_i \
        where j_i.job_id = j_t.job_id and j_t.job_id = j_s.job_id and j_s.skill_id = \
        s.skill_id and s.skill_id = c_s.skill_id and c_s.code = c_l.code and c_l.student_id \
        = u_i.username and j_i.job_info_id = '{}' group by u_i.username \
        order by count desc limit {};".format(self.job_info_id, self.recommendation_num)
        candidate = database_object.search(sql)
        key_list = ["username", "count"]
        candidate = self.__convert_result_to_dict(candidate, key_list)

        temp_mark_list = [item["count"] for item in candidate]
        if len(temp_mark_list) == 0:
            return
        max_x = max(temp_mark_list)
        min_x = min(temp_mark_list)

        exist_recommend = self.__get_job_recommend_list()
        exist_recommend = [user['username'] for user in exist_recommend]

        final_mark = dict()
        candidate_target_list = dict()
        for user in candidate:
            username = user["username"]
            if username not in exist_recommend:
                temp_dict = self.__get_user_targets(username)
                candidate_target_list.update(temp_dict)
                final_mark[username] = self.__scale(user["count"], min_x, max_x)
            else:
                candidate.remove(user)

        job_info_targets = self.__get_job_info_targets(self.job_info_id)
        job_info_targets = job_info_targets[self.job_info_id]

        mark_list = dict()
        for username in candidate_target_list.keys():
            temp_job_target_list = candidate_target_list[username]
            temp_mark = 0
            for target in temp_job_target_list:
                if target in job_info_targets:
                    temp_mark = temp_mark + 1
            mark_list[username] = temp_mark

        temp_mark_list = [mark_list.values()]
        if len(temp_mark_list) == 0:
            return
        max_x = max(temp_mark_list)
        min_x = min(temp_mark_list)

        for username in mark_list.keys():
            final_mark[username] = final_mark[username] + \
                self.__scale(mark_list[username], min_x, max_x)

        for username in final_mark.keys():
            sql = "insert into recommend values ('{}', '{}', {}, {}, '{}', '{}', 1);".format(
                self.job_info_id, username, final_mark[username], 0, "System", "System")
            database_object.update(sql)

        database_object.close()

    def __get_user_targets(self, username):
        result = dict()
        temp_result = self.__load_exist_targets(username)
        temp_list = [target["target_uuid"] for target in temp_result]
        result[username] = temp_list
        return result

    def __get_job_info_targets(self, job_info_uuid):
        result = dict()
        temp_result = self.__load_exist_targets(job_info_uuid)
        temp_list = [target["target_uuid"] for target in temp_result]
        result[job_info_uuid] = temp_list
        return result

    def __load_exist_targets(self, item_id):
        dbconfig = {"dbname": "comp9900"}
        database_object = database_lib.Database_object(dbconfig)
        database_object.open()
        sql = "select * from target_list where item_id = '{}';".format(item_id)
        result = database_object.search(sql)
        database_object.close()
        key_list = ["item_id", "target_uuid"]
        result = self.__convert_result_to_dict(result, key_list)
        return result

    def __convert_result_to_dict(self, temp_result, key_list):
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

    def __scale(self, x, min_x, max_x):
        if min_x == max_x:
            return self.scale_zoom
        else:
            return round((float(x) - float(min_x)) / (float(max_x) - float(min_x)) * self.scale_zoom)


def set_recommend_bonus(job_info_id, user_id, bonus_mark):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "update recommend set bonus = {} where master_id = '{}' and item_id = '{}';".format(
        bonus_mark, job_info_id, user_id)
    database_object.update(sql)
    database_object.close()

def set_recommendation_for_job(job_info_id, user_id, referrer_name, referrer_username):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into recommend values ('{}', '{}', {}, {}, '{}', '{}', 1);".format(job_info_id, user_id, 10, 0, referrer_name, referrer_username)
    database_object.update(sql)
    sql = "insert into recommend values ('{}', '{}', {}, {}, '{}', '{}', 0);".format(user_id, job_info_id, 10, 0, referrer_name, referrer_username)
    database_object.update(sql)
    database_object.close()

def set_recommendation_for_user(user_id, job_info_id, referrer_name, referrer_username):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "insert into recommend values ('{}', '{}', {}, {}, '{}', '{}', 0);".format(user_id, job_info_id, 0, 0, referrer_name, referrer_username)
    database_object.update(sql)
    database_object.close()

def referrer_recommend_list(username):
    dbconfig = {"dbname": "comp9900"}
    database_object = database_lib.Database_object(dbconfig)
    database_object.open()
    sql = "select * from recommend where ref_username = '{}';".format(username)
    result = database_object.search(sql)
    database_object.close()
    connection_list = list()
    for item in result:
        temp_result = {}
        if item[6] == 0:
            temp_result['student_id'] = item[0]
            temp_result['job_info_id'] = item[1]
            temp_result["mark"] = item[2]
        else:
            temp_result['student_id'] = item[1]
            temp_result['job_info_id'] = item[0]
            temp_result['base_mark'] = item[2]
            temp_result["bonus"] = item[3]
            temp_result["final_mark"] = item[2] + item[3]
        temp_result["referrer"] = item[4]
        connection_list.append(temp_result)
    return connection_list


if __name__ == "__main__":
    pass
