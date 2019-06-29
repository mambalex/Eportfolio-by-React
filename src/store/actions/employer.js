import axios from 'axios';

export function dataHasErrored() {
  return {
    type: 'DATA_HAS_ERRORED EMPLOYER',
  };
}

export function dataIsLoading() {
  return {
    type: 'DATA_IS_LOADING EMPLOYER',
  };
}

export function fetchEmployerSuccess(data) {
  return {
    type: 'EMPLOYER_FETCH_DATA_SUCCESS EMPLOYER',
    data,
  };
}

const path = 'http://localhost:5000/api/employer_get_main_data';
// var  path = 'http://localhost:5000/api/test';

export function fetchEmployerData(url = path) {
  return (dispatch) => {
    dispatch(dataIsLoading());
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Basic ${btoa(`${localStorage.getItem('token')}:`)}`,
      },
    };

    axios.post(url, null, config)
      .then((response) => {
        dispatch(fetchEmployerSuccess(response.data));
      })
      .catch(() => dispatch(dataHasErrored()));
  };
}

export function addJob() {
  return {
    type: 'ADD JOB EMPLOYER',
  };
}

export function cancelNewJob() {
  return {
    type: 'CANCEL NEW JOB EMPLOYER',
  };
}

export function showJobInfo(info, top) {
  return {
    type: 'SHOW JOB INFO EMPLOYER',
    jobInfo: info,
    top,
  };
}

export function cancelJobInfo() {
  return {
    type: 'CANCEL JOB INFO EMPLOYER',
  };
}

export function cancelCanInfo() {
  return {
    type: 'CANCEL CAN INFO EMPLOYER',
  };
}

export function deleteJobSuccess() {
  return {
    type: 'DELETE JOB SUCCESS EMPLOYER',
  };
}

export function deleteJob(jobId) {
  return (dispatch) => {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Basic ${btoa(`${localStorage.getItem('token')}:`)}`,
      },
    };
    const data = { info_uuid: jobId };
    axios.post('http://localhost:5000/api/delete_job_info', data, config)
      .then(() => {
        dispatch(deleteJobSuccess());
        dispatch(fetchEmployerData(path));
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  };
}

export function showCanInfo(canInfo, top, jobState) {
  return {
    type: 'SHOW CAN INFO EMPLOYER',
    canInfo,
    top,
    jobState,
  };
}

export function scheduleCan(data) {
  return (dispatch) => {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Basic ${btoa(`${localStorage.getItem('token')}:`)}`,
      },
    };
    axios.post('http://localhost:5000/api/create_interview', { update_data: data }, config)
      .then(() => {
        dispatch(cancelCanInfo());
        dispatch(fetchEmployerData(path));
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  };
}
