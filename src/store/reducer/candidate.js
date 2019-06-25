import { updateObject } from '../../utility/utility';
import uuid from "uuid";



const initialState = {
    allData:null,
    hasErrored: false,
    isLoading: false,
    jobInfo:false,
    canInfo:false,
    newProject:false
}

const fetchStart = ( state, action ) => {
    return updateObject( state, {  isLoading: true } );
};

const fetchSuccess = (state, action) => {

    return updateObject( state, {
        allData:action.data,
        aboutMe: action.data['about_me'],
        personalInfo: action.data['personal_info'],
        skillList: action.data['skill_set'],
        courseList: action.data['course_list'],
        educationList: action.data['education_exp'],
        projectList: action.data['project_list'],
        experienceList: action.data['experiences'],
        personalSkilList: action.data['personal_skill'],
        savedJobList: action.data['saved_job_list'],
        rcmdJobList: action.data['recommendation_list'],
        hasErrored: null,
        isLoading: false
    } );
};

const fetchFail = (state, action) => {
    return updateObject( state, {
        hasErrored: true,
        isLoading: false
    });
};


//home nav

const changeAboutMe = (state, action) =>{
    return updateObject( state, { aboutMe: action.aboutMe } );
}

const changeExperience = (state, action) => {
    var newExp = [...state.experienceList];
    newExp.forEach((exp)=>{
        if(exp['working_exp_uuid']=== action.expId){
            if(action.tag==='name'){exp.name= action.value}
            if(action.tag==='description'){exp.description = exp['description'].split("\n")[0] +'\n'+ action.value}
            if(action.tag==='date'){exp.description = action.value +'\n' + exp['description'].split("\n")[1]}
        }
    })
    return updateObject( state, {experienceList: newExp});
};

const addExperience = (state, action) =>{
    var newExp = [...state.experienceList];
    newExp.push({
        description:'\n',
        name:'',
        'working_exp_uuid': 'new'+uuid.v4()
    })
    return updateObject( state, {experienceList: newExp});
}

const deleteExperience = (state, action) =>{
    var newExp = [...state.experienceList];
    newExp = newExp.filter(exp=> exp['working_exp_uuid'] !== action.expId);
    return updateObject( state, {experienceList: newExp});
}

const changeEducation = (state, action) => {
    var newEdu = [...state.educationList];
    newEdu.forEach((exp)=>{
        if(exp['education_exp_uuid']=== action.eduId){
            exp[action.tag] = action.value;
        }
    })
    return updateObject( state, {educationList: newEdu});
}



const deleteEducation = (state,action) =>{
    var newEdu = [...state.educationList];
    newEdu = newEdu.filter(edu=> edu['education_exp_uuid'] !== action.eduId);
    return updateObject( state, {educationList: newEdu});
}

const addEducation = (state, action) =>{
    var newEdu = [...state.educationList];
    newEdu.push({
        degree: '',
        major:'',
        university:'',
        time_during: '',
        'education_exp_uuid': 'new'+uuid.v4()
    });
    return updateObject( state, {educationList: newEdu});
}

const changePS = (state, action) => {
    var psList = [...state.personalSkilList];
    psList[action.index] = action.value;
    return updateObject( state, {personalSkilList:psList});
}

const deletePS = (state, action) => {
    var psList =  state.personalSkilList.filter(function (ps, idx) {
        return idx != action.index
    })
    return updateObject( state, {personalSkilList:psList});
}

const addPS=(state, action)=>{
    var psList = [...state.personalSkilList];
    psList.push('');
    return updateObject( state, {personalSkilList:psList});
}

const addSkill=(state, action)=>{
    let newList = {...state.skillList};
    if(Object.keys(newList).length<5){
        newList[action.skill] = action.percent;
        return updateObject( state, {skillList:newList});
    }else{
        alert('Maximum 5 skills');
        return state;
    }
}

const deleteSkill=(state, action)=>{
    let newList = {...state.skillList};
    delete newList[action.skill];
    return updateObject( state, {skillList:newList});
}

const addCourse=(state, action)=>{
    let newList = [...state.courseList];
    newList.push({code: action.code, name: action.name});
    return updateObject( state, {courseList:newList});
}

const deleteCourse=(state, action)=>{
    let newList = [...state.courseList];
    newList = newList.filter(function (cour) {
        return cour.code !== action.code
    })
    return updateObject( state, {courseList:newList});
}

const addProject=(state, action)=>{
    let newList = [...state.projectList];
    let newProj =  {
        description: action.data.description,
        link: action.data.link,
        name: action.data.name,
        techs: action.data.techs,
        working_exp_uuid: "new" + uuid.v4()
    };
    newList.push(newProj);
    return updateObject( state, {projectList:newList});
}

const deleteProject=(state, action)=>{
    let newList = [...state.projectList];
    newList = newList.filter(function (proj) {
        return proj['working_exp_uuid'] != action.id
    })
    return updateObject( state, {projectList:newList});
}

const addNewProject=(state, action)=>{
    var newPro = {
        title:'',
        des:'',
        techs:[],
        link:''
    };
    return updateObject( state, {newProject:newPro});

}

const changeNewProject=(state, action)=>{
    var newPro = {...state.newProject};
    if(action.tag==='tech'){
        var techs = action.value.split(/\s+/);
        newPro['techs'] = techs;
        return updateObject( state, {newProject:newPro});
    }if(action.tag==='cancel'){
        return updateObject( state, {newProject:false});
    } else{
        newPro[action.tag] = action.value;
        return updateObject( state, {newProject: newPro})
    }
}

const storeNewProject=(state, action)=>{
    let projectList = [...state.projectList];
    let newPro = {...state.newProject};
    projectList.push({
        description: newPro.des,
        name: newPro.title,
        link: newPro.link,
        techs: newPro.techs,
        'working_exp_uuid': 'new'+uuid.v4()
    });
    return updateObject( state, {newProject: false, projectList: projectList})
}

const showJobInfo = (state, action) => {
    const jobInfo = {...action.jobInfo};
    jobInfo['top'] = action.top;
    console.log(action.jobInfo ,action.top);
    return updateObject(state, {
        jobInfo: jobInfo
    });
}

const showCanInfo = (state, action) => {
    const canInfo = {...action.canInfo};
    canInfo['top'] = action.top;
    canInfo['jobState'] = action.jobState;
    return updateObject(state, {
        canInfo: canInfo
    });
}

const cancelJobInfo = (state, action) => {
    return updateObject(state, {
        jobInfo: false
    });
}

const deleteJob = (state, action) => {
    var newList = [...state.savedJobList];
    newList = newList.filter(function (job) {
        return job['job_info_id'] != action.jobId;
    })
    return updateObject(state, {
        savedJobList: newList
    });
}

const changeInfo = (state, action) => {
    var newInfo= {...state.personalInfo};
    newInfo[action.tag] = action.value;
    return updateObject(state, {personalInfo: newInfo});
};

const updateSuccess = (state, action) => {
    alert('Successfully updated all information!');
    return state;
}

const cancelCanInfo = (state, action) => {
    return updateObject(state, {
        canInfo: false
    });
}



const candidate = (state=initialState, action) => {
    switch ( action.type ) {
        case "CANDIDATE_FETCH_DATA_SUCCESS CANDIDATE": return fetchSuccess(state,action);
        case "CAN_DATA_HAS_ERRORED CANDIDATE":return fetchFail(state,action);
        case "CAN_DATA_IS_LOADING CANDIDATE":return fetchStart(state,action);
        case "CHANGE ABOUT ME CANDIDATE":return changeAboutMe(state,action);
        case "CHANGE EXPERIENCE CANDIDATE":return changeExperience(state,action);
        case "ADD EXPERIENCE CANDIDATE":return addExperience(state,action);
        case "DELETE EXPERIENCE CANDIDATE":return deleteExperience(state,action);
        case "CHANGE EDUCATION CANDIDATE":return changeEducation(state,action);
        case "DELETE EDUCATION CANDIDATE":return deleteEducation(state,action);
        case "ADD EDUCATION CANDIDATE":return addEducation(state,action);
        case "CHANGE PS CANDIDATE":return changePS(state,action);
        case "DELETE PS CANDIDATE":return deletePS(state,action);
        case "ADD PS CANDIDATE":return addPS(state,action);
        case "ADD SKILL CANDIDATE":return addSkill(state,action);
        case "DELETE SKILL CANDIDATE":return deleteSkill(state,action);
        case "ADD COURSE CANDIDATE":return addCourse(state,action);
        case "DELETE COURSE CANDIDATE":return deleteCourse(state,action);
        case "ADD PROJECT CANDIDATE":return addProject(state,action);
        case "ADD NEW PROJECT CANDIDATE":return addNewProject(state,action);
        case "DELETE PROJECT CANDIDATE":return deleteProject(state,action);
        case "CHANGE NEW PROJECT CANDIDATE":return changeNewProject(state,action);
        case "STORE NEW PROJECT CANDIDATE":return storeNewProject(state,action);
        case "SHOW JOB INFO CANDIDATE":return showJobInfo(state,action);
        case "SHOW CAN INFO CANDIDATE":return showCanInfo(state,action);
        case "CANCEL JOB INFO CANDIDATE":return cancelJobInfo(state,action);
        case "CANCEL CAN INFO CANDIDATE":return cancelCanInfo(state,action);
        case "DELETE JOB CANDIDATE":return deleteJob(state,action);
        case "CHANGE INFO CANDIDATE":return changeInfo(state,action);
        case "UPDATE SUCCESS CANDIDATE":return updateSuccess(state,action);
        default: return state;
    }
}

export default candidate;