import { updateObject } from '../../utility/utility';

const initialState = {
  allData: null,
  connectionList: null,
  navData: {
    'Saved Jobs': 0,
    Candidates: 0,
    Connections: 0,
  },
  hasErrored: false,
  isLoading: false,
  jobInfo: {},
  canInfo: {},
  newCon: false,
};

const fetchStart = state => updateObject(state, { isLoading: true });

const fetchSuccess = (state, action) => {
  const conList = [];
  const temp = {};
  action.data.connection_list.forEach((con) => {
    // eslint-disable-next-line no-empty
    if (con.student_id in temp && temp[con.student_id] === con.job_info_id) {} else {
      temp[con.student_id] = con.job_info_id;
      conList.push(con);
    }
  });
  const numOfJobs = action.data.saved_job_list.length;
  const numOfConnections = conList.length;
  const numOfCans = action.data.saved_user_list.length;
  return updateObject(state, {
    allData: action.data,
    connectionList: conList,
    navData: {
      'Saved Jobs': numOfJobs,
      Candidates: numOfCans,
      Connections: numOfConnections,
    },
    hasErrored: null,
    isLoading: false,
  });
};

const fetchFail = state => updateObject(state, {
  hasErrored: true,
  isLoading: false,
});


const showJobInfo = (state, action) => {
  const jobInfo = { ...action.jobInfo };
  jobInfo.top = action.top;
  return updateObject(state, {
    jobInfo,
  });
};

const cancelJobInfo = state => updateObject(state, {
  jobInfo: false,
});


const showCanInfo = (state, action) => {
  const canInfo = { ...action.canInfo };
  canInfo.top = action.top;
  canInfo.jobState = action.jobState;
  return updateObject(state, {
    canInfo,
  });
};

const cancelCanInfo = state => updateObject(state, {
  canInfo: false,
});

const cancelNewCon = state => updateObject(state, {
  newCon: false,
});

const showNewCon = state => updateObject(state, {
  newCon: true,
});


const instructor = (state = initialState, action) => {
  switch (action.type) {
    case 'INSTRUCTOR_FETCH_DATA_SUCCESS INSTRUCTOR': return fetchSuccess(state, action);
    case 'INSTRUCTOR_DATA_HAS_ERRORED INSTRUCTOR': return fetchFail(state, action);
    case 'INSTRUCTOR_DATA_IS_LOADING INSTRUCTOR': return fetchStart(state, action);
    case 'SHOW JOB INFO INSTRUCTOR': return showJobInfo(state, action);
    case 'CANCEL JOB INFO INSTRUCTOR': return cancelJobInfo(state, action);
    case 'CANCEL CAN INFO INSTRUCTOR': return cancelCanInfo(state, action);
    case 'SHOW CAN INFO INSTRUCTOR': return showCanInfo(state, action);
    case 'CANCEL NEW CON INSTRUCTOR': return cancelNewCon(state, action);
    case 'SHOW NEW CON INSTRUCTOR': return showNewCon(state, action);
    default: return state;
  }
};

export default instructor;
