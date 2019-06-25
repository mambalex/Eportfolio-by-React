import axios from 'axios';

export function dataHasErrored() {
    return {
        type: 'SEARCH_DATA_HAS_ERRORED',
    };
}

export function dataIsLoading() {
    return {
        type: 'SEARCH_DATA_IS_LOADING',
    };
}

export function searchJobsSuccess(data) {
    return {
        type: 'SEARCH JOB SUCCESS',
        data:data
    };
}

export function searchCansSuccess(data) {
    return {
        type: 'SEARCH CAN SUCCESS',
        data:data
    };
}


export function searchCans(allData) {
    var url='http://localhost:5000/api/search_user';
    return (dispatch) => {
        dispatch(dataIsLoading());
        let  config = {
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + btoa(localStorage.getItem('token')+':')
            }
        }

        axios.post(url,{search_data: allData},config)
            .then((response) => {
                console.log(response);
                dispatch(searchCansSuccess(response.data.data))
            })
            .catch(() => dispatch(dataHasErrored(true)));
    };
}

export function searchJobs(allData) {
    var url='http://localhost:5000/api/search_job_info';
    return (dispatch) => {
        dispatch(dataIsLoading(true));
        let  config = {
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + btoa(localStorage.getItem('token')+':')
            }
        }

        axios.post(url,{search_data: allData},config)
            .then((response) => {
                console.log(response);
                dispatch(searchJobsSuccess(response.data.data))
            })
            .catch(() => dispatch(dataHasErrored()));
    };
}


export function showSearchCan(data) {
    return {
        type: 'SHOW SEARCH CAN',
        canInfo:data
    };
}

export function ShowSearchJob(data) {
    return {
        type: 'SHOW SEARCH JOB',
        JobInfo:data
    };
}

export function saveCanSuccess(){
    return {
        type: 'SAVE CAN SUCCESS',
    };
}

export function saveCan(role,canId) {
    var url='http://localhost:5000/api/add_saved_user';
    var formData = new FormData();
    formData.append('saved_user_id', canId);
    return (dispatch) => {
        dispatch(dataIsLoading(true));
        let  config = {
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + btoa(localStorage.getItem('token')+':')
            }
        }

        axios.post(url,formData,config)
            .then((response) => {
                console.log(response);
                alert("Successfully saved Can");
                dispatch(saveCanSuccess())
            })
            .catch(() => dispatch(dataHasErrored()));
    };
}

export function saveJobSuccess(){
    return {
        type: 'SAVE JOB SUCCESS',
    };
}

export function saveJob(role,jobId) {
    var url='http://localhost:5000/api/add_saved_job';
    var formData = new FormData();
    formData.append('job_info_id', jobId);
    return (dispatch) => {
        dispatch(dataIsLoading(true));
        let  config = {
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + btoa(localStorage.getItem('token')+':')
            }
        }

        axios.post(url,formData,config)
            .then((response) => {
                console.log(response);
                alert("Successfully saved Job");
                dispatch(saveJobSuccess())
            })
            .catch(() => dispatch(dataHasErrored()));
    };
}