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
    data,
  };
}

export function searchCansSuccess(data) {
  return {
    type: 'SEARCH CAN SUCCESS',
    data,
  };
}


export function searchCans(allData) {
  const url = 'http://localhost:5000/api/search_user';
  return (dispatch) => {
    dispatch(dataIsLoading());
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Basic ${btoa(`${localStorage.getItem('token')}:`)}`,
      },
    };

    axios.post(url, { search_data: allData }, config)
      .then((response) => {
        dispatch(searchCansSuccess(response.data.data));
      })
      .catch(() => dispatch(dataHasErrored(true)));
  };
}

export function searchJobs(allData) {
  const url = 'http://localhost:5000/api/search_job_info';
  return (dispatch) => {
    dispatch(dataIsLoading(true));
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Basic ${btoa(`${localStorage.getItem('token')}:`)}`,
      },
    };

    axios.post(url, { search_data: allData }, config)
      .then((response) => {
        dispatch(searchJobsSuccess(response.data.data));
      })
      .catch(() => dispatch(dataHasErrored()));
  };
}


export function showSearchCan(data) {
  return {
    type: 'SHOW SEARCH CAN',
    canInfo: data,
  };
}

export function ShowSearchJob(data) {
  return {
    type: 'SHOW SEARCH JOB',
    JobInfo: data,
  };
}

export function saveCanSuccess() {
  return {
    type: 'SAVE CAN SUCCESS',
  };
}

export function saveCan(role, canId) {
  const url = 'http://localhost:5000/api/add_saved_user';
  const formData = new FormData();
  formData.append('saved_user_id', canId);
  return (dispatch) => {
    dispatch(dataIsLoading(true));
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Basic ${btoa(`${localStorage.getItem('token')}:`)}`,
      },
    };

    axios.post(url, formData, config)
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('Successfully saved Can');
        dispatch(saveCanSuccess());
      })
      .catch(() => dispatch(dataHasErrored()));
  };
}

export function saveJobSuccess() {
  return {
    type: 'SAVE JOB SUCCESS',
  };
}

export function saveJob(role, jobId) {
  const url = 'http://localhost:5000/api/add_saved_job';
  const formData = new FormData();
  formData.append('job_info_id', jobId);
  return (dispatch) => {
    dispatch(dataIsLoading(true));
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Basic ${btoa(`${localStorage.getItem('token')}:`)}`,
      },
    };

    axios.post(url, formData, config)
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('Successfully saved Job');
        dispatch(saveJobSuccess());
      })
      .catch(() => dispatch(dataHasErrored()));
  };
}
