import axios from 'axios';

export function dataHasErrored() {
  return {
    type: 'INSTRUCTOR_DATA_HAS_ERRORED INSTRUCTOR',
  };
}

export function dataIsLoading() {
  return {
    type: 'INSTRUCTOR_DATA_IS_LOADING INSTRUCTOR',
  };
}

export function fetchInstructorSuccess(data) {
  return {
    type: 'INSTRUCTOR_FETCH_DATA_SUCCESS INSTRUCTOR',
    data,
  };
}

const path = 'http://localhost:5000/api/instructor_get_main_data';
// var  path = 'http://localhost:5000/api/test';

export function fetchInstructorData(url = path) {
  return (dispatch) => {
    dispatch(dataIsLoading(true));
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Basic ${btoa(`${localStorage.getItem('token')}:`)}`,
      },
    };

    axios.post(url, null, config)
      .then((response) => {
        dispatch(fetchInstructorSuccess(response.data));
      })
      .catch(() => dispatch(dataHasErrored(true)));
  };
}


export function showJobInfoInstructor(info, top) {
  return {
    type: 'SHOW JOB INFO INSTRUCTOR',
    jobInfo: info,
    top,
  };
}

export function cancelJobInfoInstructor() {
  return {
    type: 'CANCEL JOB INFO INSTRUCTOR',
  };
}

export function cancelCanInfoInstructor() {
  return {
    type: 'CANCEL CAN INFO INSTRUCTOR',
  };
}

export function showNewCon() {
  return {
    type: 'SHOW NEW CON INSTRUCTOR',
  };
}

export function cancelNewCon() {
  return {
    type: 'CANCEL NEW CON INSTRUCTOR',
  };
}


export function showCanInfoInstructor(canInfo, top, jobState) {
  return {
    type: 'SHOW CAN INFO INSTRUCTOR',
    canInfo,
    top,
    jobState,
  };
}
