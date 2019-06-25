import os
import re
import json
import uuid
import time
import jwt
import database as db
import recommendation_system as rs
import datetime

from flask import Flask, g, jsonify, make_response, request, abort, url_for, render_template, send_from_directory
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth

from passlib.apps import custom_app_context
from werkzeug.utils import secure_filename

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

UPLOAD_FOLDER = 'static/img'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


CORS(app, resources=r'/*')

app.config['SECRET_KEY'] = 'AAAAB3NzaC1yc2EAAAABJQAAAQEA23YKNqKjwn8uHvw/cdkBmYBqVKVKjJUPWWAK\
MDqJ9kDnGuc+y788UVEpD6gNRKpHbDe7pB4SjLoYppPYYwmJPrh/Qz42CgfZ8JVm\
+I8sPipRCy/mSVGf3nBv5tcZYU6+9fJ0u2KSURvKIKpg1yeqx59xSus7KyvBzQfs\
f8KSSf9PBl/yWQ+r5qVq++PsPZXb5qapKbvGCVV9isbw/upKvGEnpwTO61ObwSmG\
leby8d0e8YNlrqA1ErrdoZXnWhCwPIxBbwsy8/88sFLdSBhf8MsaVbtrvNYxXLRZ\
xPFCSqgCCpE5h7mcyedRmTAZ3g/Jrn2dim4/Dgb4mFNpK970Xw=='

app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_RECORD_QUERIES'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
                                        os.path.join(basedir, 'data.sqlite')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

auth = HTTPBasicAuth()
CSRF_ENABLED = True
app.debug = True


############################                Start Classes               ###############################

class User:
    user_id = None
    password = None

    name = None
    email = None
    gender = None
    dob = None
    phone = None
    location = None
    role = None
    description = None
    website_link = None
    photo = None

    def __init__(self, user_profile=None):
        if user_profile is not None:
            self.load_from_dict(user_profile)
            self.__load_passwd(user_profile['passwd'])

    def load_from_dict(self, user_profile):
        self.user_id = user_profile['username']
        self.name = user_profile.get('name', self.user_id)
        self.email = user_profile.get('email')
        self.gender = user_profile.get('gender')
        self.dob = user_profile.get('dob')
        self.phone = user_profile.get('phone')
        self.location = user_profile.get('location')
        self.role = user_profile.get('role')
        self.description = user_profile.get('description')
        self.website_link = user_profile.get('link')
        self.photo = user_profile.get('photo')

    def load_from_database(self, username):
        user_profile = db.load_user(username)
        self.__init__(user_profile[0])

    def __load_passwd(self, passwd):
        self.hash_password(db.get_user_password(self.user_id))

    def hash_password(self, password):
        self.password = custom_app_context.encrypt(password)

    def verify_password(self, password):
        return custom_app_context.verify(password, self.password)

    def get_user_profile(self):
        result = dict()
        result['username'] = self.user_id
        result['name'] = self.name
        result['email'] = self.email
        result['gender'] = self.gender
        result['dob'] = self.dob
        result['phone'] = self.phone
        result['location'] = self.location
        result['role'] = self.role
        result['description'] = self.description
        result['link'] = self.website_link
        result['photo'] = self.photo
        return result

    def generate_auth_token(self, expiration=6000):
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=expiration),
            'iat': datetime.datetime.utcnow(),
            'iss': 'COMP9900_TEAM488',
            'data': {
                'id': self.user_id,
                'role': self.role
            }
        }
        return jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')

    @staticmethod
    def verify_auth_token(token):
        try:
            payload = jwt.decode(
                token, app.config['SECRET_KEY'], algorithms=['HS256'])
            data = payload.get('data')
            if (data is None or data.get('id') is None):
                raise jwt.InvalidTokenError
        except jwt.ExpiredSignatureError:
            return None  # valid token, but expired
        except jwt.InvalidTokenError:
            return None  # invalid token
        user = User(db.load_user(data['id'])[0])
        return user


############################                End Classes               ###############################

############################                Verify user               ###############################

@auth.verify_password
def verify_password(name_or_token, password):
    if not name_or_token:
        return False
    name_or_token = re.sub(r'^"|"$', '', name_or_token)
    user = User.verify_auth_token(name_or_token)
    if user is None:
        if not db.check_username(name_or_token):
            user = User(db.load_user(name_or_token)[0])
        else:
            return False
        if not user.verify_password(password):
            return False
    g.user = user
    return True


############################                Start API               ###############################


# Start test API
@app.route('/api/test', methods=['GET'])
def test():
    return jsonify([{'id': 'test1', 'name': 'test1'}, {'id': 'test2', 'name': 'test2'}])


# End test API

@app.route('/')
def index():
    return render_template('main-page.html')


@app.route('/login.html')
def login_sigup():
    return render_template('login.html')


@app.route('/candidate/<username>')
def student_route(username):
    return render_template('student.html')


@app.route('/employer/<username>')
def employer_route(username):
    return render_template('employer.html')


@app.route('/instructor/<username>')
def instructor_route(username):
    return render_template('instructor.html')


@app.route('/profile/<username>')
def profile_route(username):
    return render_template('profile.html')


@app.route('/profile')
def profile_default_route():
    return render_template('profile.html')

@app.route('/<username>/search')
def user_search_route(username):
    return render_template('main-page.html')


@app.route('/search')
def main_page_route():
    return render_template('main-page.html')


@app.route('/jobs/<keyword>')
def result_job_route(keyword):
    return render_template('result.html')


@app.route('/candidates/<can>')
def result_can_route(can):
    return render_template('result.html')


@app.route('/temp/<string:filename>', methods=['GET'])
def get_file(filename):
    if filename is None:
        abort(400)
    else:
        file_dir = os.path.join(basedir, app.config['UPLOAD_FOLDER'])
        file_data = open(os.path.join(file_dir, filename), "rb").read()
        response = make_response(file_data)
        response.headers['Content-Type'] = 'image/jpeg'
        return response


# Start user part API

# Check username
@app.route('/api/check_username', methods=['POST'])
def check_username():
    username = request.form.get('username', type=str)
    if username is None:
        abort(400)
    else:
        check_result = db.check_username(username)
        if check_result:
            return jsonify({'code': 200, 'msg': 'This username could be used.', 'data': 1})
        else:
            return jsonify({'code': 200, 'msg': 'This username could not be used.', 'data': 0})


# Create user
@app.route('/api/create_user', methods=['POST'])
def create_user():
    username = request.form.get('username', type=str)
    passwd = request.form.get('passwd', type=str)
    email = request.form.get('email', type=str)
    role = request.form.get('role', type=str)
    print(role)
    if username is None or passwd is None:
        return jsonify({'code': 400, 'msg': 'Username and password are needed'})
    if role == '':
        return jsonify({'code': 400, 'msg': 'User type is needed'})
    if not db.check_username(username):
        return jsonify({'code': 400, 'msg': 'Username already exists'})
    user_profile = {'username': username,
                    'password': passwd, 'email': email, 'role': role}
    db.create_user(user_profile)
    user = User()
    user.load_from_database(username)
    db.add_personal_skill(user.user_id)
    token = user.generate_auth_token()
    return jsonify({'code': 201, 'msg': 'Create user success', 'username': user.user_id, 'role': user.role,
                    'token': token.decode('ascii')})


# Login
@app.route('/api/login', methods=['POST'])
def login():
    username = request.form.get('username', type=str)
    passwd = request.form.get('passwd', type=str)
    print(username,passwd)
    if username is None:
        return jsonify({'code': 400, 'msg': 'Invalid username'})
    if passwd is None:
        return jsonify({'code': 400, 'msg': 'Invalid password'})

    if not db.check_username(username):
        user = User()
        user.load_from_database(username)
    else:
        return jsonify({'code': 400, 'msg': 'No such user'})
    if not user.verify_password(passwd):
        return jsonify({'code': 400, 'msg': 'Wrong password'})
    g.user = user
    token = g.user.generate_auth_token()
    role = g.user.role
    userId = g.user.user_id
    return jsonify({'code': 200, 'token': token.decode('ascii'), 'role': role, 'userId':userId})


# Get user profile
@app.route('/api/get_self_profile', methods=['POST'])
@auth.login_required
def get_self_profile():
    user_profile = g.user.get_user_profile()
    return jsonify({'code': 200, 'msg': 'Get self profile success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': user_profile})


# Change user setting part

# Change user password
@app.route('/api/change_passwd', methods=['POST'])
@auth.login_required
def change_user_passwd():
    new_passwd = request.form.get('new_passwd', type=str)
    db.change_user_password(g.user.user_id, new_passwd)
    return jsonify({'code': 200, 'msg': 'Change success', 'username': g.user.user_id, 'role': g.user.role})


# Change user name
@app.route('/api/change_name', methods=['POST'])
@auth.login_required
def change_user_name():
    new_name = request.form.get('new_name', type=str)
    db.change_user_name(g.user.user_id, new_name)
    return jsonify({'code': 200, 'msg': 'Change success', 'username': g.user.user_id, 'role': g.user.role})


# Change user email
@app.route('/api/change_email', methods=['POST'])
@auth.login_required
def change_user_email():
    new_email = request.form.get('new_email', type=str)
    db.change_user_email(g.user.user_id, new_email)
    return jsonify({'code': 200, 'msg': 'Change success', 'username': g.user.user_id, 'role': g.user.role})


# Change user phone
@app.route('/api/change_phone', methods=['POST'])
@auth.login_required
def change_user_phone():
    new_phone = request.form.get('new_phone', type=str)
    db.change_user_phone(g.user.user_id, new_phone)
    return jsonify({'code': 200, 'msg': 'Change success', 'username': g.user.user_id, 'role': g.user.role})


# Change user role
@app.route('/api/change_role', methods=['POST'])
@auth.login_required
def change_user_role():
    new_role = request.form.get('new_role', type=str)
    db.change_user_role(g.user.user_id, new_role)
    return jsonify({'code': 200, 'msg': 'Change success', 'username': g.user.user_id, 'role': g.user.role})


# Change user link
@app.route('/api/change_link', methods=['POST'])
@auth.login_required
def change_user_link():
    new_link = request.form.get('new_link', type=str)
    db.change_user_link(g.user.user_id, new_link)
    return jsonify({'code': 200, 'msg': 'Change success', 'username': g.user.user_id, 'role': g.user.role})


# Change user photo
@app.route('/api/change_photo', methods=['POST'], strict_slashes=False)
@auth.login_required
def change_user_photo():
    file_dir = os.path.join(basedir, app.config['UPLOAD_FOLDER'])
    if not os.path.exists(file_dir):
        os.makedirs(file_dir)
    file_to_upload = request.files['photo']
    if file_to_upload and allowed_file(file_to_upload.filename):
        filename = secure_filename(file_to_upload.filename)
        ext = filename.rsplit('.', 1)[1].lower()
        unix_time = int(time.time())
        new_filename = str(unix_time) + '.' + ext
        file_address = os.path.join(file_dir, new_filename)
        file_to_upload.save(file_address)
        db.change_user_photo(g.user.user_id, file_address)
    return jsonify({'code': 200, 'msg': 'Change success', 'username': g.user.user_id, 'role': g.user.role})


# Change user location
@app.route('/api/change_location', methods=['POST'])
@auth.login_required
def change_user_location():
    new_location = request.form.get('new_location', type=str)
    db.change_user_location(g.user.user_id, new_location)
    return jsonify({'code': 200, 'msg': 'Change success', 'username': g.user.user_id, 'role': g.user.role})


# Change user description
@app.route('/api/change_description', methods=['POST'])
@auth.login_required
def change_user_description():
    new_description = request.form.get('new_description', type=str)
    db.change_user_description(g.user.user_id, new_description)
    recommendation_system = rs.Recommendation_system()
    recommendation_system.recommend_for_user(g.user.user_id)
    recommendation_system.renew_description()
    return jsonify({'code': 200, 'msg': 'Change success', 'username': g.user.user_id, 'role': g.user.role})


# Update user profile
@app.route('/api/update_user_profile', methods=['POST'])
@auth.login_required
def update_user_profile():
    new_name = request.form.get('name', type=str)
    new_dob = request.form.get('dob', type=str)
    new_gender = request.form.get('gender', type=str)
    new_email = request.form.get('email', type=str)
    new_passwd = request.form.get('passwd', type=str)
    print(new_name, new_dob, new_gender, new_email, new_passwd)
    if new_name != g.user.name:
        db.change_user_name(g.user.user_id, new_name)
    if new_dob != g.user.dob:
        db.change_user_dob(g.user.user_id, new_dob)
    if new_gender != g.user.gender:
        db.change_user_gender(g.user.user_id, new_gender)
    if new_email != g.user.email:
        db.change_user_email(g.user.user_id, new_email)
    if not g.user.verify_password(new_passwd) and len(new_passwd) != 0:
        db.change_user_password(g.user.user_id, new_passwd)
    return jsonify({'code': 200, 'msg': 'Update profile success', 'username': g.user.user_id, 'role': g.user.role})


# End user share part

# Student part

# Start education experience part

# Add education experience
@app.route('/api/add_edu_experience', methods=['POST'])
@auth.login_required
def add_edu_experience():
    education_exp_uuid = uuid.uuid1()
    student_id = g.user.user_id
    major = request.form.get('major', type=str)
    university = request.form.get('university', type=str)
    degree = request.form.get('degree', type=str)
    time_during = request.form.get('time_during', type=str)
    db.create_education_exp(education_exp_uuid, student_id,
                            major, university, degree, time_during)
    return jsonify(
        {'code': 200, 'msg': 'Add education experience success', 'username': g.user.user_id, 'role': g.user.role})


# Get self education experience
@app.route('/api/get_self_edu_exp', methods=['POST'])
@auth.login_required
def get_self_edu_experience():
    edu_experience = db.get_education_exp(g.user.user_id)
    return jsonify(
        {'code': 200, 'msg': 'Get education experience success', 'username': g.user.user_id, 'role': g.user.role,
         'data': edu_experience})


# Get anyone education experience
@app.route('/api/get_anyone_edu_exp', methods=['POST'])
@auth.login_required
def get_anyone_edu_experience():
    student_id = request.form.get('student_id', type=str)
    edu_experience = db.get_education_exp(student_id)
    return jsonify(
        {'code': 200, 'msg': 'Get education experience success', 'username': g.user.user_id, 'role': g.user.role,
         'data': edu_experience})


# Change education experience part

# Change education experience major
@app.route('/api/change_major', methods=['POST'])
@auth.login_required
def change_edu_major():
    education_exp_uuid = request.form.get('education_exp_uuid', type=str)
    new_major = request.form.get('new_major', type=str)
    db.change_major(education_exp_uuid, new_major)
    return jsonify(
        {'code': 200, 'msg': 'Change education experience success', 'username': g.user.user_id, 'role': g.user.role})


# Change education experience university
@app.route('/api/change_university', methods=['POST'])
@auth.login_required
def change_edu_university():
    education_exp_uuid = request.form.get('education_exp_uuid', type=str)
    new_university = request.form.get('new_university', type=str)
    db.change_university(education_exp_uuid, new_university)
    return jsonify(
        {'code': 200, 'msg': 'Change education experience success', 'username': g.user.user_id, 'role': g.user.role})


# Change education experience degree
@app.route('/api/change_degree', methods=['POST'])
@auth.login_required
def change_edu_degree():
    education_exp_uuid = request.form.get('education_exp_uuid', type=str)
    new_degree = request.form.get('new_degree', type=str)
    db.change_degree(education_exp_uuid, new_degree)
    return jsonify(
        {'code': 200, 'msg': 'Change education experience success', 'username': g.user.user_id, 'role': g.user.role})


# Delete education experience
@app.route('/api/delete_edu_experience', methods=['POST'])
@auth.login_required
def delete_education_exp():
    education_exp_uuid = request.form.get('education_exp_uuid', type=str)
    db.delete_education_exp(education_exp_uuid)
    return jsonify(
        {'code': 200, 'msg': 'Delete education experience success', 'username': g.user.user_id, 'role': g.user.role})


# End education experience part

# Start working experience part

# Add working experience
# @app.route('/api/create_work_experience', methods=['POST'])
# @auth.login_required
# def create_working_exp():
#     working_exp_uuid = uuid.uuid1()
#     user_id = g.user.user_id
#     name = request.form.get('name', type=str)
#     description = request.form.get('description', type=str)
#     website_link = request.form.get('link', type=str)
#     techs = request.form.get('techs', type=str)
#     description = description + '%|split|%' + techs
#     exp_type = request.form.get('exp_type', type=int)
#     db.create_working_exp(working_exp_uuid, user_id, name,
#                           description, website_link, exp_type)
#     return jsonify(
#         {'code': 200, 'msg': 'Add working experience success', 'username': g.user.user_id, 'role': g.user.role})


# Get self working experience
@app.route('/api/get_self_work_experience', methods=['POST'])
@auth.login_required
def get_self_working_exp():
    working_exp = db.get_working_exp_list_by_user_id(g.user.user_id)
    for item in working_exp:
        temp_result = json.loads(item['description'])
        item['description'] = temp_result['description']
        item['techs'] = temp_result['techs']
    return jsonify(
        {'code': 200, 'msg': 'Get working experience success', 'username': g.user.user_id, 'role': g.user.role,
         'data': working_exp})


# Get anyone working experience
@app.route('/api/get_anyone_work_experience', methods=['POST'])
@auth.login_required
def get_anyone_working_exp():
    user_id = request.form.get('student_id', type=str)
    working_exp = db.get_working_exp_list_by_user_id(user_id)
    for item in working_exp:
        temp_result = json.loads(item['description'])
        item['description'] = temp_result['description']
        item['techs'] = temp_result['techs']
    return jsonify(
        {'code': 200, 'msg': 'Get working experience success', 'username': g.user.user_id, 'role': g.user.role,
         'data': working_exp})


# Get specific working experience
@app.route('/api/get_spec_work_experience', methods=['POST'])
@auth.login_required
def get_spec_work_experience():
    working_exp_uuid = request.form.get('working_exp_uuid', type=str)
    working_exp = db.get_working_exp_by_uuid(working_exp_uuid)
    for item in working_exp:
        temp_result = json.loads(item['description'])
        item['description'] = temp_result['description']
        item['techs'] = temp_result['techs']
    return jsonify(
        {'code': 200, 'msg': 'Get working experience success', 'username': g.user.user_id, 'role': g.user.role,
         'data': working_exp})


# Change working experience part

# Change working experience name
@app.route('/api/change_work_exp_name', methods=['POST'])
@auth.login_required
def change_working_exp_name():
    working_exp_uuid = request.form.get('working_exp_uuid', type=str)
    new_name = request.form.get('new_name', type=str)
    db.change_working_exp_name(working_exp_uuid, new_name)
    return jsonify(
        {'code': 200, 'msg': 'Change working experience success', 'username': g.user.user_id, 'role': g.user.role})


# Change working experience description
@app.route('/api/change_work_exp_description', methods=['POST'])
@auth.login_required
def change_work_exp_description():
    working_exp_uuid = request.form.get('working_exp_uuid', type=str)
    new_description = request.form.get('new_description', type=str)
    db.change_working_exp_description(working_exp_uuid, new_description)
    return jsonify(
        {'code': 200, 'msg': 'Change working experience success', 'username': g.user.user_id, 'role': g.user.role})


# Change working experience link
@app.route('/api/change_work_exp_link', methods=['POST'])
@auth.login_required
def change_work_exp_link():
    working_exp_uuid = request.form.get('working_exp_uuid', type=str)
    new_link = request.form.get('new_link', type=str)
    db.change_working_exp_link(working_exp_uuid, new_link)
    return jsonify(
        {'code': 200, 'msg': 'Change working experience success', 'username': g.user.user_id, 'role': g.user.role})


# Delete working experience
@app.route('/api/delete_work_experience', methods=['POST'])
@auth.login_required
def delete_work_experience():
    working_exp_uuid = request.form.get('working_exp_uuid', type=str)
    db.delete_working_exp(working_exp_uuid)
    return jsonify(
        {'code': 200, 'msg': 'Delete working experience success', 'username': g.user.user_id, 'role': g.user.role})


# End working experience part

# Start skill part

# Create new skill
@app.route('/api/create_skill', methods=['POST'])
@auth.login_required
def create_skill():
    skill_uuid = uuid.uuid1()
    skill_name = request.form.get('skill_name', type=str)
    db.create_skill(skill_uuid, skill_name)
    return jsonify({'code': 200, 'msg': 'Create skill success', 'username': g.user.user_id, 'role': g.user.role})


# Get all skill
@app.route('/api/get_skill_list', methods=['POST'])
@auth.login_required
def get_skill_list():
    skill_list = db.get_all_skill()
    return jsonify({'code': 200, 'msg': 'Get skill list success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': skill_list})


# Search skill
@app.route('/api/search_skill', methods=['POST'])
@auth.login_required
def search_skill():
    skill_name = request.form.get('skill_name', type=str)
    skill_list = db.search_skill(skill_name)
    return jsonify(
        {'code': 200, 'msg': 'Search skill success', 'username': g.user.user_id, 'role': g.user.role,
         'data': skill_list})


# Get self skill list
@app.route('/api/get_self_skill_list', methods=['POST'])
@auth.login_required
def get_self_skill_list():
    skill_list = db.get_self_skill_list(g.user.user_id)
    return jsonify({'code': 200, 'msg': 'Get self skill list success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': skill_list})


# Get anyone skill list
@app.route('/api/get_anyone_skill_list', methods=['POST'])
@auth.login_required
def get_anyone_skill_list():
    student_id = request.form.get('student_id', type=str)
    skill_list = db.get_self_skill_list(student_id)
    return jsonify(
        {'code': 200, 'msg': 'Get anyone skill list success', 'username': g.user.user_id, 'role': g.user.role,
         'data': skill_list})


# Add skill to list
@app.route('/api/add_skill_to_list', methods=['POST'])
@auth.login_required
def add_skill_to_list():
    skill_name = request.form.get('skill_name', type=str)
    proficiency = request.form.get('proficiency', type=int)
    skill_name = skill_name.lower()
    db.add_skill_to_list(g.user.user_id, skill_name, proficiency)
    return jsonify({'code': 200, 'msg': 'Add skill success', 'username': g.user.user_id, 'role': g.user.role})


# Delete skill from list
@app.route('/api/delete_skill_from_list', methods=['POST'])
@auth.login_required
def delete_skill_from_list():
    skill_id = request.form.get('skill_id', type=str)
    db.delete_skill_from_list(g.user.user_id, skill_id)
    return jsonify({'code': 200, 'msg': 'Delete skill success', 'username': g.user.user_id, 'role': g.user.role})


# End skill part

# Start course part

# Create course
@app.route('/api/create_course', methods=['POST'])
@auth.login_required
def create_course():
    course_code = request.form.get('course_code', type=str)
    course_name = request.form.get('course_name', type=str)
    db.create_course(course_code, course_name)
    return jsonify({'code': 200, 'msg': 'Create course success', 'username': g.user.user_id, 'role': g.user.role})


# Search course by code
@app.route('/api/search_course_by_code', methods=['POST'])
@auth.login_required
def search_course_by_code():
    course_code = request.form.get('course_code', type=str)
    course_list = db.get_course_name(course_code)
    return jsonify({'code': 200, 'msg': 'Search course success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': course_list})


# Search course by name
@app.route('/api/search_course_by_name', methods=['POST'])
@auth.login_required
def search_course_by_name():
    course_name = request.form.get('course_name', type=str)
    course_list = db.search_course(course_name)
    return jsonify({'code': 200, 'msg': 'Search course success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': course_list})


# Add course to list
@app.route('/api/add_course_to_list', methods=['POST'])
@auth.login_required
def add_course_to_list():
    course_code = request.form.get('course_code', type=str)
    db.add_course_to_list(g.user.user_id, course_code)
    return jsonify({'code': 200, 'msg': 'Add course success', 'username': g.user.user_id, 'role': g.user.role})


# Get self course list
@app.route('/api/get_self_course_list', methods=['POST'])
@auth.login_required
def get_self_course_list():
    course_list = db.get_course_list(g.user.user_id)
    return jsonify({'code': 200, 'msg': 'Get course list success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': course_list})


# Get anyone course list
@app.route('/api/get_anyone_course_list', methods=['POST'])
@auth.login_required
def get_anyone_course_list():
    student_id = request.form.get('student_id', type=str)
    course_list = db.get_course_list(student_id)
    return jsonify({'code': 200, 'msg': 'Get course list success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': course_list})


# Delete course from list
@app.route('/api/delete_course_from_list', methods=['POST'])
@auth.login_required
def delete_course_from_list():
    course_code = request.form.get('course_code', type=str)
    db.delete_course_from_list(g.user.user_id, course_code)
    return jsonify({'code': 200, 'msg': 'Delete course success', 'username': g.user.user_id, 'role': g.user.role})


# Search skill by course code
@app.route('/api/search_skill_by_course_code', methods=['POST'])
@auth.login_required
def search_skill_by_course_code():
    course_code = request.form.get('course_code', type=str)
    skill_list = db.search_skill_by_course_code(course_code)
    return jsonify(
        {'code': 200, 'msg': 'Get course skill list success', 'username': g.user.user_id, 'role': g.user.role,
         'data': skill_list})


# End course part

# Start saved job list part


# Search job info
@app.route('/api/search_job_info', methods=['POST'])
@auth.login_required
def search_job_info_by_job_name():
    search_data = request.json.get('search_data')
    print(search_data)
    keyword = search_data['keyword']
    tags = search_data['tags']
    search_language = search_data['language']
    location = search_data['location']
    salary = search_data['salary']
    salary_interval = list()

    if salary is not None:
        if salary == '50k-':
            salary_interval = [50000, float('inf')]
        elif salary == '50-60k':
            salary_interval = [50000, 60000]
        elif salary == '60-70k':
            salary_interval = [60000, 70000]
        elif salary == '70-80k':
            salary_interval = [70000, 80000]
        elif salary == '80-90k':
            salary_interval = [80000, 90000]
        elif salary == '90-100k':
            salary_interval = [90000, 100000]
        else:
            salary_interval = [100000, float('inf')]

    work_type = search_data['workType']

    # keyword_list = keyword.lower().split(' ')
    # all_candidate_job = list()
    # intersection_job = list()
    # for keyword in keyword_list:
    #     temp_job = db.get_job_info_by_job_name(keyword)
    #     all_candidate_job = all_candidate_job + temp_job
    #     if len(intersection_job) == 0:
    #         intersection_job = temp_job
    #     else:
    #         for job_info in temp_job:
    #             if job_info not in intersection_job:
    #                 intersection_job.pop(intersection_job.index(job_info))
    all_candidate_job = list()
    if keyword.lower() == 'any':
        all_candidate_job = db.get_job_info_list()
    else:
        all_candidate_job = db.get_job_info_by_job_name(keyword)
    target_list = db.get_all_target()
    target_dict = {item['name']: item['target_uuid'] for item in target_list}
    target_list = list(target_dict.keys())

    search_result = list()
    full_match = list()
    half_match = {2:list(), 3: list(), 4: list()}
    for job_info in all_candidate_job:
        language_check = False
        tags_check = False
        work_type_check = False
        salary_check = False
        location_check = False

        temp_result = json.loads(job_info['address'])
        job_info['responsibility'] = temp_result.get('responsibility')
        job_info['itskill'] = temp_result.get('itskill')
        job_info['personal_strength'] = temp_result.get('personal_strength')
        job_info['others'] = temp_result.get('others')
        job_info['date'] = temp_result.get('date')
        temp_target_list = db.get_item_target(job_info['job_info_id'])
        temp_target_list = [item['name'] for item in temp_target_list]

        if search_language is not None:
            if re.search(search_language, job_info['job_title']):
                language_check = True

            if not language_check:
                if search_language in job_info['itskill']:
                    language_check = True
                if search_language == 'others':
                    language_check = True
        else:
            language_check = True

        for tag in tags:
            if tag.lower() in temp_target_list:
                tags_check = True
            if tag.lower() == job_info['company_name'].lower():
                tags_check = True
        if len(tags) == 0:
            tags_check = True

        if work_type is not None:
            if work_type.lower() == job_info['job_type']:
                work_type_check = True
            else:
                temp_work_type1 = re.sub(r'-', ' ', work_type.lower())
                temp_work_type1 = re.sub(r'_', ' ', temp_work_type1)
                temp_work_type2 = re.sub(r'-', " ", job_info['job_type'])
                temp_work_type2 = re.sub(r'_', " ", temp_work_type2)
                if temp_work_type1 == temp_work_type2:
                    work_type_check = True
        else:
            work_type_check = True

        if salary is None:
            salary_check = True
        else:
            print(job_info['salary'])
            if salary == job_info['salary']:
                salary_check = True
            else:
                try:
                    if salary_interval[0] <= int(job_info['salary']) <= salary_interval[1]:
                        salary_check = True
                except ValueError:
                    if isinstance(job_info['salary'], str):
                        temp_salary = re.sub(r'\+', '', job_info['salary'])
                        temp_salary = re.sub('k', '000', temp_salary)
                        try:
                            temp_salary = int(temp_salary)
                            if salary_interval[0] <= temp_salary <= salary_interval[1]:
                                salary_check = True
                        except ValueError:
                            pass

        if location is None or len(location) == 0:
            location_check = True
        else:
            if re.search(location.lower(), job_info['location'].lower()):
                location_check = True

        match_result = [language_check, tags_check, work_type_check, salary_check, location_check]
        true_match = match_result.count(True)
        if true_match == 5:
            full_match.append(job_info)
        elif 2 <= true_match < 5:
            half_match[true_match].append(job_info) 

    full_match = sorted(full_match, key=lambda item: item['date'], reverse=True)

    half_match_index = list(half_match.keys())
    half_match_index.sort(reverse=True)
    half_match_list = list()
    for item in half_match:
        half_match[item] = sorted(half_match[item], key=lambda open_job: open_job['date'], reverse=True)

    for match_index in half_match_index:
        half_match_list = half_match_list + half_match[match_index]

    search_result = full_match + half_match_list

    return jsonify({'code': 200, 'msg': 'Search job info success', 'username': g.user.user_id, 'name': g.user.name, 'role': g.user.role,
                    'data': search_result})


# Add job info to saved job
@app.route('/api/add_saved_job', methods=['POST'])
@auth.login_required
def add_saved_job():
    job_info_id = request.form.get('job_info_id', type=str)
    db.add_saved_job(g.user.user_id, job_info_id)
    return jsonify({'code': 200, 'msg': 'Save job info success', 'username': g.user.user_id, 'role': g.user.role})


# Get saved job list
@app.route('/api/get_saved_job_list', methods=['POST'])
@auth.login_required
def get_saved_job_list():
    job_info_list = db.get_saved_job_list(g.user.user_id)
    for job_info in job_info_list:
        temp_result = json.loads(job_info['address'])
        job_info['responsibility'] = temp_result.get('responsibility')
        job_info['itskill'] = temp_result.get('itskill')
        job_info['personal_strength'] = temp_result.get('personal_strength')
        job_info['others'] = temp_result.get('others')
        job_info['date'] = temp_result.get('date')
    return jsonify({'code': 200, 'msg': 'Get saved job list success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': job_info_list})


# Delete one saved job
@app.route('/api/delete_saved_job', methods=['POST'])
@auth.login_required
def delete_saved_job():
    job_info_id = request.form.get('job_info_id', type=str)
    db.delete_saved_job(g.user.user_id, job_info_id)
    return jsonify({'code': 200, 'msg': 'Delete job info success', 'username': g.user.user_id, 'role': g.user.role})


# End saved job list part

# Start enrol part

# Send a resume
@app.route('/api/send_resume', methods=['POST'])
@auth.login_required
def send_resume():
    enrol_id = uuid.uuid1()
    student_id = g.user.user_id
    company_id = request.form.get('company_id', type=str)
    job_info_id = request.form.get('job_info_id', type=str)
    print(company_id, job_info_id)
    db.send_resume(enrol_id, student_id, company_id, job_info_id)
    return jsonify({'code': 200, 'msg': 'Send resume success', 'username': g.user.user_id, 'role': g.user.role})


# Get sent resume list
@app.route('/api/get_sent_resume_list', methods=['POST'])
@auth.login_required
def get_sent_resume_list():
    resume_list = db.get_sent_resume(g.user.user_id)
    return jsonify(
        {'code': 200, 'msg': 'Get sent resume list success', 'username': g.user.user_id, 'role': g.user.role,
         'data': resume_list})


# Cancel resume sent
@app.route('/api/cancel_resume_send', methods=['POST'])
@auth.login_required
def cancel_resume_send():
    enrol_id = request.form.get('enrol_id', type=str)
    db.cancel_resume_send(enrol_id)
    return jsonify({'code': 200, 'msg': 'Cancel resume sent success', 'username': g.user.user_id, 'role': g.user.role})


# End enrol part

# Start interview part

# Student get interview list
@app.route('/api/student_get_interview_list', methods=['POST'])
@auth.login_required
def student_get_interview_list():
    interview_list = db.get_interview_by_student_id(g.user.user_id)
    return jsonify({'code': 200, 'msg': 'Get interview list success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': interview_list})


# End interview part

# Start personal skill part
# Update personal skill
@app.route('/api/update_personal_skill', methods=['POST'])
@auth.login_required
def update_personal_skill():
    personal_skill = request.json.get('personal_skill', 'Nothing here')
    db.update_personal_skill(g.user.user_id, personal_skill)
    return jsonify({'code': 200, 'msg': 'Update success', 'username': g.user.user_id, 'role': g.user.role})


# Get personal skill


@app.route('/api/get_personal_skill', methods=['POST'])
@auth.login_required
def get_personal_skill():
    return jsonify({'code': 200, 'msg': 'Get data success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': db.get_personal_skill(g.user.user_id)})


# End student part


# Start employer part

# Start job part

# Create job title
@app.route('/api/create_job_title', methods=['POST'])
@auth.login_required
def create_job_title():
    job_uuid = uuid.uuid1()
    job_title = request.form.get('job_title', type=str)
    db.create_job_title(job_uuid, job_title)
    return jsonify({'code': 200, 'msg': 'Create job title success', 'username': g.user.user_id, 'role': g.user.role})


# Search job title
@app.route('/api/search_job_title', methods=['POST'])
@auth.login_required
def search_job_title():
    job_title = request.form.get('job_title', type=str)
    job_title_list = db.search_job_title(job_title)
    return jsonify({'code': 200, 'msg': 'Search job title success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': job_title_list})


# Get all job title
@app.route('/api/get_all_job_title', methods=['POST'])
@auth.login_required
def get_all_job_title():
    job_title_list = db.get_all_job_title()
    return jsonify({'code': 200, 'msg': 'Get job title list success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': job_title_list})


# Create job info
@app.route('/api/create_job_info', methods=['POST'])
@auth.login_required
def create_job_info():
    info_uuid = uuid.uuid1()
    new_job_info = request.json.get('create_job')
    job_title = new_job_info['title']
    exist_job_title = db.search_job_by_skill_name(job_title)
    job_uuid = str()
    new_title_flag = False
    if len(exist_job_title) == 0:
        job_uuid = uuid.uuid1()
        db.create_job_title(job_uuid, job_title)
        new_title_flag = True
    else:
        job_uuid = exist_job_title[0]['id']
    company_id = g.user.user_id
    # company_id = new_job_info['company']
    job_type = new_job_info['workType']
    description = new_job_info['jobSummary']
    salary = new_job_info['salary']
    location = new_job_info['location']
    responsibility = new_job_info['responsibilities']
    itskill = new_job_info['ITSkill']
    personal_strength = new_job_info['personalStrengths']
    others = new_job_info['others']
    date = str(datetime.datetime.now())
    date = date[:len(date) - 7]
    spec = json.dumps({'responsibility': responsibility, 'itskill': itskill, 'personal_strength': personal_strength,
                       'others': others, 'date': date})
    db.create_job_info(info_uuid=info_uuid, job_uuid=job_uuid, company_id=company_id, address=spec,
                       job_type=job_type, description=description, salary=salary, location=location)

    if new_title_flag:
        all_skill_list = db.get_all_skill()
        all_skill_list = {item['name']: item['id'] for item in all_skill_list}
        for skill in itskill:
            temp_split = re.sub(r'[\,\-#\.\*\$]', " ", skill.lower()).split()
            for word in temp_split:
                if all_skill_list.get(word) is not None:
                    db.create_job_and_skill_link(job_uuid, all_skill_list.get(word))
    
    recommendation_system = rs.Recommendation_system()
    recommendation_system.recommend_for_job(info_uuid)
    recommendation_system.renew_description()
    return jsonify({'code': 200, 'msg': 'Create job info success', 'username': g.user.user_id, 'role': g.user.role})

# Delete job info address
@app.route('/api/delete_job_info', methods=['POST'])
@auth.login_required
def delete_job_info():
    # info_uuid = request.form.get('info_uuid', type=str)
    info_uuid = request.json.get('info_uuid')
    print(info_uuid)
    db.delete_job_info(info_uuid)
    return jsonify({'code': 200, 'msg': 'delete job success'})



# Change job info address
@app.route('/api/change_job_info_spec', methods=['POST'])
@auth.login_required
def change_job_info_spec():
    info_uuid = request.form.get('info_uuid', type=str)
    new_spec = request.form.get('new_spec_addr', type=str)
    db.change_job_info_address(info_uuid, new_spec)
    return jsonify({'code': 200, 'msg': 'Change job info success', 'username': g.user.user_id, 'role': g.user.role})


# Change job info type
@app.route('/api/change_job_type', methods=['POST'])
@auth.login_required
def change_job_type():
    info_uuid = request.form.get('info_uuid', type=str)
    new_type = request.form.get('new_type', type=str)
    db.change_job_type(info_uuid, new_type)
    return jsonify({'code': 200, 'msg': 'Change job info success', 'username': g.user.user_id, 'role': g.user.role})


# Change job location
@app.route('/api/change_job_location', methods=['POST'])
@auth.login_required
def change_job_location():
    info_uuid = request.form.get('info_uuid', type=str)
    new_location = request.form.get('new_location', type=str)
    db.change_job_location(info_uuid, new_location)
    return jsonify({'code': 200, 'msg': 'Change job info success', 'username': g.user.user_id, 'role': g.user.role})


# Change job info title
@app.route('/api/change_job_info_title', methods=['POST'])
@auth.login_required
def change_job_info_title():
    info_uuid = request.form.get('info_uuid', type=str)
    new_title_uuid = request.form.get('new_title_uuid', type=str)
    db.change_job_info_title(info_uuid, new_title_uuid)
    return jsonify({'code': 200, 'msg': 'Change job info success', 'username': g.user.user_id, 'role': g.user.role})


# Change job info description
@app.route('/api/change_job_info_description', methods=['POST'])
@auth.login_required
def change_job_info_description():
    info_uuid = request.form.get('info_uuid', type=str)
    new_description = request.form.get('new_description', type=str)
    db.change_job_info_description(info_uuid, new_description)
    recommendation_system = rs.Recommendation_system()
    recommendation_system.recommend_for_job(info_uuid)
    recommendation_system.renew_description()
    return jsonify({'code': 200, 'msg': 'Change job info success', 'username': g.user.user_id, 'role': g.user.role})


# Change job info salary
@app.route('/api/change_job_info_salary', methods=['POST'])
@auth.login_required
def change_job_info_salary():
    info_uuid = request.form.get('info_uuid', type=str)
    new_salary = request.form.get('new_salary', type=str)
    db.change_job_info_salary(info_uuid, new_salary)
    return jsonify({'code': 200, 'msg': 'Change job info success', 'username': g.user.user_id, 'role': g.user.role})


# Search job info by job title
@app.route('/api/search_job_info_by_job_uuid', methods=['POST'])
@auth.login_required
def get_job_info_by_job_uuid():
    job_uuid = request.form.get('job_uuid', type=str)
    job_info_list = db.get_job_info_by_job_uuid(job_uuid)
    for job_info in job_info_list:
        temp_result = json.loads(job_info['address'])
        job_info['responsibility'] = temp_result.get('responsibility')
        job_info['itskill'] = temp_result.get('itskill')
        job_info['personal_strength'] = temp_result.get('personal_strength')
        job_info['others'] = temp_result.get('others')
        job_info['date'] = temp_result.get('date')
    return jsonify({'code': 200, 'msg': 'Search job info success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': job_info_list})


# Get publish job info list
@app.route('/api/get_publish_job_info', methods=['POST'])
@auth.login_required
def get_publish_job_info():
    publish_job_list = db.get_self_job_info(g.user.user_id)
    for job_info in publish_job_list:
        temp_result = json.loads(job_info['address'])
        job_info['responsibility'] = temp_result.get('responsibility')
        job_info['itskill'] = temp_result.get('itskill')
        job_info['personal_strength'] = temp_result.get('personal_strength')
        job_info['others'] = temp_result.get('others')
        job_info['date'] = temp_result.get('date')
    return jsonify(
        {'code': 200, 'msg': 'Get published job info list success', 'username': g.user.user_id, 'role': g.user.role,
         'data': publish_job_list})


# End job part

# Start enrolment part

# Get candidate list
@app.route('/api/get_candidate_list', methods=['POST'])
@auth.login_required
def get_candidate_list():
    candidate_list = db.get_resume_list(g.user.user_id)
    return jsonify({'code': 200, 'msg': 'Get candidate list success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': candidate_list})


# End enrolment part

# Start interview part

# Create interview status
@app.route('/api/create_interview_status', methods=['POST'])
@auth.login_required
def create_interview_status():
    status_uuid = uuid.uuid1()
    status_name = request.form.get('status_name', type=str)
    db.create_interview_status(status_uuid, status_name)
    return jsonify(
        {'code': 200, 'msg': 'Create interview status success', 'username': g.user.user_id, 'role': g.user.role})


# Get interview status list
@app.route('/api/get_interview_status_list', methods=['POST'])
@auth.login_required
def get_interview_status_list():
    status_list = db.get_interview_status_list()
    return jsonify(
        {'code': 200, 'msg': 'Get interview status list success', 'username': g.user.user_id, 'role': g.user.role,
         'data': status_list})


# Create a interview
@app.route('/api/create_interview', methods=['POST'])
@auth.login_required
def create_interview():
    new_interview = False
    update_data = request.json.get('update_data')
    if 'interview_id' in update_data:
        interview_uuid = update_data['interview_id']
    else:
        interview_uuid = uuid.uuid1()
        new_interview = True
    if interview_uuid == 'undefined':
        interview_uuid = uuid.uuid1()
        new_interview = True
    job_info_id = update_data['job_info_id']
    student_id = update_data['student_id']
    company_id = g.user.user_id
    interview_time = str(datetime.datetime.utcnow())
    location = "Sydney"
    status_uuid = update_data['status_uuid']
    
    print(update_data)
    if new_interview:
        db.create_interview(interview_uuid, job_info_id, student_id,
                            company_id, interview_time, location, status_uuid)
        db.transfer_resume_to_interview(student_id, g.user.user_id, job_info_id)
    else:
        db.change_interview_status(interview_uuid, status_uuid)
    return jsonify({'code': 200, 'msg': 'Create interview success', 'username': g.user.user_id, 'role': g.user.role})


# Change interview
@app.route('/api/change_interview', methods=['POST'])
@auth.login_required
def change_interview():
    update_data = request.json.get('update_data')
    print(update_data)
    return jsonify({'code': 200, 'msg': 'Change success'})

# Change interview time
@app.route('/api/change_interview_time', methods=['POST'])
@auth.login_required
def change_interview_time():
    interview_uuid = request.form.get('interview_uuid', type=str)
    new_time = request.form.get('new_time', type=str)
    db.change_interview_time(interview_uuid, new_time)
    return jsonify({'code': 200, 'msg': 'Change interview success', 'username': g.user.user_id, 'role': g.user.role})


# Change interview location
@app.route('/api/change_interview_location', methods=['POST'])
@auth.login_required
def change_interview_location():
    interview_uuid = request.form.get('interview_uuid', type=str)
    new_location = request.form.get('new_location', type=str)
    db.change_interview_location(interview_uuid, new_location)
    return jsonify({'code': 200, 'msg': 'Change interview success', 'username': g.user.user_id, 'role': g.user.role})


# Change interview status
@app.route('/api/change_interview_status', methods=['POST'])
@auth.login_required
def change_interview_status():
    interview_uuid = request.form.get('interview_uuid', type=str)
    new_status_uuid = request.form.get('new_status_uuid', type=str)
    db.change_interview_status(interview_uuid, new_status_uuid)
    return jsonify({'code': 200, 'msg': 'Change interview success', 'username': g.user.user_id, 'role': g.user.role})


# Delete one interview
@app.route('/api/delete_interview', methods=['POST'])
@auth.login_required
def delete_interview():
    interview_uuid = request.form.get('interview_uuid', type=str)
    db.delete_interview(interview_uuid)
    return jsonify({'code': 200, 'msg': 'Delete interview success', 'username': g.user.user_id, 'role': g.user.role})


# Company get interview list
@app.route('/api/company_get_interview_list', methods=['POST'])
@auth.login_required
def company_get_interview_list():
    interview_list = db.get_interview_by_company_id(g.user.user_id)
    return jsonify({'code': 200, 'msg': 'Get interview list success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': interview_list})


# End interview part

# End employer part

# Start instructor part

# Add saved user
@app.route('/api/add_saved_user', methods=['POST'])
@auth.login_required
def add_saved_user():
    saved_user_id = request.form.get('saved_user_id', type=str)
    db.add_saved_user(g.user.user_id, saved_user_id)
    return jsonify(
        {'code': 200, 'msg': 'Add user to saved list success', 'username': g.user.user_id, 'role': g.user.role})


# Get saved user list
@app.route('/api/get_saved_user_list', methods=['POST'])
@auth.login_required
def get_saved_user_list():
    saved_user_list = db.get_saved_user_list(g.user.user_id)
    return jsonify({'code': 200, 'msg': 'Get saved user list success', 'username': g.user.user_id, 'role': g.user.role,
                    'data': saved_user_list})


# Delete saved user
@app.route('/api/delete_saved_user', methods=['POST'])
@auth.login_required
def delete_saved_user():
    saved_user_id = request.form.get('saved_user_id', type=str)
    db.delete_saved_user(g.user.user_id, saved_user_id)
    return jsonify(
        {'code': 200, 'msg': 'Delete user from saved list success', 'username': g.user.user_id, 'role': g.user.role})


# Search user by user name
@app.route('/api/search_user', methods=['POST'])
@auth.login_required
def search_user_by_name():
    search_data = request.json.get('search_data')
    print(search_data)
    keyword = search_data['keyword']
    location = search_data['location']
    tags = search_data['tags']
    search_language = search_data['language']

    # keyword_list = keyword.split(' ')
    match_name_candidate_list = list()
    if keyword == 'any':
        match_name_candidate_list = db.get_candidate_list()
    else:
        match_name_candidate_list = db.get_user_info_by_name(keyword)
        if len(match_name_candidate_list) <= 0:
            match_name_candidate_list = db.get_candidate_list()
    
    search_result = list()
    full_match = list()
    half_match = {2: list(), 3: list()}
    for candidate in match_name_candidate_list:
        candidate['personal_info'] = candidate.copy()
        candidate['about_me'] = candidate['description']
        skill_set = db.get_self_skill_list(candidate['username'])
        candidate['skill_set'] = {item['name']: item['proficiency'] for item in skill_set}

        working_exp = db.get_working_exp_list_by_user_id(
            candidate['username'])
        experiences = [item for item in working_exp if item['exp_type'] == 0]
        project_list = [item for item in working_exp if item['exp_type'] == 1]
        for item in project_list:
            temp_result = json.loads(item['description'])
            item['description'] = temp_result['description']
            item['techs'] = temp_result['techs']

        candidate['experiences'] = experiences
        candidate['project_list'] = project_list
        candidate['personal_skill'] = db.get_personal_skill(
            candidate['username'])
        candidate['education_exp'] = db.get_education_exp(candidate['username'])
        candidate['course_list'] = db.get_course_list(candidate['username']) 

        location_check = False
        tags_check = False
        language_check = False
        keyword_check = False

        skill_set = [item.lower() for item in list(candidate['skill_set'].keys())]

        if re.search(keyword.lower(), candidate['name'].lower()):
            keyword_check = True
        elif re.search(keyword.lower(), candidate['about_me'].lower()):
            keyword_check = True
        else:
            for skill in skill_set:
                if re.search(keyword.lower(), skill):
                    keyword_check = True
                    break
        
        if len(location) <= 0:
            location_check = True
        elif re.search(location.lower(), candidate['location'].lower()):
            location_check = True

        if len(tags) <= 0:
            tags_check = True
        else:
            for tag in tags:
                if tag in skill_set:
                    tags_check = True
                    break

        if search_language is None:
            language_check = True
        else:
            for skill in skill_set:
                if re.search(search_language.lower(), skill):
                    language_check = True
                    break

        match_result = [location_check, tags_check, language_check, keyword_check]
        true_match = match_result.count(True)
        if true_match == 4:
            full_match.append(candidate)
        elif 2 <= true_match < 4:
            half_match[true_match].append(candidate)

    half_match_list = list()
    half_match_index = list(half_match.keys())
    half_match_index.sort(reverse=True)

    for match_index in half_match_index:
        half_match_list = half_match_list + half_match[match_index]

    search_result = full_match + half_match_list
    
    return jsonify({'code': 200, 'msg': 'Search success', 'username': g.user.user_id, 'name':g.user.name, 'role': g.user.role, 'data': search_result})


# End instructor part


# Start Recommendation system part

# Recommend user to job info
@app.route('/api/set_recommendation_for_job', methods=['POST'])
@auth.login_required
def set_recommendation_for_job():
    job_info_id = request.form.get('job_info_id', type=str)
    student_id = request.form.get('student_id', type=str)
    if not job_info_id or not student_id:
        abort(400)
    referrer_name = g.user.name
    rs.set_recommendation_for_job(job_info_id, student_id, referrer_name, g.user.user_id)
    return jsonify({'code': 200, 'msg': 'Recommend success', 'username': g.user.user_id, 'role': g.user.role})


# Recommend job info to user
@app.route('/api/set_recommendation_for_user', methods=['POST'])
@auth.login_required
def set_recommendation_for_user():
    job_info_id = request.form.get('job_info_id', type=str)
    student_id = request.form.get('student_id', type=str)
    referrer_name = g.user.name
    rs.set_recommendation_for_user(student_id, job_info_id, referrer_name, g.user.user_id)
    return jsonify({'code': 200, 'msg': 'Recommend success', 'username': g.user.user_id, 'role': g.user.role})


# Refresh recommendation for user
@app.route('/api/refresh_recommendation_for_user', methods=['POST'])
@auth.login_required
def refresh_recommendation_for_user():
    recommendation_system = rs.Recommendation_system()
    recommendation_system.recommend_for_user(g.user.user_id)
    recommendation_system.refresh_recommendation()
    return jsonify(
        {'code': 200, 'msg': 'Refresh recommendation list success', 'username': g.user.user_id, 'role': g.user.role})


# Refresh recommendation for job
@app.route('/api/refresh_recommendation_for_job', methods=['POST'])
@auth.login_required
def refresh_recommendation_for_job():
    job_info_id = request.form.get('job_info_id', type=str)
    recommendation_system = rs.Recommendation_system()
    recommendation_system.recommend_for_job(job_info_id)
    recommendation_system.refresh_recommendation()
    return jsonify(
        {'code': 200, 'msg': 'Refresh recommendation list success', 'username': g.user.user_id, 'role': g.user.role})


# Get recommendation list for user
@app.route('/api/user_get_recommendation_list', methods=['POST'])
@auth.login_required
def user_get_recommendation_list():
    recommendation_system = rs.Recommendation_system()
    recommendation_system.recommend_for_user(g.user.user_id)
    recommendation_list = recommendation_system.get_recommend_list()
    for job_info in recommendation_list:
        temp_result = json.loads(job_info['address'])
        job_info['responsibility'] = temp_result.get('responsibility')
        job_info['itskill'] = temp_result.get('itskill')
        job_info['personal_strength'] = temp_result.get('personal_strength')
        job_info['others'] = temp_result.get('others')
        job_info['date'] = temp_result.get('date')
    return jsonify(
        {'code': 200, 'msg': 'Get recommendation list success', 'username': g.user.user_id, 'role': g.user.role,
         'data': recommendation_list})


# Get recommendation list for job
@app.route('/api/job_get_recommendation_list', methods=['POST'])
@auth.login_required
def job_get_recommendation_list():
    job_info_id = request.form.get('job_info_id', type=str)
    recommendation_system = rs.Recommendation_system()
    recommendation_system.recommend_for_job(job_info_id)
    recommendation_list = recommendation_system.get_recommend_list()
    return jsonify(
        {'code': 200, 'msg': 'Get recommendation list success', 'username': g.user.user_id, 'role': g.user.role,
         'data': recommendation_list})


# End recommendation system part


# Start get data part

# student get main data
@app.route('/api/candidate_get_main_data', methods=['POST'])
@auth.login_required
def candidate_get_main_data():
    personal_info = g.user.get_user_profile()
    about_me = personal_info['description']
    skill_set = db.get_self_skill_list(g.user.user_id)
    skill_set = {item['name']: item['proficiency'] for item in skill_set}

    working_exp = db.get_working_exp_list_by_user_id(g.user.user_id)
    experiences = [item for item in working_exp if item['exp_type'] == 0]
    project_list = [item for item in working_exp if item['exp_type'] == 1]
    for item in project_list:
        temp_result = json.loads(item['description'])
        item['description'] = temp_result['description']
        item['techs'] = temp_result['techs']

    education_exp = db.get_education_exp(g.user.user_id)
    course_list = db.get_course_list(g.user.user_id)
    personal_skill = db.get_personal_skill(g.user.user_id)
    saved_job_list = db.get_saved_job_list(g.user.user_id)
    for job_info in saved_job_list:
        temp_result = json.loads(job_info['address'])
        job_info['responsibility'] = temp_result.get('responsibility')
        job_info['itskill'] = temp_result.get('itskill')
        job_info['personal_strength'] = temp_result.get('personal_strength')
        job_info['others'] = temp_result.get('others')
        job_info['date'] = temp_result.get('date')
    interview_list = db.get_interview_by_student_id(g.user.user_id)
    recommendation_system = rs.Recommendation_system()
    recommendation_system.recommend_for_user(g.user.user_id)
    recommendation_system.refresh_recommendation()
    recommendation_list = recommendation_system.get_recommend_list()
    instructor_recommend = list()
    system_recommend = list()
    for job_info in recommendation_list:
        temp_save = db.get_job_info(job_info['job_info_id'])[0]
        job_info['company_name'] = temp_save['company_name']
        job_info['job_type'] = temp_save['job_type']
        job_info['salary'] = temp_save['salary']
        job_info['location'] = temp_save['location']
        temp_result = json.loads(job_info['address'])
        job_info['responsibility'] = temp_result.get('responsibility')
        job_info['itskill'] = temp_result.get('itskill')
        job_info['personal_strength'] = temp_result.get('personal_strength')
        job_info['others'] = temp_result.get('others')
        job_info['date'] = temp_result.get('date')
        if job_info['referrer'] == 'System':
            system_recommend.append(job_info)
        else:
            instructor_recommend.append(job_info)
    recommendation_list = instructor_recommend + system_recommend
    return jsonify({'code': 200, 'msg': 'Get data success', 'username': g.user.user_id, 'role': g.user.role,
                    'personal_info': personal_info, 'about_me': about_me, 'skill_set': skill_set,
                    'personal_skill': personal_skill,
                    'experiences': experiences, 'project_list': project_list, 'education_exp': education_exp,
                    'course_list': course_list,
                    'saved_job_list': saved_job_list, 'interview': interview_list,
                    'recommendation_list': recommendation_list})


# employer get main data


@app.route('/api/employer_get_main_data', methods=['POST'])
@auth.login_required
def employer_get_main_data():
    personal_info = g.user.get_user_profile()
    about_me = personal_info['description']
    open_job_list = db.get_self_job_info(g.user.user_id)
    saved_user_list = db.get_saved_user_list(g.user.user_id)
    for saved_user in saved_user_list:
        saved_user['personal_info'] = db.get_user_info_by_username(saved_user['username'])[0]
        saved_user['about_me'] = saved_user['personal_info']['description']
        skill_set = db.get_self_skill_list(saved_user['username'])
        saved_user['skill_set'] = {item['name']: item['proficiency'] for item in skill_set}

        working_exp = db.get_working_exp_list_by_user_id(
            saved_user['username'])
        experiences = [item for item in working_exp if item['exp_type'] == 0]
        project_list = [item for item in working_exp if item['exp_type'] == 1]
        for item in project_list:
            temp_result = json.loads(item['description'])
            item['description'] = temp_result['description']
            item['techs'] = temp_result['techs']

        saved_user['experiences'] = experiences
        saved_user['project_list'] = project_list
        saved_user['personal_skill'] = db.get_personal_skill(
            saved_user['username'])
        saved_user['education_exp'] = db.get_education_exp(saved_user['username'])
        saved_user['course_list'] = db.get_course_list(saved_user['username'])

    recommendation_system = rs.Recommendation_system()

    open_job_index = dict()
    i = 0

    useless_user = list()

    for open_job_info in open_job_list:
        skill_require = db.search_skill_by_job_uuid(open_job_info['job_id'])
        open_job_info['skill_require'] = skill_require
        temp_result = json.loads(open_job_info['address'])
        open_job_info['responsibility'] = temp_result.get('responsibility')
        open_job_info['itskill'] = temp_result.get('itskill')
        open_job_info['personal_strength'] = temp_result.get('personal_strength')
        open_job_info['others'] = temp_result.get('others')
        open_job_info['date'] = temp_result.get('date')
        open_job_info['first_interview_list'] = list()
        open_job_info['test_list'] = list()
        open_job_info['second_interview_list'] = list()
        open_job_info['offer_list'] = list()
        open_job_info['engaged_list'] = list()
        open_job_info['other_interview_list'] = list()
        open_job_info['resume_list'] = list()

        open_job_index[open_job_info['job_info_id']] = i
        i = i + 1

    interview_list = db.get_interview_by_company_id(g.user.user_id)
    for interview in interview_list:
        useless_user.append(interview['student_id'])
        print(interview['student_id'])
        interview['personal_info'] = db.get_user_info_by_username(interview['student_id'])[0]
        interview['about_me'] = interview['personal_info']['description']
        interview['name'] = interview['personal_info']['name']
        interview['email'] = interview['personal_info']['email']
        interview['location'] = interview['personal_info']['location']
        interview['role'] = interview['personal_info']['role']
        interview['username'] = interview['personal_info']['username']

        skill_set = db.get_self_skill_list(interview['student_id'])
        interview['skill_set'] = {item['name']: item['proficiency'] for item in skill_set}

        working_exp = db.get_working_exp_list_by_user_id(
            interview['student_id'])
        experiences = [item for item in working_exp if item['exp_type'] == 0]
        project_list = [item for item in working_exp if item['exp_type'] == 1]
        for item in project_list:
            temp_result = json.loads(item['description'])
            item['description'] = temp_result['description']
            item['techs'] = temp_result['techs']

        interview['experiences'] = experiences
        interview['project_list'] = project_list
        interview['personal_skill'] = db.get_personal_skill(
            interview['student_id'])
        interview['education_exp'] = db.get_education_exp(interview['student_id'])
        interview['course_list'] = db.get_course_list(interview['student_id'])

        open_job = open_job_list[open_job_index[interview['job_info_id']]]
        if interview['status'] == 'First Interview':
            open_job['first_interview_list'].append(interview)
        elif interview['status'] == 'Tests':
            open_job['test_list'].append(interview)
        elif interview['status'] == 'Second Interview':
            open_job['second_interview_list'].append(interview)
        elif interview['status'] == 'Offer':
            open_job['offer_list'].append(interview)
        elif interview['status'] == 'Engaged':
            open_job['engaged_list'].append(interview)
        else:
            open_job['other_interview_list'].append(interview)

    interview_status_list = db.get_interview_status_list()


    resume_list = db.get_resume_list(g.user.user_id)
    for recived_resume in resume_list:
        if recived_resume['student_id'] not in useless_user:
            useless_user.append(recived_resume['student_id'])
            print(recived_resume['student_id'])
            recived_resume['personal_info'] = db.get_user_info_by_username(recived_resume['student_id'])[0]
            recived_resume['about_me'] = recived_resume['personal_info']['description']
            recived_resume['name'] = recived_resume['personal_info']['name']
            recived_resume['email'] = recived_resume['personal_info']['email']
            recived_resume['location'] = recived_resume['personal_info']['location']
            recived_resume['role'] = recived_resume['personal_info']['role']
            recived_resume['username'] = recived_resume['personal_info']['username']

            skill_set = db.get_self_skill_list(recived_resume['student_id'])
            recived_resume['skill_set'] = {item['name']: item['proficiency'] for item in skill_set}

            working_exp = db.get_working_exp_list_by_user_id(
                recived_resume['student_id'])
            experiences = [item for item in working_exp if item['exp_type'] == 0]
            project_list = [item for item in working_exp if item['exp_type'] == 1]
            for item in project_list:
                temp_result = json.loads(item['description'])
                item['description'] = temp_result['description']
                item['techs'] = temp_result['techs']

            recived_resume['experiences'] = experiences
            recived_resume['project_list'] = project_list
            recived_resume['personal_skill'] = db.get_personal_skill(
                recived_resume['student_id'])
            recived_resume['education_exp'] = db.get_education_exp(recived_resume['student_id'])
            recived_resume['course_list'] = db.get_course_list(recived_resume['student_id'])

            open_job = open_job_list[open_job_index[recived_resume['job_info_id']]]
            recived_resume['job_name'] = open_job['job_title']
            open_job['resume_list'].append(recived_resume)


    for open_job_info in open_job_list:
        recommendation_system.recommend_for_job(open_job_info['job_info_id'])
        recommendation_system.refresh_recommendation()
        recommendation_list = recommendation_system.get_recommend_list()
        temp_recommendation = []
        for recommendation in recommendation_list:
            if recommendation['username'] not in useless_user:
                useless_user.append(recommendation['username'])
                print(recommendation['username'])
                recommendation['personal_info'] = db.get_user_info_by_username(recommendation['username'])[0]
                recommendation['student_name'] = recommendation['name']
                recommendation['location'] = recommendation['personal_info']['location']
                recommendation['about_me'] = recommendation['personal_info']['description']
                skill_set = db.get_self_skill_list(recommendation['username'])
                recommendation['skill_set'] = {item['name']: item['proficiency'] for item in skill_set}

                working_exp = db.get_working_exp_list_by_user_id(
                    recommendation['username'])
                experiences = [item for item in working_exp if item['exp_type'] == 0]
                project_list = [item for item in working_exp if item['exp_type'] == 1]
                for item in project_list:
                    temp_result = json.loads(item['description'])
                    item['description'] = temp_result['description']
                    item['techs'] = temp_result['techs']

                recommendation['experiences'] = experiences
                recommendation['project_list'] = project_list
                recommendation['personal_skill'] = db.get_personal_skill(
                    recommendation['username'])
                recommendation['education_exp'] = db.get_education_exp(recommendation['username'])
                recommendation['course_list'] = db.get_course_list(recommendation['username'])
                temp_recommendation.append(recommendation)
        open_job_info['recommendation_list'] = temp_recommendation


    return jsonify({'code': 200, 'msg': 'Get data success', 'username': g.user.user_id, 'role': g.user.role,
                    'personal_info': personal_info, 'about_me': about_me, 'open_job_list': open_job_list,
                    'saved_user_list': saved_user_list, 'interview_status_list': interview_status_list})


# instructor get main data
@app.route('/api/instructor_get_main_data', methods=['POST'])
@auth.login_required
def instructor_get_main_data():
    personal_info = g.user.get_user_profile()
    about_me = personal_info['description']
    saved_job_list = db.get_saved_job_list(g.user.user_id)
    saved_user_list = db.get_saved_user_list(g.user.user_id)
    recommendation_system = rs.Recommendation_system()

    for saved_job in saved_job_list:
        recommendation_system.recommend_for_job(saved_job['job_info_id'])
        recommendation_list = recommendation_system.get_recommend_list()
        saved_job['recommendation_list'] = recommendation_list
        skill_require = db.search_skill_by_job_uuid(saved_job['job_id'])
        saved_job['skill_require'] = skill_require
        temp_result = json.loads(saved_job['address'])
        saved_job['responsibility'] = temp_result.get('responsibility')
        saved_job['itskill'] = temp_result.get('itskill')
        saved_job['personal_strength'] = temp_result.get('personal_strength')
        saved_job['others'] = temp_result.get('others')
        saved_job['date'] = temp_result.get('date')

        saved_job['first_interview_list'] = list()
        saved_job['test_list'] = list()
        saved_job['second_interview_list'] = list()
        saved_job['offer_list'] = list()
        saved_job['engaged_list'] = list()
        saved_job['other_interview_list'] = list()
        saved_job['resume_list'] = list()

        interview_list = db.get_job_info_interview(saved_job['job_info_id'])
        for interview in interview_list:
            interview['personal_info'] = db.get_user_info_by_username(interview['student_id'])[0]
            interview['about_me'] = interview['personal_info']['description']
            interview['name'] = interview['personal_info']['name']
            interview['email'] = interview['personal_info']['email']
            interview['location'] = interview['personal_info']['location']
            interview['role'] = interview['personal_info']['role']
            interview['username'] = interview['personal_info']['username']

            skill_set = db.get_self_skill_list(interview['student_id'])
            interview['skill_set'] = {item['name']: item['proficiency'] for item in skill_set}

            working_exp = db.get_working_exp_list_by_user_id(
                interview['student_id'])
            experiences = [item for item in working_exp if item['exp_type'] == 0]
            project_list = [item for item in working_exp if item['exp_type'] == 1]
            for item in project_list:
                temp_result = json.loads(item['description'])
                item['description'] = temp_result['description']
                item['techs'] = temp_result['techs']

            interview['experiences'] = experiences
            interview['project_list'] = project_list
            interview['personal_skill'] = db.get_personal_skill(interview['student_id'])
            interview['education_exp'] = db.get_education_exp(interview['student_id'])
            interview['course_list'] = db.get_course_list(interview['student_id'])

            if interview['status'] == 'First Interview':
                saved_job['first_interview_list'].append(interview)
            elif interview['status'] == 'Tests':
                saved_job['test_list'].append(interview)
            elif interview['status'] == 'Second Interview':
                saved_job['second_interview_list'].append(interview)
            elif interview['status'] == 'Offer':
                saved_job['offer_list'].append(interview)
            elif interview['status'] == 'Engaged':
                saved_job['engaged_list'].append(interview)
            else:
                saved_job['other_interview_list'].append(interview)

        resume_list = db.get_job_info_resume(saved_job['job_info_id'])
        for recived_resume in resume_list:
            recived_resume['personal_info'] = db.get_user_info_by_username(recived_resume['student_id'])[0]
            recived_resume['about_me'] = recived_resume['personal_info']['description']
            recived_resume['name'] = recived_resume['personal_info']['name']
            recived_resume['email'] = recived_resume['personal_info']['email']
            recived_resume['location'] = recived_resume['personal_info']['location']
            recived_resume['role'] = recived_resume['personal_info']['role']
            recived_resume['username'] = recived_resume['personal_info']['username']

            skill_set = db.get_self_skill_list(recived_resume['student_id'])
            recived_resume['skill_set'] = {item['name']: item['proficiency'] for item in skill_set}

            working_exp = db.get_working_exp_list_by_user_id(
                recived_resume['student_id'])
            experiences = [item for item in working_exp if item['exp_type'] == 0]
            project_list = [item for item in working_exp if item['exp_type'] == 1]
            for item in project_list:
                temp_result = json.loads(item['description'])
                item['description'] = temp_result['description']
                item['techs'] = temp_result['techs']

            recived_resume['experiences'] = experiences
            recived_resume['project_list'] = project_list
            recived_resume['personal_skill'] = db.get_personal_skill(recived_resume['student_id'])
            recived_resume['education_exp'] = db.get_education_exp(recived_resume['student_id'])
            recived_resume['course_list'] = db.get_course_list(recived_resume['student_id'])
            saved_job['resume_list'].append(recived_resume)

    for saved_user in saved_user_list:
        recommendation_system.recommend_for_user(saved_user['username'])
        recommendation_list = recommendation_system.get_recommend_list()
        saved_user['recommendation_list'] = recommendation_list

        saved_user['personal_info'] = db.get_user_info_by_username(saved_user['username'])[0]
        saved_user['about_me'] = personal_info['description']
        skill_set = db.get_self_skill_list(saved_user['username'])
        saved_user['skill_set'] = {item['name']: item['proficiency'] for item in skill_set}

        working_exp = db.get_working_exp_list_by_user_id(
            saved_user['username'])
        experiences = [item for item in working_exp if item['exp_type'] == 0]
        project_list = [item for item in working_exp if item['exp_type'] == 1]
        for item in project_list:
            temp_result = json.loads(item['description'])
            item['description'] = temp_result['description']
            item['techs'] = temp_result['techs']

        saved_user['experiences'] = experiences
        saved_user['project_list'] = project_list
        saved_user['personal_skill'] = db.get_personal_skill(
            saved_user['username'])
        saved_user['education_exp'] = db.get_education_exp(g.user.user_id)
        saved_user['course_list'] = db.get_course_list(g.user.user_id)

    connection_list = rs.referrer_recommend_list(g.user.user_id)
    for connection in connection_list:
        connection['student_name'] = db.get_user_info_by_username(connection['student_id'])[0]["name"]
        connection["job_title"] = db.get_job_info(connection['job_info_id'])[0]['job_title']
    
    return jsonify({'code': 200, 'msg': 'Get data success', 'username': g.user.user_id, 'role': g.user.role,
                    'personal_info': personal_info, 'about_me': about_me, 'saved_job_list': saved_job_list,
                    'saved_user_list': saved_user_list, 'connection_list': connection_list})


# Update student info
@app.route('/api/student_update', methods=['POST'])
@auth.login_required
def update_student_info():
    update_date = request.json.get('update_data')
    #
    print(update_date)
    if g.user.email != update_date['allContact']['email']:
        db.change_user_email(g.user.user_id, update_date['allContact']['email'])
    if g.user.phone != update_date['allContact']['phone']:
        db.change_user_phone(g.user.user_id, update_date['allContact']['phone'])
    if g.user.website_link != update_date['allContact']['github']:
        db.change_user_link(g.user.user_id, update_date['allContact']['github'])

    if g.user.description != update_date['aboutMe']:
        db.change_user_description(g.user.user_id, update_date['aboutMe'])
        recommendation_system = rs.Recommendation_system()
        recommendation_system.recommend_for_user(g.user.user_id)
        recommendation_system.renew_description()
    #
    ori_skill = db.get_self_skill_list(g.user.user_id)
    ori_skill_list = [item['name'] for item in ori_skill]
    new_skill = list(update_date['allSkills'].keys())
    update_skill = dict()
    insert_skill = dict()
    delete_skill = list()
    for skill in ori_skill:
        if skill['name'] not in new_skill:
            delete_skill.append(skill['id'])
        else:
            new_proficiency = update_date['allSkills'][skill['name']].rstrip('%')
            if int(skill['proficiency']) != int(new_proficiency):
                update_skill[skill['id']] = new_proficiency
    for skill in new_skill:
        if skill not in ori_skill_list:
            insert_skill[skill] = update_date['allSkills'][skill].rstrip('%')

    for skill in delete_skill:
        db.delete_skill_from_list(g.user.user_id, skill)
    for skill in list(update_skill.keys()):
        db.change_skill_list(g.user.user_id, skill, update_skill[skill])
    for skill in list(insert_skill.keys()):
        db.add_skill_to_list(g.user.user_id, skill, insert_skill[skill])
    #
    #
    ori_course = db.get_course_list(g.user.user_id)
    ori_course = set([item['code'] for item in ori_course])
    new_course = dict()
    for item in update_date['allCourses']:
        new_course.update(item)
    new_course = list(new_course.keys())
    new_course = set([item.lower() for item in new_course])
    insert_course = list(new_course.difference(ori_course))
    delete_course = list(ori_course.difference(new_course))
    for course in delete_course:
        db.delete_course_from_list(g.user.user_id, course)
    for course in insert_course:
        db.add_course_to_list(g.user.user_id, course)

    #
    #
    for education_exp in update_date['allEducation']:
        if education_exp.get('uuid') is not None and education_exp.get('uuid') != 'none':
            ori_education_exp = db.get_single_education_exp(education_exp.get('uuid'))
            if len(ori_education_exp) == 0:
                pass
            else:
                ori_education_exp = ori_education_exp[0]
                if ori_education_exp['university'] != education_exp['title']:
                    db.change_university(ori_education_exp['education_exp_uuid'], education_exp['title'])
                if ori_education_exp['time_during'] != education_exp['date']:
                    db.change_education_exp(ori_education_exp['education_exp_uuid'], 'time_during',
                                            education_exp['date'])
                if ori_education_exp['degree'] != education_exp['degree']:
                    db.change_degree(ori_education_exp['education_exp_uuid'], education_exp['degree'])
                if ori_education_exp['major'] != education_exp['major']:
                    db.change_major(ori_education_exp['education_exp_uuid'], education_exp['major'])
        else:
            education_exp_uuid = uuid.uuid1()
            edu_university = education_exp['title']
            time_during = education_exp['date']
            edu_degree = education_exp['degree']
            edu_major = education_exp['major']
            db.create_education_exp(education_exp_uuid=education_exp_uuid, student_id=g.user.user_id, major=edu_major,
                                    university=edu_university, degree=edu_degree, time_during=time_during)
    #
    #
    print(update_date['allProjects'])
    exist_working_exp = db.get_working_exp_list_by_user_id(g.user.user_id)
    experiences = [item['working_exp_uuid'] for item in exist_working_exp if item['exp_type'] == 0]
    project_list = [item['working_exp_uuid'] for item in exist_working_exp if item['exp_type'] == 1]
    update_project_list = [item.get('uuid') for item in update_date['allProjects']]
    # delete project
    for project_uuid in project_list:
        if project_uuid not in update_project_list:
            db.delete_working_exp(project_uuid)

    # check new and modify exist project
    for project in update_date['allProjects']:
        if project.get('uuid') is not None and project.get('uuid') != 'none':
            ori_project = db.get_working_exp_by_uuid(project.get('uuid'))
            print(ori_project)
            if len(ori_project) == 0:
                pass
            else:
                ori_project = ori_project[0]

                if ori_project['name'] != project['title']:
                    db.change_working_exp_name(project.get('uuid'), project['title'])
                if ori_project['link'] != project['link']:
                    db.change_working_exp_link(project.get('uuid'), project['link'])

                new_description_data = {'description': project['description'], 'techs': project['techs']}
                new_description_data = json.dumps(new_description_data)
                if new_description_data != ori_project['description']:
                    db.change_working_exp_description(project.get('uuid'), new_description_data)
        else:
            project_uuid = uuid.uuid1()
            name = project.get('title')
            link = project.get('link')

            description_data = {'description': project['description'], 'techs': project['techs']}
            description_data = json.dumps(description_data)
            db.create_working_exp(working_exp_uuid=project_uuid, user_id=g.user.user_id, name=name,
                                  description=description_data, link=link, exp_type=1)
    #
    #
    update_working_exp = [item.get('uuid') for item in update_date['allExperiences']]

    # delete working exp
    for working_exp_id in experiences:
        if working_exp_id not in update_working_exp:
            db.delete_working_exp(working_exp_id)

    # check new and modify exist
    for working_exp in update_date['allExperiences']:
        if working_exp.get('uuid') is not None and working_exp.get('uuid') != 'none':
            ori_working_exp = db.get_working_exp_by_uuid(working_exp.get('uuid'))
            if len(ori_working_exp) == 0:
                pass
            else:
                ori_working_exp = ori_working_exp[0]
                if ori_working_exp['name'] != working_exp['title']:
                    db.change_working_exp_name(working_exp.get('uuid'), working_exp['title'])
                new_description = str()
                if re.search('date', working_exp['date'].lower()):
                    new_description = working_exp['date'] + '\n' + working_exp['text']
                else:
                    new_description = 'Date: ' + working_exp['date'] + '\n' + working_exp['text']
                if ori_working_exp['description'] != new_description:
                    db.change_working_exp_description(working_exp.get('uuid'), new_description)
                if ori_working_exp['link'] != working_exp.get('link', 'None') and working_exp.get('link',
                                                                                                  'None') != 'None':
                    db.change_working_exp_link(working_exp.get('uuid'), working_exp.get('link', 'None'))
        else:
            working_uuid = uuid.uuid1()
            name = working_exp.get('title')
            if re.search('date', working_exp['date'].lower()):
                description = working_exp['date'] + '\n' + working_exp['text']
            else:
                description = 'Date: ' + working_exp['date'] + '\n' + working_exp['text']
            link = working_exp.get('link', 'None')
            db.create_working_exp(working_exp_uuid=working_uuid, user_id=g.user.user_id, name=name,
                                  description=description, link=link, exp_type=0)
    return jsonify(
        {'code': 200, 'msg': 'Update data success', 'username': g.user.user_id, 'role': g.user.role})


# Employer update data
@app.route('/api/employer_update', methods=['POST'])
@auth.login_required
def update_employer_data():
    update_date = request.json.get('update_data')
    print(list(update_date.keys()))


# Instructor update data
@app.route('/api/instructor_update', methods=['POST'])
@auth.login_required
def update_instructor_data():
    update_date = request.json.get('update_data')
    print(list(update_date.keys()))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
