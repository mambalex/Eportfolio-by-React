import axios from 'axios';
import {cancelCanInfo, fetchEmployerData} from "./employer";


export function dataHasErrored() {
    return {
        type: 'CAN_DATA_HAS_ERRORED CANDIDATE',
    };
}

export function dataIsLoading() {
    return {
        type: 'CAN_DATA_IS_LOADING CANDIDATE',
    };
}

export function fetchCandidateSuccess(data) {
    return {
        type: 'CANDIDATE_FETCH_DATA_SUCCESS CANDIDATE',
        data:data
    };
}

const path = 'http://localhost:5000/api/candidate_get_main_data';
export function fetchCandidateData(url=path) {
    return (dispatch) => {
        dispatch(dataIsLoading(true));
        let token =localStorage.getItem('token');
        let  config = {
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + btoa(localStorage.getItem('token')+':')
            }
        }

        axios.post(url,null,config)
            .then((response) => {
                console.log(response);
                dispatch(fetchCandidateSuccess(response.data))
            })
            .catch(() => dispatch(dataHasErrored(true)));
    };
}

//home nav
export function changeAboutMe(data) {
    return {
        type: 'CHANGE ABOUT ME CANDIDATE',
        aboutMe:data
    };
}

export function changeExperience(value, type, expId) {
    return {
        type: 'CHANGE EXPERIENCE CANDIDATE',
        value:value,
        tag:type,
        expId:expId
    };
}

export function addExperience() {
    return {
        type: 'ADD EXPERIENCE CANDIDATE'
    }
}


export function deleteExperience (expId){
    return {
        type: 'DELETE EXPERIENCE CANDIDATE',
        expId:expId
    }
}

export function changeEducation (value, type , eduId){
    return {
        type: 'CHANGE EDUCATION CANDIDATE',
        value: value,
        eduId:eduId,
        tag:type
    }
}

export function deleteEducation (eduId){
    return {
        type: 'DELETE EDUCATION CANDIDATE',
        eduId:eduId,
    }
}

export function addEducation (){
    return {
        type: 'ADD EDUCATION CANDIDATE'
    }
}


export function changePS (value, index){
    return {
        type: 'CHANGE PS CANDIDATE',
        value:value,
        index:index
    }
}

export function deletePS (index){
    return {
        type: 'DELETE PS CANDIDATE',
        index:index
    }
}

export function addPS (){
    return {
        type: 'ADD PS CANDIDATE'
    }
}

export function addSkill (skill, percent){
    return {
        type: 'ADD SKILL CANDIDATE',
        skill:skill,
        percent:percent
    }
}

export function deleteSkill (skill){
    return {
        type: 'DELETE SKILL CANDIDATE',
        skill:skill
    }
}

export function addCourse (code, name){
    return {
        type: 'ADD COURSE CANDIDATE',
        code:code,
        name:name
    }
}

export function deleteCourse (code){
    return {
        type: 'DELETE COURSE CANDIDATE',
        code:code
    }
}

export function addProject(data) {
    return {
        type: 'ADD PROJECT CANDIDATE',
        data:data
    }
}

export function deleteProject(data) {
    return {
        type: 'DELETE PROJECT CANDIDATE',
        id:data
    }
}

export function changeNewProject(value, type) {
    return {
        type: 'CHANGE NEW PROJECT CANDIDATE',
        value:value,
        tag:type
    }
}

export function addNewProject() {
    return {
        type: 'ADD NEW PROJECT CANDIDATE',
    }
}


export function storeNewProject() {
    return {
        type: 'STORE NEW PROJECT CANDIDATE',
    }
}


export function showJobInfoCandidate(jobInfo, top) {
    return {
        type: 'SHOW JOB INFO CANDIDATE',
        jobInfo:jobInfo,
        top:top
    }
}

export function cancelJobInfoCandidate(jobInfo, top) {
    return {
        type: 'CANCEL JOB INFO CANDIDATE'
    }
}

export function deleteSavedJob(id) {
    return {
        type: 'DELETE JOB CANDIDATE',
        jobId:id
    }
}

export function changePersonalInfo(value, type) {
    return {
        type: 'CHANGE INFO CANDIDATE',
        value:value,
        tag:type
    }
}

export function updateSuccess(){
    return {
        type: 'UPDATE SUCCESS CANDIDATE'
    }
}


export function updateAllInfo(allData) {
    console.log(allData);
    return (dispatch) => {
        let token =localStorage.getItem('token');
        let  config = {
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + btoa(localStorage.getItem('token')+':')
            }
        }
        axios.post('http://localhost:5000/api/student_update',{update_data: allData},config)
            .then((response) => {
                console.log(response);
                dispatch(updateSuccess());
                fetchCandidateData(path);
            })
            .catch((err) => console.log(err));
}
}


export function showCanInfoCandidate(canInfo,top,jobState){
    return {
        type: 'SHOW CAN INFO CANDIDATE',
        canInfo:canInfo,
        top:top,
        jobState:jobState
    };
}

export function  cancelCanInfoCandidate(){
    return {
        type: 'CANCEL CAN INFO CANDIDATE',
    };
}
