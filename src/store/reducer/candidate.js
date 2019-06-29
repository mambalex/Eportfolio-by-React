import uuid from 'uuid';
import { updateObject } from '../../utility/utility';


const initialState = {
  allData: null,
  hasErrored: false,
  isLoading: false,
  jobInfo: {},
  canInfo: {},
  newProject: false,
};

const fetchStart = state => updateObject(state, { isLoading: true });

const fetchSuccess = (state, action) => updateObject(state, {
  allData: action.data,
  aboutMe: action.data.about_me,
  personalInfo: action.data.personal_info,
  skillList: action.data.skill_set,
  courseList: action.data.course_list,
  educationList: action.data.education_exp,
  projectList: action.data.project_list,
  experienceList: action.data.experiences,
  personalSkilList: action.data.personal_skill,
  savedJobList: action.data.saved_job_list,
  rcmdJobList: action.data.recommendation_list,
  hasErrored: null,
  isLoading: false,
});

const fetchFail = state => updateObject(state, {
  hasErrored: true,
  isLoading: false,
});


// home nav

const changeAboutMe = (state, action) => updateObject(state, { aboutMe: action.aboutMe });

const changeExperience = (state, action) => {
  const newExp = [...state.experienceList];
  newExp.forEach((exp) => {
    if (exp.working_exp_uuid === action.expId) {
      // eslint-disable-next-line no-param-reassign
      if (action.tag === 'name') { exp.name = action.value; }
      // eslint-disable-next-line no-param-reassign
      if (action.tag === 'description') { exp.description = `${exp.description.split('\n')[0]}\n${action.value}`; }
      // eslint-disable-next-line no-param-reassign
      if (action.tag === 'date') { exp.description = `${action.value}\n${exp.description.split('\n')[1]}`; }
    }
  });
  return updateObject(state, { experienceList: newExp });
};

const addExperience = (state) => {
  const newExp = [...state.experienceList];
  newExp.push({
    description: '\n',
    name: '',
    working_exp_uuid: `new${uuid.v4()}`,
  });
  return updateObject(state, { experienceList: newExp });
};

const deleteExperience = (state, action) => {
  let newExp = [...state.experienceList];
  newExp = newExp.filter(exp => exp.working_exp_uuid !== action.expId);
  return updateObject(state, { experienceList: newExp });
};

const changeEducation = (state, action) => {
  const newEdu = [...state.educationList];
  newEdu.forEach((exp) => {
    if (exp.education_exp_uuid === action.eduId) {
      // eslint-disable-next-line no-param-reassign
      exp[action.tag] = action.value;
    }
  });
  return updateObject(state, { educationList: newEdu });
};


const deleteEducation = (state, action) => {
  let newEdu = [...state.educationList];
  newEdu = newEdu.filter(edu => edu.education_exp_uuid !== action.eduId);
  return updateObject(state, { educationList: newEdu });
};

const addEducation = (state) => {
  const newEdu = [...state.educationList];
  newEdu.push({
    degree: '',
    major: '',
    university: '',
    time_during: '',
    education_exp_uuid: `new${uuid.v4()}`,
  });
  return updateObject(state, { educationList: newEdu });
};

const changePS = (state, action) => {
  const psList = [...state.personalSkilList];
  psList[action.index] = action.value;
  return updateObject(state, { personalSkilList: psList });
};

const deletePS = (state, action) => {
  const psList = state.personalSkilList.filter((ps, idx) => idx !== action.index);
  return updateObject(state, { personalSkilList: psList });
};

const addPS = (state) => {
  const psList = [...state.personalSkilList];
  psList.push('');
  return updateObject(state, { personalSkilList: psList });
};

const addSkill = (state, action) => {
  const newList = { ...state.skillList };
  if (Object.keys(newList).length < 5) {
    newList[action.skill] = action.percent;
    return updateObject(state, { skillList: newList });
  }
  // eslint-disable-next-line no-alert
  alert('Maximum 5 skills');
  return state;
};

const deleteSkill = (state, action) => {
  const newList = { ...state.skillList };
  delete newList[action.skill];
  return updateObject(state, { skillList: newList });
};

const addCourse = (state, action) => {
  const newList = [...state.courseList];
  newList.push({ code: action.code, name: action.name });
  return updateObject(state, { courseList: newList });
};

const deleteCourse = (state, action) => {
  let newList = [...state.courseList];
  newList = newList.filter(cour => cour.code !== action.code);
  return updateObject(state, { courseList: newList });
};

const addProject = (state, action) => {
  const newList = [...state.projectList];
  const newProj = {
    description: action.data.description,
    link: action.data.link,
    name: action.data.name,
    techs: action.data.techs,
    working_exp_uuid: `new${uuid.v4()}`,
  };
  newList.push(newProj);
  return updateObject(state, { projectList: newList });
};

const deleteProject = (state, action) => {
  let newList = [...state.projectList];
  newList = newList.filter(proj => proj.working_exp_uuid !== action.id);
  return updateObject(state, { projectList: newList });
};

const addNewProject = (state) => {
  const newPro = {
    title: '',
    des: '',
    techs: [],
    link: '',
  };
  return updateObject(state, { newProject: newPro });
};

const changeNewProject = (state, action) => {
  const newPro = { ...state.newProject };
  if (action.tag === 'tech') {
    const techs = action.value.split(/\s+/);
    newPro.techs = techs;
    return updateObject(state, { newProject: newPro });
  } if (action.tag === 'cancel') {
    return updateObject(state, { newProject: false });
  }
  newPro[action.tag] = action.value;
  return updateObject(state, { newProject: newPro });
};

const storeNewProject = (state) => {
  const projectList = [...state.projectList];
  const newPro = { ...state.newProject };
  projectList.push({
    description: newPro.des,
    name: newPro.title,
    link: newPro.link,
    techs: newPro.techs,
    working_exp_uuid: `new${uuid.v4()}`,
  });
  return updateObject(state, { newProject: false, projectList });
};

const showJobInfo = (state, action) => {
  const jobInfo = { ...action.jobInfo };
  jobInfo.top = action.top;
  return updateObject(state, {
    jobInfo,
  });
};

const showCanInfo = (state, action) => {
  const canInfo = { ...action.canInfo };
  canInfo.top = action.top;
  canInfo.jobState = action.jobState;
  return updateObject(state, {
    canInfo,
  });
};

const cancelJobInfo = state => updateObject(state, {
  jobInfo: false,
});

const deleteJob = (state, action) => {
  let newList = [...state.savedJobList];
  newList = newList.filter(job => job.job_info_id !== action.jobId);
  return updateObject(state, {
    savedJobList: newList,
  });
};

const changeInfo = (state, action) => {
  const newInfo = { ...state.personalInfo };
  newInfo[action.tag] = action.value;
  return updateObject(state, { personalInfo: newInfo });
};

const updateSuccess = (state) => {
  // eslint-disable-next-line no-alert
  alert('Successfully updated all information!');
  return state;
};

const cancelCanInfo = state => updateObject(state, {
  canInfo: false,
});


const candidate = (state = initialState, action) => {
  switch (action.type) {
    case 'CANDIDATE_FETCH_DATA_SUCCESS CANDIDATE': return fetchSuccess(state, action);
    case 'CAN_DATA_HAS_ERRORED CANDIDATE': return fetchFail(state, action);
    case 'CAN_DATA_IS_LOADING CANDIDATE': return fetchStart(state, action);
    case 'CHANGE ABOUT ME CANDIDATE': return changeAboutMe(state, action);
    case 'CHANGE EXPERIENCE CANDIDATE': return changeExperience(state, action);
    case 'ADD EXPERIENCE CANDIDATE': return addExperience(state, action);
    case 'DELETE EXPERIENCE CANDIDATE': return deleteExperience(state, action);
    case 'CHANGE EDUCATION CANDIDATE': return changeEducation(state, action);
    case 'DELETE EDUCATION CANDIDATE': return deleteEducation(state, action);
    case 'ADD EDUCATION CANDIDATE': return addEducation(state, action);
    case 'CHANGE PS CANDIDATE': return changePS(state, action);
    case 'DELETE PS CANDIDATE': return deletePS(state, action);
    case 'ADD PS CANDIDATE': return addPS(state, action);
    case 'ADD SKILL CANDIDATE': return addSkill(state, action);
    case 'DELETE SKILL CANDIDATE': return deleteSkill(state, action);
    case 'ADD COURSE CANDIDATE': return addCourse(state, action);
    case 'DELETE COURSE CANDIDATE': return deleteCourse(state, action);
    case 'ADD PROJECT CANDIDATE': return addProject(state, action);
    case 'ADD NEW PROJECT CANDIDATE': return addNewProject(state, action);
    case 'DELETE PROJECT CANDIDATE': return deleteProject(state, action);
    case 'CHANGE NEW PROJECT CANDIDATE': return changeNewProject(state, action);
    case 'STORE NEW PROJECT CANDIDATE': return storeNewProject(state, action);
    case 'SHOW JOB INFO CANDIDATE': return showJobInfo(state, action);
    case 'SHOW CAN INFO CANDIDATE': return showCanInfo(state, action);
    case 'CANCEL JOB INFO CANDIDATE': return cancelJobInfo(state, action);
    case 'CANCEL CAN INFO CANDIDATE': return cancelCanInfo(state, action);
    case 'DELETE JOB CANDIDATE': return deleteJob(state, action);
    case 'CHANGE INFO CANDIDATE': return changeInfo(state, action);
    case 'UPDATE SUCCESS CANDIDATE': return updateSuccess(state, action);
    default: return state;
  }
};

export default candidate;
